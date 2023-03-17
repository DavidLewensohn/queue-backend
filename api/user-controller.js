const queueService = require('./queue-service.js')
const userService = require('../services/user-service.js')

module.exports = {
    getUsers,
    getUserById,
    addUser,
    updateUser,
    getUserByGToken,
    updateQueuerMeeting,
}

async function getUsers(req, res) {
    try {
        const users = await queueService.query(req.query)
        res.send(users)
        console.log('bring users');
    } catch (err) {
        console.log(err);
        // logger.error('Cannot get users', err)
        res.status(500).send({ err: 'Failed to get users' })
    }
}

async function getUserByGToken(req, res) {
    try {
        const gToken = req.params.gToken
        // console.log("getUserByGToken--gToken:", gToken);
        userData = await userService.getUserInfo(gToken)
        user = await queueService.findUserByEmail(userData.email)
        // console.log("getUserByGToken user: ", user);
        !user ? res.send('NEW_USER') : res.send(user)



    } catch (err) {
        console.log(err)
    }

}


async function getUserById(req, res) {
    try {
        const id = req.params.id
        const user = await queueService.getById(id)
        res.send(user)
        // res.json(user)

    } catch (err) {
        console.log(err)
        // logger.error("Failed to get user", err);
        res.status(500).send({ err: "Failed to get user" })
    }

}
async function addUser(req, res) {
    try {
        const user = req.body
        // console.log('user:', user);
        const newUser = await queueService.create(user)
        res.json(newUser)
    } catch (err) {
        res.status(500).send({ err: "Failed to add user" })
    }
}
async function updateUser(req, res) {
    try {
        const user = req.body
        // console.log('user:', user);
        const updatedUser = await queueService.update(user)
        res.json(updatedUser)
    } catch (err) {
        res.status(500).send({ err: "Failed to update user" })
    }
}
async function updateQueuerMeeting(req, res) {
    try {
        let isNewMeet = true
        const meeting = req.body
        // console.log('meeting:', meeting)
        queuer = await queueService.findUserByEmail(meeting.queuer.email)
        // console.log('queuer:', queuer)
        queuer.queuedMeetings.forEach(async (qMeet) => {
            // console.log('e.meetingID, meeting.meetingID', qMeet.meetingID, meeting.meetingID)
            if (qMeet.meetingID == meeting.meetingID) {
                isNewMeet = false
                qMeet.startTime = meeting.startTime
                qMeet.endTime = meeting.endTime
                qMeet.description = meeting.description
                qMeet.address = meeting.address
                const updatedQueuer = await queueService.update(queuer)
                res.json(updatedQueuer)
   
            }
        })
        if (isNewMeet) {
            queuer.queuedMeetings.push(meeting)
            const updatedQueuer = await queueService.update(queuer)
            res.json(updatedQueuer)
        }

    } catch (err) {
        res.status(500).send({ err: "Failed to update user" })
    }
}


