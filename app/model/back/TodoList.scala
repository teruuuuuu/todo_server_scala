/*
package model

import javax.inject.Inject

import play.api.db.slick.DatabaseConfigProvider
import slick.dbio
import slick.dbio.Effect.Read
import slick.driver.JdbcProfile
import slick.jdbc.GetResult
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

import slick.driver.H2Driver.api._


case class TodoList(id: Long,  name: String, index: Int)

class TodoListRepo @Inject()(todoRepo: TodoRepo)(protected val dbConfigProvider: DatabaseConfigProvider) {

  val dbConfig = dbConfigProvider.get[JdbcProfile]
  val db = dbConfig.db
  import dbConfig.driver.api._
  private val TodoLists = TableQuery[TodoListsTable]

  private def _findById(id: Long): DBIO[Option[TodoList]] =
    TodoLists.filter(_.id === id).result.headOption

  private def _findByName(name: String): Query[TodoListsTable, TodoList, List] =
    TodoLists.filter(_.name === name).to[List]

  def findById(id: Long): Future[Option[TodoList]] =
    db.run(_findById(id))

  def findByName(name: String): Future[List[TodoList]] =
    db.run(_findByName(name).result)

  def all: Future[List[TodoList]] =
    db.run(TodoLists.to[List].result)

  def create(name: String, index: Int): Future[Long] = {
    val todoList = TodoList(0, name, index)
    db.run(TodoLists returning TodoLists.map(_.id) += todoList)
  }

  def delete(name: String): Future[Int] = {
    val query = _findByName(name)

    val interaction = for {
      todoLists        <- query.result
      _               <- DBIO.sequence(todoLists.map(p => todoRepo._deleteAllInList(p.id)))
      todosDeleted <- query.delete
    } yield todosDeleted

    db.run(interaction.transactionally)
  }

  def addTodo(categoryId: Long, title: String, text:String): Future[Long] = {
    val interaction = for {
      Some(todoList) <- _findById(categoryId)
      id <- todoRepo.insert(Todo(0, todoList.id, title, text, 0))
    } yield id

    db.run(interaction.transactionally)
  }

  def queryTest(id: Long): Future[Vector[(Long, String, Int)]] = {
    val action = sql"""
           SELECT ID, NAME, INDEX
           FROM TODO_LIST WHERE ID = $id
        """.as[(Long, String, Int)]
    db.run(action)
  }


  private class TodoListsTable(tag: Tag) extends Table[TodoList](tag, "TODO_LIST") {

    def id = column[Long]("ID", O.AutoInc, O.PrimaryKey)
    def name = column[String]("NAME")
    def index = column[Int]("INDEX")

    def * = (id, name, index) <> (TodoList.tupled, TodoList.unapply)
    def ? = (id.?, name.?, index.?).shaped.<>({ r => import r._; _1.map(_ => TodoList.tupled((_1.get, _2.get, _3.get))) },
      (_: Any) => throw new Exception("Inserting into ? projection not supported."))

  }
}

*/
