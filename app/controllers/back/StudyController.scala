/*
package controllers.back

import javax.inject.{Inject, Singleton}

import play.api.data.Form
import play.api.data.Forms._
import play.api.i18n.{I18nSupport, MessagesApi}
import play.api.mvc._


case class FormData(input: String)

@Singleton
class StudyController @Inject() (val messagesApi: MessagesApi)
  extends Controller
    with I18nSupport {



  val form1 = Form(
    mapping(a1 = "input" -> text)(FormData.apply)(FormData.unapply)
  )

  def study = Action(
    Ok(views.html.study("フォームを送信", form1))
  )

  def send = Action{ implicit request =>
    var resform = form1.bindFromRequest()
    var res = "you typed: " + resform.get.input
    Ok(views.html.study(res, resform))
  }


}
*/
