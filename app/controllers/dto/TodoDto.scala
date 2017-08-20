package controllers.dto

import play.api.libs.json.{JsPath, Json, Writes}
import model.{GroupTodoView, Todo, TodoCategory, TodoView}
import play.api.data.Form
import play.api.data.Forms.mapping
import play.api.data.Forms._
import play.api.libs.functional.syntax.unlift
/**
  * Created by arimuraterutoshi on 2017/01/02.
  */
trait TodoDto {

  /*************************************************************************
    * writes
    ************************************************************************/
  implicit lazy val todoCategoryWrite = Json.writes[TodoCategory]
  //implicit lazy val todoWrite = Json.writes[Todo]
  implicit lazy val todoWrite = new Writes[Todo] {
    def writes(todo: Todo) =
      Json.obj(
        "id" -> todo.id,
        "categoryId" -> todo.category_id,
        "title" -> todo.title,
        "text" -> todo.text
      )
  }


  implicit lazy val todoViewWrite = new Writes[TodoView] {

    def writes(todoView: TodoView) =
      Json.obj(
        "id" -> todoView.category_id,
        "name" -> todoView.category_name,
        "index" -> todoView.category_index,
        "cards" -> todoView.todos
      )
  }

  implicit lazy val groupTodoViewWrite = new Writes[GroupTodoView] {
    def writes(groupTodoView: GroupTodoView) =
      Json.obj(
        "groupId" -> groupTodoView.group_id,
        "todoViews" -> groupTodoView.todoViews
      )
  }

  /**************************************************************************
    * reads
    *************************************************************************/
  case class AddTodo(categoryId:Long, title:String, text:String)
  implicit val addTodoForm:Form[AddTodo] = Form (
    mapping(
      "categoryId" -> longNumber,
      "title"-> text,
      "text"-> text
    )(AddTodo.apply)(AddTodo.unapply)
  )

  case class DelTodo(todoId: Long)
  implicit val delTodoForm:Form[DelTodo] = Form (
    mapping(
      "todoId" -> longNumber
    )(DelTodo.apply)(DelTodo.unapply)
  )

  case class MoveTodo(categoryId: Long, todoId: Long)
  implicit val moveTodoForm:Form[MoveTodo] = Form (
    mapping(
      "categoryId" -> longNumber,
      "todoId" -> longNumber
    )(MoveTodo.apply)(MoveTodo.unapply)
  )

  case class AddTodoList(listTitle: String)
  implicit val addTodoListForm:Form[AddTodoList] = Form (
    mapping(
      "listTitle"-> text
    )(AddTodoList.apply)(AddTodoList.unapply)
  )

  case class DeleteTodoList(categoryId: Long)
  implicit val delTodoListForm:Form[DeleteTodoList] = Form (
    mapping(
      "categoryId" -> longNumber
    )(DeleteTodoList.apply)(DeleteTodoList.unapply)
  )

  case class MoveTodoList(categoryId: Long, nextIndexId: Long, index: Int)
  implicit val moveTodoListForm:Form[MoveTodoList] = Form (
    mapping(
      "categoryId" -> longNumber,
      "nextIndexId" -> longNumber,
      "index" -> number
    )(MoveTodoList.apply)(MoveTodoList.unapply)
  )


}