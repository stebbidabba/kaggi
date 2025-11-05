const { getSupabase } = require('../config/database');
const logger = require('../utils/logger');
const { v4: uuidv4 } = require('uuid');

class SupabaseService {
  constructor() {
    this.supabase = null;
  }

  /**
   * Initialize Supabase client
   */
  getClient() {
    if (!this.supabase) {
      this.supabase = getSupabase();
    }
    return this.supabase;
  }

  /**
   * Register a new car in the Bílar table
   */
  async registerCar(carData) {
    try {
      const client = this.getClient();
      
      const carRecord = {
        id: uuidv4(),
        seller_name: carData.seller_name,
        email: carData.email,
        phone: carData.phone || null,
        postal_code: carData.postal_code || null,
        car_make: carData.car_make,
        car_model: carData.car_model,
        car_plate: carData.car_plate.toUpperCase(),
        year: carData.year,
        mileage: carData.mileage || null,
        status: carData.status || 'active',
        created_at: new Date().toISOString()
      };

      const { data, error } = await client
        .from('bilar')
        .insert([carRecord])
        .select()
        .single();

      if (error) {
        throw error;
      }

      logger.info(`Car registered successfully: ${carRecord.id} - ${carRecord.car_plate}`);
      return {
        success: true,
        message: 'Car registered successfully',
        car_id: data.id,
        car: data
      };

    } catch (error) {
      logger.error('Failed to register car:', error.message);
      return {
        success: false,
        message: 'Failed to register car',
        error: error.message
      };
    }
  }

  /**
   * Get all cars
   */
  async getAllCars() {
    try {
      const client = this.getClient();

      const { data, error } = await client
        .from('bilar')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return {
        success: true,
        cars: data || [],
        message: 'Cars retrieved successfully'
      };

    } catch (error) {
      logger.error('Failed to get cars:', error.message);
      return {
        success: false,
        cars: [],
        message: 'Failed to retrieve cars',
        error: error.message
      };
    }
  }

