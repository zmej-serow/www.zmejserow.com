const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
    // Find and copy any `jpg` files, maintaining directory structure.
    eleventyConfig.addPassthroughCopy("**/*.jpg");
    eleventyConfig.addPassthroughCopy("css/*");
    eleventyConfig.addPassthroughCopy("CNAME");
    eleventyConfig.addPlugin(syntaxHighlight);
};
