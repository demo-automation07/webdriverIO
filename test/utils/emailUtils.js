import imaps from 'imap-simple';
import { simpleParser } from 'mailparser';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const config = {
    imap: {
        user: 'saranyatestemailv@gmail.com',
        password: 'mbxm iudw btxl kduw', 
        host: 'imap.gmail.com',
        port: 993,
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
            
                // Fetch unseen emails
                const messages = await connection.search(searchCriteria, fetchOptions);
                console.log("+++++++++", messages);
    
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
                console.error('Error in email verification:', error);
            }
    
            // Wait and retry after a short delay
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    
        throw new Error(`Email with subject and specified content not found within ${timeout} ms`);
    }
    
}

export default new EmailUtil();