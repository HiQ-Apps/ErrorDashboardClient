const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;
const API_URL = import.meta.env.VITE_API_URL;

if (!SECRET_KEY || !ENVIRONMENT || !API_URL) {
  throw new Error("Environment variables are not set.");
}

export { SECRET_KEY, ENVIRONMENT, API_URL };
