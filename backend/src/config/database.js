const { createClient } = require('@supabase/supabase-js');
const logger = require('../utils/logger');

let supabase = null;

// Initialize Supabase client
function initSupabase() {
  if (!supabase) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase configuration. Please check SUPABASE_URL and SUPABASE_ANON_KEY environment variables.');
    }

    supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      },
      global: {
        headers: {
          'x-my-custom-header': 'kaggi-backend-nodejs'
        }
      }
    });

    logger.info('Supabase client initialized');
  }
  
  return supabase;
}

// Test database connection
async function connectSupabase() {
  try {
    const client = initSupabase();
    
    // Test connection by querying a simple table or making a basic request
    const { data, error } = await client.from('_dummy_').select('*').limit(1);
    
    // We expect this to fail for a non-existent table, but it means connection works
    if (error && !error.message.includes('relation "_dummy_" does not exist')) {
      throw error;
    }
    
    logger.info('Supabase connection test successful');
    return client;
  } catch (error) {
    logger.error('Supabase connection failed:', error.message);
    
    // Don't fail startup if Supabase is unavailable - we'll handle gracefully
    logger.warn('Running with limited Supabase connectivity - using graceful degradation');
    return initSupabase(); // Return client anyway for graceful degradation
  }
}

// Get Supabase client instance
function getSupabase() {
  if (!supabase) {
    return initSupabase();
  }
  return supabase;
}

module.exports = {
  connectSupabase,
  getSupabase,
  initSupabase
};