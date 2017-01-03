/*
package controllers

import javax.inject.{Inject, Singleton}

import model.{TodoListRepo, TodoRepo, Todo, TodoList}
import play.api.i18n.MessagesApi
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.libs.json._
import play.api.mvc.{Action, Controller}
import play.api.libs.functional.syntax._
import slick.jdbc.GetResult


@Singleton
class TodoContoroller  @Inject()(val messagesApi: MessagesApi, todoRepo: TodoRepo, todoListRepo: TodoListRepo) extends Controller{


  case class TodoListTest(id: Int, name: String, index: Int, todos: Seq[TodoTest])
  case class TodoTest(id: Int, categoryId:Int, title:String, text: String)


  def index = Action {
    Ok("it works")
  }

  def todo = Action.async {

    val rtodoListSqlTest = todoListRepo.queryTest(2)
    val todoSqlTest = todoRepo.queryTest(2)

    val test = todoRepo.all


    var temp:List[Todo] = List[Todo]()
    test.foreach(
      todo =>
        //print(todo)
        temp = todo
    )
    print(temp)


    val ret = Seq(
      TodoListTest(1, "todo", 1, Seq(
        TodoTest(1, 1, "learn", "学ぶ"),
        TodoTest(2, 1, "learn", "試す")
      )),
      TodoListTest(2, "doing", 2, Seq(
        TodoTest(3, 2, "a", "c"),
        TodoTest(4, 2, "b", "d")
      ))
    )

    implicit val todoWrites: Writes[TodoTest] = (
      (JsPath \ "id").write[Int] and
        (JsPath \ "categoryId").write[Int] and
        (JsPath \ "title").write[String] and
        (JsPath \ "text").write[String]
      )(unlift(TodoTest.unapply))

    implicit val todoListWrites: Writes[TodoListTest] = (
      (JsPath \ "id").write[Int] and
        (JsPath \ "name").write[String] and
        (JsPath \ "index").write[Int] and
        (JsPath \ "cards").write[Seq[TodoTest]]
      )(unlift(TodoListTest.unapply))


    implicit val todoModelWrites = Json.writes[Todo]


    //for(i <-  0 until todoSqlTest. ) println(i)


    todoRepo.all
      .map(todos
        => Ok(Json.toJson(todos))
          .withHeaders("Access-Control-Allow-Origin" -> " *")
      )

  /*
    val json = Json.toJson(ret)


    Ok(json)
      .withHeaders("Access-Control-Allow-Origin" -> " *")
  */
  }
}
*/
