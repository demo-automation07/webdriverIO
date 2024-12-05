// Exporting the browser configuration as an object
import { getBrowserName } from '../test/utils/envParam.js';

export const browserConfig = {
    // Default browser name is 'chrome', but can be overridden by environment variable
    browserName: getBrowserName(), // If BROWSER_NAME is not set, default to chrome
    maxInstances: 1,
    windowSize: "1920,1080",
    chromeArgs: [
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--ignore-certificate-errors"
    ],
    firefoxArgs: [
      "--headless",
      "--disable-gpu",
      "--no-sandbox"
    ],
    firefoxPath:'C:\\Users\\kiruthika.k\\AppData\\Local\\Mozilla Firefox\\firefox.exe',
    edgeArgs: [
      "--headless",
      "--disable-gpu",
      "--no-sandbox",
    ],
    allInstances:10
  };