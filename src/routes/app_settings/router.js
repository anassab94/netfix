const express = require("express");
const router = express.Router();
const { appSettingsCollection } = require("../../MangoDB/db");
const ObjectId = require("mongodb").ObjectId;
const checkAppSettingsBody = require("./validation");

router.get("/", async (req, res) => {
  try {
    const appSettings = await appSettingsCollection.findOne({
      _id: "settings",
    });

    res.status(200).send(
      JSON.stringify({
        status: 200,
        message: "App Settings fetched successfully",
        data: appSettings,
      })
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(
      JSON.stringify({
        status: 500,
        message: "Internal Server Error",
      })
    );
  }
});

router.put("/", async (req, res) => {
  const appSettingsBody = req.body;
  if (checkAppSettingsBody(appSettingsBody)) {
    res.status(400).send(
      JSON.stringify({
        status: 400,
        message: "Bad Request",
      })
    );

    return;
  }
  try {
    const ifExist = await appSettingsCollection.findOne({ _id: "settings" });

    console.log(ifExist);

    if (ifExist === null) {
      const insertResult = await appSettingsCollection.insertOne({
        _id: "settings",
        ...appSettingsBody,
      });
    } else {
      const updateResult = await appSettingsCollection.updateOne(
        { _id: "settings" },
        { $set: appSettingsBody }
      );
    }
    res.status(201).send(
      JSON.stringify({
        status: 201,
        message: "App Settings updated successfully",
      })
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(
      JSON.stringify({
        status: 500,
        message: "Internal Server Error",
      })
    );
  }
});

router.get("/", async (req, res) => {
  try {
    const insertResult = await appSettingsCollection.findOne({
      _id: ObjectId("settings"),
    });
    res.status(200).send(
      JSON.stringify({
        status: 200,
        message: "App Settings fetched successfully",
        data: appSettings,
      })
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(
      JSON.stringify({
        status: 500,
        message: "Internal Server Error",
      })
    );
  }
});

module.exports = router;
