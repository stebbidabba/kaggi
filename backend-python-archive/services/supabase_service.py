import os
from dotenv import load_dotenv
from pathlib import Path
from supabase import create_client, Client
from typing import Dict, List, Optional, Any
import uuid
from datetime import datetime

# Load environment variables
ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / '.env')

class SupabaseService:
    def __init__(self):
        self.url = os.environ.get("SUPABASE_URL")
        self.key = os.environ.get("SUPABASE_ANON_KEY")
        self.supabase = None
        
        print(f"DEBUG: SUPABASE_URL = {self.url}")
        print(f"DEBUG: SUPABASE_ANON_KEY = {self.key[:20] if self.key else 'None'}...")
    
    def _get_client(self):
        if self.supabase is None:
            if not self.url or not self.key:
                raise ValueError(f"Missing Supabase credentials: URL={self.url}, KEY={'provided' if self.key else 'None'}")
            self.supabase = create_client(self.url, self.key)
        return self.supabase
    
    async def create_car(self, car_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Create a new car record in the 'Bílar' table
        """
        try:
            client = self._get_client()
            
            # Add UUID and timestamp
            car_record = {
                "id": str(uuid.uuid4()),
                "seller_name": f"{car_data.get('firstName', '')} {car_data.get('lastName', '')}".strip(),
                "email": car_data.get('email', ''),
                "phone": car_data.get('phone', ''),
                "postal_code": car_data.get('postalCode', ''),
                "car_make": car_data.get('carMake', ''),
                "car_model": car_data.get('carModel', ''),
                "car_plate": car_data.get('carPlate', ''),
                "year": car_data.get('year'),
                "mileage": car_data.get('mileage'),
                "status": "active",
                "created_at": datetime.utcnow().isoformat()
            }
            
            result = client.table("bilar").insert(car_record).execute()
            return result.data[0] if result.data else None
            
        except Exception as e:
            print(f"Error creating car record: {str(e)}")
            raise e
    
    async def get_all_cars(self) -> List[Dict[str, Any]]:
        """
        Get all cars from the 'Bílar' table
        """
        try:
            client = self._get_client()
            result = client.table("bilar").select("*").execute()
            return result.data
        except Exception as e:
            print(f"Error fetching cars: {str(e)}")
            raise e
    
    async def get_car_by_id(self, car_id: str) -> Optional[Dict[str, Any]]:
        """
        Get a specific car by ID
        """
        try:
            client = self._get_client()
            result = client.table("bilar").select("*").eq("id", car_id).execute()
            return result.data[0] if result.data else None
        except Exception as e:
            print(f"Error fetching car by ID: {str(e)}")
            raise e
    
    async def update_car_status(self, car_id: str, status: str) -> Dict[str, Any]:
        """
        Update car status (active, pending, sold)
        """
        try:
            client = self._get_client()
            result = client.table("bilar").update({"status": status}).eq("id", car_id).execute()
            return result.data[0] if result.data else None
        except Exception as e:
            print(f"Error updating car status: {str(e)}")
            raise e
    
    async def create_bid(self, bid_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Create a new bid in the 'uppboð' table
        """
        try:
            bid_record = {
                "id": str(uuid.uuid4()),
                "car_id": bid_data.get('car_id'),
                "dealer_name": bid_data.get('dealer_name'),
                "dealer_email": bid_data.get('dealer_email', ''),
                "bid_amount": bid_data.get('bid_amount'),
                "created_at": datetime.utcnow().isoformat()
            }
            
            client = self._get_client()
            result = client.table("fyrir_bílasala").insert(bid_record).execute()
            return result.data[0] if result.data else None
            
        except Exception as e:
            print(f"Error creating bid: {str(e)}")
            raise e
    
    async def get_bids_for_car(self, car_id: str) -> List[Dict[str, Any]]:
        """
        Get all bids for a specific car
        """
        try:
            client = self._get_client()
            result = client.table("fyrir_bílasala").select("*").eq("car_id", car_id).order("created_at", desc=True).execute()
            return result.data
        except Exception as e:
            print(f"Error fetching bids for car: {str(e)}")
            raise e
    
    async def get_dealer_bids(self, dealer_email: str) -> List[Dict[str, Any]]:
        """
        Get all bids made by a specific dealer
        """
        try:
            client = self._get_client()
            result = client.table("fyrir_bílasala").select("""
                *, 
                bilar(
                    id,
                    car_make,
                    car_model,
                    year,
                    car_plate,
                    status
                )
            """).eq("dealer_email", dealer_email).order("created_at", desc=True).execute()
            return result.data
        except Exception as e:
            print(f"Error fetching dealer bids: {str(e)}")
            raise e

# Global instance
supabase_service = SupabaseService()