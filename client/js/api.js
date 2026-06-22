/* ============================================================
   SocialConnect — Central API Client
   ============================================================ */

const API_BASE_URL = window.location.port === '3000' ? '/api' : 'http://localhost:3000/api';

const api = {
  // Get Auth Token
  getToken() {
    return localStorage.getItem('token');
  },

  // Set Auth Token
  setToken(token) {
    localStorage.setItem('token', token);
  },

  // Clear Auth Token & User data
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
  },

  // Get current user details
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Set current user details
  setCurrentUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  },

  // Perform HTTP request
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // Set headers
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);
      
      let data = {};
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = { error: text || `HTTP error ${response.status}` };
      }

      if (!response.ok) {
        // If unauthorized or token expired, force logout
        if (response.status === 401 && !url.includes('/auth/login') && !url.includes('/auth/register')) {
          this.logout();
        }
        throw new Error(data.error || 'Something went wrong');
      }

      return data;
    } catch (err) {
      console.error(`API Error on ${url}:`, err.message);
      throw err;
    }
  },

  // GET Request helper
  get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  },

  // POST Request helper
  post(endpoint, body) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body)
    });
  },

  // PUT Request helper
  put(endpoint, body) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body)
    });
  },

  // DELETE Request helper
  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
};
