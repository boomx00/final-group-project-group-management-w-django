const app = require('express').Router();
const { User, UserProfile, Group, Sprint, Tag, JoinGroupRequest, ProjectGroupRequest, sequelize } = require('../models/')

const tokenVerifier = require('../middleware/tokenVerifier');
const { Op } = require("sequelize");
const e = require('express');

app.get("/get-all-group", tokenVerifier, async (req, res) => {
    try {
        const groups = await Group.findAll({
            attributes: ['id', 'name', 'topic', 'ownerId', 'description', 'requirements'],
            include: [{
                model: Tag,
                attributes: ['id', 'name']
            },
            {
                model: User,
                as: 'Members',
                attributes: ['id'],
            }]
        })
        res.status(200).send({
            'STATUS': 'SUCCESS_GET_ALL_GROUPS',
            'MESSAGE': 'Successfully get all groups',
            'groups': groups
        })
    } catch (err) {
        res.status(500).send({
            'STATUS': 'FAILED_GET_ALL_GROUPS',
            'MESSAGE': 'Failed to get all groups',
            'ERROR': err
        })
    }
})

app.get("/get-own-group", tokenVerifier, async (req, res) => {
    try {
        const result = await sequelize.transaction(async (t) => {
            const user = await User.findOne({ where: { id: res.locals.id }, attributes: ['groupId'] }, { transaction: t })
            const group = await user.getGroup({ include: ['Tags', { model: User, as: 'Members', attributes: ['id'], include: { model: UserProfile, as: 'profile', attributes: ['firstName', 'lastName'] } }, { model: Sprint, attributes: ['id', 'summary', 'progress', 'type'] }], transaction: t })
            return group
        })
        if (result) {
            res.status(200).send({
                'STATUS': 'GET_OWN_GROUP_SUCCESS',
                'MESSAGE': 'Successfully get own group data from the database',
                'GROUP': result
            })
        } else {
            res.status(200).send({
                'STATUS': 'GET_OWN_GROUP_NOT_EXISTS',
                'MESSAGE': 'Failed to get own group data from the database',
                'GROUP': result
            })
        }

    } catch (err) {
        res.status(500).send({
            'STATUS': 'GET_OWN_GROUP_FAILED',
            'MESSAGE': 'You failed to get your own group data, please try again.',
            'ERROR': err
        })
    }
})

app.post("/create-group", tokenVerifier, async (req, res) => {
    try {
        const ownGroup = await Group.findOne({ where: { ownerId: res.locals.id } })
        const isInGroup = await User.findOne({ where: { id: res.locals.id }, attributes: ['groupId'] })
        if (ownGroup != null || isInGroup.groupId != null) {
            res.status(409).send({
                'STATUS': 'CREATE_GROUP_EXISTS_GROUP',
                "MESSAGE": "You already have a group, please leave the existing group or delete your group.",
            })
        } else {
            const result = await sequelize.transaction(async (t) => {
                const groupCreated = await Group.create({
                    name: req.body.name,
                    topic: req.body.topic,
                    description: req.body.description,
                    requirements: req.body.requirements,
                    ownerId: res.locals.id
                }, { transaction: t })
                const sprints = await Sprint.bulkCreate([
                    {
                        type: 1,
                        summary: "First Sprint Summary",
                        progress: "NOT_STARTED"
                    },
                    {
                        type: 2,
                        summary: "Second Sprint Summary",
                        progress: "NOT_STARTED"
                    },
                    {
                        type: 3,
                        summary: "Third Sprint Summary",
                        progress: "NOT_STARTED"
                    },
                    {
                        type: 4,
                        summary: "Fourth Sprint Summary",
                        progress: "NOT_STARTED"
                    },
                    {
                        type: 5,
                        summary: "Fifth Sprint Summary",
                        progress: "NOT_STARTED"
                    },
                ], { transaction: t })
                await Promise.all(req.body.tags.map(async reqTag => {
                    let [tag, createdTag] = await Tag.findOrCreate({
                        where: { name: reqTag },
                        defaults: {
                            name: reqTag
                        }, transaction: t
                    });
                    if (tag != null) {
                        await groupCreated.addTag(tag, { transaction: t })
                    } else if (createdTag != null) {
                        await groupCreated.addTag(createdTag, { transaction: t })
                    }

                }))

                await groupCreated.addSprints(sprints, { transaction: t })
                await User.update({ groupId: groupCreated.id }, { where: { id: res.locals.id }, transaction: t })

                return groupCreated;

            });
            res.status(201).send({
                'STATUS': 'CREATE_GROUP_SUCCESS',
                'MESSAGE': 'Successfull creating group.',
                'GROUP': result
            })
        }
    } catch (err) {
        res.status(500).send({
            'STATUS': 'CREATE_GROUP_FAILED',
            "MESSAGE": "Failed to create group, please try again.",
            "ERROR": err
        })
    }
})

