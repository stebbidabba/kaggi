import os
import logging
from typing import Optional
import sib_api_v3_sdk
from sib_api_v3_sdk.rest import ApiException

logger = logging.getLogger(__name__)

class BrevoEmailService:
    def __init__(self):
        """Initialize Brevo email service with API configuration"""
        try:
            self.configuration = sib_api_v3_sdk.Configuration()
            self.api_key = os.getenv('BREVO_API_KEY')
            
            if not self.api_key:
                raise ValueError("BREVO_API_KEY environment variable is required")
            
            self.configuration.api_key['api-key'] = self.api_key
            self.api_instance = sib_api_v3_sdk.TransactionalEmailsApi(
                sib_api_v3_sdk.ApiClient(self.configuration)
            )
            self.contacts_api = sib_api_v3_sdk.ContactsApi(
                sib_api_v3_sdk.ApiClient(self.configuration)
            )
            
            self.sender_email = os.getenv('BREVO_SENDER_EMAIL', 'noreply@kaggi.is')
            
            logger.info("Brevo email service initialized successfully")
            
        except Exception as e:
            logger.error(f"Failed to initialize Brevo email service: {str(e)}")
            raise
    
    async def add_contact_to_list(
        self,
        recipient_email: str,
        recipient_name: str,
        phone_number: Optional[str] = None,
        list_id: int = 3  # "Kaggi - #3" list
    ) -> bool:
        """
        Add contact to specific Brevo list which triggers automation workflow
        
        Args:
            recipient_email: The user's email address
            recipient_name: The user's full name
            phone_number: The user's phone number (optional)
            list_id: Brevo list ID (3 for "Kaggi - #3")
            
        Returns:
            bool: True if contact was added successfully, False otherwise
        """
        try:
            # Create contact attributes
            attributes = {
                "FIRSTNAME": recipient_name.split()[0] if recipient_name else "Friend",
                "LASTNAME": " ".join(recipient_name.split()[1:]) if len(recipient_name.split()) > 1 else "",
            }
            
            # Only add phone if it's properly formatted
            if phone_number:
                # Clean and format phone number for Brevo (expects international format)
                cleaned_phone = phone_number.replace(" ", "").replace("-", "").replace("(", "").replace(")", "")
                
                # If it doesn't start with +, assume it's Icelandic and add +354
                if not cleaned_phone.startswith("+"):
                    if len(cleaned_phone) == 7 and cleaned_phone.isdigit():
                        cleaned_phone = "+354" + cleaned_phone
                    elif cleaned_phone.startswith("354") and len(cleaned_phone) == 10:
                        cleaned_phone = "+" + cleaned_phone
                    elif len(cleaned_phone) >= 10:
                        # Could be international without +, add it
                        cleaned_phone = "+" + cleaned_phone
                
                # Only add if it looks like a valid international number
                if len(cleaned_phone) >= 8 and cleaned_phone.startswith("+"):
                    attributes["SMS"] = cleaned_phone
                else:
                    logger.warning(f"Skipping invalid phone number format: {phone_number}")
            
            
            # Create contact object for list addition
            create_contact = sib_api_v3_sdk.CreateContact(
                email=recipient_email,
                attributes=attributes,
                list_ids=[list_id],
                update_enabled=True  # Update if contact already exists
            )
            
            # Add contact to list
            api_response = self.contacts_api.create_contact(create_contact)
            logger.info(f"Contact {recipient_email} added to list {list_id}. This should trigger automation workflow ID 2")
            return True
            
        except ApiException as e:
            logger.error(f"Brevo API exception when adding contact to list {list_id}: {str(e)}")
            logger.error(f"Response body: {e.body if hasattr(e, 'body') else 'N/A'}")
            return False
        except Exception as e:
            logger.error(f"Unexpected error adding contact to list: {str(e)}")
            return False

    async def send_welcome_email(
        self,
        recipient_email: str,
        recipient_name: str,
        phone_number: Optional[str] = None
    ) -> bool:
        """
        Send welcome email using your custom 'email message #2' template
        
        Args:
            recipient_email: The user's email address
            recipient_name: The user's full name
            phone_number: The user's phone number (optional)
            
        Returns:
            bool: True if email was sent successfully, False otherwise
        """
        try:
            # Create email object with YOUR template #2
            send_smtp_email = sib_api_v3_sdk.SendSmtpEmail(
                to=[{"email": recipient_email, "name": recipient_name}],
                sender={"name": "Kaggi", "email": self.sender_email},
                subject="Bílinn þinn er skráður hjá Kaggi",  # Custom subject
                template_id=2,  # YOUR email message #2 template
                params={
                    "FIRSTNAME": recipient_name.split()[0] if recipient_name else "Friend",
                    "FULLNAME": recipient_name,
                    "PHONE": phone_number or "Not provided",
                    "EMAIL": recipient_email
                }
            )
            
            # Send the email
            api_response = self.api_instance.send_transac_email(send_smtp_email)
            logger.info(f"Welcome email sent successfully using template #2 to {recipient_email}. Message ID: {api_response.message_id}")
            return True
            
        except ApiException as e:
            logger.error(f"Brevo API exception when sending email to {recipient_email}: {str(e)}")
            logger.error(f"Response body: {e.body if hasattr(e, 'body') else 'N/A'}")
            return False
        except Exception as e:
            logger.error(f"Unexpected error sending email to {recipient_email}: {str(e)}")
            return False
    
    def test_api_connectivity(self) -> bool:
        """
        Test API connectivity and configuration
        
        Returns:
            bool: True if API is accessible, False otherwise
        """
        try:
            # Test API connectivity by getting account info
            account_api = sib_api_v3_sdk.AccountApi(
                sib_api_v3_sdk.ApiClient(self.configuration)
            )
            account_info = account_api.get_account()
            logger.info(f"API connectivity test successful. Account: {account_info.company_name}")
            return True
            
        except ApiException as e:
            logger.error(f"API connectivity test failed: {str(e)}")
            return False
        except Exception as e:
            logger.error(f"Unexpected error during API connectivity test: {str(e)}")
            return False

    def list_all_contact_lists(self) -> dict:
        """
        List all contact lists to help debug which list triggers the automation
        
        Returns:
            dict: Information about all contact lists
        """
        try:
            # Get all contact lists
            lists_response = self.contacts_api.get_lists(limit=50)
            
            lists_info = []
            if hasattr(lists_response, 'lists') and lists_response.lists:
                for contact_list in lists_response.lists:
                    # Handle different response formats
                    if hasattr(contact_list, 'id'):
                        list_id = contact_list.id
                        list_name = getattr(contact_list, 'name', 'Unknown')
                        total_subscribers = getattr(contact_list, 'total_subscribers', 0)
                    else:
                        # If it's a dict format
                        list_id = contact_list.get('id', 'Unknown')
                        list_name = contact_list.get('name', 'Unknown')
                        total_subscribers = contact_list.get('total_subscribers', 0)
                    
                    lists_info.append({
                        "id": list_id,
                        "name": list_name,
                        "total_subscribers": total_subscribers
                    })
            
            logger.info(f"Found {len(lists_info)} contact lists:")
            for list_info in lists_info:
                logger.info(f"  - List ID {list_info['id']}: {list_info['name']} ({list_info['total_subscribers']} subscribers)")
            
            return {"success": True, "lists": lists_info}
            
        except ApiException as e:
            logger.error(f"Failed to get contact lists: {str(e)}")
            return {"success": False, "error": str(e)}
        except Exception as e:
            logger.error(f"Unexpected error getting contact lists: {str(e)}")
            return {"success": False, "error": str(e)}

# Global email service instance
brevo_service = None

def get_brevo_service() -> BrevoEmailService:
    """Get or create the global Brevo email service instance"""
    global brevo_service
    if brevo_service is None:
        brevo_service = BrevoEmailService()
    return brevo_service