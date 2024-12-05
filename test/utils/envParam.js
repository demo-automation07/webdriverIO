import { logInfo, logWarn } from '../helpers/logger.helper.js';
import dotenv from 'dotenv';
import path from 'path';
const projectRoot = process.cwd();
dotenv.config({ path: path.join(projectRoot, '../.env') });
class EnvParam {

    // Instance method to get the environment (e.g., 'qa')
    static getStagingEnv() {
        const param = process.argv.slice(2);
        const index = param.indexOf('--stagingEnv');
        const defaultstaging = process.env.DEFAULT_STAGING_ENVIRONMENT;
        if (index === -1 || !param[index + 1]) {
            logWarn(`------stagingEnv is not provided---------`);
            logInfo(`------starting the staging in ${defaultstaging} environment-----`);
            return defaultstaging;
        }
        const env = param[index + 1]; // Return the environment (e.g., 'qa', 'dev')
        logInfo(`--------Using environment: ${env}----------`);  // Log the selected environment
        return env;
    }

    // Instance method to get the suite name (e.g., 'TC_practicesite')
    static getSuiteName() {
        const param = process.argv.slice(2);
        const index = param.indexOf('--suite');
        if (index === -1 || !param[index + 1]) {
            logWarn('----SuiteName not provided all suites will be executed');
            return false;
        }
        const suiteName = param[index + 1].split('_')[1]; // Extract the suite name after 'TC_'
        logInfo(`Executing  suite: ${suiteName}`);  // Log the selected suite
        return suiteName;
    }

    // Method to get the browser name (e.g., 'chrome', 'firefox', 'edge')
    static getBrowserName() {
        const param = process.argv.slice(2);  // Get command-line arguments
        const index = param.indexOf('--browser');  // Find the --browser argument

        if (index === -1 || !param[index + 1]) {  // If no --browser is provided or no value after it
            logWarn('----Browser name not provided, defaulting to chrome');
            return 'chrome';  // Default to chrome if no browser name is provided
        }

        const browserName = param[index + 1];  // Get the browser name (case insensitive)
        logInfo(`Executing tests in browser: ${browserName}`);  // Log the selected browser
        return browserName;  // Return the browser name
    }


    // // Static method to get both the environment and suite configuration data
    // static getConfigEnvandSuite() {
    //     const args = process.argv.slice(2);
    //     const indexEnv = args.indexOf('--stagingEnv');
    //     const indexSuite = args.indexOf('--suite');

    //     // Check if both --stagingEnv and --suite arguments exist
    //     if (indexEnv === -1 || indexSuite === -1 || !args[indexEnv + 1] || !args[indexSuite + 1]) {
    //         logInfo('Arguments --stagingEnv and --suite must be provided.');
    //         return null;
    //     }

    //     const env = args[indexEnv + 1];  // Get the environment
    //     const suiteName = args[indexSuite + 1].split('_')[1]; // Get the suite name

    //     // Return the config data if available
    //     if (configData[env] && configData[env][suiteName]) {
    //         return configData[env][suiteName];  // Return config for the environment and suite
    //     } else {
    //         logInfo(`Configuration not found for environment: ${env}, suite: ${suiteName}`);
    //         return null;
    //     }
    // }
}


// Exporting the static methods separately
export const getStagingEnv = EnvParam.getStagingEnv;
export const getSuiteName = EnvParam.getSuiteName;
export const getBrowserName = EnvParam.getBrowserName;
// export const getConfigEnvandSuite = EnvParam.getConfigEnvandSuite;
export default EnvParam;