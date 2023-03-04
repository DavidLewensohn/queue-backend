const queueService = require('./queue-service.js')
const userService = require('../services/user-service.js')

module.exports = {
    getHosts,
    getHostById,
    addHost,
    updateHost,
    getUserByGToken,
    updateQueuerMeeting,
}

async function getHosts(req, res) {
    try {
        const hosts = await queueService.query(req.query)
        res.send(hosts)
        console.log('bring hosts');
    } catch (err) {
        console.log(err);
        // logger.error('Cannot get hosts', err)
        res.status(500).send({ err: 'Failed to get hosts' })
    }
}

async function getUserByGToken(req, res) {
    try {
        const gToken = req.params.gToken
        // console.log("getUserByGToken--gToken:", gToken);
        userData = await userService.getUserInfo(gToken)
        user = await queueService.findUserByEmail(userData.email)
        console.log("getUserByGToken user: ", user);
        !user ? res.send('NEW_USER') : res.send(user)



    } catch (err) {
        console.log(err)
    }

}


async function getHostById(req, res) {
    try {
        const id = req.params.id
        const host = await queueService.getById(id)
        res.send(host)
        // res.json(host)

    } catch (err) {
        console.log(err)
        // logger.error("Failed to get host", err);
        res.status(500).send({ err: "Failed to get host" })
    }

}
async function addHost(req, res) {
    try {
        const host = req.body
        console.log('host:', host);
        const newHost = await queueService.create(host)
        res.json(newHost)
    } catch (err) {
        res.status(500).send({ err: "Failed to add host" })
    }
}
async function updateHost(req, res) {
    try {
        const host = req.body
        console.log('host:', host);
        const updatedHost = await queueService.update(host)
        res.json(updatedHost)
    } catch (err) {
        res.status(500).send({ err: "Failed to update host" })
    }
}
async function updateQueuerMeeting(req, res) {
    try {
        const meeting = req.body
        console.log('meeting.queuerEmail:', meeting.queuerEmail)
        queuer = await queueService.findUserByEmail(meeting.queuerEmail)
        console.log('queuer:', queuer)
        queuer.queuedMeetings.forEach(async (e) => {
            console.log('e.meetingID, meeting.meetingID', e.meetingID, meeting.meetingID);
            if (e.meetingID == meeting.meetingID){ 

                e.date = meeting.date
                e.description = meeting.description
                e.length = meeting.length
                e.address = meeting.address
                const updatedQueuer = await queueService.update(queuer)
                res.json(updatedQueuer)
            }
        })

    } catch (err) {
        res.status(500).send({ err: "Failed to update host" })
    }
}


