const express = require("express");
const connectToMongodb = require("./connection");
const cookieParser=require('cookie-parser')
const { checkForAuthentication,restrictTo }=require('./middlewares/auth')
const path = require("path");
const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute=require("./routes/user");

const app = express();
const PORT = 8000;

connectToMongodb("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("mongodb connected")
);
// setting view engine and views
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));


// here in the home.ejs file we are sendng the form data so we need to use one middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication)

app.use("/url", restrictTo(['NORMAL','ADMIN']), urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );
  res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
