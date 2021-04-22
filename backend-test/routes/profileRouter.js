const app = require('express').Router();
const { UserProfile, User } = require('../models/')

const tokenVerifier = require('../middleware/tokenVerifier');

app.patch("/edit-profile", tokenVerifier, async (req, res) => {
    try {
        const userProfile = await UserProfile.update(req.body, { where: { userId: res.locals.id } })
        console.log(userProfile)
        res.status(200).send({
            'STATUS': 'PROFILE_EDIT_SUCCESS',
            'MESSAGE': 'Editing profile is success.',
            'Result': userProfile
        })
    } catch (err) {
        res.status(500).send({
            'STATUS': 'PROFILE_EDIT_FAILED',
            "MESSAGE": "Editing profile is failed, please try again.",
            "ERROR": err
        })
    }
})


module.exports = app;
