const app = require('express').Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const neatCsv = require('neat-csv');
const fs = require('fs')

const { User, UserProfile, sequelize } = require('../models/')
const tokenVerifier = require('../middleware/tokenVerifier')

app.get("/getUser", tokenVerifier, async (req, res) => {
    try {
        const userProfile = await User.findOne({ where: { id: res.locals.id }, include: ['profile'], attributes: ['id', 'email', 'studentId', 'isTeacher', 'groupId'] })
        res.status(200).send({
            'STATUS': 'SUCCESS_GET_USER_DATA',
            'MESSAGE': 'Successfully get user data from the database',
            'userData': userProfile
        })
    } catch (err) {
        res.status(401).send({
            'STATUS': 'GET_USER_DATA_FAILED',
            'MESSAGE': 'Failed to get user data, please re-try to login again.',
            'ERROR': err
        })
    }
})

app.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } })
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, auth) => {
                console.log(auth)
                if (err) {
                    res.status(401).send({
                        'STATUS': 'LOGIN_FAILED_COMPARE_PASSWORD',
                        'MESSAGE': 'Failed to compare password, please try again.',
                        'ERROR': err
                    })
                }
                if (auth == true) {
                    const token = jwt.sign({
                        data: {
                            userId: user.id
                        }
                    }, process.env.JWT_PRIVATE_KEY, { expiresIn: '30d' });

                    res.status(201).send({
                        'STATUS': 'LOGIN_SUCCESS',
                        'token': token
                    })
                } else {
                    console.log("Password Incorrect")
                    res.status(401).send({
                        'STATUS': 'LOGIN_FAILED_PASSWORD_ERROR',
                        'MESSAGE': 'Your password is incorrect please try again.'
                    })
                }


            });
        } else {
            res.status(401).send({
                'STATUS': 'LOGIN_FAILED_USER_NOT_FOUND',
                'MESSAGE': 'User not found, please try again'
            })
        }
    } catch (err) {
        res.status(401).send({
            'STATUS': 'LOGIN_FAILED_CATCH',
            'MESSAGE': 'You failed to login.',
            'ERROR': err
        })
    }

})

app.post("/register", async (req, res) => {
    try {
        const studentsData = fs.readFileSync('student.csv')
        const studentsList = await neatCsv(studentsData)
        let studentData = {};
        const isStudent = studentsList.filter(student => {
            if (student.studentId == req.body.studentId) {
                studentData = student;
                return true
            } else {
                return false
            }

        })
        const isExists = await User.findOne({ where: { email: req.body.email } })
        if (isExists || isStudent == false) {
            if (isStudent == false) {
                res.status(406).send({
                    'STATUS': 'REGISTER_FAILED_NOT_STUDENT',
                    'MESSAGE': 'Your student id is not in database, please contact the teacher to confirm that you are in the class.'
                })
            } else {
                res.status(406).send({
                    'STATUS': 'REGISTER_FAILED_EXISTS',
                    'MESSAGE': 'User is exists, please do forget password or contact admin'
                })
            }
        } else {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(req.body.password, salt);

            const result = await sequelize.transaction(async (t) => {

                const user = await User.create({
                    email: req.body.email,
                    password: hash,
                    studentId: studentData.studentId,
                    isStudent: true,
                    isTeacher: false
                }, { transaction: t });

                await UserProfile.create({
                    userId: user.id,
                    firstName: studentData.firstName,
                    lastName: studentData.lastName,
                    phoneNumber: req.body.phoneNumber
                }, { transaction: t });
                return user;

            });
            const createdUser = await User.findOne({ where: { email: req.body.email }, include: ['profile'] })
            res.send({
                'STATUS': 'REGISTER_SUCCESS',
                'MESSAGE': 'Successfully register account',
            })
        }

    } catch (err) {
        res.status(406).send({
            'STATUS': 'REGISTER_FAILED_CATCH',
            'MESSAGE': err,
        })
    }
})

app.patch("/change-password", tokenVerifier, async (req, res) => {
    try {
        const result = await sequelize.transaction(async (t) => {
            const user = await User.findOne({ where: { id: res.locals.id } })
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(req.body.password, salt);
            user.password = hash
            await user.save()
            return user
        })
        res.status(200).send({
            'STATUS': 'CHANGE_PASSWORD_SUCCESS',
            'MESSAGE': 'Successfully change password.'
        })
    } catch (err) {
        res.status(500).send({
            'STATUS': 'CHANGE_PASSWORD_FAILED'
        })
    }
})

module.exports = app;