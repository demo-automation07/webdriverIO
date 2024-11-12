import dateGenerator from '../utils/date.generator';

const { faker } = require('@faker-js/faker');
const area = require('./data/areacode.json');
const datafeed = require('../data.feed.json');

class dataGenerator{

    /**
     * @description creates a valid user name any lengths for each part of the name (first, last, middle),
     * @returns object, randomly generator usernames with any length
     */

    validUserName() {
        return {
          firstName: faker.firstName(),
          lastName: faker.lastName(),
          middleName : faker.middleName()
        };
      }
    
    /**
     * @description creates a valid user name with maximum specified lengths for each part of the name (first, last, middle),
     * @returns object, randomly generator username with maximum string lenght of specfied length
     */
    validUserName(firstNameLength = 10, lastNameLength = 10, middleNameLength = 10) {
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
    }

    invalidUserName() {
        return {
            alphaNumeric: faker.random.alpha(5) + faker.random.numeric(2),
            specialCharacter: faker.random.alpha(5) + faker.helpers.arrayElement(['@', '#', '!', '&', '*', '$', '%', '.', '>', '<']),
            onlyNumeric: faker.random.numeric(6),
            allCharacters: faker.random.alpha(5) + faker.random.numeric(2) + faker.helpers.arrayElement(['@', '#', '!', '&', '*', '$', '%', '.', '>', '<'])
        };
    }

    validAddress() {
        return {
            streetAddress: faker.address.streetAddress(),
            city: faker.address.city(),
            state: faker.address.state(),
            postalCode: faker.address.zipCode(),
            country: faker.address.country(),  // Adding country
            fullAddress: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.state()} ${faker.address.zipCode()}, ${faker.address.country()}`,
            latitude: faker.address.latitude(),   // Adding latitude
            longitude: faker.address.longitude()  // Adding longitude
        };
    }

    invalidAddress() {
        return {
          
            streetAddress: faker.random.alpha(5) + faker.random.numeric(3) + faker.helpers.arrayElement(['@', '#', '!', '&', '*']),            
            city: faker.random.alpha(4) + faker.random.numeric(3),            
            state: faker.random.alpha(3) + faker.helpers.arrayElement(['@', '#', '$', '%']),            
            postalCode: faker.random.alpha(3) + faker.random.numeric(3) + faker.helpers.arrayElement(['!', '@', '#']),            
            fullAddress: faker.random.alpha(4) + faker.random.numeric(2) + " " +
                         faker.random.alpha(3) + faker.helpers.arrayElement(['#', '$', '%']) + " " +
                         faker.random.numeric(3) + faker.helpers.arrayElement(['@', '!', '?'])
        };
    }

    // Optional: Return phone number in a format like +91 XXXXXXXXXX
    validIndianPhoneNumber() {
        
        const firstDigit = faker.helpers.arrayElement(['6','7', '8', '9']); 
        const phoneNumber = firstDigit + faker.random.numeric(9); // Concatenate first digit with 9 random digits   
        
        return `+91 ${phoneNumber}`;
    }

    validUSPhoneNumber() {

      
        var areaCount = Object.values(area)[Math.floor(Math.random() * (Object.keys(area)).length)];
        var areaCode = areaCount[Math.floor(Math.random() * (areaCount.length))];
        var phone1stdigit = faker.random.numeric(1, { bannedDigits: ['0', '1'] })
        var phoneremainingdigit = faker.random.numeric(6);
        return areaCode.toString().concat(phone1stdigit, phoneremainingdigit);
    
      }

      invalidIndianPhoneNumber() {
        return {
            // Invalid phone number with incorrect starting digit
            invalidStartDigit: faker.random.numeric(1) + faker.random.numeric(9), // Starts with a random number other than 7, 8, or 9
            
            // Invalid phone number with more than 10 digits
            extraDigits: faker.helpers.arrayElement(['7', '8', '9']) + faker.random.numeric(12), // Generates a number with 12 digits
            
            // Invalid phone number with fewer than 10 digits
            fewerDigits: faker.helpers.arrayElement(['7', '8', '9']) + faker.random.numeric(5), // Generates a number with only 6 digits
            
            // Invalid phone number with random characters or symbols
            withSymbols: faker.random.alpha(5) + faker.random.numeric(5) + faker.helpers.arrayElement(['#', '@', '*']), // Includes random letters or symbols
            
            // Invalid phone number with mixed formatting
            formattedIncorrectly: `+91-${faker.random.numeric(5)}-${faker.random.numeric(4)}` // Incorrect formatting (e.g., +91-XXXX-XXXX)
        };
    }

    invalidUSPhoneNumber() {
        return {
            // Invalid phone number with incorrect area code (starting with '0' or '1')
            invalidAreaCode: `(${faker.random.arrayElement([0, 1])}${faker.random.numeric(2)}) ${faker.random.numeric(7)}`,
            
            // Invalid phone number with extra digits (more than 10 digits)
            extraDigits: `${faker.random.numeric(11)}`, // Generates a number with 11 digits (invalid length)
            
            // Invalid phone number with fewer digits (less than 10 digits)
            fewerDigits: `${faker.random.numeric(8)}`, // Generates a number with 8 digits (invalid length)
            
            // Invalid phone number with letters or special characters
            withLettersAndSymbols: faker.random.alpha(3) + faker.random.numeric(4) + faker.helpers.arrayElement(['@', '#', '*', '$']),
            
            // Invalid phone number with incorrect formatting (e.g., missing parentheses, dashes)
            formattedIncorrectly: `+1-${faker.random.numeric(3)}-${faker.random.numeric(7)}` // Invalid format with `+1-XXX-XXXX`
        };
    }

    validGender() {
        const genders = datafeed.genders;  // Access the "genders" array from the JSON
        return faker.helpers.arrayElement(genders);  // Select a random gender
    }

      
    

}
export default new dateGenerator();