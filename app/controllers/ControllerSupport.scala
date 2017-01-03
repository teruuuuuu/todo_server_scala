package controllers

import play.api.data.validation.ValidationError
import play.api.libs.json.{JsError, JsObject, JsPath, JsString}
import play.api.mvc.Controller


trait ControllerSupport extends Controller{
  protected val defaultErrorHandler = {
    error: Seq[(JsPath, Seq[ValidationError])] =>
      BadRequestForValidate(JsError.toFlatJson(error))
  }
  protected val BadRequestForValidate = {
    param: JsObject => BadRequest(createErrorResponse(s"Validate Error: $param"))
  }

  protected def createErrorResponse(message: String) = JsObject(
    Seq(
      "message" -> JsString(message)
    )
  )

}
