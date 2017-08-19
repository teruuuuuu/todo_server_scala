package controllers.dto

import model.{Todo, TodoCategory, UserMst}
import play.api.data.Form
import play.api.data.Forms.mapping
import play.api.libs.json.{Json, Writes}
import play.api.data.Forms._

/**
  * Created by arimuraterutoshi on 2017/08/12.
  */
trait UserMstDto {

  /*************************************************************************
    * writes
    ************************************************************************/
  implicit lazy val userMstWrite = Json.writes[UserMst]
  //implicit lazy val todoWrite = Json.writes[Todo]
  implicit lazy val userMstWithResultWrite = new Writes[UserMst] {
    def writes(user: UserMst) =
      Json.obj(
        "seq_num" -> user.seq_num,
        "user_id" -> user.user_id,
        "family_name" -> user.family_name,
        "first_name" -> user.first_name,
        "password" -> user.password
      )
  }

  /**************************************************************************
    * reads
    *************************************************************************/
  case class LoginForm(user_id:String, password:String)
  implicit val loginForm:Form[LoginForm] = Form (
    mapping(
      "user_id" -> text,
      "password"-> text
    )(LoginForm.apply)(LoginForm.unapply)
  )
}
