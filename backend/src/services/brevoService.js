const axios = require('axios');
const logger = require('../utils/logger');

class BrevoService {
  constructor() {
    this.apiKey = process.env.BREVO_API_KEY;
    this.senderEmail = process.env.BREVO_SENDER_EMAIL;
    this.baseURL = 'https://api.brevo.com/v3';
  }

  /**
   * Send welcome email using Brevo template
   */
  async sendWelcomeEmail(name, email, phone) {
    try {
      if (!this.apiKey) {
        throw new Error('Brevo API key not configured');
      }

      const headers = {
        'api-key': this.apiKey,
        'Content-Type': 'application/json'
      };

      // Use the Kaggi welcome message template (ID: 8)
      const emailData = {
        to: [{ email, name }],
        templateId: 8,
        params: {
          name: name,
          email: email,
          phone: phone || ''
        }
      };

      const response = await axios.post(`${this.baseURL}/smtp/email`, emailData, {
        headers,
        timeout: 10000
      });

      if (response.status === 201) {
        const messageId = response.data.messageId;
        logger.info(`Welcome email sent successfully to ${email} with Message ID: ${messageId}`);
        return {
          success: true,
          messageId,
          message: 'Welcome email sent successfully'
        };
      } else {
        throw new Error(`Email API returned status: ${response.status}`);
      }

    } catch (error) {
      logger.error(`Failed to send welcome email to ${email}:`, error.message);
      
      // Return error but don't fail the entire request
      return {
        success: false,
        message: 'Failed to send welcome email',
        error: error.message
      };
    }
  }

  /**
   * Add contact to Brevo list for automation workflows
   */
  async addToBrevoList(name, email, phone, listId = 3) {
    try {
      if (!this.apiKey) {
        throw new Error('Brevo API key not configured');
      }

      const headers = {
        'api-key': this.apiKey,
        'Content-Type': 'application/json'
      };

      const contactData = {
        email,
        attributes: {
          FIRSTNAME: name.split(' ')[0] || name,
          LASTNAME: name.split(' ').slice(1).join(' ') || '',
          SMS: phone || ''
        },
        listIds: [listId],
        updateEnabled: true
      };

      const response = await axios.post(`${this.baseURL}/contacts`, contactData, {
        headers,
        timeout: 10000
      });

      if (response.status === 201 || response.status === 204) {
        logger.info(`Contact ${email} added to Brevo list ${listId}. Automation workflow should be triggered.`);
        return {
          success: true,
          message: `Contact added to Kaggi list successfully. Your welcome message automation workflow should be triggered.`
        };
      } else {
        throw new Error(`Contact API returned status: ${response.status}`);
      }

    } catch (error) {
      // Handle specific Brevo errors
      if (error.response?.status === 400 && error.response?.data?.message?.includes('Contact already exist')) {
        logger.info(`Contact ${email} already exists in Brevo, updating...`);
        return {
          success: true,
          message: 'Contact updated successfully. Automation workflow should be triggered.'
        };
      }

      if (error.response?.status === 400 && error.response?.data?.message?.includes('duplicate')) {
        logger.warn(`Duplicate contact data for ${email}:`, error.response.data.message);
        return {
          success: false,
          message: 'Duplicate contact data. Please use unique phone number.',
          error: 'duplicate_contact'
        };
      }

      logger.error(`Failed to add contact ${email} to Brevo list:`, error.message);
      
      return {
        success: false,
        message: 'Failed to add contact to list',
        error: error.message
      };
    }
  }

  /**
   * Debug Brevo connection and list information
   */
  async debugBrevoConnection() {
    try {
      if (!this.apiKey) {
        return {
          connected: false,
          error: 'No API key configured'
        };
      }

      const headers = {
        'api-key': this.apiKey,
        'Content-Type': 'application/json'
      };

      // Test API connection by getting account info
      const accountResponse = await axios.get(`${this.baseURL}/account`, {
        headers,
        timeout: 5000
      });

      // Get lists information
      const listsResponse = await axios.get(`${this.baseURL}/contacts/lists`, {
        headers,
        timeout: 5000
      });

      return {
        connected: true,
        account: accountResponse.data,
        lists: listsResponse.data.lists
      };

    } catch (error) {
      logger.error('Brevo debug connection failed:', error.message);
      return {
        connected: false,
        error: error.message
      };
    }
  }

  /**
   * Test adding a contact with unique data
   */
  async testAddContact(email, name, phone) {
    try {
      // Add timestamp to make data unique
      const timestamp = Date.now();
      const uniqueEmail = email.includes('@') ? 
        email.replace('@', `+${timestamp}@`) : 
        `${email}+${timestamp}@example.com`;

      return await this.addToBrevoList(name, uniqueEmail, phone);

    } catch (error) {
      logger.error('Brevo test contact failed:', error.message);
      return {
        success: false,
        message: 'Test contact creation failed',
        error: error.message
      };
    }
  }
}

module.exports = new BrevoService();