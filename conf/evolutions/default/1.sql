# --- !Ups

CREATE TABLE "todo"
(
  "id" bigint PRIMARY KEY,
  "category_id" bigint,
  "title" character(512),
  "text" character(512),
  "index" integer
);

CREATE SEQUENCE "todo_id_seq"
  "INCREMENT" 1
  "MINVALUE" 1
  "MAXVALUE" 9223372036854775807
  "START" 1
  "CACHE" 1;


CREATE TABLE "todo_category"
(
  "id" bigint PRIMARY KEY,
  "name" character(512),
  "index" integer
);

CREATE SEQUENCE "todo_category_id_seq"
  "INCREMENT" 1
  "MINVALUE" 1
  "MAXVALUE" 9223372036854775807
  "START" 1
  "CACHE" 1;


# --- !Downs

