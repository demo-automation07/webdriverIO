import { faker } from '@faker-js/faker';
import area from '../data/areacode.json' with { type: 'json' };  // For JSON imports
import datafeed from '../data/data.feed.json' with { type: 'json' }; // For JSON imports
import { logError } from './logger.helper';

class DataGenerator {

    /**
     * @description Generates a valid random user name with any length for each part of the name (first, last, middle).
     * @returns {Object} An object containing randomly generated first, middle, and last names.
     * @throws {Error} Throws error if there is a problem generating the name.
     */
    validUserName() {
        try {
            return {
                firstName: faker.person.firstName(),
                middleName: faker.person.middleName(),
                lastName: faker.person.lastName()
            };
        } catch (error) {
            logError("Error generating valid username:", error);
            throw error;
        }
    }

    /**
     * @description Generates a valid random user name with a specified maximum length for each part of the name (first, last, middle).
     * @param {number} [firstNameLength=10] - Maximum length for the first name.
     * @param {number} [lastNameLength=10] - Maximum length for the last name.
     * @param {number} [middleNameLength=10] - Maximum length for the middle name.
     * @returns {Object} An object containing the generated first, middle, and last names with enforced lengths.
     * @throws {Error} Throws error if there is an issue generating the name.
     */
    validUserNamewithLength(firstNameLength = 10, lastNameLength = 10, middleNameLength = 10) {
        try {
            // Helper function to generate names with a specific length
            function generateName(nameFunction, length) {
                const name = nameFunction();
                return name.length > length ? name.slice(0, length) : name;
            }

            return {
                firstName: generateName(faker.person.firstName, firstNameLength),
                lastName: generateName(faker.person.lastName, lastNameLength),
                middleName: generateName(faker.person.middleName, middleNameLength)
            };
        } catch (error) {
            logError("Error generating valid username with length constraints:", error);
            throw error;
        }
    }

    /**
     * @description Generates a set of invalid usernames with various patterns.
     * @returns {Object} An object containing different invalid username formats.
     * @throws {Error} Throws error if there is an issue generating the invalid usernames.
     */
    invalidUserName() {
        try {
            return {
                alphaNumeric: faker.string.alpha(5) + faker.string.numeric(2),
                specialCharacter: faker.string.alpha(5) + faker.helpers.arrayElement(['@', '#', '!', '&', '*', '$', '%', '.', '>', '<']),
                onlyNumeric: faker.string.numeric(6),
                allCharacters: faker.string.alpha(5) + faker.string.numeric(2) + faker.helpers.arrayElement(['@', '#', '!', '&', '*', '$', '%', '.', '>', '<'])
            };
        } catch (error) {
            logError("Error generating invalid username:", error);
            throw error;
        }
    }

    /**
     * @description Generates a valid address with various details such as street, city, state, postal code, and country.
     * @returns {Object} An object containing valid address information.
     * @throws {Error} Throws error if there is an issue generating the address.
     */
    validAddress() {
        try {
            return {
                streetAddress: faker.location.streetAddress(),
                city: faker.location.city(),
                state: faker.location.state(),
                postalCode: faker.location.zipCode(),
                country: faker.location.country(),
                fullAddress: `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.state()} ${faker.location.zipCode()}, ${faker.location.country()}`,
                latitude: faker.location.latitude(),
                longitude: faker.location.longitude()
            };
        } catch (error) {
            logError("Error generating valid address:", error);
            throw error;
        }
    }

    /**
     * @description Generates an invalid password
     * @returns {string} A randomly generated invalid password.
     */
    invalidPassword() {
        try {
            return {
                // Short password (less than 8 characters)
                shortPassword: faker.string.alphanumeric(4),  // Generates a short password with 4 characters (e.g., "hfs9")

                // Password with no numbers
                noNumberPassword: faker.string.alpha(10),  // Generates a 10-character password with only alphabetic characters (e.g., "passwordabc")

                // Password with no special characters (letters and digits only)
                noSpecialPassword: faker.string.alphanumeric(12),  // 12-character alphanumeric string without special characters

                // Password with only special characters (invalid in many cases)
                specialCharsOnlyPassword: faker.helpers.arrayElement(['@', '#', '!', '&', '*']) + faker.helpers.arrayElement(['$', '%', '^', '&', '*']),  // 2 special characters (e.g., "@$")

                // Password with weak pattern (short and only lowercase letters)
                weakPatternPassword: faker.string.alpha(6),  // Generates 6-character password with lowercase letters only (e.g., "abcxyz")

                // Password with random mix of numbers, letters, and symbols (too complex)
                complexInvalidPassword: faker.string.alphanumeric(3) + faker.helpers.arrayElement(['@', '#', '%', '!']) + faker.string.alphanumeric(5),  // Mixed alphanumeric with symbols (e.g., "3#4n1!")

                // Password with only numbers (in some cases it might be invalid)
                numbersOnlyPassword: faker.string.numeric(8),  // 8-digit number password (e.g., "12345678")

                // Password with missing uppercase characters (invalid for some systems)
                noUppercasePassword: faker.string.alpha(10).toLowerCase(),  // Only lowercase letters (e.g., "abcdefghij")
            };
        } catch (error) {
            logError('Error generating invalid password:', error);
            return null;
        }
    }

