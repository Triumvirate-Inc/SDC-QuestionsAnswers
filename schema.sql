
DROP DATABASE IF EXISTS qa;
CREATE DATABASE qa;

DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS questions;

CREATE TABLE questions (
 id BIGSERIAL NOT NULL,
 product_id BIGSERIAL NOT NULL,
 body TEXT NOT NULL,
 date_written BIGINT NOT NULL,
 asker_name VARCHAR(50) NOT NULL,
 asker_email VARCHAR(50) NOT NULL,
 reported BOOLEAN NOT NULL DEFAULT 'false',
 helpful SMALLINT NOT NULL DEFAULT 0
);


ALTER TABLE questions ADD CONSTRAINT questions_pkey PRIMARY KEY (id);

CREATE TABLE answers (
 id BIGSERIAL NOT NULL,
 id_questions BIGINT NOT NULL,
 body TEXT NOT NULL,
 date_written BIGINT NOT NULL,
 answerer_name VARCHAR(50) NOT NULL,
 answerer_email VARCHAR(50) NOT NULL,
 reported BOOLEAN NOT NULL DEFAULT 'false',
 helpful SMALLINT NOT NULL DEFAULT 0
);


ALTER TABLE answers ADD CONSTRAINT answers_pkey PRIMARY KEY (id);

CREATE TABLE photos (
 id BIGSERIAL NOT NULL,
 id_answers BIGINT NOT NULL,
 url TEXT NOT NULL
);


ALTER TABLE photos ADD CONSTRAINT photos_pkey PRIMARY KEY (id);

ALTER TABLE answers ADD CONSTRAINT answers_id_questions_fkey FOREIGN KEY (id_questions) REFERENCES questions(id);
ALTER TABLE photos ADD CONSTRAINT photos_id_answers_fkey FOREIGN KEY (id_answers) REFERENCES answers(id);