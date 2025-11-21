const jwt = require('jsonwebtoken');

function createJWT() {
  const payload = { userId: 123, username: 'exampleUser' };
  const secretKey = 'mySecret';
  const token = jwt.sign(payload, secretKey);
  console.log('JWT Token:', token);
  return token;
}

function verifyJWT(token) {
  const secretKey = 'mySecret';
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) console.log('JWT Verification Failed:', err.message);
    else console.log('JWT Verified:', decoded);
  });
}

function decodeJWT(token) {
  const decoded = jwt.decode(token);
  console.log('Decoded JWT:', decoded);
}

const token = createJWT();
verifyJWT(token);
decodeJWT(token);
