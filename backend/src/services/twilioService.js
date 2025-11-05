const twilio = require('twilio');
const logger = require('../utils/logger');

class TwilioService {
  constructor() {
    this.accountSid = process.env.TWILIO_ACCOUNT_SID;
    this.authToken = process.env.TWILIO_AUTH_TOKEN;
    this.verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;
    this.phoneNumber = process.env.TWILIO_PHONE_NUMBER;
    
    // Simple in-memory storage for verification codes (use Redis in production)
    this.verificationCodes = new Map();
    
    if (this.accountSid && this.authToken) {
      this.client = twilio(this.accountSid, this.authToken);
    } else {
      logger.warn('Twilio credentials not configured');
    }
  }

  /**
   * Generate a 6-digit verification code
   */
  generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * Format phone number to E.164 format for Iceland (+354)
   */
  formatPhoneNumber(phone) {
    // Remove spaces, hyphens, and parentheses
    let cleaned = phone.replace(/[\s\-\(\)]/g, '');
    
    // Handle different Icelandic phone number formats
    if (cleaned.match(/^\d{7}$/)) {
      // 7-digit number (e.g., 7777777)
      return `+354${cleaned}`;
    } else if (cleaned.match(/^354\d{7}$/)) {
      // Number with country code but no + (e.g., 3547777777)
      return `+${cleaned}`;
    } else if (cleaned.match(/^\+354\d{7}$/)) {
      // Number with full E.164 format (e.g., +3547777777)
      return cleaned;
    } else {
      throw new Error('Invalid Icelandic phone number format');
    }
  }

  /**
   * Send SMS verification code using regular messaging (not Verify API)
   */
  async sendVerificationCodeMessaging(phone) {
    try {
      if (!this.client || !this.phoneNumber) {
        throw new Error('Twilio messaging service not configured. Need TWILIO_PHONE_NUMBER');
      }

      // Format phone number
      const formattedPhone = this.formatPhoneNumber(phone);
      
      // Validate it's an Icelandic number
      if (!formattedPhone.startsWith('+354')) {
        throw new Error('Only Icelandic phone numbers are supported');
      }

      // Generate verification code
      const code = this.generateCode();
      
      // Store code with expiry (10 minutes)
      const expiresAt = Date.now() + (10 * 60 * 1000);
      this.verificationCodes.set(formattedPhone, { code, expiresAt });
      
      // Clean up old codes
      this.cleanupExpiredCodes();

      // Send SMS
      const message = await this.client.messages.create({
        body: `Your Kaggi verification code is: ${code}. Valid for 10 minutes.`,
        from: this.phoneNumber,
        to: formattedPhone
      });

      logger.info(`SMS verification code sent to ${formattedPhone}, Message SID: ${message.sid}`);

      return {
        success: true,
        message: 'Verification code sent successfully',
        status: message.status,
        phone: formattedPhone
      };

    } catch (error) {
      logger.error(`Failed to send SMS to ${phone}:`, error.message);
      
      return {
        success: false,
        message: 'Failed to send verification code',
        error: error.message
      };
    }
  }

