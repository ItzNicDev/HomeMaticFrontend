import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'homematic.mobile.app',
  appName: 'app',
  webDir: 'www',
  server: {
    androidScheme: 'http'
  }
};

export default config;
