const fs = require('fs')
const path = require('path')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const cx = require('nanoclass')
const imageUrlBuilder = require('@sanity/image-url')
const client = require('./src/util/client')

const builder = imageUrlBuilder(client)

module.exports = function(eleventyConfig) {
  // Resolves hashed filesnames for assets generated by webpack
  // (See usage in templates/layouts/base.liquid)
  eleventyConfig.addLiquidShortcode('webpackAsset', async (name) => {
    const manifestData = await readFile(
      path.resolve(__dirname, 'src/templates/includes/_manifest.json'),
    )
    const manifest = JSON.parse(manifestData)

    return manifest[name]
  })

  // Prints JSON to the page. Useful for debugging inside templates
  eleventyConfig.addShortcode(
    'debug',
    (value) =>
      `<div class="ph25 pv100">
        <pre
          class="p25 f14 mono bg-blue c-tan"
          style="width: 100%; overflow: auto; border-radius: 6px;"
        >
          ${JSON.stringify(value, null, 2)}
        </pre>
      </div>`,
  )

  // Builds urls for images using the Sanity image pipeline
  eleventyConfig.addShortcode('urlFor', (image, width) => {
    return builder
      .image(image)
      .width(width) // resize the image
      .auto('format') // automatically serves WebP for supporting browsers
      .url()
  })

  // Concatenates classnames using a tiny utility called nanoclass
  // https://github.com/estrattonbailey/nanoclass
  eleventyConfig.addShortcode('classNames', (...all) => cx(all))

  // Copy favicons into the root of the build directory
  eleventyConfig.addPassthroughCopy({ 'src/assets/icons': '/' })

  // Configure eleventy directory names and locations
  return {
    dir: {
      input: 'src/templates',
      data: '../data',
      includes: 'includes',
      layouts: 'layouts',
      output: 'build',
    },
  }
}
