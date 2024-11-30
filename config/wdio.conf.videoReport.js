// Import the config object from conf.js
import { config as wdioconfig } from './wdio.conf.js';
import { deepmerge } from 'deepmerge-ts';
const allure_directory = './report/allure-video';
import video from "wdio-video-reporter"
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const allure = require('allure-commandline');
export const config = deepmerge(wdioconfig.config, {
  ...wdioconfig,
  reporters: [
    ['video', {
      saveAllVideos: false,       // If true, also saves videos for successful test cases
      videoSlowdownMultiplier: 10, // Higher to get slower videos, lower for faster videos [Value 1-100]
    }],
    ['allure', {
      outputDir: allure_directory + '/allure-results',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
    }],
  ],
  onComplete: function (exitCode, config, capabilities, results) {

    const reportError = new Error('Could not generate Allure report');
    const generation = allure(['generate', allure_directory + '/allure-results', '--clean', '-o', allure_directory + '/allure-report']);

    return new Promise((resolve, reject) => {
        const generationTimeout = setTimeout(
            () => reject(reportError),
            5000);

        generation.on('exit', function (exitCode) {
            clearTimeout(generationTimeout);

            if (exitCode !== 0) {
                return reject(reportError);
            }

            console.log('Allure report successfully generated');
            resolve();
        });
    });


},
  

}, { clone: false });

