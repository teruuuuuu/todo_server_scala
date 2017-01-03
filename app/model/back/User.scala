/*
package model

import javax.inject.Inject

import play.api.db.slick.DatabaseConfigProvider
import slick.dbio
import slick.dbio.Effect.Read
import slick.driver.JdbcProfile
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future


case class User(id: Long, name: String, mail: String) {

  def patch(name: Option[String], mail: Option[String]): User =
    this.copy(name = name.getOrElse(this.name),
      mail = mail.getOrElse(this.mail))
}

class UserRepo @Inject()(protected val dbConfigProvider: DatabaseConfigProvider) {

  val dbConfig = dbConfigProvider.get[JdbcProfile]
  val db = dbConfig.db
  import dbConfig.driver.api._
  private val Users = TableQuery[UsersTable]

  private def _findById(id: Long): DBIO[Option[User]] =
    Users.filter(_.id === id).result.headOption

  private def _findByName(name: String): Query[UsersTable, User, List] =
    Users.filter(_.name === name).to[List]

  private def _findByMail(mail: String): Query[UsersTable, User, List] =
    Users.filter(_.mail === mail).to[List]

  def findById(id: Long): Future[Option[User]] =
    db.run(_findById(id))

  def findByName(name: String): Future[List[User]] =
    db.run(_findByName(name).result)

  def findByMail(mail: String): Future[List[User]] =
    db.run(_findByMail(mail).result)


  def all: Future[List[User]] =
    db.run(Users.to[List].result)

  def create(name: String, mail: String): Future[Long] = {
    val user = User(0, name, mail)
    db.run(Users returning Users.map(_.id) += user)
  }

  def update(user: User): Future[Int] = {
    db.run(Users.filter(_.id === user.id).update(user))
  }

  def deleteById(id: Long): Future[Int] = {
    db.run(Users.filter(_.id === id).delete)
  }

  def deleteByName(name: String): Future[Int] = {
    val query = _findByName(name)

    val interaction = for {
      users        <- query.result
      usersDeleted <- query.delete
    } yield usersDeleted

    db.run(interaction.transactionally)
  }


  private class UsersTable(tag: Tag) extends Table[User](tag, "USER") {

    def id = column[Long]("ID", O.AutoInc, O.PrimaryKey)
    def name = column[String]("NAME")
    def mail = column[String]("MAIL")

    def * = (id, name, mail) <> (User.tupled, User.unapply)
    def ? = (id.?, name.?, mail.?).shaped.<>({ r => import r._; _1.map(_ => User.tupled((_1.get, _2.get, _3.get))) },
      (_: Any) => throw new Exception("Inserting into ? projection not supported."))

  }
}
*/
