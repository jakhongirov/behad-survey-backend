const model = require('./model')

module.exports = {
    GET_SURVAY: async (req, res) => {
        try {
            const { id, position } = req.query

            if (position === 'next' && id) {
                const surveyLimitNext = await model.surveyLimitNext(id)
                return res.json({
                    status: 200,
                    message: "Success",
                    data: surveyLimitNext
                })
            } else if (position === 'prev' && id) {
                const surveyLimitPrev = await model.surveyLimitPrev(id)
                return res.json({
                    status: 200,
                    message: "Success",
                    data: surveyLimitPrev
                })
            } else if (id) {
                const getById = await model.getById(id)
                return res.json({
                    status: 200,
                    message: "Success",
                    data: getById
                })
            } else {
                const getAll = await model.getStatus()
                return res.json({
                    status: 200,
                    message: "Success",
                    data: getAll
                })
            }
        } catch (error) {
            console.log(error)
            res.json({
                status: 500,
                message: "Internal Server Error",
            })
        }
    },

    GET_SURVAY_ADMIN: async (req, res) => {
        try {
            const { id } = req.query
            if (id) {
                const getById = await model.getById(id)
                return res.json({
                    status: 200,
                    message: "Success",
                    data: getById
                })
            } else {
                const getAll = await model.getAll()
                return res.json({
                    status: 200,
                    message: "Success",
                    data: getAll
                })
            }
        } catch (error) {
            console.log(error)
            res.json({
                status: 500,
                message: "Internal Server Error",
            })
        }
    },

    ADD_SURVAY: async (req, res) => {
        try {
            const { title, v1, v2, v3, v4, v5, survay_male, survay_female, min_age, max_age, survay_iscomment, country, city, limit, filter, main, v6_comment, app_key, user_id } = req.body
            const addSurvay = await model.postSurvay(title, v1, v2, v3, v4, v5, survay_male, survay_female, min_age, max_age, survay_iscomment, country, city, limit, filter, main, v6_comment, app_key, user_id)

            if (addSurvay) {
                return res.json({
                    status: 200,
                    message: "Success",
                    data: addSurvay
                })
            }

        } catch (error) {
            console.log(error)
            res.json({
                status: 500,
                message: "Internal Server Error",
            })
        }
    },

    PUT_SURVAY: async (req, res) => {
        try {
            const { id, title, v1, v2, v3, v4, v5, survay_male, survay_female, min_age, max_age, survay_iscomment, country, city, limit, filter, main, v6_comment, app_key, user_id } = req.body
            const puturvay = await model.putSurvay(id, title, v1, v2, v3, v4, v5, survay_male, survay_female, min_age, max_age, survay_iscomment, country, city, limit, filter, main, v6_comment, app_key, user_id)

            if (puturvay) {
                return res.json({
                    status: 200,
                    message: "Success",
                    data: puturvay
                })
            }

        } catch (error) {
            console.log(error)
            res.json({
                status: 500,
                message: "Internal Server Error",
            })
        }
    },


    PUT_SURVAY_STATUS: async (req, res) => {
        try {
            const { id, status } = req.body

            const updateStatus = await model.updateStatus(id, status)

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

        } catch (error) {
            console.log(error)
            res.json({
                status: 500,
                message: "Internal Server Error",
            })
        }
    },

    DELETE_SURVAY: async (req, res) => {
        try {
            const { id } = req.body
            const deleteSurvay = await model.deleteSurvay(id)

            if (deleteSurvay) {
                return res.json({
                    status: 200,
                    message: "Success",
                    data: deleteSurvay
                })
            }

        } catch (error) {
            console.log(error)
            res.json({
                status: 500,
                message: "Internal Server Error",
            })
        }
    },

    UPDATE_VIEW: async (req, res) => {
        try {
            const { id } = req.query

            if (id) {
                const updateView = await model.updateView(id)

                if (updateView) {
                    return res.json({
                        status: 200,
                        message: "Success"
                    })
                } else {
                    return res.json({
                        status: 404,
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

    GET_SURVEY_SIMPLE_DATA: async (_, res) => {
        try {
            const surveys = await model.getSurveyData()

            if (surveys) {
                return res.json({
                    status: 200,
                    message: "Success",
                    data: surveys
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