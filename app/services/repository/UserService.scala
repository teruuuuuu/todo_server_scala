package services.repository

import javax.inject.Inject

import anorm.SqlParser.get
import anorm.{SQL, ~}
import model.{UserMst}
import play.api.db.Database


@javax.inject.Singleton
class UserService @Inject()() {
  val userParser = {
    get[Long]("seq_num") ~
      get[String]("user_id") ~
      get[String]("family_name") ~
      get[String]("first_name") ~
      get[String]("password") map {
      case seq_num ~ user_id ~ family_name ~ first_name ~ password => UserMst(seq_num, user_id, family_name, first_name, password)
    }
  }


  /**********************************************************************************
    * SQL for Todo
    **********************************************************************************/

  def findUser(db: Database, user_id: String, password: String): Option[UserMst] = {
    db.withConnection { implicit connection =>
      val user = SQL("""
      select *
      from user_mst
      where user_id = {user_id}
        and password = {password}
      """
      ).on(
        'user_id -> user_id,
        'password -> password
      ).as(userParser.singleOpt)

      user match {
        case Some(x) =>
          val opUser = user.getOrElse(UserMst(-1, "", "", "", ""))
          Option(UserMst(opUser.seq_num, opUser.user_id.trim, opUser.family_name.trim, opUser.first_name.trim, opUser.password.trim))
        case None => None
      }
    }
  }

}