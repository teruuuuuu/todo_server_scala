package controllers

import javax.inject.{Inject, Singleton}

import controllers.dto.UserMstDto
import db.DefaultDB
import model.UserMst
import play.api.i18n.MessagesApi
import play.api.libs.json.Json
import play.api.mvc.Action
import services.repository.UserService

@Singleton
class LoginController  @Inject()(val messagesApi: MessagesApi,
          defaultDB: DefaultDB, userService: UserService)
          extends ControllerSupport with UserMstDto {
  val db = defaultDB.db
  //def todoViewRes = Json.toJson(todoService.todoList(db))


  /**
    * ログインリクエスト
    * curl 'http://localhost:9000/login' -H 'Content-Type: text/json' --data-binary '{"user_id": "teruuu", "password": "password"}'
    * @return
    */
  def login = Action { implicit request =>
    db.withTransaction { tr =>
      try {
        loginForm.bindFromRequest.fold(
          errors => {
            Ok(Json.toJson(UserMst(-1, "", "", "", "")))
          },
          validForm => {
            val user = userService.findUser(db, validForm.user_id, validForm.password)
            user match {
              case None =>
                Ok(Json.toJson(UserMst(-1, "", "", "", "")))
              case Some(x) =>
                val user_id = validForm.user_id
                Ok(Json.toJson(user))
                  .withSession("loginUserId" -> user_id)
            }
          }
        )
      }
    }
  }
}
