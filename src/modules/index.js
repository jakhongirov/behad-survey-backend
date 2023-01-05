const express = require("express");
const router = express.Router();

const survay = require("./questions/questions");
const asnwer = require('./answers/answers')

router
    .get('/survays', survay.GET_SURVAY)
    .post('/Addsurvay', survay.ADD_SURVAY)
    .put('/updatesurvay', survay.PUT_SURVAY)
    .delete('/deletesurvay', survay.DELETE_SURVAY)

    .get('/answers', asnwer.GET_ANSWERS)
    .post('/addAnswer', asnwer.POST_ANSWERS);

module.exports = router