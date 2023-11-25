const db = require('../models/db');

// Promisify MySQL queries
const query = util.promisify(db.query).bind(db);
// Function to find an account by username
async function findOneByUsername(username) {
  try {
    // Query each table separately and combine the results
    const sqlDentist = 'SELECT Dentist_ID FROM DENTIST';
    const sqlPatient = 'SELECT PATIENT_ID FROM PATIENT';
    const sqlStaff = 'SELECT Staff_ID FROM STAFF';
    const [dentist] = await query(sqlDentist, [username]);
    const [patient] = await query(sqlPatient, [username]);
    const [staff] = await query(sqlStaff, [username]);
    // Combine the results and return the first non-null result
    return dentist || patient || staff || null;
  } catch (error) {
    throw error;
  }
}


const extractUsernameAndRole = (account) => {
    const result = { username: '', role: '' };
  
    if (account) {
      result.username = account.username;
  
      const firstTwoWords = account.username.split(' ').slice(0, 2);
  
      if (firstTwoWords === 'AD') {
        result.role = 'admin';
      } else if (firstTwoWords === 'DE') {
        result.role = 'dentist';
      } else if (firstTwoWords === 'ST') {
        result.role = 'staff';
      } else {
        result.role = 'patient';
      }
    }
  
    return result;
  };
module.exports = {
  findOneByUsername,
  getAllUsernames,
  extractUsernameAndRole,
};