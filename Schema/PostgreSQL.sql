CREATE TABLE "questions" (
  "id" int PRIMARY KEY,
  "product_id" int,
  "question_body" varchar,
  "question_date" datetime,
  "asker_name" varchar,
  "asker_email" varchar,
  "question_helpfulness" int,
  "reported" boolean
);

CREATE TABLE "answers" (
  "id" int PRIMARY KEY,
  "question_id" int,
  "body" varchar,
  "answerer_name" varchar,
  "answerer_email" varchar,
  "date" datetime,
  "reported" boolean,
  "helpfulness" int
);

CREATE TABLE "photos" (
  "id" int PRIMARY KEY,
  "answer_id" int,
  "url" varchar
);

ALTER TABLE "answers" ADD FOREIGN KEY ("question_id") REFERENCES "questions" ("id");
ALTER TABLE "photos" ADD FOREIGN KEY ("answer_id") REFERENCES "answers" ("id");
