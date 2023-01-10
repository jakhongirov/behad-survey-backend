CREATE TABLE survays (
    survay_id bigserial PRIMARY KEY,
    survay_title text not null, 
    survay_v1 text DEFAULT 0,
    survay_v2 text DEFAULT 0,
    survay_v3 text DEFAULT 0,
    survay_v4 text DEFAULT 0,
    survay_v5 text DEFAULT 0,
    survay_male BOOLEAN DEFAULT false,
    survay_female BOOLEAN DEFAULT false,
    survay_min_age int not null,
    survay_max_age int not null,
    survay_country text not null,
    survay_city text not null,
    survay_active BOOLEAN DEFAULT true,
    survay_iscomment BOOLEAN DEFAULT false,
    survay_limit int,
    survay_filter int [],
    survay_create_date timestamptz DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE survay_users (
    survay_user_id bigserial PRIMARY KEY,
    user_id int not null REFERENCES users(user_id) ON DELETE CASCADE,
    survay_id int not null REFERENCES survays(survay_id) ON DELETE CASCADE,
    survay_answer int,
    survay_comment text,
    survay_users_create_date timestamptz DEFAULT CURRENT_TIMESTAMP
);