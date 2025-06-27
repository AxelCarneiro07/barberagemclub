/**
 * Frontend configuration for API URLs
 * This file centralizes all API endpoints and environment-specific settings
 */

// Helper to determine if we're running on a production domain
const isProduction = () => {
  return !window.location.hostname.includes('localhost') && 
         !window.location.hostname.includes('127.0.0.1');
};

// Base API URL - automatically uses relative path in production
const getBaseUrl = () => {
  return isProduction() ? '' : 'http://localhost:3000';
};

// API endpoints
const API = {
  base: getBaseUrl(),
  login: `${getBaseUrl()}/login`,
  cadastro: `${getBaseUrl()}/cadastro`,
  verificarAuth: `${getBaseUrl()}/verificar-auth`,
  promoverAdmin: `${getBaseUrl()}/promover-admin`,
};

// Export config object
window.AppConfig = {
  API,
  isProduction: isProduction()
};

// Log configuration in development
if (!isProduction()) {
  console.log('🔧 App running in development mode');
  console.log('📡 API endpoints:', API);
}