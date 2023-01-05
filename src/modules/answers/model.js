const { fetch, fetchALL } = require("../../lib/postgres");

const All_SURVAYS = `
    select 
        *, to_char(survay_users_create_date, 'HH24:MM/MM.DD.YYYY')
    from
        survay_users a
    inner join
        users b
    on a.user_id = b.user_id
    inner join
        survays c
    on a.survay_id = c.survay_id
    ORDER BY
        a.survay_user_id DESC;
`;

const SURVAYS_ID = `
    select 
        *, to_char(survay_users_create_date, 'HH24:MM/MM.DD.YYYY')
     from
        survay_users a
     inner join
            users b
    on a.user_id = b.user_id
    inner join
        survays c
    on a.survay_id = c.survay_id
    where
        a.survay_id = $1
    ORDER BY
        a.survay_user_id DESC;
`;

const USERS_ID = `
    select 
        *, to_char(survay_users_create_date, 'HH24:MM/MM.DD.YYYY')
    from
        survay_users a
    inner join
        users b
    on a.user_id = b.user_id
    inner join
        survays c
    on a.survay_id = c.survay_id
    where
        a.user_id = $1
    ORDER BY
        a.survay_user_id DESC;
`;

const SURVAYS_ID_ANSWER = `
    select 
        *, to_char(survay_users_create_date, 'HH24:MM/MM.DD.YYYY')
    from
        survay_users a
    inner join
        users b
    on a.user_id = b.user_id
    inner join
        survays c
    on a.survay_id = c.survay_id
    where
        a.survay_id = $1 and a.survay_answer = $2
    ORDER BY
        a.survay_user_id DESC;
`;

const SURVAYS_ID_ANSWER_MALE = `
    select 
        *, to_char(survay_users_create_date, 'HH24:MM/MM.DD.YYYY')
    from
        survay_users a
    inner join
        users b
    on a.user_id = b.user_id
    inner join
        survays c
    on a.survay_id = c.survay_id
    where
        a.survay_id = $1 and a.survay_answer = $2 and b.user_who = 'erkak'
    ORDER BY
        a.survay_user_id DESC;
`;

const SURVAYS_ID_ANSWER_FEMALE = `
    select 
        *, to_char(survay_users_create_date, 'HH24:MM/MM.DD.YYYY')
    from
        survay_users a
    inner join
        users b
    on a.user_id = b.user_id
    inner join
        survays c
    on a.survay_id = c.survay_id
    where
        a.survay_id = $1 and a.survay_answer = $2 and b.user_who = 'ayol'
    ORDER BY
        a.survay_user_id DESC;
`;

const ADD_ANSWER = `
    INSERT INTO
        survay_users (
            survay_id,
            user_id,
            survay_answer,
            survay_comment
        )
    VALUES
        (
            $1,
            $2,
            $3,
            $4
        ) RETURNING *;
`;

const ADD_USER_SURVAY = `
    Update 
        users 
    SET 
        user_servays = array_append(user_servays, $2)
    WHERE
        user_id = $1
    RETURNING *;
`

const USER_SURVAY_ID = `
    SELECT
        *, to_char(user_create_date, 'HH24:MM/MM.DD.YYYY')
    FROM
        users   
    WHERE
        user_id = $1 and
        $2 != ANY (user_servays)
    ORDER BY
        user_id DESC;
`

const SURVAY_BY_ID = `
    SELECT
        *, to_char(survay_create_date, 'HH24:MM/MM.DD.YYYY')
    FROM
        survays
    WHERE
        survay_id = $1
    ORDER BY
        survay_id DESC;
`;

const SURVAY_UPDATE_STATUS = `
    Update 
        survays 
    SET 
        survay_active = false
    WHERE
        survay_id = $1
    RETURNING *;
`

const getAllSurvays = () => fetchALL(All_SURVAYS)
const getbySurvayId = (survayId) => fetchALL(SURVAYS_ID, survayId)
const getbyUseryId = (userId) => fetchALL(USERS_ID, userId)
const getbySurvayIdAnswer = (survayId, answer) => fetchALL(SURVAYS_ID_ANSWER, survayId, answer)
const getbyMale = (survayId, answer) => fetchALL(SURVAYS_ID_ANSWER_MALE, survayId, answer)
const getbyFemale = (survayId, answer) => fetchALL(SURVAYS_ID_ANSWER_FEMALE, survayId, answer)
const addAnswer = (survayId, userId, answer, comment) => fetch(ADD_ANSWER, survayId, userId, answer, comment)
const addUserSurvay = (userId, survayId) => fetch(ADD_USER_SURVAY, userId, survayId)
const getUserSurvay = (userId, survayId) => fetch(USER_SURVAY_ID, userId, survayId)
const getSurvayById = (survayId) => fetch(SURVAY_BY_ID, survayId)
const updateStatus = (survayId) => fetch(SURVAY_UPDATE_STATUS, survayId)

module.exports = {
    getAllSurvays,
    getbySurvayId,
    getbyUseryId,
    addAnswer,
    getbySurvayIdAnswer,
    getbyMale,
    getbyFemale,
    addUserSurvay,
    getUserSurvay,
    getSurvayById,
    updateStatus
}