import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'homematic.mobile.app',
  appName: 'app',
  webDir: 'www',
  server: {
    androidScheme: 'http',
    iosScheme: 'http'
  }
};

export default config;
