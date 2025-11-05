import os
from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException

class TwilioService:
    def __init__(self):
        self.account_sid = os.getenv("TWILIO_ACCOUNT_SID")
        self.auth_token = os.getenv("TWILIO_AUTH_TOKEN")
        self.verify_service_sid = os.getenv("TWILIO_VERIFY_SERVICE_SID")
        self.client = Client(self.account_sid, self.auth_token)
    
    async def send_verification_code(self, phone_number: str) -> dict:
        """
        Send verification code to phone number
        """
        try:
            # Ensure phone number is in E.164 format
            if not phone_number.startswith('+'):
                # If phone number doesn't have country code, assume Iceland (+354)
                if phone_number.startswith('354'):
                    phone_number = '+' + phone_number
                else:
                    phone_number = '+354' + phone_number
            
            verification = self.client.verify.v2.services(self.verify_service_sid)\
                .verifications.create(to=phone_number, channel='sms')
            
            return {
                "success": True,
                "status": verification.status,
                "sid": verification.sid
            }
        except TwilioRestException as e:
            return {
                "success": False,
                "error": str(e),
                "error_code": e.code
            }
        except Exception as e:
            return {
                "success": False,
                "error": f"Unexpected error: {str(e)}"
            }
    
    async def verify_code(self, phone_number: str, code: str) -> dict:
        """
        Verify the code sent to phone number
        """
        try:
            # Ensure phone number is in E.164 format
            if not phone_number.startswith('+'):
                # If phone number doesn't have country code, assume Iceland (+354)
                if phone_number.startswith('354'):
                    phone_number = '+' + phone_number
                else:
                    phone_number = '+354' + phone_number
            
            verification_check = self.client.verify.v2.services(self.verify_service_sid)\
                .verification_checks.create(to=phone_number, code=code)
            
            return {
                "success": True,
                "valid": verification_check.status == "approved",
                "status": verification_check.status
            }
        except TwilioRestException as e:
            return {
                "success": False,
                "valid": False,
                "error": str(e),
                "error_code": e.code
            }
        except Exception as e:
            return {
                "success": False,
                "valid": False,
                "error": f"Unexpected error: {str(e)}"
            }