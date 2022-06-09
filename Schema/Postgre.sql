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

-- ALTER TABLE "answers" ADD FOREIGN KEY ("question_id") REFERENCES "questions" ("id");
-- ALTER TABLE "photos" ADD FOREIGN KEY ("answer_id") REFERENCES "answers" ("id");


-- IMPORT .SQL RUN FILE TO CREATE TABLES
-- /Users/admin/Documents/School_Documents/Online_Classes/Hack_Reactor/GIT_REPOS/GROUP_PROJECTS/SDC/Data/answers_photos.csv
-- /Users/admin/Documents/School_Documents/Online_Classes/Hack_Reactor/GIT_REPOS/GROUP_PROJECTS/SDC/Data/answers.csv
-- /Users/admin/Documents/School_Documents/Online_Classes/Hack_Reactor/GIT_REPOS/GROUP_PROJECTS/SDC/Data/questions.csv

COPY questions FROM '/Users/admin/Documents/School_Documents/Online_Classes/Hack_Reactor/GIT_REPOS/GROUP_PROJECTS/SDC/Data/questions.csv' DELIMITER ',' CSV Header;

COPY answers FROM '/Users/admin/Documents/School_Documents/Online_Classes/Hack_Reactor/GIT_REPOS/GROUP_PROJECTS/SDC/Data/answers.csv' DELIMITER ',' CSV Header;

COPY photos FROM '/Users/admin/Documents/School_Documents/Online_Classes/Hack_Reactor/GIT_REPOS/GROUP_PROJECTS/SDC/Data/answers_photos.csv' DELIMITER ',' CSV Header;