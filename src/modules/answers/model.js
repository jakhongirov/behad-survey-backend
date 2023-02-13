const { fetch, fetchALL } = require("../../lib/postgres");

const All_SURVAYS = `
    select 
        *, a.user_id as id, to_char(survay_users_create_date, 'HH24:MM/MM.DD.YYYY')
    from
        survay_users a
    inner join
        users b
    on a.user_id = b.user_id
    inner join
        survays c
    on a.survay_id = c.survay_id
    ORDER BY
        a.survay_user_id DESC
    LIMIT 50;
`;

const SURVAYS_ID = `
    select 
        *, a.user_id as id, to_char(survay_users_create_date, 'HH24:MM/MM.DD.YYYY')
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
        *, a.user_id as id, to_char(survay_users_create_date, 'HH24:MM/MM.DD.YYYY')
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
        *, a.user_id as id, to_char(survay_users_create_date, 'HH24:MM/MM.DD.YYYY')
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
        *, a.user_id as id, to_char(survay_users_create_date, 'HH24:MM/MM.DD.YYYY')
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
const SURVAYS_ID_MALE = `
    select 
        *, a.user_id as id, to_char(survay_users_create_date, 'HH24:MM/MM.DD.YYYY')
    from
        survay_users a
    inner join
        users b
    on a.user_id = b.user_id
    inner join
        survays c
    on a.survay_id = c.survay_id
    where
        a.survay_id = $1 and b.user_who = 'erkak'
    ORDER BY
        a.survay_user_id DESC;
`;

const SURVAYS_ID_ANSWER_FEMALE = `
    select 
        *, a.user_id as id, to_char(survay_users_create_date, 'HH24:MM/MM.DD.YYYY')
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

const SURVAYS_ID_FEMALE = `
    select 
        *, a.user_id as id, to_char(survay_users_create_date, 'HH24:MM/MM.DD.YYYY')
    from
        survay_users a
    inner join
        users b
    on a.user_id = b.user_id
    inner join
        survays c
    on a.survay_id = c.survay_id
    where
        a.survay_id = $1 and b.user_who = 'ayol'
    ORDER BY
        a.survay_user_id DESC;
`;

const ADD_ANSWER = `
    INSERT INTO
        survay_users (
            survay_id,
            user_id,
            survay_answer,
            survay_comment,
            v6_comment
        )
    VALUES
        (
            $1,
            $2,
            $3,
            $4,
            $5
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
        $2 = ANY (user_servays)
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

const ADD_COMMENT = `
    UPDATE
        users
    SET
        user_comment = $2
    WHERE
        user_id = $1 RETURNING * ;
`

const SURVAYS_ID_V6_COMMENT = `
    select 
        *, a.user_id as id, to_char(survay_users_create_date, 'HH24:MM/MM.DD.YYYY')
    from
        survay_users a
    inner join
        users b
    on a.user_id = b.user_id
    inner join
        survays c
    on a.survay_id = c.survay_id
    where
        a.survay_id = $1 and a.v6_comment != ''
    ORDER BY
        a.survay_user_id DESC;
`;

const SURVAYS_ID_V6_COMMENT_MALE = `
    select 
        *, a.user_id as id, to_char(survay_users_create_date, 'HH24:MM/MM.DD.YYYY')
    from
        survay_users a
    inner join
        users b
    on a.user_id = b.user_id
    inner join
        survays c
    on a.survay_id = c.survay_id
    where
        a.survay_id = $1 and a.v6_comment != '' and b.user_who = 'erkak'
    ORDER BY
        a.survay_user_id DESC;
`;

const SURVAYS_ID_V6_COMMENT_FEMALE = `
    select 
        *, a.user_id as id, to_char(survay_users_create_date, 'HH24:MM/MM.DD.YYYY')
    from
        survay_users a
    inner join
        users b
    on a.user_id = b.user_id
    inner join
        survays c
    on a.survay_id = c.survay_id
    where
        a.survay_id = $1 and a.v6_comment != '' and b.user_who = 'ayol'
    ORDER BY
        a.survay_user_id DESC;
`;

const USER_BY_ID = `
    SELECT
        *, to_char(user_create_date at time zone 'Asia/Tashkent', 'HH24:MM/MM.DD.YYYY')
    FROM
        users
    WHERE
        user_id = $1
    ORDER BY
        user_id DESC;
