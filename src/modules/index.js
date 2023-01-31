const express = require("express");
const router = express.Router();

const survay = require("./questions/questions");
const asnwer = require('./answers/answers')

router
    .get('/survays', survay.GET_SURVAY)
    .get('/survaysAdmin', survay.GET_SURVAY_ADMIN)
    .post('/Addsurvay', survay.ADD_SURVAY)
    .put('/updatesurvay', survay.PUT_SURVAY)
    .put('/updateSurvayStatus', survay.PUT_SURVAY_STATUS)
    .delete('/deletesurvay', survay.DELETE_SURVAY)
    .get('/updateView', survay.UPDATE_VIEW)

    .get('/answers', asnwer.GET_ANSWERS)
    .post('/addAnswer', asnwer.POST_ANSWERS);

module.exports = router