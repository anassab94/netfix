const express = require("express");
const router = express.Router();
const { drawerMenuCollection } = require("../../MangoDB/db");
const ObjectId = require("mongodb").ObjectId;
const checkDrawerMenuItemBody = require("./validation");

router.get("/", async (req, res) => {
  try {
    const drawerMenu = await drawerMenuCollection.find().toArray();
    res.status(200).send(
      JSON.stringify({
        status: 200,
        message: "Drawer Menu fetched successfully",
        data: drawerMenu,
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

router.post("/", async (req, res) => {
  const drawerMenuItemBody = req.body;
  if (checkDrawerMenuItemBody(drawerMenuItemBody)) {
    res.status(400).send(
      JSON.stringify({
        status: 400,
        message: "Bad Request",
      })
    );
  }

  try {
    const insertResult = await drawerMenuCollection.insertOne(
      drawerMenuItemBody
    );
    res.status(201).send(
      JSON.stringify({
        status: 201,
        message: "Drawer Menu item created successfully",
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
  const drawerMenuItemBody = req.body;
  if (checkDrawerMenuItemBody(drawerMenuItemBody)) {
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
    const updateResult = await drawerMenuCollection.updateOne(
      { _id: ObjectId(id) },

      { $set: drawerMenuItemBody }
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
          message: "Drawer Menu item updated successfully",
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
    const deleteResult = await drawerMenuCollection.deleteOne({
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
          message: "Drawer Menu item deleted successfully",
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

module.exports = router;
