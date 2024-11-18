import { faker } from '@faker-js/faker';
import area from './data/areacode.json' assert { type: 'json' };  // For JSON imports
import datafeed from '../data.feed.json' assert { type: 'json' }; // For JSON imports

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
            console.error("Error generating valid username:", error);
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
                firstName: generateName(faker.firstName, firstNameLength),
                lastName: generateName(faker.lastName, lastNameLength),
                middleName: generateName(faker.middleName, middleNameLength)
            };
        } catch (error) {
            console.error("Error generating valid username with length constraints:", error);
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
                alphaNumeric: faker.random.alpha(5) + faker.random.numeric(2),
                specialCharacter: faker.random.alpha(5) + faker.helpers.arrayElement(['@', '#', '!', '&', '*', '$', '%', '.', '>', '<']),
                onlyNumeric: faker.random.numeric(6),
                allCharacters: faker.random.alpha(5) + faker.random.numeric(2) + faker.helpers.arrayElement(['@', '#', '!', '&', '*', '$', '%', '.', '>', '<'])
            };
        } catch (error) {
            console.error("Error generating invalid username:", error);
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
            console.error("Error generating valid address:", error);
            throw error;
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
                streetAddress: faker.random.alpha(5) + faker.random.numeric(3) + faker.helpers.arrayElement(['@', '#', '!', '&', '*']),
                city: faker.random.alpha(4) + faker.random.numeric(3),
                state: faker.random.alpha(3) + faker.helpers.arrayElement(['@', '#', '$', '%']),
                postalCode: faker.random.alpha(3) + faker.random.numeric(3) + faker.helpers.arrayElement(['!', '@', '#']),
                fullAddress: faker.random.alpha(4) + faker.random.numeric(2) + " " +
                             faker.random.alpha(3) + faker.helpers.arrayElement(['#', '$', '%']) + " " +
                             faker.random.numeric(3) + faker.helpers.arrayElement(['@', '!', '?'])
            };
        } catch (error) {
            console.error("Error generating invalid address:", error);
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
            console.error("Error generating valid Indian phone number:", error);
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

            // Return the phone number in the +91 ########## format
            return phoneNumber
        } catch (error) {
            console.error("Error generating valid Indian phone number:", error);
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
            const phone1stdigit = faker.random.numeric(1, { bannedDigits: ['0', '1'] });
            const phoneremainingdigit = faker.random.numeric(6);
            return areaCode.toString().concat(phone1stdigit, phoneremainingdigit);
        } catch (error) {
            console.error("Error generating valid US phone number:", error);
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
                invalidStartDigit: faker.random.numeric(1) + faker.random.numeric(9),
                extraDigits: faker.helpers.arrayElement(['7', '8', '9']) + faker.random.numeric(12),
                fewerDigits: faker.helpers.arrayElement(['7', '8', '9']) + faker.random.numeric(5),
                withSymbols: faker.random.alpha(5) + faker.random.numeric(5) + faker.helpers.arrayElement(['#', '@', '*']),
                formattedIncorrectly: `+91-${faker.random.numeric(5)}-${faker.random.numeric(4)}`
            };
        } catch (error) {
            console.error("Error generating invalid Indian phone number:", error);
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
                invalidAreaCode: `(${faker.random.arrayElement([0, 1])}${faker.random.numeric(2)}) ${faker.random.numeric(7)}`,
                extraDigits: `${faker.random.numeric(11)}`,
                fewerDigits: `${faker.random.numeric(8)}`,
                withLettersAndSymbols: faker.random.alpha(3) + faker.random.numeric(4) + faker.helpers.arrayElement(['@', '#', '*', '$']),
                formattedIncorrectly: `+1-${faker.random.numeric(3)}-${faker.random.numeric(7)}`
            };
        } catch (error) {
            console.error("Error generating invalid US phone number:", error);
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
            console.error("Error generating valid gender:", error);
            throw error;
        }
    }
}

export default new DataGenerator();