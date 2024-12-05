// Import the config object from conf.js
import { config as wdioconfig } from './wdio.conf.js';
import { deepmerge } from 'deepmerge-ts';
import { browserConfig } from './browserConfig.js';

export const config = deepmerge(wdioconfig.config, {
  ...wdioconfig,
  services: [
    'edgedriver'
    , 'geckodriver'
  ],
  capabilities: [
    {
      browserName: 'MicrosoftEdge',  // Set browserName to MicrosoftEdge
      maxInstances: 1,               // Number of instances to run in parallel
      'ms:edgeOptions': {
        args: ['--headless', '--disable-gpu'] // Run Edge in headless mode
      }
    },
    {
      browserName: 'firefox',
      maxInstances: 1,
      'moz:firefoxOptions': {
        args: ['--headless', '--disable-gpu'], // Additional Firefox options
        binary: browserConfig.firefoxPath
        // prefs: {
        //     'browser.download.folderList': 2,
        //     'browser.download.manager.showWhenStarting': false,
        //     'browser.download.dir': '/path/to/download/directory',
        //     'browser.helperApps.neverAsk.saveToDisk': 'application/pdf', // Disable download prompt for PDF files
        // }
      }
    }
  ],

}, { clone: false });

