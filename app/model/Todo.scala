package model

import javax.inject.Inject

import anorm.SqlParser._
import anorm._
import db.DefaultDB
import play.api.db.{DBApi, Database}


case class Todo(id: Long,
                category_id: Long,
                title: String,
                text: String,
                index: Int)

case class TodoCategory(id: Long,
                        name: String,
                        index: Int)

case class TodoView(category_id: Long,
                    category_name: String,
                    category_index: Int,
                    todos: Option[Seq[Todo]])
