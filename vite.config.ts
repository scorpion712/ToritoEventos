import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();
 
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Configuración para cargar variables de entorno desde archivos .env
  define: {
    'import.meta.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
    'import.meta.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
    'import.meta.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
    'import.meta.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
    'import.meta.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
    'import.meta.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID),
    'import.meta.env.FIREBASE_MEASUREMENT_ID': JSON.stringify(process.env.FIREBASE_MEASUREMENT_ID),
  }
})