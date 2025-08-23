import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.e451abfa8a654be89b7e9833dc1d75f6',
  appName: 'shreespice-kitchen-cart',
  webDir: 'dist',
  server: {
    url: 'https://e451abfa-8a65-4be8-9b7e-9833dc1d75f6.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      showSpinner: false,
      backgroundColor: "#ffffff"
    }
  }
};

export default config;