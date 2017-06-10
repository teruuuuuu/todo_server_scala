# --- !Ups
CREATE TABLE "todo"
(
  "id" bigint PRIMARY KEY,
  "category_id" bigint,
  "title" character(512),
  "text" character(512),
  "index" integer
);

CREATE TABLE "todo_category"
(
  "id" bigint PRIMARY KEY,
  "name" character(512),
  "index" integer
);


# --- !Downs

