const { SitemapStream, streamToPromise } = require("sitemap");
const { createWriteStream } = require("fs");
const { resolve } = require("path");

const links = [
  { url: "/", changefreq: "weekly", priority: 1 },
  { url: "/b2c", changefreq: "weekly", priority: 0.9 },
  { url: "/b2b", changefreq: "weekly", priority: 0.9 },
  { url: "/about", changefreq: "weekly", priority: 0.8 },
  { url: "/resources", changefreq: "weekly", priority: 0.6 },
  { url: "/business-support", changefreq: "weekly", priority: 0.6 },
  { url: "/technical-support", changefreq: "weekly", priority: 0.6 },
  { url: "/terms-of-use", changefreq: "weekly", priority: 0.1 },
  { url: "/imprint", changefreq: "weekly", priority: 0.1 },
  { url: "/vacancy", changefreq: "weekly", priority: 0.1 },
  { url: "/jobs", changefreq: "weekly", priority: 0.1 },
  { url: "/privacy-policy", changefreq: "monthly", priority: 0.1 },
  { url: "/aml-policy", changefreq: "monthly", priority: 0.1 },
  { url: "/cookie-policy", changefreq: "monthly", priority: 0.1 },
];

const stream = new SitemapStream({ hostname: "https://nefentus.com" });

// Create a write stream to save the sitemap
const sitemapWriteStream = createWriteStream(resolve("./public/sitemap.xml"));

// Pipe the sitemap stream to the write stream
stream.pipe(sitemapWriteStream);

// Write each link to the stream
links.forEach((link) => stream.write(link));

// End the stream
stream.end();

// Convert stream to a promise to handle completion
streamToPromise(stream)
  .then(() => {
    console.log("Sitemap successfully created!");
  })
  .catch(console.error);