    /**
     * @description Generates an invalid address with incorrect patterns or characters.
     * @returns {Object} An object containing invalid address details.
     * @throws {Error} Throws error if there is an issue generating the invalid address.
     */
    invalidAddress() {
        try {
            return {
                streetAddress: faker.string.alpha(5) + faker.string.numeric(3) + faker.helpers.arrayElement(['@', '#', '!', '&', '*']),
                city: faker.string.alpha(4) + faker.string.numeric(3),
                state: faker.string.alpha(3) + faker.helpers.arrayElement(['@', '#', '$', '%']),
                postalCode: faker.string.alpha(3) + faker.string.numeric(3) + faker.helpers.arrayElement(['!', '@', '#']),
                fullAddress: faker.string.alpha(4) + faker.string.numeric(2) + " " +
                    faker.string.alpha(3) + faker.helpers.arrayElement(['#', '$', '%']) + " " +
                    faker.string.numeric(3) + faker.helpers.arrayElement(['@', '!', '?'])
            };
        } catch (error) {
            logError("Error generating invalid address:", error);
            throw error;
        }
    }

    /**
     * @description Generates a valid Indian phone number in the format: +91 XXXXXXXXXX.
     * @returns {string} A valid Indian phone number.
     * @throws {Error} Throws error if there is an issue generating the phone number.
     */
    validIndianPhoneNumberwithLocale() {
        try {
            // First digit of an Indian mobile number must be 6, 7, 8, or 9
            const firstDigit = faker.helpers.arrayElement(['6', '7', '8', '9']);

            // Generate the remaining 9 digits using faker.number.int()
            let phoneNumber = firstDigit;
            for (let i = 0; i < 9; i++) {
                phoneNumber += faker.number.int({ min: 0, max: 9 }).toString();  // Generate a random digit between 0 and 9
            }

            // Return the phone number in the +91 ########## format
            return `+91 ${phoneNumber}`;
        } catch (error) {
            logError("Error generating valid Indian phone number:", error);
            throw error;
        }
    }

    /**
     * @description Generates a valid Indian phone number in the format: +91 XXXXXXXXXX.
     * @returns {string} A valid Indian phone number.
     * @throws {Error} Throws error if there is an issue generating the phone number.
     */
    validIndianPhoneNumber() {
        try {
            // First digit of an Indian mobile number must be 6, 7, 8, or 9
            const firstDigit = faker.helpers.arrayElement(['6', '7', '8', '9']);

            // Generate the remaining 9 digits using faker.number.int()
            let phoneNumber = firstDigit;
            for (let i = 0; i < 9; i++) {
                phoneNumber += faker.number.int({ min: 0, max: 9 }).toString();  // Generate a random digit between 0 and 9
            }

            // Return the phone number in the ########## format
            return phoneNumber;
        } catch (error) {
            logError("Error generating valid Indian phone number:", error);
            throw error;
        }
    }

    /**
     * @description Generates a valid US phone number by randomly selecting an area code and phone number digits.
     * @returns {string} A valid US phone number.
     * @throws {Error} Throws error if there is an issue generating the phone number.
     */
    validUSPhoneNumber() {
        try {
            const areaCount = Object.values(area)[Math.floor(Math.random() * Object.keys(area).length)];
            const areaCode = areaCount[Math.floor(Math.random() * areaCount.length)];
            const phone1stdigit = faker.string.numeric(1, { bannedDigits: ['0', '1'] });
            const phoneremainingdigit = faker.string.numeric(6);
            return areaCode.toString().concat(phone1stdigit, phoneremainingdigit);
        } catch (error) {
            logError("Error generating valid US phone number:", error);
            throw error;
        }
    }

