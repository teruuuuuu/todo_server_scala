/*
package controllers.back

import javax.inject.Inject

import controllers.routes
import model.{User, UserRepo}
import play.api.data.Form
import play.api.data.Forms._
import play.api.i18n.{I18nSupport, MessagesApi}
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.mvc.{Action, Controller}

import scala.util.matching.Regex.Match

class UserController @Inject()(val messagesApi: MessagesApi, userRepo: UserRepo)
  extends Controller with I18nSupport {

  val form = Form(
    mapping(
      "id" -> longNumber,
      "name" -> nonEmptyText,
      "mail" -> email
    )(User.apply)(User.unapply)
  )

  val regex="""¥d{3}""".r
  val source="123 to 456"
  val result = regex.replaceAllIn(source, {
    m: Match => "*" * m.group(0).length
  })

  def index = Action.async { implicit rs =>
    userRepo.all
      .map(users => Ok(views.html.user_list(users)))
  }

  def add = Action { implicit request =>
    Ok(views.html.user_add(form))
  }


  def create = Action.async{ implicit rs =>
    val t = form.bindFromRequest.get
    userRepo.create(t.name, t.mail).
      map(id => Redirect(routes.UserController.index()))

  }

  def edit(id: Long) = Action.async{ implicit  rs =>
    val user = userRepo.findById(id)

    for {
      Some(user) <-  userRepo.findById(id)
    } yield Ok(views.html.user_edit(form.fill(new User(user.id, user.name, user.mail))))

  }


  def update = Action.async { implicit rs =>

    val t = form.bindFromRequest.get
    val user = User(t.id, t.name, t.mail)
    userRepo.update(user).
      map( id => Redirect(routes.UserController.index()))
  }

  def destroy(id: Long) = Action.async { implicit rs =>
    userRepo.deleteById(id).
      map( id => Redirect(routes.UserController.index()))
  }

}
*/
