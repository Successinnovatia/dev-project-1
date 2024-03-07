const bcrypt = require('bcrypt');
const { db } = require('../utils/db');

const saltRounds = 10;

// Hash a password
async function hashPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return (hashedPassword);
  } catch (error) {
    return (`Internal server error from hashing password: ${error}`);
  }
}

// Compare a password with a hash
async function comparePassword(password, hash) {
  try {
    const hashedPassword = await bcrypt.compare(password, hash);
    if (!hashedPassword) {
      return false;
    }
    return true;
  } catch (error) {
    return (`Internal server error from comparing password: ${error}`);
  }
}

// Find user by email
function findUserByEmail(email) {
  return db.User.findUnique({
    where: {
      email,
    },
  });
}

// Create user by email and password
function createUserByEmailAndPassword(user) {
  user.password = bcrypt.hashSync(user.password, 12);
  return db.user.create({
    data: user,
  });
}

// find user by ID
function findUserById(id) {
  return db.user.findUnique({
    where: {
      id,
    },
  });
}
module.exports = { hashPassword, comparePassword, findUserByEmail, findUserById, createUserByEmailAndPassword };
