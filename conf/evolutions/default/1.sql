# --- !Ups

CREATE TABLE "todo"
(
  "id" bigint PRIMARY KEY,
  "category_id" bigint,
  "title" character(512),
  "text" character(512),
  "index" integer
);
CREATE SEQUENCE "todo_id_seq" START 1;


CREATE TABLE "todo_category"
(
  "id" bigint PRIMARY KEY,
  "name" character(512),
  "index" integer
);
CREATE SEQUENCE "todo_category_id_seq" START 1;

# --- !Downs

