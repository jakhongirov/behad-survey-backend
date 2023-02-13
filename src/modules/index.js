const express = require("express");
const router = express.Router();
const { AUTH } = require('../middleware/auth')

const survay = require("./questions/questions");
const asnwer = require('./answers/answers')

router
    .get('/survays', AUTH, survay.GET_SURVAY)
    .get('/survaysAdmin', AUTH, survay.GET_SURVAY_ADMIN)
    .post('/Addsurvay', AUTH, survay.ADD_SURVAY)
    .put('/updatesurvay', AUTH, survay.PUT_SURVAY)
    .put('/updateSurvayStatus', AUTH, survay.PUT_SURVAY_STATUS)
    .delete('/deletesurvay', AUTH, survay.DELETE_SURVAY)
    .get('/updateView', AUTH, survay.UPDATE_VIEW)

    .get('/answers', asnwer.GET_ANSWERS)
    .post('/addAnswer', AUTH, asnwer.POST_ANSWERS);

module.exports = router