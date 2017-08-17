package controllers.dto

import model.{Todo, TodoCategory}
import play.api.libs.json.{Json, Writes}

case class CommonResut(result: String, message: String)

trait CommonDto {

  implicit lazy val commnResultWrite = Json.writes[CommonResut]
}
