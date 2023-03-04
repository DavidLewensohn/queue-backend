const { OAuth2Client } = require('google-auth-library');

module.exports = {
    getUserInfo,
}

const clientID = '118031433255-rel2t5ijugfov3pqv4ptriaegl1eo1mb.apps.googleusercontent.com'
const clientSecret = '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'
const client = new OAuth2Client(clientID, clientSecret);


async function getUserInfo(credential) {
    try {
      // Verify the credential with the OAuth2 client
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: clientID
      });
  
      // Extract user details from the verified token
      const payload = ticket.getPayload();
      const userId = payload.sub;
      const email = payload.email;
      const name = payload.name;
      const picture = payload.picture;
  
      return {
        userId,
        email,
        name,
        picture
      };
    } catch (error) {
      console.error('Error verifying credential:', error);
      throw new Error('Invalid credential');
    }
  }
  