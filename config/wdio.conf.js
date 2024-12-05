// Import the config object from conf.js
import { config as baseconfig } from './wdio.base.config.js';
import { deepmerge } from 'deepmerge-ts';


export const config = deepmerge(baseconfig.config, {
  ...baseconfig,
  suites: {
    TC_smoke: [
        '../test/specs/automationdemosite/test.registration.js',
        '../test/specs/automationdemosite/test.registrationMandatory.js'
    ],
    TC_regresion: [
        '../test/specs/automationdemosite/test.registration.js',
        '../test/specs/automationdemosite/test.registrationMandatory.js',
        '../test/specs/practiceautomation/test.login.js',
        '../test/specs/facebook/test.forgotpassword.js'
    ],
    TC_end2end: [
        '../test/specs/facebook/test.forgotpassword.js',
        '../test/specs/practiceautomation/test.login.js'
    ],
    TC_one: [
      '../test/specs/practiceautomation/test.login.js'
    ]
  },
  

});

