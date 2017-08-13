package services.repository

import javax.inject.Inject

import anorm.SqlParser.get
import anorm.{SQL, ~}
import model.{Todo, TodoGroup}
import play.api.db.Database


@javax.inject.Singleton
class TodoGroupService @Inject()() {
  val todoGroupParser = {
    get[Long]("id") ~
      get[String]("name") map {
      case id ~ name => TodoGroup(id, name)
    }
  }


  /**********************************************************************************
    * SQL for Todo
    **********************************************************************************/

  def findUserGroup(db: Database, user_id: String): Seq[TodoGroup] = {
    db.withConnection { implicit connection =>
      val todoGroupList = SQL("""
      select tg.*
      from user_mst um
      join user_group_relation ug on ug.user_seq_num = um.seq_num
      join todo_group tg on tg.id = ug.group_id
      where um.user_id = {user_id}
      """
      ).on(
        'user_id -> user_id
      ).as(todoGroupParser.*)

      for {
        todoGroup <- todoGroupList
      } yield TodoGroup(todoGroup.id, todoGroup.name.trim)
    }
  }

}