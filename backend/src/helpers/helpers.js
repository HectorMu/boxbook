const bcrypt = require("bcryptjs");

const helpers = {};

helpers.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

helpers.matchPassword = async (password, savedPassword) => {
  try {
    return await bcrypt.compare(password, savedPassword);
  } catch (e) {
    console.log(e);
  }
};

helpers.checkEmptyPropierty = (object) => {
  for (var key in object) {
    if (object[key] === "" || object[key] === null || object[key] === undefined)
      return {
        result: true,
        expected: `Expected value for '${key}'`,
      };
  }
  return {
    result: false,
  };
};

helpers.checkDuplicity = async (table, field, value) => {
  try {
    const results = await pool.query(
      `select * from ${table} where ${field} = ?`,
      [value]
    );
    return results.length > 0 ? true : false;
  } catch (error) {
    console.log(error);
  }
};
helpers.checkDuplicityOnUpdate = async (table, field, currentId, newValue) => {
  try {
    const results = await pool.query(
      `select * from ${table} where ${field} = ? && id != ${currentId}`,
      [newValue]
    );
    return results.length > 0 ? true : false;
  } catch (error) {
    console.log(error);
  }
};

helpers.validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

module.exports = helpers;
