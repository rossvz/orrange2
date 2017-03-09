
module.exports.connections = {

  mongolab: {
    adapter: 'sails-mongo',
    connectionString: process.env.MONGODB_URI
  }
}