`;

const ANSWER_LIMIT_NEXT =`
    select 
        *, a.user_id as id, to_char(survay_users_create_date, 'HH24:MM/MM.DD.YYYY')
    from
        survay_users a
    inner join
    users b
    on 
        a.user_id = b.user_id
    inner join
        survays c
    on 
        a.survay_id = c.survay_id
    WHERE
        a.survay_user_id < $1            
    ORDER BY
        a.survay_user_id DESC
    LIMIT 50;
`

const ANSWER_LIMIT_PREV =`
    select 
        *, a.user_id as id, to_char(survay_users_create_date, 'HH24:MM/MM.DD.YYYY')
    from
        survay_users a
    inner join
    users b
    on 
        a.user_id = b.user_id
    inner join
        survays c
    on 
        a.survay_id = c.survay_id
    WHERE
        a.survay_user_id > $1            
    ORDER BY
        a.survay_user_id DESC
    LIMIT 50;
`

const GET_USERS_ID  = `
    select 
        a.user_id as id
    from
        survay_users a
        inner join
        users b
    on 
        a.user_id = b.user_id
    inner join
        survays c
    on 
        a.survay_id = c.survay_id
    where
        a.survay_id = $1 and a.survay_answer = $2;
`

const getAllSurvays = () => fetchALL(All_SURVAYS)
const getbySurvayId = (survayId) => fetchALL(SURVAYS_ID, survayId)
const getbyUseryId = (userId) => fetchALL(USERS_ID, userId)
const getbySurvayIdAnswer = (survayId, answer) => fetchALL(SURVAYS_ID_ANSWER, survayId, answer)
const getbyMaleWithAnswer = (survayId, answer) => fetchALL(SURVAYS_ID_ANSWER_MALE, survayId, answer)
const getbyFemaleWithAnswer = (survayId, answer) => fetchALL(SURVAYS_ID_ANSWER_FEMALE, survayId, answer)
const addAnswer = (survayId, userId, answer, comment, user_comment) => fetch(ADD_ANSWER, survayId, userId, answer, comment, user_comment)
const addUserSurvay = (userId, survayId) => fetch(ADD_USER_SURVAY, userId, survayId)
const getUserSurvay = (userId, survayId) => fetch(USER_SURVAY_ID, userId, survayId)
const getSurvayById = (survayId) => fetch(SURVAY_BY_ID, survayId)
const updateStatus = (survayId) => fetch(SURVAY_UPDATE_STATUS, survayId)
const getbyMale = (survayId) => fetchALL(SURVAYS_ID_MALE, survayId)
const getbyFemale = (survayId) => fetchALL(SURVAYS_ID_FEMALE, survayId)
const addCommitUser = (id, text) => fetch(ADD_COMMENT, id, text)
const getbySurvayIdV6Comment = (survayId) => fetchALL(SURVAYS_ID_V6_COMMENT, survayId)
const getbyMaleWithV6Comment = (survayId) => fetchALL(SURVAYS_ID_V6_COMMENT_MALE, survayId)
const getbyFemaleWithV6Comment = (survayId) => fetchALL(SURVAYS_ID_V6_COMMENT_FEMALE, survayId)
const getUserById = (id) => fetch(USER_BY_ID, id)
const answerLimitNext = (id) => fetchALL(ANSWER_LIMIT_NEXT, id)
const answerLimitPrev = (id) => fetchALL(ANSWER_LIMIT_PREV, id)
const getUsersId = (survayId, answer) => fetchALL(GET_USERS_ID, survayId, answer)

module.exports = {
    getAllSurvays,
    getbySurvayId,
    getbyUseryId,
    addAnswer,
    getbySurvayIdAnswer,
    getbyMaleWithAnswer,
    getbyFemaleWithAnswer,
    addUserSurvay,
    getUserSurvay,
    getSurvayById,
    updateStatus,
    getbyFemale,
    getbyMale,
    addCommitUser,
    getbySurvayIdV6Comment,
    getbyMaleWithV6Comment,
    getbyFemaleWithV6Comment,
    getUserById,
    answerLimitNext,
    answerLimitPrev,
    getUsersId
}