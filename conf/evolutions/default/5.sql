# --- !Ups
INSERT INTO "user_mst" (
  "seq_num",
  "user_id",
  "family_name",
  "first_name",
  "password"
)
VALUES
(  nextval('user_mst_seq_num_seq'),
   'test',
   'test',
   'user',
   'password'
);

INSERT INTO "todo_group" (
  "id",
  "name"
)
VALUES
(  nextval('todo_group_id_seq'),
   '個人タスク'
);

INSERT INTO "user_group_relation" (
  "id",
  "user_seq_num",
  "group_id"
)
VALUES
(  nextval('user_group_relation_id_seq'),
   (select max(seq_num) from user_mst),
   (select max(id) from todo_group)
);


# --- !Downs

