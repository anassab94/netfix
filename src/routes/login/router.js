const express = require("express");
const router = express.Router();
const { adminsCollection } = require("../../MangoDB/db");

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const adminDocument = await adminsCollection.findOne({
    username: username,
  });

  if (adminDocument === null) {
    res.status(404).send(
      JSON.stringify({
        status: 404,
        message: "username does not exist",
      })
    );
    return;
  } else {
    if (adminDocument.password === password) {
      res.status(200).send(
        JSON.stringify({
          status: 200,
          message: "Login successful",
        })
      );
    } else {
      res.status(401).send(
        JSON.stringify({
          status: 401,
          message: "Invalid password",
        })
      );
    }
  }
});

module.exports = router;
