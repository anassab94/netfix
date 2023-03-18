require("dotenv").config();

const { adminsCollection } = require("../MangoDB/db");

(async () => {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  try {
    const adminDocument = await adminsCollection.insertOne({
      username: username,
      password: password,
    });
    console.log(`Admin with username ${username} created successfully`);
  } catch (error) {
    console.log(error);
  }
})();
