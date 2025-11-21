const bcrypt = require('bcrypt');

async function hashPassword() {
  const password = 'mySecurePassword';

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log('--- Hashing Example ---');
    console.log('Plain password :', password);
    console.log('Salt           :', salt);
    console.log('Hashed password:', hashedPassword);
    console.log();

    return hashedPassword;
  } catch (error) {
    console.error('Error in hashPassword:', error);
  }
}

async function comparePassword(storedHash) {
  const inputPassword = 'mySecurePassword';

  try {
    const isMatch = await bcrypt.compare(inputPassword, storedHash);

    console.log('--- Compare Example ---');
    console.log('Input password :', inputPassword);
    console.log('Stored hash    :', storedHash);
    console.log('Match?         :', isMatch);
    console.log();
  } catch (error) {
    console.error('Error in comparePassword:', error);
  }
}

function syncHashExample() {
  const password = 'mySecurePassword';

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  console.log('--- Synchronous Example ---');
  console.log('Plain password :', password);
  console.log('Salt           :', salt);
  console.log('Hashed password:', hashedPassword);
  console.log();
}

async function main() {
  const hashed = await hashPassword();
  await comparePassword(hashed);
  syncHashExample();
}

main();
