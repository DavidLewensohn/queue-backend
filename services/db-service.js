const MongoClient = require('mongodb').MongoClient
const dbURL = 'mongodb+srv://DavidLewensohn:aoJCPrNzRcXSn921@cluster0.dbpxdgu.mongodb.net/?retryWrites=true&w=majority'



module.exports = {
    getCollection,

}

// Database Name
const dbName = 'queue_db'

var dbConn = null
async function getCollection(collectionName) {
    console.log('db-service.getCollection')
    try {
        const db = await connect()
        const collection = await db.collection(collectionName)
        return collection
    } catch (err) {
        console.log(">>error in db-service.getCollection")
        // console.log(err)
        // logger.error('Failed to get Mongo collection', err)
        throw err
    }
}

async function connect() {
    console.log('db-service.connect')
    if (dbConn) return dbConn
    try {
        const client = await MongoClient.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
        const db = client.db(dbName)
        dbConn = db
        return db
    } catch (err) {
        console.log(">>error in db-service.connect")
        // console.log(err)
        // logger.error('Cannot Connect to DB', err)
        throw err
    }
}






