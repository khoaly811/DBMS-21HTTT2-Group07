// Function to find an account by username
async function findOneByUsernameFromArray(usernamesArray, username) {
  try {
    const sqlDentist = 'SELECT * FROM DENTIST WHERE Dentist_ID = ?';
    const sqlPatient = 'SELECT * FROM PATIENT WHERE PATIENT_ID = ?';
    const sqlStaff = 'SELECT * FROM STAFF WHERE Staff_ID = ?';

    if (usernamesArray.includes(username)) {
      const [dentist] = await query(sqlDentist, [username]);
      const [patient] = await query(sqlPatient, [username]);
      const [staff] = await query(sqlStaff, [username]);

      return dentist || patient || staff || null;
    } else {
      return null; // Username not found in the array
    }
  } catch (error) {
    throw error;
  }
}


// Function to get 5 usernames from each CSV file
async function getAllUsernames() {
  try {
    const usernames = [];

    // Helper function to read CSV file and extract usernames
    async function extractUsernamesFromCSV(filePath, columnName) {
      return new Promise((resolve, reject) => {
        const data = [];
        fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', (row) => {
            data.push(row[columnName]);
          })
          .on('end', () => {
            resolve(data.slice(0, 5)); // Retrieve the first 5 rows
          })
          .on('error', (error) => {
            reject(error);
          });
      });
    }

    // Extract usernames from each CSV file and gather them into the 'usernames' array
    const usernamesFromDentist = await extractUsernamesFromCSV('csv/DENTIST.csv', 'Dentist_ID');
    usernames.push(...usernamesFromDentist);

    const usernamesFromPatient = await extractUsernamesFromCSV('csv/PATIENT.csv', 'PATIENT_ID');
    usernames.push(...usernamesFromPatient);

    const usernamesFromStaff = await extractUsernamesFromCSV('csv/STAFF.csv', 'Staff_ID');
    usernames.push(...usernamesFromStaff);

    return usernames;
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
  findOneByUsernameFromArray,
  getAllUsernames,
  extractUsernameAndRole,
};