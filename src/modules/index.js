const express = require("express");
const router = express.Router();
const { AUTH } = require('../middleware/auth')

const survay = require("./questions/questions");
const asnwer = require('./answers/answers')

router
    .get('/survays', survay.GET_SURVAY)
    .get('/survaysAdmin', AUTH, survay.GET_SURVAY_ADMIN)
    .get('/survaysAdmin/data', AUTH, survay.GET_SURVEY_SIMPLE_DATA)
    .post('/Addsurvay', AUTH, survay.ADD_SURVAY)
    .put('/updatesurvay', AUTH, survay.PUT_SURVAY)
    .put('/updateSurvayStatus', AUTH, survay.PUT_SURVAY_STATUS)
    .delete('/deletesurvay', AUTH, survay.DELETE_SURVAY)
    .get('/updateView', survay.UPDATE_VIEW)

    .get('/answers', AUTH, asnwer.GET_ANSWERS)
    .get('/answersUsersId', AUTH, asnwer.GET_USERS_ID)
    .get('/answersCount', AUTH, asnwer.GET_ANSWERS_COUNT)
    .post('/addAnswer', asnwer.POST_ANSWERS);

module.exports = router