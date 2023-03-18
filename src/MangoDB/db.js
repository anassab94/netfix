const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MANGODB_URI);

const categoriesCollection = client.db("main_db").collection("categories");
const adminsCollection = client.db("main_db").collection("admins");
const matchEventsCollection = client.db("main_db").collection("matchEvents");
const drawerMenuCollection = client.db("main_db").collection("drawerMenu");
const appSettingsCollection = client.db("main_db").collection("settings");

module.exports = {
  categoriesCollection,
  adminsCollection,
  matchEventsCollection,
  drawerMenuCollection,
  appSettingsCollection,
};
