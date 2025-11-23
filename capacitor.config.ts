import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.nycride.app',
  appName: 'NYCRide',
  webDir: 'out',
  server: {
    url: 'http://10.0.2.2:3000', // Android emulator localhost
    cleartext: true
  }
};

export default config;
