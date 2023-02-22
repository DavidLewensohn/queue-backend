const dbService = require('../services/db-service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    create,
    update,
    findUserByEmail
}

async function query() {
    console.log('queue-service.query')
    try {
        const collection = await dbService.getCollection('hosts')
        const hosts = await collection.find().toArray()
        console.log('hosts:', hosts)
        return hosts
    } catch (err) {
        console.log(">>error in queue-service.query")
        // console.log(err)
        // logger.error('cannot find hosts', err)
        throw err
    }
}
async function getById(hostId) {
    console.log('queue-service.getById')
    try {
        const collection = await dbService.getCollection('hosts')
        const host = await collection.findOne({ _id: ObjectId(hostId) })
        console.log('host:', host)
        return host
    } catch (err) {
        console.log(">>error in queue-service.getById")
        console.log(err)
        // logger.error('cannot find host', err)
        throw err
    }
}

async function create(host) {
    try {
        const collection = await dbService.getCollection('hosts')
        const newHost = await collection.insertOne(host)
        return host
    } catch (err) {
        console.log(err)
        throw err
    }
}
async function update(host) {
    try {
        const id = ObjectId(host._id)
        delete host._id
        const collection = await dbService.getCollection('hosts')
        await collection.updateOne({ _id: id }, { $set: { ...host } })
        host._id = id
        console.log('updated host:', host)
        return host
    } catch (err) {
        console.log(err)
        throw err
    }
}
async function findUserByEmail(email) {
    const collection = await dbService.getCollection('hosts')
    const user = await collection.findOne({ email });
    return user;
  }
