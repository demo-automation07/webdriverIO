// Import the config object from conf.js
import { config as wdioconfig } from './wdio.conf.js';
import { deepmerge } from 'deepmerge-ts';
import { browserConfig } from './configuration.js';

export const config = deepmerge(wdioconfig.config, {
  ...wdioconfig,
  services: [
    'chromedriver',
    'edgedriver'
    , 'geckodriver'
  ],
  maxInstances:browserConfig.allInstances,
  capabilities: [{
    maxInstances: browserConfig.maxInstances,
    browserName: browserConfig.browserName,
    'goog:chromeOptions': browserConfig.browserName === 'chrome' ? {
      args: browserConfig.chromeArgs.concat(`--window-size=${browserConfig.windowSize}`)
    } : undefined,
    'moz:firefoxOptions': browserConfig.browserName === 'firefox' ? {
      args: browserConfig.firefoxArgs.concat(`--width=${browserConfig.windowSize.split(',')[0]}`, `--height=${browserConfig.windowSize.split(',')[1]}`),
      binary: browserConfig.firefoxPath
    } : undefined,
    'ms:edgeOptions': browserConfig.browserName === 'MicrosoftEdge' ? {
      args: browserConfig.edgeArgs.concat(`--window-size=${browserConfig.windowSize}`)
    } : undefined
  }],
  

}, { clone: false });

