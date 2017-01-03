/*
package model

import javax.inject.Inject

import play.api.db.slick.DatabaseConfigProvider
import play.api.libs.json._

import slick.dbio
import slick.dbio.Effect.Read
import slick.driver.JdbcProfile
import slick.jdbc.GetResult
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future


case class Todo(id: Long, categoryId: Long, title: String, text: String, index: Int) {

  def patch(categoryId: Option[Long], title: Option[String], text: Option[String], index:Option[Int]):
    Todo = this.copy(
      categoryId = categoryId.getOrElse(this.categoryId),
      title = title.getOrElse(this.title),
      text = text.getOrElse(this.text),
      index = index.getOrElse(this.index))

}

class TodoRepo @Inject()(protected val dbConfigProvider: DatabaseConfigProvider) {

  val dbConfig = dbConfigProvider.get[JdbcProfile]
  val db = dbConfig.db
  import dbConfig.driver.api._
  private val Todos = TableQuery[TodosTable]

  private def _findById(id: Long): DBIO[Option[Todo]] =
    Todos.filter(_.id === id).result.headOption

  private def _findByCategoryId(categoryId: Long): Query[TodosTable, Todo, List] =
    Todos.filter(_.categoryId === categoryId).to[List]

  private def _findByTitle(title: String): Query[TodosTable, Todo, List] =
    Todos.filter(_.title === title).to[List]

  private def _findByText(text: String): Query[TodosTable, Todo, List] =
    Todos.filter(_.text === text).to[List]

  def findById(id: Long): Future[Option[Todo]] =
    db.run(_findById(id))

  def findByCategoryId(categoryId: Long): Future[List[Todo]] =
    db.run(_findByCategoryId(categoryId).result)

  def findByTitle(title: String): Future[List[Todo]] =
    db.run(_findByTitle(title).result)

  def findByText(text: String): Future[List[Todo]] =
    db.run(_findByText(text).result)

  def all: Future[List[Todo]] =
    db.run(Todos.to[List].result)

  def create(categoryId: Long, title: String, text: String, index: Int): Future[Long] = {
    val todo = Todo(0, categoryId, title, text, index)
    db.run(Todos returning Todos.map(_.id) += todo)
  }


  def update(todo: Todo): Future[Int] = {
    db.run(Todos.filter(_.id === todo.id).update(todo))
  }

  def deleteById(id: Long): Future[Int] = {
    db.run(Todos.filterNot(_.id === id).delete)
  }

  def insert(todo: Todo): DBIO[Long] =
    Todos returning Todos.map(_.id) += todo

  def _deleteAllInList(categoryId: Long): DBIO[Int] =
    Todos.filter(_.categoryId === categoryId).delete

  def deleteByCategoryId(categoryId: Long): Future[Int] = {
    val query = _findByCategoryId(categoryId)

    val interaction = for {
      todos        <- query.result
      todosDeleted <- query.delete
    } yield todosDeleted

    db.run(interaction.transactionally)
  }

  def deleteByName(name: String): Future[Int] = {
    val query = _findByTitle(name)

    val interaction = for {
      todos        <- query.result
      todosDeleted <- query.delete
    } yield todosDeleted

    db.run(interaction.transactionally)

  }

  // 直接sqlを実行
  //def queryTest(id: Long): Future[Vector[(Long, Long, String, String, Int)]] = {
  def queryTest(id: Long): Future[Seq[Todo]] = {
    //SQL実行後のマッピング先にGetResultを設定
    implicit val getTodoResult = GetResult( r => Todo( r<<, r<<, r<<, r<<, r<<))

    val action = sql"""
           SELECT ID, CATEGORY_ID, TITLE, TEXT, INDEX
           FROM TODO WHERE CATEGORY_ID = $id
        """.as[Todo]
    db.run(action).map(
      todos => for {
        todo <- todos
      } yield todo
    )
  }


  private class TodosTable(tag: Tag) extends Table[Todo](tag, "TODO") {

    def id = column[Long]("ID", O.AutoInc, O.PrimaryKey)
    def categoryId = column[Long]("CATEGORY_ID")
    def title = column[String]("TITLE")
    def text = column[String]("TEXT")
    def index = column[Int]("INDEX")

    def * = (id, categoryId, title, text, index) <> (Todo.tupled, Todo.unapply)
    def ? = (id.?, categoryId.?, title.?, text.?, index.?).
      shaped.<>({ r => import r._; _1.map(_ => Todo.tupled((_1.get, _2.get, _3.get, _4.get, _5.get))) },
      (_: Any) => throw new Exception("Inserting into ? projection not supported."))

  }
}
*/
