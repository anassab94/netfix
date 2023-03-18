const express = require("express");
const router = express.Router();
const { categoriesCollection } = require("../../MangoDB/db");

router.get("/all_channels", async (req, res) => {
  try {
    const allChannels = await categoriesCollection
      .find()
      .project({
        channels: 1,
      })
      .toArray();
    res.status(200).send(
      JSON.stringify({
        status: 200,
        message: "All Channels fetched successfully",
        data: allChannels.flatMap((category) => category.channels),
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
