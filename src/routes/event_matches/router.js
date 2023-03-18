const express = require("express");
const router = express.Router();
const { matchEventsCollection } = require("../../MangoDB/db");
const ObjectId = require("mongodb").ObjectId;
const checkMatchEventBody = require("./validation");

router.get("/", async (req, res) => {
  try {
    const matchEvents = await matchEventsCollection.find().toArray();
    res.status(200).send(
      JSON.stringify({
        status: 200,
        message: "Match Events fetched successfully",
        data: matchEvents,
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

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const matchEvent = await matchEventsCollection.findOne({
      _id: ObjectId(id),
    });

    if (matchEvent === null) {
      res.status(404).send(
        JSON.stringify({
          status: 404,
          message: "Not Found",
        })
      );
    } else {
      res.status(200).send(
        JSON.stringify({
          status: 200,
          message: "Match Event fetched successfully",
          data: matchEvent,
        })
      );
    }
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

router.post("/", async (req, res) => {
  const matchEventBody = req.body;
  if (checkMatchEventBody(matchEventBody)) {
    res.status(400).send(
      JSON.stringify({
        status: 400,
        message: "Bad Request",
      })
    );
    return;
  }

  try {
    const insertResult = await matchEventsCollection.insertOne(matchEventBody);
    res.status(201).send(
      JSON.stringify({
        status: 201,
        message: "Match Event created successfully",
        createdId: insertResult.insertedId,
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

router.put("/:id", async (req, res) => {
  const matchEventBody = req.body;

  if (checkMatchEventBody(matchEventBody)) {
    res.status(400).send(
      JSON.stringify({
        status: 400,
        message: "Bad Request",
      })
    );
    return;
  }

  try {
    const id = req.params.id;
    const updateResult = await matchEventsCollection.updateOne(
      { _id: ObjectId(id) },
      { $set: matchEventBody }
    );
    if (updateResult.modifiedCount === 0) {
      res.status(404).send(
        JSON.stringify({
          status: 404,
          message: "Not Found",
        })
      );
    } else {
      res.status(200).send(
        JSON.stringify({
          status: 200,

          message: "Match Event updated successfully",

          updatedId: id,
        })
      );
    }
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

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const deleteResult = await matchEventsCollection.deleteOne({
      _id: ObjectId(id),
    });

    if (deleteResult.deletedCount === 0) {
      res.status(404).send(
        JSON.stringify({
          status: 404,
          message: "Not Found",
        })
      );
    } else {
      res.status(200).send(
        JSON.stringify({
          status: 200,
          message: "Match Event deleted successfully",
          deletedId: id,
        })
      );
    }
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

router.delete("/", async (req, res) => {
  try {
    const deleteResult = await matchEventsCollection.deleteMany({});
    res.status(200).send(
      JSON.stringify({
        status: 200,
        message: "Match Events deleted successfully",
        deletedCount: deleteResult.deletedCount,
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
