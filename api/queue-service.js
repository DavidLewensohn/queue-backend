const { ObjectId } = require('mongodb');
const { getCollection } = require('../services/db-service');

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
        const collection = await getCollection('users')
        const users = await collection.find().toArray()
        console.log('users:', users)
        return users
    } catch (err) {
        console.log(">>error in queue-service.query")
        // console.log(err)
        // logger.error('cannot find users', err)
        throw err
    }
}
async function getById(userId) {
    console.log('queue-service.getById')
    try {
        const collection = await getCollection('users')
        const user = await collection.findOne({ _id: ObjectId(userId) })
        console.log('user:', user)
        return user
    } catch (err) {
        console.log(">>error in queue-service.getById")
        console.log(err)
        // logger.error('cannot find user', err)
        throw err
    }
}

async function create(user) {
    try {
        const collection = await getCollection('users')
        const newHost = await collection.insertOne(user)
        return user
    } catch (err) {
        console.log(err)
        throw err
    }
}
async function update(user) {
    try {
        const id = ObjectId(user._id)
        delete user._id
        const collection = await getCollection('users')
        await collection.updateOne({ _id: id }, { $set: { ...user } })
        user._id = id
        console.log('updated user:', user)
        return user
    } catch (err) {
        console.log(err)
        throw err
    }
}
async function findUserByEmail(email) {
    const collection = await getCollection('users')
    const user = await collection.findOne({ email });
    return user;
  }
