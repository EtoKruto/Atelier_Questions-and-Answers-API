DROP DATABASE IF EXISTS qanda;
CREATE DATABASE qanda;

\c qanda;

DROP TABLE IF EXISTS questions CASCADE;
CREATE TABLE questions (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "product_id" INT NOT NULL,
  "body" TEXT,
  "date_written" BIGINT DEFAULT EXTRACT(EPOCH FROM CURRENT_TIMESTAMP),
  "asker_name" TEXT,
  "asker_email" TEXT,
  "reported" BOOLEAN,
  "helpful" INT
);



DROP TABLE IF EXISTS answers CASCADE;
CREATE TABLE answers (
  "id" SERIAL PRIMARY KEY,
  "question_id" INT,
  "body" TEXT,
  "date_written" BIGINT DEFAULT EXTRACT(EPOCH FROM CURRENT_TIMESTAMP),
  "answerer_name" TEXT,
  "answerer_email" TEXT,
  "reported" BOOLEAN,
  "helpful" INT,
  FOREIGN KEY ("question_id") REFERENCES "questions" ("id")
);


DROP TABLE IF EXISTS photos CASCADE;
CREATE TABLE photos (
  "id" SERIAL PRIMARY KEY,
  "answer_id" INT,
  "url" TEXT,
  FOREIGN KEY ("answer_id") REFERENCES "answers" ("id")
);

DROP INDEX IF EXISTS answer_id_index;
DROP INDEX IF EXISTS photo_id_index;
DROP INDEX IF EXISTS question_id_index;

CREATE INDEX answer_id_index on answers (question_id)
CREATE INDEX photo_id_index on photos (answer_id);
CREATE INDEX question_id_index on questions (product_id);

-- COPY questions FROM '/Users/admin/Documents/School_Documents/Online_Classes/Hack_Reactor/GIT_REPOS/GROUP_PROJECTS/SDC/Data/questions.csv' DELIMITER ',' CSV Header;

-- COPY answers FROM '/Users/admin/Documents/School_Documents/Online_Classes/Hack_Reactor/GIT_REPOS/GROUP_PROJECTS/SDC/Data/answers.csv' DELIMITER ',' CSV Header;

-- COPY photos FROM '/Users/admin/Documents/School_Documents/Online_Classes/Hack_Reactor/GIT_REPOS/GROUP_PROJECTS/SDC/Data/answers_photos.csv' DELIMITER ',' CSV Header;