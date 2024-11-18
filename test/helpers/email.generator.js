import { faker } from '@faker-js/faker';  // Import faker for random data generation

class EmailGenerator {

    /**
     * @description Generates a random email address.
     * @param {Object} options - Optional custom options for the email.
     * @param {string} options.username - A custom username for the email (optional).
     * @param {string} options.domain - A custom domain (optional).
     * @param {boolean} options.isBusiness - If true, uses a business email format.
     * @returns {string} A randomly generated email address.
     */
    generateEmail({ username, domain, isBusiness = false } = {}) {
        try {
            // If a custom username is provided, use it; otherwise, generate a random one
            const userName = username || faker.internet.userName();

            // If a custom domain is provided, use it; otherwise, generate a random one
            const emailDomain = domain || this.getRandomDomain();

            // Generate business email format if requested
            if (isBusiness) {
                return `${userName.toLowerCase()}@${emailDomain}`;
            }

            // Otherwise, use a random, more casual email format
            return `${userName.toLowerCase()}@${emailDomain}`;
        } catch (error) {
            throw new Error("Error generating email: " + error.message);
        }
    }

    /**
     * @description Returns a random email domain from a predefined list.
     * @returns {string} A random email domain.
     */
    getRandomDomain() {
        const domains = [
            'gmail.com',
            'yahoo.com',
            'outlook.com',
            'hotmail.com',
            'icloud.com',
            'example.com',
            'mydomain.com'
        ];
        const randomIndex = Math.floor(Math.random() * domains.length);
        return domains[randomIndex];
    }

    /**
     * @description Generates a random business email address with a company domain.
     * @param {string} companyName - The name of the company (used in the domain).
     * @returns {string} A random business email address in the format: username@company.com
     */
    generateBusinessEmail(companyName) {
        try {
            const userName = faker.internet.userName();
            const companyDomain = `${companyName.toLowerCase().replace(/\s+/g, '')}.com`;  // Clean up the company name for domain
            return `${userName.toLowerCase()}@${companyDomain}`;
        } catch (error) {
            throw new Error("Error generating business email: " + error.message);
        }
    }
}

export default new EmailGenerator();