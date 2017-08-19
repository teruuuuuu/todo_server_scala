package controllers

import javax.inject._
import play.api._
import play.api.mvc._


/**
  * This controller creates an `Action` to handle HTTP requests to the
  * application's home page.
  */
@Singleton
class RedirectController @Inject() extends Controller {

  def index = Action {
    //Ok(views.html.index("Your new application is ready."))
    Redirect("/assets/index.html")
  }

}
