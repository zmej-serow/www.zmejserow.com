const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const fg = require('fast-glob');

module.exports = function(eleventyConfig) {
    eleventyConfig.addCollection('moments_images', _ => fg.sync(['moments/**/*.png', 'moments/**/*.jpg']));
    eleventyConfig.addCollection('recentposts', collection => collection.getAllSorted().reverse().slice(0, 10))
    eleventyConfig.addCollection('recentposts2',
        function(collection) {
            return collection.getAll().sort(function(a, b) {
                if (!b.published) { b.published = b.date };
                if (!a.published) { a.published = a.date };
                console.log(a);
                console.log('a →', a.published);
                console.log('b →', b.published);
                return b.published - a.published;
            });
        });
    eleventyConfig.addPassthroughCopy('**/*.jpg');
    eleventyConfig.addPassthroughCopy('**/*.png');
    eleventyConfig.addPassthroughCopy('**/*.mp4');
    eleventyConfig.addPassthroughCopy('**/*.mp3');
    eleventyConfig.addPassthroughCopy('css/*');
    eleventyConfig.addPassthroughCopy('CNAME');
    eleventyConfig.addPlugin(syntaxHighlight);

    eleventyConfig.setWatchJavaScriptDependencies(false);
};
