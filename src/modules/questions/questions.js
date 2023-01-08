const model = require('./model')

module.exports = {
    GET_SURVAY: async (req, res) => {
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
            const { title, v1, v2, v3, v4, v5, survay_all, survay_male, survay_female, min_age, max_age, survay_iscomment, country, city, limit, filter } = req.body
            const addSurvay = await model.postSurvay(title, v1, v2, v3, v4, v5, survay_all, survay_male, survay_female, min_age, max_age, survay_iscomment, country, city, limit, filter)

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
            const { id, title, v1, v2, v3, v4, v5, survay_all, survay_male, survay_female, min_age, max_age, survay_iscomment, country, city, limit, filter } = req.body
            const puturvay = await model.putSurvay(id, title, v1, v2, v3, v4, v5, survay_all, survay_male, survay_female, min_age, max_age, survay_iscomment, country, city, limit, filter)

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
    }
}