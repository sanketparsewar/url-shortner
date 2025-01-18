const shortId = require("short-id");
const URL = require("../models/url");

async function handleGeneratenewShortURL(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "Url is required" });
  }
  const shortID = shortId.generate();
  await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy: req.user._id, 
  });

  // here  we want to show the home page so here we are rendering the home page as a response to our post method
  return res.render('home',{
    id:shortID,
  })
  // return res.json({ id: shortID });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  if (!result) {
    return res.status(404).json({ error: "Short ID not found" });
  }
  return res.json({
    visitCount: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = { handleGeneratenewShortURL, handleGetAnalytics };