  /**
   * Get a specific car by ID
   */
  async getCarById(carId) {
    try {
      const client = this.getClient();

      const { data, error } = await client
        .from('bilar')
        .select('*')
        .eq('id', carId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return {
            success: false,
            message: 'Car not found'
          };
        }
        throw error;
      }

      return {
        success: true,
        car: data,
        message: 'Car retrieved successfully'
      };

    } catch (error) {
      logger.error(`Failed to get car ${carId}:`, error.message);
      return {
        success: false,
        message: 'Failed to retrieve car',
        error: error.message
      };
    }
  }

  /**
   * Update car status
   */
  async updateCarStatus(carId, status) {
    try {
      const client = this.getClient();

      // Validate status
      const validStatuses = ['active', 'pending', 'sold'];
      if (!validStatuses.includes(status)) {
        return {
          success: false,
          message: 'Invalid status. Must be: active, pending, or sold'
        };
      }

      const { data, error } = await client
        .from('bilar')
        .update({ status })
        .eq('id', carId)
        .select()
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return {
            success: false,
            message: 'Car not found'
          };
        }
        throw error;
      }

      logger.info(`Car status updated: ${carId} -> ${status}`);
      return {
        success: true,
        message: 'Car status updated successfully',
        car: data
      };

    } catch (error) {
      logger.error(`Failed to update car status ${carId}:`, error.message);
      return {
        success: false,
        message: 'Failed to update car status',
        error: error.message
      };
    }
  }

  /**
   * Create a new bid
   */
  async createBid(bidData) {
    try {
      const client = this.getClient();

      const bidRecord = {
        id: uuidv4(),
        car_id: bidData.car_id,
        dealer_name: bidData.dealer_name,
        dealer_email: bidData.dealer_email,
        bid_amount: bidData.bid_amount,
        created_at: new Date().toISOString()
      };

      const { data, error } = await client
        .from('uppbod')
        .insert([bidRecord])
        .select()
        .single();

      if (error) {
        throw error;
      }

      logger.info(`Bid created successfully: ${data.id} - ${data.bid_amount} for car ${data.car_id}`);
      return {
        success: true,
        message: 'Bid created successfully',
        bid_id: data.id,
        bid: data
      };

    } catch (error) {
      logger.error('Failed to create bid:', error.message);
      return {
        success: false,
        message: 'Failed to create bid',
        error: error.message
      };
    }
  }

  /**
   * Get bids for a specific car
   */
  async getBidsForCar(carId) {
    try {
      const client = this.getClient();

      const { data, error } = await client
        .from('uppbod')
        .select('*')
        .eq('car_id', carId)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return {
        success: true,
        bids: data || [],
        message: 'Bids retrieved successfully'
      };

    } catch (error) {
      logger.error(`Failed to get bids for car ${carId}:`, error.message);
      return {
        success: false,
        bids: [],
        message: 'Failed to retrieve bids',
        error: error.message
      };
    }
  }

  /**
   * Get bids by dealer email
   */
  async getBidsByDealer(dealerEmail) {
    try {
      const client = this.getClient();

      const { data, error } = await client
        .from('uppbod')
        .select(`
          *,
          bilar:car_id (
            id,
            car_make,
            car_model,
            car_plate,
            year,
            status
          )
        `)
        .eq('dealer_email', dealerEmail)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Transform the data to include car information
      const transformedBids = (data || []).map(bid => ({
        ...bid,
        car: bid.bilar
      }));

      return {
        success: true,
        bids: transformedBids,
        message: 'Dealer bids retrieved successfully'
      };

    } catch (error) {
      logger.error(`Failed to get bids for dealer ${dealerEmail}:`, error.message);
      return {
        success: false,
        bids: [],
        message: 'Failed to retrieve dealer bids',
        error: error.message
      };
    }
  }

  /**
   * Add car to favorites
   */
  async addToFavorites(carId, dealerEmail) {
    try {
      const client = this.getClient();

      const favoriteRecord = {
        id: uuidv4(),
        car_id: carId,
        dealer_email: dealerEmail,
        created_at: new Date().toISOString()
      };

      const { data, error } = await client
        .from('favorites')
        .insert([favoriteRecord])
        .select()
        .single();

      if (error) {
        // Handle duplicate favorites
        if (error.code === '23505') {
          return {
            success: true,
            message: 'Car already in favorites'
          };
        }
        throw error;
      }

      logger.info(`Car ${carId} added to favorites by ${dealerEmail}`);
      return {
        success: true,
        message: 'Car added to favorites successfully',
        favorite: data
      };

    } catch (error) {
      logger.error(`Failed to add car ${carId} to favorites:`, error.message);
      return {
        success: false,
        message: 'Failed to add to favorites',
        error: error.message
      };
    }
  }

  /**
   * Remove car from favorites
   */
  async removeFromFavorites(carId, dealerEmail) {
    try {
      const client = this.getClient();

      const { data, error } = await client
        .from('favorites')
        .delete()
        .eq('car_id', carId)
        .eq('dealer_email', dealerEmail)
        .select();

      if (error) {
        throw error;
      }

      if (!data || data.length === 0) {
        return {
          success: false,
          message: 'Favorite not found'
        };
      }

      logger.info(`Car ${carId} removed from favorites by ${dealerEmail}`);
      return {
        success: true,
        message: 'Car removed from favorites successfully'
      };

    } catch (error) {
      logger.error(`Failed to remove car ${carId} from favorites:`, error.message);
      return {
        success: false,
        message: 'Failed to remove from favorites',
        error: error.message
      };
    }
  }

  /**
   * Get favorites for a dealer
   */
  async getFavorites(dealerEmail) {
    try {
      const client = this.getClient();

      const { data, error } = await client
        .from('favorites')
        .select(`
          *,
          bilar:car_id (
            id,
            car_make,
            car_model,
            car_plate,
            year,
            mileage,
            status,
            created_at
          )
        `)
        .eq('dealer_email', dealerEmail)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Transform the data to include car information
      const transformedFavorites = (data || []).map(favorite => ({
        ...favorite,
        car: favorite.bilar
      }));

      return {
        success: true,
        favorites: transformedFavorites,
        message: 'Favorites retrieved successfully'
      };

    } catch (error) {
      logger.error(`Failed to get favorites for dealer ${dealerEmail}:`, error.message);
      return {
        success: false,
        favorites: [],
        message: 'Failed to retrieve favorites',
        error: error.message
      };
    }
  }

  /**
   * Get dashboard statistics for a dealer
   */
  async getDashboardStats(dealerEmail) {
    try {
      const client = this.getClient();

      // Get active auctions count (cars that are active)
      let activeAuctions = 0;
      try {
        const { count: activeCount } = await client
          .from('bilar')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'active');
        activeAuctions = activeCount || 0;
      } catch (err) {
        logger.warn('Could not get active auctions count:', err.message);
      }

      // Get coming cars count (cars that are pending)
      let comingCars = 0;
      try {
        const { count: pendingCount } = await client
          .from('bilar')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending');
        comingCars = pendingCount || 0;
      } catch (err) {
        logger.warn('Could not get coming cars count:', err.message);
      }

      // Get my bids count
      let myBids = 0;
      try {
        const { count: bidsCount } = await client
          .from('uppbod')
          .select('*', { count: 'exact', head: true })
          .eq('dealer_email', dealerEmail);
        myBids = bidsCount || 0;
      } catch (err) {
        logger.warn('Could not get bids count:', err.message);
      }

      // Get favorites count
      let favorites = 0;
      try {
        const { count: favCount } = await client
          .from('favorites')
          .select('*', { count: 'exact', head: true })
          .eq('dealer_email', dealerEmail);
        favorites = favCount || 0;
      } catch (err) {
        logger.warn('Could not get favorites count:', err.message);
      }

      // Get my purchases count (bids on sold cars)
      let myPurchases = 0;
      try {
        const { data: purchaseData } = await client
          .from('uppbod')
          .select(`
            id,
            bilar:car_id (status)
          `)
          .eq('dealer_email', dealerEmail);

        if (purchaseData) {
          myPurchases = purchaseData.filter(bid => bid.bilar?.status === 'sold').length;
        }
      } catch (err) {
        logger.warn('Could not get purchases count:', err.message);
      }

      const stats = {
        active_auctions: activeAuctions,
        coming_cars: comingCars,
        my_bids: myBids,
        favorites: favorites,
        my_purchases: myPurchases,
        // Keep old format for backwards compatibility
        active: activeAuctions,
        pending: comingCars,
        sold: myPurchases,
        total: activeAuctions + comingCars + myPurchases
      };

      return {
        success: true,
        stats,
        message: 'Dashboard stats retrieved successfully'
      };

    } catch (error) {
      logger.error(`Failed to get dashboard stats for dealer ${dealerEmail}:`, error.message);
      return {
        success: false,
        stats: { 
          active_auctions: 0,
          coming_cars: 0,
          my_bids: 0,
          favorites: 0,
          my_purchases: 0,
          active: 0, 
          pending: 0, 
          sold: 0, 
          total: 0 
        },
        message: 'Failed to retrieve dashboard stats',
        error: error.message
      };
    }
  }

  /**
   * Register a dealer in the fyrir_bilasala table
   */
  async registerDealer(dealerData) {
    try {
      const client = this.getClient();
      
      const dealerRecord = {
        id: uuidv4(),
        first_name: dealerData.firstName,
        surname: dealerData.surname,
        organization_number: dealerData.organizationNumber,
        dealer_name: dealerData.dealerName,
        email: dealerData.email,
        mobile_number: dealerData.mobileNumber,
        street_address: dealerData.streetAddress,
        postal_code: dealerData.postalCode,
        city: dealerData.city,
        car_id: dealerData.carId,
        created_at: new Date().toISOString()
      };

      const { data, error } = await client
        .from('fyrir_bilasala')
        .insert([dealerRecord])
        .select()
        .single();

      if (error) {
        throw error;
      }

      logger.info(`Dealer registered successfully: ${dealerRecord.id} - ${dealerRecord.dealer_name}`);
      return {
        success: true,
        message: 'Dealer registered successfully',
        dealer_id: data.id,
        dealer: data
      };

    } catch (error) {
      logger.error('Failed to register dealer:', error.message);
      return {
        success: false,
        message: 'Failed to register dealer',
        error: error.message
      };
    }
  }

  /**
   * Get dealer registrations
   */
  async getDealerRegistrations() {
    try {
      const client = this.getClient();

      const { data, error } = await client
        .from('fyrir_bilasala')
        .select(`
          *,
          bilar:car_id (
            id,
            car_make,
            car_model,
            car_plate,
            year,
            mileage,
            status,
            created_at
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return {
        success: true,
        dealers: data || [],
        message: 'Dealer registrations retrieved successfully'
      };

    } catch (error) {
      logger.error('Failed to get dealer registrations:', error.message);
      return {
        success: false,
        dealers: [],
        message: 'Failed to retrieve dealer registrations',
        error: error.message
      };
    }
  }

  /**
   * Test database connection
   */
  async testConnection() {
    try {
      const client = this.getClient();
      
      const { data, error } = await client
        .from('bilar')
        .select('count', { count: 'exact' })
        .limit(1);

      if (error) {
        throw error;
      }

      return {
        success: true,
        message: 'Database connection successful',
        recordCount: data?.length || 0
      };

    } catch (error) {
      logger.error('Database connection test failed:', error.message);
      return {
        success: false,
        message: 'Database connection failed',
        error: error.message
      };
    }
  }
}

module.exports = new SupabaseService();