    /**
     * @description Generates a set of invalid Indian phone numbers with incorrect patterns or values.
     * @returns {Object} An object containing invalid Indian phone number formats.
     * @throws {Error} Throws error if there is an issue generating the invalid phone numbers.
     */
    invalidIndianPhoneNumber() {
        try {
            return {
                invalidStartDigit: faker.string.numeric(1) + faker.string.numeric(9),
                extraDigits: faker.helpers.arrayElement(['7', '8', '9']) + faker.string.numeric(12),
                fewerDigits: faker.helpers.arrayElement(['7', '8', '9']) + faker.string.numeric(5),
                withSymbols: faker.string.alpha(5) + faker.string.numeric(5) + faker.helpers.arrayElement(['#', '@', '*']),
                formattedIncorrectly: `+91-${faker.string.numeric(5)}-${faker.string.numeric(4)}`
            };
        } catch (error) {
            logError("Error generating invalid Indian phone number:", error);
            throw error;
        }
    }

    /**
     * @description Generates a set of invalid US phone numbers with incorrect patterns or values.
     * @returns {Object} An object containing invalid US phone number formats.
     * @throws {Error} Throws error if there is an issue generating the invalid phone numbers.
     */
    invalidUSPhoneNumber() {
        try {
            return {
                invalidAreaCode: `(${faker.string.alpha(1)}${faker.string.numeric(2)}) ${faker.string.numeric(7)}`,
                extraDigits: `${faker.string.numeric(11)}`,
                fewerDigits: `${faker.string.numeric(8)}`,
                withLettersAndSymbols: faker.string.alpha(3) + faker.string.numeric(4) + faker.helpers.arrayElement(['@', '#', '*', '$']),
                formattedIncorrectly: `+1-${faker.string.numeric(3)}-${faker.string.numeric(7)}`
            };
        } catch (error) {
            logError("Error generating invalid US phone number:", error);
            throw error;
        }
    }

    /**
     * @description Generates a random gender from the available gender options in the datafeed.
     * @returns {string} A randomly selected gender from the datafeed.
     * @throws {Error} Throws error if there is an issue retrieving gender data.
     */
    validGender() {
        try {
            const genders = datafeed.genders;  // Access the "genders" array from the JSON
            return faker.helpers.arrayElement(genders);  // Select a random gender
        } catch (error) {
            logError("Error generating valid gender:", error);
            throw error;
        }
    }

    /**
 * @description Generates a random country from the available country options in the datafeed.
 * @returns {string} A randomly selected country from the datafeed.
 * @throws {Error} Throws error if there is an issue retrieving country data.
 */
    validCountry() {
        try {
            const countries = datafeed.countries;  // Access the "countries" array from the JSON
            return faker.helpers.arrayElement(countries);  // Select a random country
        } catch (error) {
            logError("Error generating valid country:", error);
            throw error;
        }
    }

    /**
     * @description Generates a random language from the available language options in the datafeed.
     * @returns {string} A randomly selected language from the datafeed.
     * @throws {Error} Throws error if there is an issue retrieving language data.
     */
    validLanguage() {
        try {
            const languages = datafeed.languages;  // Access the "languages" array from the JSON
            return faker.helpers.arrayElement(languages);  // Select a random language
        } catch (error) {
            logError("Error generating valid language:", error);
            throw error;
        }
    }

    /**
     * @description Generates a random value from the given list of options.
     * @param {Array} dataList - An array of values (e.g., skills, countries, etc.) to choose from.
     * @returns {string} A randomly selected value from the list.
     * @throws {Error} Throws error if there is an issue selecting a value.
     */
    validValue(dataList) {
        try {
            // Ensure dataList is an array and has values
            if (!Array.isArray(dataList) || dataList.length === 0) {
                throw new Error('The data list is empty or not an array');
            }

            return faker.helpers.arrayElement(dataList);  // Select a random value from the array
        } catch (error) {
            logError("Error generating valid value:", error);
            throw error;
        }
    }

    /**
     * @description Generates a list of random values from the provided array.
     * @param {Array} array - The array of available values (could be skills, countries, etc.).
     * @param {number} numberOfItems - The number of random items to return.
     * @returns {Array} A list of randomly selected items from the array.
     * @throws {Error} Throws error if there is an issue retrieving the data.
     */
    validArray(array, numberOfItems) {
        try {
            // Ensure the numberOfItems does not exceed the available items in the array
            const numberToSelect = Math.min(numberOfItems, array.length);

            // Generate an array with random items
            const selectedItems = [];

            // Loop to select the desired number of random items
            for (let i = 0; i < numberToSelect; i++) {
                const randomItem = faker.helpers.arrayElement(array);  // Select a random item
                // Ensure the selected item is not duplicated
                if (!selectedItems.includes(randomItem)) {
                    selectedItems.push(randomItem);
                } else {
                    // If duplicate is found, retry by decrementing the counter
                    i--;
                }
            }

            return selectedItems;
        } catch (error) {
            logError("Error generating valid array:", error);
            throw error;
        }
    }
}

export default new DataGenerator();