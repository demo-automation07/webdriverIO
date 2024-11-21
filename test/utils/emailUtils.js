import imaps from 'imap-simple';
import {logError,logInfo} from '../helpers/logger.helper.js';
import { getStagingEnv } from '../utils/envParam.js'
import configData from '../config/config.json' assert { type: 'json' };

const data = configData[getStagingEnv()].facebooksite;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const config = {
    imap: {
        user: data.username,
        password: data.password, 
        host: data.imap.host,
        port: data.imap.port,
        tls: true,
        authTimeout: 3000,
    },
};

class EmailUtil {

    async getEmailBodyAndSubject(timeout = 30000) {
        const start = Date.now();
    
        while (Date.now() - start < timeout) {
            const connection = await imaps.connect(config);
    
            try {
                await connection.openBox('INBOX');
                const searchCriteria = ['UNSEEN'];
                const fetchOptions = { bodies: ['HEADER', 'TEXT'], markSeen: true };
            
                 
                logInfo('Fetching unread emails...', 'emailutility');
    
                // Fetch unseen emails
                const messages = await connection.search(searchCriteria, fetchOptions);

                if (messages.length > 0) {
                    logInfo(`Found ${messages.length} unread emails.`, 'emailutility');
                } else {
                    logInfo('No unread emails found yet. Retrying...', 'emailutility');
                }
    
                // Parse and check each email
                for (const item of messages) {
                    const bodyPart = item.parts.find(part => part.body && part.body !== ''); // Finds the body part
                    const subjectPart = item.parts.find(part => part.body && part.body.subject); // Finds the subject part
                    const emailSubject = subjectPart ? subjectPart.body.subject : ''; // Retrieve the subject if it exists
                    const rawBody = bodyPart ? bodyPart.body : '';
    
                    return { subject: emailSubject, body: rawBody };

                }
    
                await connection.end();
            } catch (error) {
                logError(error,'++++emailerror++++')
                console.error('Error in email verification:', error);
            }
    
            // Wait and retry after a short delay
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    
        throw new Error(`Email with subject and specified content not found within ${timeout} ms`);
    }
    
}

export default new EmailUtil();