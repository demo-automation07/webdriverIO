// Import the config object from conf.js
import {config as wdioconfig} from './wdio.conf.js';
import { deepmerge } from 'deepmerge-ts'
import { getStagingEnv } from '../test/utils/envParam.js';
import dotenv from 'dotenv';
import { browser } from '@wdio/globals';
import path from 'path';

// Get the current working directory using process.cwd()
const projectRoot = process.cwd();
dotenv.config({ path: path.join(projectRoot, '../.env') })
const env = getStagingEnv();
let url;
switch (env) {
  case 'QA':
    url = process.env.URL_QA;
    break;
  case 'UAT':
    url = process.env.URL_UAT;
    break;
  case 'DEV':
    url = process.env.URL_DEV;
    break;
  case 'PROD':
    url = process.env.URL_PROD;
    break;
  default:
    url = process.env.URL_QA;
    break;
}

export const config = deepmerge(wdioconfig.config, {
    ...wdioconfig,
    baseUrl: url,
    
    suites : {
        TC_demosite : [
            '../test/specs/automationdemosite/test.registration.js',
            '../test/specs/automationdemosite/test.registrationMandatory.js'
        ],
        TC_practicesite : [
            '../test/specs/practiceautomation/test.login.js',
            
        ],
        TC_facebooksite :[
            '../test/specs/facebook/test.forgotpassword.js',
          
        ]
    },

    before: async function (capabilities, specs) {
        await browser.url(url);
        await browser.maximizeWindow();
    }
},{ clone: false })
config.reporters.push('allure');