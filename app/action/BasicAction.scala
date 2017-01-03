package action

import play.api.mvc.{ActionBuilder, Request, Result}

import scala.concurrent.Future

/**
  * Created by arimuraterutoshi on 2017/01/02.
  */
object BasicAction extends ActionBuilder[Request] {
  def invokeBlock[A](request: Request[A], block: (Request[A]) => Future[Result]) = {
    persistReq(request)
    block(request)
  }

  private def persistReq[A](request: Request[A]) = {
    println(s"received another request ${request.headers}")
  }
}