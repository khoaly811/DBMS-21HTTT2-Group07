const accounts = require('../models/accounts');
exports.getAllUsernames = async () => {
  try {
    const allUsernames = await accounts.getAllUsernames();
    console.log('All Usernames:', allUsernames);
  } catch (error) {
    console.error('Error:', error);
  }
};