const app = require("express");
const router = app.Router();
const { categoriesCollection } = require("../../../MangoDB/db");
const ObjectId = require("mongodb").ObjectId;
const { checkChannelBody } = require("../validation");

router.post("/", async (req, res) => {
  console.log(req.body);
  if (checkChannelBody(req.body)) {
    res.status(400).json({
      status: 400,
      message: "Bad Request",
    });
    return;
  }

  try {
    const categoryId = req.categoryId;

    const channelBody = req.body;
    const insertionResult = await categoriesCollection.updateOne(
      { _id: ObjectId(categoryId) },
      { $push: { channels: { _id: ObjectId(), ...channelBody } } }
    );

    if (insertionResult.insertedId === null) {
      res.status(404).json({
        status: 404,
        message: "Not Found",
      });

      return;
    }

    res.status(201).json({
      status: 201,
      message: "Channel created successfully",
      createdId: channelBody._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
});

router.delete("/:channelId", async (req, res) => {
  try {
    const categoryId = req.categoryId;
    const channelId = req.params.channelId;

    const deleteResult = await categoriesCollection.updateOne(
      { _id: ObjectId(categoryId) },
      { $pull: { channels: { _id: ObjectId(channelId) } } }
    );

    if (deleteResult.modifiedCount === 0) {
      res.status(404).json({
        message: "Not Found",
      });
    } else {
      res.status(204).end();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

router.put("/:channelId", async (req, res) => {
  const channelBody = req.body;

  if (checkChannelBody(channelBody)) {
    res.status(400).json({
      status: 400,
      message: "Bad Request",
    });

    return;
  }

  try {
    const categoryId = req.categoryId;
    const channelId = req.params.channelId;
    const updateResult = await categoriesCollection.updateOne(
      { _id: ObjectId(categoryId), "channels._id": ObjectId(channelId) },
      { $set: { "channels.$": { _id: ObjectId(channelId), ...channelBody } } }
    );

    if (updateResult.modifiedCount === 0) {
      res.status(404).json({
        status: 404,
        message: "Not Found",
      });
    } else {
      res.status(200).json({
        status: 200,
        message: "Channel updated successfully",
        updatedId: channelId,
        updated_at: new Date(),
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
