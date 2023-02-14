const model = require('./model')

module.exports = {
    GET_ANSWERS: async (req, res) => {
        try {
            const { survayId, userId, answer, max, min } = req.query

            if (survayId && answer == 6) {
                const getbySurvayIdV6Comment = await model.getbySurvayIdV6Comment(Number(survayId))
                const getbyMaleWithV6Comment = await model.getbyMaleWithV6Comment(Number(survayId))
                const getbyFemaleWithV6Comment = await model.getbyFemaleWithV6Comment(Number(survayId))

                if (getbySurvayIdV6Comment) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: getbySurvayIdV6Comment,
                        count: getbySurvayIdV6Comment.length,
                        male: getbyMaleWithV6Comment.length,
                        female: getbyFemaleWithV6Comment.length
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found",
                    })
                }

            } else if (answer && survayId || min || max) {
                if (max && min) {
                    const getbySurvayIdAnswerFilterByMaxMin = await model.getbySurvayIdAnswerFilterByMaxMin(Number(survayId), Number(answer), Number(max), Number(min))
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: getbySurvayIdAnswerFilterByMaxMin
                    })
                } else if (max) {
                    const getbySurvayIdAnswerFilterByMax = await model.getbySurvayIdAnswerFilterByMax(Number(survayId), Number(answer), Number(max))
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: getbySurvayIdAnswerFilterByMax
                    })
                } else if (min) {
                    const getbySurvayIdAnswerFilterByMin = await model.getbySurvayIdAnswerFilterByMin(Number(survayId), Number(answer), Number(min))
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: getbySurvayIdAnswerFilterByMin
                    })
                }
            } else if (answer && survayId) {
                const getbyMaleWithAnswer = await model.getbyMaleWithAnswer(Number(survayId), Number(answer))
                const getbyFemaleWithAnswer = await model.getbyFemaleWithAnswer(Number(survayId), Number(answer))

                if (getbySurvayIdAnswer) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: getbySurvayIdAnswer,
                        count: getbySurvayIdAnswer.length,
                        male: getbyMaleWithAnswer.length,
                        female: getbyFemaleWithAnswer.length
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found",
                    })
                }
            } else if (survayId) {
                const getbySurvayId = await model.getbySurvayId(Number(survayId))
                const getbyMale = await model.getbyMale(Number(survayId))
                const getbyFemale = await model.getbyFemale(Number(survayId))
                if (getbySurvayId) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: getbySurvayId,
                        count: getbySurvayId.length,
                        male: getbyMale.length,
                        female: getbyFemale.length
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found",
                    })
                }
            } else if (userId) {
                const getbyUseryId = await model.getbyUseryId(userId)
                if (getbyUseryId) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: getbyUseryId
                    })
                } else {
                    return res.json({
                        status: 404,
                        message: "Not found",
                    })
                }
            }

        } catch (error) {
            console.log(error)
            res.json({
                status: 500,
                message: "Internal Server Error",
            })
        }
    },

    POST_ANSWERS: async (req, res) => {
        try {
            const { survayId, userId, answer, comment, user_comment } = req.body
            const getbySurvayId = await model.getbySurvayId(Number(survayId))
            const getSurvayById = await model.getSurvayById(survayId)

            if (getSurvayById.survay_limit === 0) {
                const userSurvay = await model.getUserSurvay(userId, survayId)

                if (!userSurvay) {
                    const addAnswer = await model.addAnswer(survayId, userId, answer, comment, user_comment)
                    const addUserSurvay = await model.addUserSurvay(userId, survayId)

                    if (addAnswer && addUserSurvay) {

                        if (getSurvayById.survay_main) {
                            if (answer == 1) {
                                const foundUser = await model.getUserById(userId)
                                const addCommitUser = await model.addCommitUser(userId, `${foundUser.user_comment}, ${getSurvayById.survay_title}: ${getSurvayById.survay_v1} ---`)

                                if (addCommitUser) {
                                    return res.json({
                                        status: 200,
                                        message: "Add comment"
                                    })
                                }

                            } else if (answer == 2) {
                                const foundUser = await model.getUserById(userId)
                                const addCommitUser = await model.addCommitUser(userId, `${foundUser.user_comment}, ${getSurvayById.survay_title}: ${getSurvayById.survay_v2} ---`)

                                if (addCommitUser) {
                                    return res.json({
                                        status: 200,
                                        message: "Add comment"
                                    })
                                }
                            } else if (answer == 3) {
                                const foundUser = await model.getUserById(userId)
                                const addCommitUser = await model.addCommitUser(userId, `${foundUser.user_comment}, ${getSurvayById.survay_title}: ${getSurvayById.survay_v3} ---`)

                                if (addCommitUser) {
                                    return res.json({
                                        status: 200,
                                        message: "Add comment"
                                    })
                                }
                            } else if (answer == 4) {
                                const foundUser = await model.getUserById(userId)
                                const addCommitUser = await model.addCommitUser(userId, `${foundUser.user_comment}, ${getSurvayById.survay_title}: ${getSurvayById.survay_v4} ---`)

                                if (addCommitUser) {
                                    return res.json({
                                        status: 200,
                                        message: "Add comment"
                                    })
                                }
                            } else if (answer == 5) {
                                const foundUser = await model.getUserById(userId)
                                const addCommitUser = await model.addCommitUser(userId, `${foundUser.user_comment}, ${getSurvayById.survay_title}: ${getSurvayById.survay_v5} ---`)

                                if (addCommitUser) {
                                    return res.json({
                                        status: 200,
                                        message: "Add comment"
                                    })
                                }
                            } else if (user_comment && getSurvayById.survay_v6_comment) {
                                const foundUser = await model.getUserById(userId)
                                console.log(foundUser);
                                const addCommitUser = await model.addCommitUser(userId, `${foundUser.user_comment}, ${getSurvayById.survay_title}: ${user_comment} ---`)

                                if (addCommitUser) {
                                    return res.json({
                                        status: 200,
                                        message: "Add comment"
                                    })
                                }
                            } else if (comment && getSurvayById.survay_iscomment) {
                                const foundUser = await model.getUserById(userId)
                                console.log(foundUser);
                                const addCommitUser = await model.addCommitUser(userId, `${foundUser.user_comment}, ${getSurvayById.survay_title}: ${comment} ---`)

                                if (addCommitUser) {
                                    return res.json({
                                        status: 200,
                                        message: "Add comment"
                                    })
                                }
                            }
                        }

                        return res.json({
                            status: 200,
                            message: "Success",
                            data: addAnswer
                        })
                    } else {
                        return res.json({
                            status: 404,
                            message: "Not found"
                        })
                    }
                } else {
                    return res.json({
                        status: 302,
                        message: "Found"
                    })
                }
            } else if (getbySurvayId.length != getSurvayById.survay_limit) {
                const userSurvay = await model.getUserSurvay(userId, survayId)

                if (!userSurvay) {
                    const addAnswer = await model.addAnswer(survayId, userId, answer, comment)
                    const addUserSurvay = await model.addUserSurvay(userId, survayId)

                    if (addAnswer && addUserSurvay) {

                        if (getSurvayById.survay_main) {
                            if (answer == 1) {
                                const foundUser = await model.getUserById(userId)
                                const addCommitUser = await model.addCommitUser(userId, `${foundUser.user_comment}, ${getSurvayById.survay_title}: ${getSurvayById.survay_v1} ---`)

                                if (addCommitUser) {
                                    return res.json({
                                        status: 200,
                                        message: "Add comment"
                                    })
                                }

                            } else if (answer == 2) {
                                const foundUser = await model.getUserById(userId)
                                const addCommitUser = await model.addCommitUser(userId, `${foundUser.user_comment}, ${getSurvayById.survay_title}: ${getSurvayById.survay_v2} ---`)

                                if (addCommitUser) {
                                    return res.json({
                                        status: 200,
                                        message: "Add comment"
                                    })
                                }
                            } else if (answer == 3) {
                                const foundUser = await model.getUserById(userId)
                                const addCommitUser = await model.addCommitUser(userId, `${foundUser.user_comment}, ${getSurvayById.survay_title}: ${getSurvayById.survay_v3} ---`)

                                if (addCommitUser) {
                                    return res.json({
                                        status: 200,
                                        message: "Add comment"
                                    })
                                }
                            } else if (answer == 4) {
                                const foundUser = await model.getUserById(userId)
                                const addCommitUser = await model.addCommitUser(userId, `${foundUser.user_comment}, ${getSurvayById.survay_title}: ${getSurvayById.survay_v4} ---`)

                                if (addCommitUser) {
                                    return res.json({
                                        status: 200,
                                        message: "Add comment"
                                    })
                                }
                            } else if (answer == 5) {
                                const foundUser = await model.getUserById(userId)
                                const addCommitUser = await model.addCommitUser(userId, `${foundUser.user_comment}, ${getSurvayById.survay_title}: ${getSurvayById.survay_v5} ---`)

                                if (addCommitUser) {
                                    return res.json({
                                        status: 200,
                                        message: "Add comment"
                                    })
                                }
                            } else if (user_comment && getSurvayById.survay_v6_comment) {
                                const foundUser = await model.getUserById(userId)
                                console.log(foundUser);
                                const addCommitUser = await model.addCommitUser(userId, `${foundUser.user_comment}, ${getSurvayById.survay_title}: ${user_comment} ---`)

                                if (addCommitUser) {
                                    return res.json({
                                        status: 200,
                                        message: "Add comment"
                                    })
                                }
                            } else if (comment && getSurvayById.survay_iscomment) {
                                const foundUser = await model.getUserById(userId)
                                console.log(foundUser);
                                const addCommitUser = await model.addCommitUser(userId, `${foundUser.user_comment}, ${getSurvayById.survay_title}: ${comment} ---`)

                                if (addCommitUser) {
                                    return res.json({
                                        status: 200,
                                        message: "Add comment"
                                    })
                                }
                            }
                        }

                        return res.json({
                            status: 200,
                            message: "Success",
                            data: addAnswer
                        })
                    } else {
                        return res.json({
                            status: 404,
                            message: "Not found"
                        })
                    }
                } else {
                    return res.json({
                        status: 302,
                        message: "Found"
                    })
                }
            } else {
                const updateStatus = await model.updateStatus(survayId)

                if (updateStatus) {
                    return res.json({
                        status: 410,
                        message: "Gone"
                    })
                } else {
                    return res.json({
                        status: 400,
                        message: "Bad request"
                    })
                }
            }

        } catch (error) {
            console.log(error)
            res.json({
                status: 500,
                message: "Internal Server Error",
            })
        }
    },


    GET_USERS_ID: async (req, res) => {
        try {
            const { survayId, answer } = req.query

            if (survayId, answer) {
                const getUsersId = await model.getUsersId(survayId, answer)

                return res.json({
                    status: 200,
                    message: "Success",
                    data: getUsersId
                })

            } else {
                return res.json({
                    status: 400,
                    message: "Bad request"
                })
            }

        } catch (error) {
            console.log(error)
            res.json({
                status: 500,
                message: "Internal Server Error",
            })
        }
    }

}