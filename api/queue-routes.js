const express = require('express')
const router = express.Router()
const {getHosts, getHostById, addHost, updateHost,getUserByGToken} = require('./queue-controller.js')

router.get('/', getHosts)
router.get('/:id', getHostById)
router.get('/user/:gToken', getUserByGToken)
router.put('/', updateHost)
router.post('/', addHost) 

module.exports = router