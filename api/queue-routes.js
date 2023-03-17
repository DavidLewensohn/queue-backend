const express = require('express')
const router = express.Router()
const { getUsers, getUserById, addUser, updateUser, getUserByGToken, updateQueuerMeeting } = require('./user-controller.js')

router.get('/', getUsers)
router.get('/:id', getUserById)
router.get('/user/:gToken', getUserByGToken)
router.put('/', updateUser)
router.put('/meeting', updateQueuerMeeting)
router.post('/', addUser)

module.exports = router