  /**
   * Send SMS verification code (tries messaging first, falls back to Verify API)
   */
  async sendVerificationCode(phone) {
    // If phone number is configured, use regular messaging
    if (this.phoneNumber) {
      return this.sendVerificationCodeMessaging(phone);
    }
    
    // Otherwise use Verify API
    try {
      if (!this.client || !this.verifyServiceSid) {
        throw new Error('Twilio service not configured');
      }

      // Format phone number
      const formattedPhone = this.formatPhoneNumber(phone);
      
      // Validate it's an Icelandic number
      if (!formattedPhone.startsWith('+354')) {
        throw new Error('Only Icelandic phone numbers are supported');
      }

      const verification = await this.client.verify.v2
        .services(this.verifyServiceSid)
        .verifications
        .create({
          to: formattedPhone,
          channel: 'sms'
        });

      logger.info(`SMS verification code sent to ${formattedPhone}, Status: ${verification.status}`);

      return {
        success: true,
        message: 'Verification code sent successfully',
        status: verification.status,
        phone: formattedPhone
      };

    } catch (error) {
      logger.error(`Failed to send SMS verification to ${phone}:`, error.message);
      
      // Handle specific Twilio errors
      if (error.code === 60203) {
        return {
          success: false,
          message: 'Maximum verification attempts reached. Please try again later.',
          error: 'max_attempts_reached'
        };
      }
      
      if (error.code === 60033) {
        return {
          success: false,
          message: 'Invalid phone number format.',
          error: 'invalid_phone_number'
        };
      }

      return {
        success: false,
        message: 'Failed to send verification code',
        error: error.message
      };
    }
  }

  /**
   * Clean up expired verification codes
   */
  cleanupExpiredCodes() {
    const now = Date.now();
    for (const [phone, data] of this.verificationCodes.entries()) {
      if (data.expiresAt < now) {
        this.verificationCodes.delete(phone);
      }
    }
  }

  /**
   * Verify SMS verification code
   */
  async verifyCode(phone, code) {
    // Format phone number
    const formattedPhone = this.formatPhoneNumber(phone);
    
    // If using messaging-based verification
    if (this.phoneNumber && this.verificationCodes.has(formattedPhone)) {
      const storedData = this.verificationCodes.get(formattedPhone);
      const now = Date.now();
      
      // Check if expired
      if (storedData.expiresAt < now) {
        this.verificationCodes.delete(formattedPhone);
        return {
          success: true,
          valid: false,
          message: 'Verification code expired'
        };
      }
      
      // Check if code matches
      const isValid = storedData.code === code.trim();
      
      // Remove code after verification (can only use once)
      if (isValid) {
        this.verificationCodes.delete(formattedPhone);
      }
      
      logger.info(`SMS verification check for ${formattedPhone}: ${isValid ? 'approved' : 'denied'}`);
      
      return {
        success: true,
        valid: isValid,
        message: isValid ? 'Code verified successfully' : 'Invalid verification code'
      };
    }
    
    // Otherwise use Verify API
    try {
      if (!this.client || !this.verifyServiceSid) {
        throw new Error('Twilio service not configured');
      }

      const verificationCheck = await this.client.verify.v2
        .services(this.verifyServiceSid)
        .verificationChecks
        .create({
          to: formattedPhone,
          code: code.trim()
        });

      const isValid = verificationCheck.status === 'approved';

      logger.info(`SMS verification check for ${formattedPhone}: ${verificationCheck.status}`);

      return {
        success: true,
        valid: isValid,
        message: isValid ? 'Code verified successfully' : 'Invalid verification code',
        status: verificationCheck.status
      };

    } catch (error) {
      logger.error(`Failed to verify SMS code for ${phone}:`, error.message);
      
      // Handle specific Twilio errors
      if (error.code === 20404) {
        return {
          success: true,
          valid: false,
          message: 'Verification code not found or expired'
        };
      }

      return {
        success: false,
        message: 'Failed to verify code',
        error: error.message
      };
    }
  }

  /**
   * Get verification service details for debugging
   */
  async getServiceInfo() {
    try {
      if (!this.client || !this.verifyServiceSid) {
        return {
          configured: false,
          error: 'Twilio service not configured'
        };
      }

      const service = await this.client.verify.v2
        .services(this.verifyServiceSid)
        .fetch();

      return {
        configured: true,
        serviceName: service.friendlyName,
        serviceSid: service.sid,
        codeLength: service.codeLength,
        lookupEnabled: service.lookupEnabled
      };

    } catch (error) {
      logger.error('Failed to get Twilio service info:', error.message);
      return {
        configured: false,
        error: error.message
      };
    }
  }
}

module.exports = new TwilioService();