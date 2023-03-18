const express = require("express");
const router = express.Router();
const { categoriesCollection } = require("../../MangoDB/db");
const ObjectId = require("mongodb").ObjectId;
const { checkCategoryBody } = require("./validation");
const channelsRouter = require("./channels/router");

router.get("/", async (req, res) => {
  try {
    const categories = await categoriesCollection.find().toArray();
    res.status(200).json({
      status: 200,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const category = await categoriesCollection.findOne({
      _id: ObjectId(id),
    });

    if (category === null) {
      res.status(404).json({
        status: 404,
        message: "Not Found",
      });
    } else {
      res.status(200).json({
        status: 200,
        message: "Category fetched successfully",
        data: category,
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

router.post("/", async (req, res) => {
  const categoryBody = req.body;
  if (checkCategoryBody(categoryBody)) {
    res.status(400).send({
      status: 400,
      message: "Bad Request",
    });
    return;
  }

  try {
    const categoryBodyWithIdOnChannel = {
      ...categoryBody,
      channels: categoryBody.channels.map((channel) => {
        return {
          ...channel,
          _id: ObjectId(),
        };
      }),
    };

    const insertionResult = await categoriesCollection.insertOne(
      categoryBodyWithIdOnChannel
    );
    res.status(200).send({
      status: 200,
      message: "Category inserted successfully",
      insertedId: insertionResult.insertedId,
      created_at: new Date(),
      channels_length: categoryBody.channels.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: "Internal Server Error",
    });
  }
});

router.put("/:id", async (req, res) => {
  const categoryBody = req.body;
  if (checkCategoryBody(categoryBody)) {
    res.status(400).json({
      status: 400,
      message: "Bad Request",
    });
    return;
  }

  try {
    const id = req.params.id;
    const updateResult = await categoriesCollection.updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          category_title: categoryBody.category_title,
          updated_at: new Date(),
        },
      }
    );
    if (updateResult.modifiedCount === 0) {
      res.status(404).json({
        status: 404,
        message: "Not Found",
      });
    } else {
      res.status(200).json({
        status: 200,
        message: "Category updated successfully",
        updatedId: id,
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

router.delete("/", async (req, res) => {
  try {
    const deleteResult = await categoriesCollection.deleteMany({});
    res.status(200).json({
      status: 200,
      message: "Categories deleted successfully",
      deletedCount: deleteResult.deletedCount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteResult = await categoriesCollection.deleteOne({
      _id: ObjectId(id),
    });

    if (deleteResult.deletedCount === 0) {
      res.status(404).json({
        status: 404,
        message: "Not Found",
      });

      return;
    }

    res.status(200).json({
      status: 200,
      message: "Category deleted successfully",
      deletedId: id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
});

router.use("/:id/channels", (req, res, next) => {
  req.categoryId = req.params.id;
  next();
});

router.use("/:id/channels", channelsRouter);

module.exports = router;
