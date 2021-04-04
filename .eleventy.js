const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const fg = require('fast-glob');

module.exports = function(eleventyConfig) {
    eleventyConfig.addCollection('moments_images', _ => fg.sync(['moments/**/*.png', 'moments/**/*.jpg']));
    eleventyConfig.addCollection('recentposts', collection => collection.getAllSorted().reverse().slice(0, 10))
    eleventyConfig.addPassthroughCopy('**/*.jpg');
    eleventyConfig.addPassthroughCopy('**/*.png');
    eleventyConfig.addPassthroughCopy('**/*.mp4');
    eleventyConfig.addPassthroughCopy('**/*.mp3');
    eleventyConfig.addPassthroughCopy('css/*');
    eleventyConfig.addPassthroughCopy('CNAME');
    eleventyConfig.addPlugin(syntaxHighlight);

    eleventyConfig.setWatchJavaScriptDependencies(false);
};