app.patch("/edit-group", tokenVerifier, async (req, res) => {
    try {
        const result = await sequelize.transaction(async (t) => {
            const group = await Group.findOne({ where: { id: req.body.id, ownerId: res.locals.id } }, { transaction: t })
            if (group && group.ownerId == res.locals.id) {
                const willRemovedTags = await group.getTags();
                console.log(willRemovedTags)
                await group.removeTags(willRemovedTags, { transaction: t })

                await Promise.all(req.body.tags.map(async reqTag => {
                    let [tag, createdTag] = await Tag.findOrCreate({
                        where: { name: reqTag },
                        defaults: {
                            name: reqTag
                        }, transaction: t
                    });
                    if (tag != null) {
                        await group.addTag(tag, { transaction: t })
                    } else if (createdTag != null) {
                        await group.addTag(createdTag, { transaction: t })
                    }

                }))

                group.set({ name: req.body.name, topic: req.body.topic, description: req.body.description, transaction: t })
                await group.save({ transaction: t })
                return group
            } else {
                return null
            }
        })
        if (result != null) {
            res.status(200).send({
                "STATUS": "GROUP_EDIT_SUCCESS",
                "MESSAGE": "Successfully edit the group",
                "GROUP": result
            })
        } else {
            res.status(409).send({
                "STATUS": "GROUP_EDIT_FAILED",
                "MESSAGE": "Failed to edit the group",
            })
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({
            "STATUS": "GROUP_EDIT_FAILED",
            "MESSAGE": "Failed edit the group",
            "ERROR": err
        })
    }
})

app.get("/get-group-sprints", tokenVerifier, async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: res.locals.id }, attributes: ['groupId'] })
        const sprints = await Sprint.findAll({ where: { groupId: user.groupId } })

        res.status(200).send({
            'STATUS': 'GET_GROUP_SPRINTS_SUCCESS',
            'MESSAGE': 'Success to get all of the group sprints',
            'Sprints': sprints
        })
    } catch (err) {
        res.status(200).send({
            'STATUS': 'GET_GROUP_SPRINTS_FAILED',
            'MESSAGE': 'Failed to get all of the group sprints',
            'Sprints': err
        })
    }
})

