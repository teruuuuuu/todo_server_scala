# --- !Ups
CREATE TABLE "user_mst"
(
  "seq_num" bigint PRIMARY KEY,
  "user_id" character(32),
  "family_name" character(32),
  "first_name" character(32),
  "password" character(32)
);
CREATE SEQUENCE "user_mst_seq_num_seq" START 1;

CREATE TABLE "todo_group"
(
  "id" bigint PRIMARY KEY,
  "name" character(512)
);
CREATE SEQUENCE "todo_group_id_seq" START 1;

CREATE TABLE "user_group_relation"
(
  "id" bigint PRIMARY KEY,
  "user_seq_num" bigint,
  "group_id" bigint
);
CREATE SEQUENCE "user_group_relation_id_seq" START 1;

CREATE TABLE "todo_category"
(
  "id" bigint PRIMARY KEY,
  "group_id" bigint,
  "index" integer,
  "name" character(512)
);
CREATE SEQUENCE "todo_category_id_seq" START 1;

CREATE TABLE "todo"
(
  "id" bigint PRIMARY KEY,
  "category_id" bigint,
  "index" integer,
  "title" character(512),
  "text" character(512)
);
CREATE SEQUENCE "todo_id_seq" START 1;


# --- !Downs

