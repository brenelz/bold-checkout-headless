const contentful = require('contentful')
const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

exports.handler = async function(event, context, callback) {
  const entries = await client.getEntries({
    content_type: 'product',
  })

  const products = entries.items.map(function(entry) {
    return {
      title: entry.fields.title,
      variantTitle: entry.fields.variantTitle,
      weight: entry.fields.weight,
      taxable: entry.fields.taxable,
      image: entry.fields.image,
      requireShipping: entry.fields.requiresShipping,
      price: entry.fields.price,
    }
  })

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ products }),
  })
}
