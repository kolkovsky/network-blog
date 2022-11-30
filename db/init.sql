CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    age integer,
    nickname VARCHAR(100) UNIQUE,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_on TIMESTAMP NOT NULL   
);


CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    title VARCHAR(150),
    description VARCHAR(1500),
    author_id integer NOT NULL references users(user_id),
    created_on TIMESTAMP NOT NULL,
    likes BIGINT
);

CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    created_on TIMESTAMP NOT NULL,
    content VARCHAR(500)
);

CREATE TABLE users_and_comments (
    user_id integer references users(user_id),
    comment_id integer references comments(comment_id),
    PRIMARY KEY(user_id, comment_id)
);