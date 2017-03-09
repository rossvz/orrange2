
module.exports.connections = {

  mongolab: {
    adapter: 'sails-mongo',
    url: process.env.MONGODB_URI
  }
}