app.patch("/edit-sprint", tokenVerifier, async (req, res) => {
    try {
        console.log(req.body)
        const result = await sequelize.transaction(async (t) => {
            const user = await User.findOne({ where: { id: res.locals.id }, attributes: ['id', 'groupId'] }, { transaction: t })
            const group = await user.getGroup({ attributes: ['id', 'ownerId'], transaction: t })
            if (user.groupId == group.id && user.id == group.ownerId) {
                const sprint = await Sprint.findOne({ where: { id: req.body.sprintId, groupId: group.id } }, { transaction: t })
                sprint.summary = req.body.newData.summary
                sprint.progress = req.body.newData.progress
                sprint.imageURL = req.body.imageURL
                await sprint.save({ transaction: t })
                return sprint
            } else {
                return null
            }
        })
        if (result == null) {
            res.status(401).send({
                'STATUS': 'SPRINT_EDIT_NOT_GROUP',
                'MESSAGE': 'Sprint that you edit is not your sprint group, please try again',
            })
        } else {
            res.status(200).send({
                'STATUS': 'SPRINT_EDIT_SUCCESS',
                'MESSAGE': "Successfully edit the sprint",
                "EDITED_SPRINT": result
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({
            'STATUS': 'SPRINT_EDIT_FAILED',
            'MESSAGE': 'Failed to edit the sprint, please try again',
            'ERROR': err
        })
    }
})

// Group membership endpoints

app.get("/get-own-request", tokenVerifier, async (req, res) => {
    try {
        const joinRequests = await JoinGroupRequest.findAll({ where: { userId: res.locals.id } })
        res.status(200).send({
            'STATUS': 'SUCCESS_GET_OWN_REQUEST',
            'MESSAGE': 'Successfully get all own join group request',
            'REQUESTS': joinRequests
        })
    } catch (error) {
        res.status(500).send({
            'STATUS': 'FAILED_GET_OWN_REQUEST',
            'MESSAGE': 'Failed to get own join group requests'
        })
    }
})

app.get("/get-request-join-group", tokenVerifier, async (req, res) => {
    try {
        const result = await sequelize.transaction(async (t) => {
            const userGroup = await User.findOne({ where: { id: res.locals.id }, attributes: ['id', 'groupId'] }, { transaction: t })
            const group = await Group.findOne({ where: { id: userGroup.groupId }, attributes: ['ownerId'] }, { transaction: t })
            if (group.ownerId == userGroup.id) {
                const requests = await JoinGroupRequest.findAll({
                    where: { groupId: userGroup.groupId },
                    include: [
                        {
                            model: User,
                            as: 'applicant',
                            attributes: ['id', 'studentId'],
                            include: [
                                {
                                    model: UserProfile,
                                    attributes: ['firstName', 'lastName'],
                                    as: 'profile'
                                }
                            ]
                        }
                    ]
                }, { transaction: t })
                return requests
            } else {
                return null
            }
        })
        if (result == null) {
            res.status(200).send({
                'STATUS': 'GET_ALL_JOIN_GROUP_REQUEST_FAILED',
                "MESSAGE": "You are not the owner of the group",
                "Requests": result
            })
        } else {
            res.status(200).send({
                'STATUS': 'GET_ALL_JOIN_GROUP_REQUEST_SUCCESS',
                "MESSAGE": "Successfully to get all join group requests.",
                "Requests": result
            })
        }

    } catch (err) {
        res.status(500).send({
            'STATUS': 'GET_ALL_JOIN_GROUP_REQUEST_FAIL',
            "MESSAGE": "Failed to get all join group requests.",
            "ERROR": err
        })
    }
})

app.post("/join-group", tokenVerifier, async (req, res) => {
    try {
        const result = await sequelize.transaction(async (t) => {
            const user = await User.findOne({ where: { id: res.locals.id }, attributes: ['id', 'groupId'] }, { transaction: t })
            const userGroup = await user.getGroup({ transaction: t })
            const group = await Group.findOne({ where: { id: req.body.groupId }, include: ['Members'] }, { transaction: t })
            if (userGroup || group.Members.length > 7) {
                return null;
            } else {
                const joinRequest = await JoinGroupRequest.create({
                    userId: res.locals.id,
                    groupId: req.body.groupId,
                    approved: null
                }, { transaction: t })
                return joinRequest
            }
        })
        if (result != null) {
            res.status(200).send({
                'STATUS': 'JOIN_GROUP_REQUEST_SUCCESS',
                'MESSAGE': 'Success creating request to join a group, please wait the group owner to accept the request.',
                'result': result
            })
        } else {
            res.status(409).send({
                'STATUS': 'JOIN_GROUP_ALREADY_EXISTS',
                "MESSAGE": 'You already make a join group request, please cancel the last one to join another group.'
            })
        }

    } catch (err) {
        res.status(500).send({
            'STATUS': 'JOIN_GROUP_REQUEST_FAILED',
            'MESSAGE': 'Failed to creating request to join a group, please try again.'
        })
    }
})

app.patch("/cancel-join-group", tokenVerifier, async (req, res) => {
    try {
        const result = await sequelize.transaction(async (t) => {
            const joinRequest = await JoinGroupRequest.findOne({ where: { id: req.body.joinId } })

            joinRequest.confirm = false
            await joinRequest.save({ transaction: t })

            return joinRequest
        })

        res.status(200).send({
            'STATUS': 'CANCEL_JOIN_SUCCESS',
            'MESSAGE': 'Succesfully cancel to join a group',
            'RESULT': result
        })
    } catch (err) {
        res.status(500).send({
            'STATUS': 'CANCEL_JOIN_FAILED',
            'MESSAGE': 'Failed to cancel to join a group',
            'ERROR': err
        })
    }
})

app.patch("/confirm-join-group", tokenVerifier, async (req, res) => {
    try {
        const result = await sequelize.transaction(async (t) => {
            const joinRequest = await JoinGroupRequest.findOne({
                where: { id: req.body.joinId },
                attributes: ['id', 'userId', 'groupId', 'approved']
            }, { transaction: t })
            const user = await User.findOne({ where: { id: res.locals.id }, attributes: ['groupId'] })
            if (joinRequest.approved = true && user.groupId == null) {
                const user = await User.findOne({ where: { id: res.locals.id } }, { transaction: t })
                user.groupId = joinRequest.groupId
                await user.save({ transaction: t })

                joinRequest.confirm = true
                await joinRequest.save({ transaction: t })

                await JoinGroupRequest.update({ approved: false },
                    { where: { id: res.locals.id, approved: null }, transaction: t })

                return user
            } else {
                return null
            }
        })
        if (result == null) {
            res.status(401).send({
                'STATUS': 'CONFIRM_JOIN_FAILED',
                'MESSAGE': 'You are not approved but try to confirm join?'
            })
        } else {
            res.status(200).send({
                'STATUS': 'CONFIRM_JOIN_SUCCESS',
                'MESSAGE': 'Successfully confirm join group'
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({
            'STATUS': 'CONFIRM_JOIN_ERROR',
            'MESSAGE': 'Confirm to join erorr, due system error'
        })
    }
})

app.patch("/accept-join-group", tokenVerifier, async (req, res) => {
    try {
        const result = await sequelize.transaction(async (t) => {
            const joinRequest = await JoinGroupRequest.findOne({
                where: { id: req.body.joinId },
                attributes: ['id', 'userId', 'groupId', 'approved']
            }, { transaction: t })
            const group = await Group.findOne({ where: { id: joinRequest.groupId }, attributes: ['ownerId'] })
            if (group.ownerId == res.locals.id) {
                joinRequest.approved = true;
                await joinRequest.save({ transaction: t })
                return joinRequest
            } else {
                return null
            }
        })
        if (result == null) {
            res.status(401).send({

                'STATUS': 'ACCEPT_JOIN_GROUP_FAILED',
                'MESSAGE': 'You are not the owner of the group',
                'RESULT': result
            })
        } else {
            res.status(200).send({

                'STATUS': 'ACCEPT_JOIN_GROUP_SUCCESS',
                'MESSAGE': 'Successfully accept person to join the group.',
                'RESULT': result
            })
        }

    } catch (err) {
        res.status(500).send({
            'STATUS': 'ACCEPT_JOIN_GROUP_FAILED',
            'MESSAGE': 'Failed to accept person to join the group.',
        })
    }
})

app.post("/decline-join-group", tokenVerifier, async (req, res) => {
    try {
        const result = await sequelize.transaction(async (t) => {
            const joinRequest = await JoinGroupRequest.findOne({
                where: { id: req.body.joinId },
                attributes: ['id', 'userId', 'groupId', 'approved']
            }, { transaction: t })
            const group = await Group.findOne({ where: { id: joinRequest.groupId }, attributes: ['ownerId'] })
            if (group.ownerId == res.locals.id) {
                joinRequest.approved = false;
                await joinRequest.save({ transaction: t })
                return joinRequest
            } else {
                return null
            }
        })
        if (result == null) {
            res.status(401).send({

                'STATUS': 'DECLINE_JOIN_GROUP_FAILED',
                'MESSAGE': 'You failed to decline join group request, you are not the group owner',
                'RESULT': result
            })
        } else {
            res.status(200).send({

                'STATUS': 'DECLINE_JOIN_GROUP_SUCCESS',
                'MESSAGE': 'Successfully to decline person to join the group.',
                'RESULT': result
            })
        }
    } catch (err) {
        res.status(500).send({
            'STATUS': 'DECLINE_JOIN_GROUP_FAILED',
            'MESSAGE': 'Failed to decline person to join the group.',
        })
    }
})

app.patch("/leave-group", tokenVerifier, async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: res.locals.id }, attributes: ['id', 'groupId'], include: [{ model: Group, as: 'Group', attributes: ['id', 'ownerId'] }] })
        console.log(user)
        if (user.Group.ownerId == user.id) {
            const destroyedGroup = await Group.destroy({ where: { id: user.Group.id } })
            res.status(200).send({
                'STATUS': 'LEAVE_GROUP_SUCCESS',
                'MESSAGE': 'Successfully leave the group, cause you are the owner of the group the group will be destroyed',
                'GROUP': destroyedGroup
            })
        } else {
            user.groupId = null,
                await user.save()
            res.status(200).send({
                'STATUS': 'LEAVE_GROUP_SUCCESS',
                'MESSAGE': 'Successfully leave the group.',
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({
            'STATUS': 'LEAVE_GROUP_FAILED',
            'MESSAGE': 'Failed to leave the group.',
            'ERROR': err
        })
    }
})

// Group Proposal ENDPOINTS

app.post("/send-group-proposal", tokenVerifier, async (req, res) => {
    try {
        const group = await Group.findOne({ where: { ownerId: res.locals.id } })
        if (group.projectApproved == "PENDING" || group.ProjectApproved == "APPROVED") {
            res.status(409).send({
                'STATUS': 'SEND_GROUP_PROPOSAL_ALREADY',
                'MESSAGE': 'Your group have send the proposal but not in progress, or it is already accepted.'
            })
        } else {
            const result = await sequelize.transaction(async (t) => {
                const proposalRequest = await ProjectGroupRequest.create({
                    groupId: group.id,
                    status: "PENDING"
                }, { transaction: t })
                await Group.update({ projectApproved: "PENDING" }, { where: { id: group.id } }, { transaction: t })
                return proposalRequest
            })
            res.status(200).send({
                'STATUS': 'SEND_GROUP_PROPOSAL_SUCCESS',
                'MESSAGE': 'Your group successly send the group proposal to the teacher.',
                'RESULT': result
            })
        }
    } catch (err) {
        res.status(500).send({
            'STATUS': 'SEND_GROUP_PROPOSAL_FAIL_SYSTEM',
            "MESSAGE": "Failed to send the group project proposal, due to system error.",
            "ERROR": err
        })
    }
})

app.post("/approve-group-proposal", tokenVerifier, async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: res.locals.id }, attributes: ['isTeacher'] })
        if (user.isTeacher == true) {
            if (req.body.approval == "ACCEPT") {
                const result = await sequelize.transaction(async (t) => {
                    const groupProposal = await ProjectGroupRequest.update({ status: "ACCEPTED" }, { where: { groupId: req.body.groupId } }, { transaction: t })
                    await Group.update({ projectApproved: "ACCEPTED" }, { where: { id: req.body.groupId } })
                    return groupProposal
                })
                res.status(200).send({
                    'STATUS': 'APPROVAL_GROUP_PROPOSAL_SUCCESS',
                    'MESSAGE': 'You are successfull accept group proposal request.',
                    'RESULT': result
                })
            } else if (req.body.approval == "DECLINE") {
                const result = await sequelize.transaction(async (t) => {
                    const groupProposal = await ProjectGroupRequest.update({ status: "DECLINED" }, { where: { groupId: req.body.groupId } }, { transaction: t })
                    await Group.update({ projectApproved: "DECLINED" }, { where: { id: req.body.groupId } })
                    return groupProposal
                })
                res.status(200).send({
                    'STATUS': 'APPROVAL_GROUP_PROPOSAL_SUCCESS',
                    'MESSAGE': 'You are successfully decline group proposal request.',
                    'RESULT': result
                })
            }
        } else {
            res.status(401).send({
                'STATUS': 'ACCEPT_GROUP_PROJECT_FAIL_AUTH',
                "MESSAGE": 'You are not a teacher, so you cannot approve or decline any group proposal.'
            })
        }
    } catch (err) {
        res.status(500).send({
            'STATUS': 'ACCEPT_GROUP_PROJECT_FAIL_SYSTEM',
            "MESSAGE": "Failed to approve or decline the group project proposal, due to system error.",
            "ERROR": err
        })
    }
})

module.exports = app;
