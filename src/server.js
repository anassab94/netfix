/// Imports
require("dotenv").config();
const express = require("express");
const app = express();
const allChannelsRoutes = require("./routes/all_channels/router");
const appSettingsRoutes = require("./routes/app_settings/router");
const login = require("./routes/login/router");
const categoryRoutes = require("./routes/categories/router");
const drawerMenuRoutes = require("./routes/drawer_menu/router");
const matchEventsRoutes = require("./routes/event_matches/router");
const {
  jsonMiddleware,
  corsMiddleware,
  headersMiddleware,
} = require("./core/middleware");

/// Middleware
app.use(jsonMiddleware);
app.use(corsMiddleware);
app.use(headersMiddleware);

/// Routes
app.use("/login", login);
app.use("/categories", categoryRoutes);
app.use("/match_events", matchEventsRoutes);
app.use("/app_settings", appSettingsRoutes);
app.use("/all_channels", allChannelsRoutes);
app.use("/drawer_menu", drawerMenuRoutes);

/// Server
app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT + "");
});
