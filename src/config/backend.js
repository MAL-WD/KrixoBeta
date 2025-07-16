// Backend Configuration
// Update this URL to match your backend server address
export const BACKEND_CONFIG = {
  // Development - Use Vite proxy
  development: {
    baseURL: '', // Empty for Vite proxy to work
    timeout: 10000,
  },
  
  // Production - Use full backend URL
  production: {
    baseURL: 'https://gokrixo.onrender.com',
    timeout: 10000,
  },
  
  // Test
  test: {
    baseURL: 'https://gokrixo.onrender.com',
    timeout: 5000,
  }
};

// Get current environment - simplified for browser compatibility
const getEnvironment = () => {
  // Check if we're in production (deployed)
  if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return 'production';
  }
  return 'development';
};

// Export current config
export const currentConfig = BACKEND_CONFIG[getEnvironment()];

// Test backend connectivity
export const testBackendConnection = async () => {
  try {
    // Determine the test URL based on environment
    const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const testUrl = isDevelopment ? '/api/GetCommands' : `${currentConfig.baseURL}/GetCommands`;
    
    console.log('🔍 Testing backend connection to:', testUrl);
    console.log('🔍 Environment:', isDevelopment ? 'development' : 'production');
    
    // Test with a simple GET request
    const response = await fetch(testUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': window.location.origin,
      },
      mode: isDevelopment ? 'same-origin' : 'cors', // Use same-origin for development
    });
    
    console.log('🔍 Backend test response status:', response.status);
    console.log('🔍 Backend test response headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const data = await response.text();
      console.log('🔍 Backend test successful, response length:', data.length);
      return { success: true, status: response.status };
    } else {
      const errorText = await response.text();
      console.log('🔍 Backend test failed:', errorText);
      return { success: false, status: response.status, error: errorText };
    }
  } catch (error) {
    console.log('🔍 Backend test error:', error);
    console.log('🔍 Error type:', error.name);
    console.log('🔍 Error message:', error.message);
    
    // Check if it's a CORS error
    if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
      console.log('🔍 This appears to be a CORS issue');
      return { 
        success: false, 
        error: 'CORS Error: Backend is not allowing requests from this origin. Check CORS configuration.',
        details: error.message 
      };
    }
    
    return { success: false, error: error.message };
  }
};

// API Endpoints
export const API_ENDPOINTS = {
  // Commands
  CREATE_COMMAND: '/CreateCommand',
  GET_COMMANDS: '/GetCommands',
  
  // Workers
  CREATE_WORKER: '/CreateWorker',
  GET_WORKERS: '/GetWorkers',
  
  // Authentication
  REGISTRATION: '/Regestration',
  LOGIN: '/login',
  GET_ACCOUNT: '/account',
  
  // Health check
  HEALTH: '/health',
};

// Backend setup instructions:
/*
1. Make sure your backend server is running on the correct port
2. Update the baseURL in this file to match your backend URL
3. Ensure CORS is properly configured on your backend
4. Test the connection using the /api-test route

Backend CORS configuration example (Node.js/Express):
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true
}));

Backend CORS configuration example (Python/Flask):
from flask_cors import CORS
CORS(app, origins=['http://localhost:5173'])

Backend CORS configuration example (Python/Django):
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]
*/ 