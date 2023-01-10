const model = require('./model')

module.exports = {
    GET_ANSWERS: async (req, res) => {
        try {
            const { survayId, userId, answer } = req.query

            if (answer && survayId) {
                const getbySurvayIdAnswer = await model.getbySurvayIdAnswer(Number(survayId), Number(answer))
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
            } else {
                const getAllSurvays = await model.getAllSurvays()
                if (getAllSurvays) {
                    return res.json({
                        status: 200,
                        message: "Success",
                        data: getAllSurvays
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
            const { survayId, userId, answer, comment } = req.body
            const getbySurvayId = await model.getbySurvayId(Number(survayId))
            const getSurvayById = await model.getSurvayById(survayId)

            if (getSurvayById.survay_limit === 0) {
                const userSurvay = await model.getUserSurvay(userId, survayId)

                if (!userSurvay) {
                    const addAnswer = await model.addAnswer(survayId, userId, answer, comment)
                    const addUserSurvay = await model.addUserSurvay(userId, survayId)

                    if (addAnswer && addUserSurvay) {
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

}