import { handleApiError } from '../utils/errorHandler';
import { currentConfig } from '../config/backend';
    
// Helper to get auth token
const getAuthToken = () => localStorage.getItem('authToken');

// Helper to build headers
const buildHeaders = (extra = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...extra,
  };
  const token = getAuthToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
};

// Helper to build full API URL
const buildApiUrl = (endpoint) => {
  return `${currentConfig.baseURL}${endpoint}`;
};

// Command API functions
export const commandAPI = {
  // Create a new command
  createCommand: async (commandData) => {
    try {
      const backendData = {
        fullname: commandData.fullname,
        number: commandData.number,
        flor: String(commandData.floor || commandData.isGroundOrFirst || ''),
        itemtype: commandData.itemType || '',
        service: Array.isArray(commandData.services) ? commandData.services.join(', ') : commandData.services,
        workers: commandData.workers.toString(),
        start: commandData.start,
        distination: commandData.end,
        prise: commandData.price.toString(),
        isaccepted: "false"
      };
      const res = await fetch(buildApiUrl('/CreateCommand'), {
        method: 'POST',
        headers: buildHeaders(),
        body: JSON.stringify(backendData),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    } catch (error) {
      const userMessage = handleApiError(error, 'CreateCommand');
      throw new Error(userMessage);
    }
  },

  // Get all commands using the configured base URL
  getCommands: async () => {
    try {
      const res = await fetch(buildApiUrl('/GetCommands'), {
        method: 'GET',
        headers: buildHeaders(),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      if (Array.isArray(data)) {
        data.forEach((command, index) => {
          console.log(`  Command ${index + 1}:`, {
            id: command.id,
            fullname: command.fullname,
            price: command.price,
            prise: command.prise,
            allFields: Object.keys(command),
            fullObject: command
          });
        });
      }
      return data;
    } catch (error) {
      const userMessage = handleApiError(error, 'GetCommands');
      throw new Error(userMessage);
    }
  },

  // Get all commands using the specific URL
  getCommandsDirect: async () => {
    try {
      const res = await fetch(buildApiUrl('/GetCommands'), {
        method: 'GET',
        headers: buildHeaders(),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      if (Array.isArray(data)) {
        data.forEach((command, index) => {
          console.log(`  Command ${index + 1}:`, {
            id: command.id,
            fullname: command.fullname,
            price: command.price,
            prise: command.prise,
            allFields: Object.keys(command),
            fullObject: command
          });
        });
      }
      return data;
    } catch (error) {
      const userMessage = handleApiError(error, 'GetCommandsDirect');
      throw new Error(userMessage);
    }
  },

  // Update command status (approve/reject)
  updateCommandStatus: async (commandId, status) => {
    try {
      const res = await fetch(buildApiUrl(`/commands/${commandId}/status`), {
        method: 'PUT',
        headers: buildHeaders(),
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    } catch (error) {
      const userMessage = handleApiError(error, 'UpdateCommandStatus');
      throw new Error(userMessage);
    }
  },

  // Delete command
  deleteCommand: async (commandId) => {
    try {
      const res = await fetch(buildApiUrl(`/commands/${commandId}`), {
        method: 'DELETE',
        headers: buildHeaders(),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    } catch (error) {
      const userMessage = handleApiError(error, 'DeleteCommand');
      throw new Error(userMessage);
    }
  },

  // Update command using fetch (matches working HTML example)
  updateCommand: async (commandData) => {
    const res = await fetch(buildApiUrl('/UpdateCommand'), {
      method: 'PUT',
      headers: buildHeaders(),
      body: JSON.stringify({
        ...commandData,
        isaccepted: typeof commandData.isaccepted === 'string' ? commandData.isaccepted : 'false',
      }),
    });
    if (!res.ok) throw new Error(await res.text());
    const text = await res.text();
    if (!text || text.trim() === '') {
      return { success: true, message: 'Command updated successfully' };
    }
    try {
      return JSON.parse(text);
    } catch (error) {
      return { success: true, message: 'Command updated successfully' };
    }
  }
};

// Worker API functions
export const workerAPI = {
  // Create a new worker registration
  createWorker: async (workerData) => {
    const backendData = {
      fullname: workerData.fullname, // <-- use fullname only
      number: workerData.number,
      email: workerData.email,
      password: workerData.password || "defaultPassword123!",
      position: workerData.position,
      experience: workerData.experience,
      message: workerData.message
      // isaccepted intentionally omitted to let backend set default
    };
    const jsonBody = JSON.stringify(backendData);
    
    const res = await fetch(buildApiUrl('/CreateWorker'), {
      method: 'POST',
      headers: buildHeaders(),
      body: jsonBody,
    });
    if (!res.ok) {
      const errorText = await res.text();
      console.log('🔍 Backend error response:', errorText);
      throw new Error(errorText);
    }
    const text = await res.text();
    
    if (!text || text.trim() === '') {
      console.log('🔍 Empty response from backend - worker might have been created successfully');
      console.log('🔍 Response status code:', res.status);
      console.log('🔍 Response headers:', Object.fromEntries(res.headers.entries()));
      return { success: true, message: 'Worker created successfully' };
    }
    
    try {
      const result = JSON.parse(text);
      return result;
    } catch (error) {
      console.log('🔍 Failed to parse response:', error);
      console.log('🔍 Raw text that failed to parse:', text);
      return { success: true, message: 'Worker created successfully' };
    }
  },

  // Get all workers using the configured base URL
  getWorkers: async () => {
    try {
      const res = await fetch(buildApiUrl('/GetWorkers'), {
        method: 'GET',
        headers: buildHeaders(),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    } catch (error) {
      const userMessage = handleApiError(error, 'GetWorkers');
      throw new Error(userMessage);
    }
  },

  // Get all workers using the specific URL
  getWorkersDirect: async () => {
    try {
      const res = await fetch(buildApiUrl('/GetWorkers'), {
        method: 'GET',
        headers: buildHeaders(),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      if (Array.isArray(data)) {
        data.forEach((worker, index) => {
          console.log(`  Worker ${index + 1}:`, {
            email: worker.email,
            // Check all possible name fields
            fillname: worker.fillname,
            fullname: worker.fullname,
            name: worker.name,
            fname: worker.fname,
            // Show all available fields
            allFields: Object.keys(worker),
            allNameFields: {
              fillname: worker.fillname,
              fullname: worker.fullname,
              name: worker.name,
              fname: worker.fname
            },
            isaccepted: worker.isaccepted,
            isacceptedType: typeof worker.isaccepted
          });
        });
      }
      return data;
    } catch (error) {
      const userMessage = handleApiError(error, 'GetWorkersDirect');
      throw new Error(userMessage);
    }
  },

  // Update worker status (approve/reject)
  updateWorkerStatus: async (workerId, status, password = null) => {
    try {
      const data = { status };
      if (password) data.password = password;
      const res = await fetch(buildApiUrl(`/workers/${workerId}/status`), {
        method: 'PUT',
        headers: buildHeaders(),
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    } catch (error) {
      const userMessage = handleApiError(error, 'UpdateWorkerStatus');
      throw new Error(userMessage);
    }
  },

  // Delete worker
  deleteWorker: async (workerId) => {
    try {
      const res = await fetch(buildApiUrl(`/workers/${workerId}`), {
        method: 'DELETE',
        headers: buildHeaders(),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    } catch (error) {
      const userMessage = handleApiError(error, 'DeleteWorker');
      throw new Error(userMessage);
    }
  },

  // Update worker using fetch (matches backend API specification)
  updateWorker: async (workerData) => {
    const updateData = {
      id: workerData.id,
      fullname: workerData.fullname || workerData.fillname, // <-- use fullname only
      number: workerData.number,
      email: workerData.email,
      password: workerData.password,
      position: workerData.position,
      experience: workerData.experience,
      message: workerData.message,
      isaccepted: workerData.isaccepted
    };
    const res = await fetch(buildApiUrl('/UpdateWorker'), {
      method: 'PUT',
      headers: buildHeaders(),
      body: JSON.stringify(updateData),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  // Get a single worker by ID using fetch (not axios)
  getWorkerById: async (workerId) => {
    const res = await fetch(buildApiUrl(`/worker/${workerId}`), {
      method: 'GET',
      headers: buildHeaders(),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  // Authenticate worker by email (no password check)
  authenticateWorker: async (email) => {
    // Get all workers
    const res = await fetch(buildApiUrl('/GetWorkers'), {
      method: 'GET',
      headers: buildHeaders(),
    });
    if (!res.ok) throw new Error(await res.text());
    const workers = await res.json();
    // Find worker by email
    const worker = Array.isArray(workers) 
      ? workers.find(w => w.email === email || w.email?.toLowerCase() === email.toLowerCase())
      : null;
    if (!worker) {
      throw new Error('البريد الإلكتروني غير موجود');
    }
    return worker;
  },

  // Check if worker with email already exists
  checkWorkerExists: async (email) => {
    const res = await fetch(buildApiUrl('/GetWorkers'), {
      method: 'GET',
      headers: buildHeaders(),
    });
    if (!res.ok) throw new Error(await res.text());
    const workers = await res.json();
    return Array.isArray(workers) 
      ? workers.some(w => w.email === email || w.email?.toLowerCase() === email.toLowerCase())
      : false;
  }
};

// User registration and authentication
export const authAPI = {
  // User registration using fetch (matches working HTML example)
  register: async (userData) => {
    const res = await fetch(buildApiUrl('/Regestration'), {
      method: 'POST',
      headers: buildHeaders(),
      body: JSON.stringify(userData),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  // Get account by ID
  getAccount: async (accountId) => {
    try {
      const res = await fetch(buildApiUrl(`/account/${accountId}`), {
        method: 'GET',
        headers: buildHeaders(),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    } catch (error) {
      const userMessage = handleApiError(error, 'GetAccount');
      throw new Error(userMessage);
    }
  },

  // Login (if you have a login endpoint)
  login: async (credentials) => {
    try {
      const res = await fetch(buildApiUrl('/Regestration'), {
        method: 'POST',
        headers: buildHeaders(),
        body: JSON.stringify(credentials),
      });
      if (!res.ok) throw new Error(await res.text());
      const result = await res.json();

      // This is the key check:
      if (result && result.id) {
        localStorage.setItem('authToken', `worker-${result.id}`);
        localStorage.setItem('workerData', JSON.stringify(result));
        return { success: true, worker: result };
      } else {
        throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      }
    } catch (error) {
      const userMessage = handleApiError(error, 'Login');
      throw new Error(userMessage);
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  }
};

// Test API connectivity
export const testAPI = {
  // Test if backend is reachable
  testConnection: async () => {
    try {
      const res = await fetch(buildApiUrl('/health'), {
        method: 'GET',
        headers: buildHeaders(),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        throw new Error('Network error: Backend server is not reachable. Check if the server is running and CORS is configured.');
      }
      throw new Error('Backend is not reachable');
    }
  },

  // Test specific endpoint
  testEndpoint: async (endpoint, method = 'GET', data = null) => {
    try {
      let res;
      if (method === 'GET') {
        res = await fetch(buildApiUrl(endpoint), {
          method: 'GET',
          headers: buildHeaders(),
        });
      } else if (method === 'POST') {
        res = await fetch(buildApiUrl(endpoint), {
          method: 'POST',
          headers: buildHeaders(),
          body: JSON.stringify(data),
        });
      }
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        throw new Error(`Network error: Cannot reach ${endpoint}. Check CORS configuration.`);
      }
      throw new Error(`Failed to test ${endpoint}: ${error.message}`);
    }
  }
};

// Test export to verify module loading
export const testExport = 'API module loaded successfully';

export default {};
