// Central API Configuration
// Production mein yeh Vercel ke Environment Variables (VITE_API_URL) se aayega,
// aur Local machine par default 'http://localhost:5000' use karega.
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
