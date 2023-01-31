const { fetch, fetchALL } = require("../../lib/postgres");

const All_SURVAYS_STATUS = `
    SELECT
        *, to_char(survay_create_date, 'HH24:MI/MM.DD.YYYY')
    FROM
        survays
    Where 
        survay_active = true;
`;

const All_SURVAYS_ADMIN = `
    SELECT
        *, to_char(survay_create_date, 'HH24:MI/MM.DD.YYYY')
    FROM
        survays
    ORDER BY
        survay_id DESC
    LIMIT 50;
`;


const BY_ID = `
    SELECT
        *, to_char(survay_create_date, 'HH24:MI/MM.DD.YYYY')
    FROM
        survays
    WHERE
        survay_id = $1
    ORDER BY
        survay_id DESC;
`;

const ADD_SURVAY = `
    INSERT INTO
        survays (
            survay_title,
            survay_v1,
            survay_v2,
            survay_v3,
            survay_v4,
            survay_v5,
            survay_male,
            survay_female,
            survay_min_age,
            survay_max_age,
            survay_iscomment,
            survay_country,
            survay_city,
            survay_limit,
            survay_filter,
            survay_main,
            survay_v6_comment,
            app_key,
            user_id
        )
    VALUES
        (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            $10,
            $11,
            $12,
            $13,
            $14,
            $15,
            $16,
            $17,
            $18,
            $19
        ) RETURNING *;
`;

const UPDATE_SURVAY = `
    UPDATE
        survays
    SET
        survay_title = $2,
        survay_v1 = $3,
        survay_v2 = $4,
        survay_v3 = $5,
        survay_v4 = $6,
        survay_v5 = $7,
        survay_male = $8,
        survay_female = $9,
        survay_min_age = $10,
        survay_max_age = $11,
        survay_iscomment = $12,
        survay_country = $13,
        survay_city = $14,
        survay_limit = $15,
        survay_filter = $16,
        survay_main = $17,
        survay_v6_comment = $18,
        app_key = $19,
        user_id = $20
    WHERE
        survay_id = $1 RETURNING * ;
`;

const SURVAY_UPDATE_STATUS = `
    Update 
        survays 
    SET 
        survay_active = $2
    WHERE
        survay_id = $1
    RETURNING *;
`

const DELETE_SURVAY = `
    DELETE FROM
        survays
    WHERE
        survay_id = $1
    RETURNING *;
`

const SURVAY_LIMIT_NEXT =`
    SELECT
        *, to_char(survay_create_date, 'HH24:MI/MM.DD.YYYY')
    FROM
        survays
    WHERE
        survay_id < $1
    ORDER BY
        survay_id DESC
    LIMIT 50;
`

const SURVAY_LIMIT_PREV =`
    SELECT
        *, to_char(survay_create_date, 'HH24:MI/MM.DD.YYYY')
    FROM
        survays
    WHERE
        survay_id > $1
    ORDER BY
        survay_id DESC
    LIMIT 50;
`

const UPDATE_VIEW = `
    UPDATE
        survays
    SET
        survay_views = survay_views + 1
    WHERE
        survay_id = $1 RETURNING * ;
`

const getAll = () => fetchALL(All_SURVAYS_ADMIN)
const getStatus = () => fetchALL(All_SURVAYS_STATUS)
const getById = (id) => fetchALL(BY_ID, id)
const postSurvay = (title, v1, v2, v3, v4, v5, survay_male, survay_female, min_age, max_age, survay_iscomment, country, city, limit, filter, main, v6_comment, app_key, user_id) => fetch(ADD_SURVAY, title, v1, v2, v3, v4, v5, survay_male, survay_female, min_age, max_age, survay_iscomment, country, city, limit, filter, main, v6_comment, app_key, user_id)
const putSurvay = (id, title, v1, v2, v3, v4, v5, survay_male, survay_female, min_age, max_age, survay_iscomment, country, city, limit, filter, main, v6_comment, app_key, user_id) => fetch(UPDATE_SURVAY, id, title, v1, v2, v3, v4, v5, survay_male, survay_female, min_age, max_age, survay_iscomment, country, city, limit, filter, main, v6_comment, app_key, user_id)
const updateStatus = (id, status) => fetch(SURVAY_UPDATE_STATUS, id, status)
const deleteSurvay = (id) => fetch(DELETE_SURVAY, id)
const surveyLimitNext = (id) => fetchALL(SURVAY_LIMIT_NEXT, id)
const surveyLimitPrev = (id) => fetchALL(SURVAY_LIMIT_PREV, id)
const updateView = (id) => fetch(UPDATE_VIEW, id)

module.exports = {
    getById,
    getAll,
    getStatus,
    postSurvay,
    putSurvay,
    updateStatus,
    deleteSurvay,
    surveyLimitNext,
    surveyLimitPrev,
    updateView
}