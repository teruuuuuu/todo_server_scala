package controllers

import javax.inject.{Inject, Singleton}


import controllers.dto.TodoDto
import db.DefaultDB
import play.api.i18n.MessagesApi
import play.api.libs.json._
import play.api.mvc.{Action, Controller}
import services.repository.TodoService

@Singleton
class TodoContoroller  @Inject()(val messagesApi: MessagesApi,
           defaultDB: DefaultDB,todoService: TodoService)
           extends ControllerSupport with TodoDto {
  val db = defaultDB.db
  def todoViewRes = Json.toJson(todoService.todoList(db))


  def todos = Action { implicit request =>
    db.withTransaction { tr =>
      try {
        Ok(todoViewRes)
      }
    }
  }


  /*********************************************************************
    * controller for todo
    ********************************************************************/
  def addTodo = Action { implicit request =>
    db.withTransaction { tr =>
      try {
        addTodoForm.bindFromRequest.fold(
          errors => {},
          validForm => {
            val id = todoService.addTodo(db, validForm.categoryId, validForm.title, validForm.text)
          }
        )
      }
      Ok(todoViewRes)
    }
  }

  def delTodo = Action { implicit request =>
    db.withTransaction { tr =>
      try {
        delTodoForm.bindFromRequest.fold(
          errors => {},
          validForm => {
            val id = todoService.deleteTodo(db, validForm.todoId)
          }
        )
      }
      Ok(todoViewRes)
    }
  }

  def moveTodo = Action { implicit request =>
    db.withTransaction { tr =>
      try {
        moveTodoForm.bindFromRequest.fold(
          errors => {},
          validForm => {
            todoService.getTodo(db, validForm.todoId).map{
              todo =>
                val nextTodos = todoService.getTodoByCategory(db, validForm.categoryId)
                nextTodos.zipWithIndex.foreach {
                  case (upTodo, index) =>
                    todoService.updateTodo(db, upTodo.copy(index = index + 1))
                }
                todoService.updateTodo(db, todo.copy(category_id = validForm.categoryId,index = nextTodos.length + 1))
                todoService.getTodoByCategory(db, todo.category_id).zipWithIndex.foreach{
                  case (upTodo, index) =>
                    todoService.updateTodo(db, upTodo.copy(index = index + 1))
                }
            }
          }
        )
      }
      Ok("")
    }
  }

  /*********************************************************************
    * controller for todo_category
    ********************************************************************/
  def addTodoList = Action { implicit request =>
    db.withTransaction { tr =>
      try {
        addTodoListForm.bindFromRequest.fold(
          errors => {},
          validForm => {
            val id = todoService.addTodoCategory(db, validForm.listTitle)
          }
        )
      }
      Ok(todoViewRes)
    }
  }

  def delTodoList = Action { implicit request =>
    db.withTransaction { tr =>
      try {
        delTodoListForm.bindFromRequest.fold(
          errors => {},
          validForm => {
            todoService.getTodoByCategory(db, validForm.categoryId).foreach{
              todo =>
                todoService.deleteTodo(db, todo.id)
            }
            todoService.deleteTodoCategory(db, validForm.categoryId)
          }
        )
      }
      Ok(todoViewRes)
    }
  }

  def moveTodoList = Action { implicit request =>
    db.withTransaction { tr =>
      try {
        moveTodoListForm.bindFromRequest.fold(
          errors => {},
          validForm => {
            todoService.getTodoCategory(db, validForm.categoryId).map{
              moveCategory =>
                moveCategory.index < validForm.index match{
                  case true  => {
                    todoService.getAllTodoCategory(db).zipWithIndex.foreach{
                      case (todoCategory, index) =>
                      if(todoCategory.id == moveCategory.id){
                        todoService.updateTodoCategory(db, todoCategory.copy(index = validForm.index))
                      }else if(moveCategory.index < todoCategory.index && todoCategory.index <= validForm.index){
                        todoService.updateTodoCategory(db, todoCategory.copy(index = index ))
                      }
                    }
                  }
                  case false => {
                    todoService.getAllTodoCategory(db).zipWithIndex.foreach{
                      case (todoCategory, index) =>
                        if(todoCategory.id == moveCategory.id){
                          todoService.updateTodoCategory(db, todoCategory.copy(index = validForm.index))
                        }else if(moveCategory.index > todoCategory.index && todoCategory.index >= validForm.index){
                          todoService.updateTodoCategory(db, todoCategory.copy(index = index + 2))
                        }
                    }
                  }
                }
            }

          }
        )
      }
      Ok("")
    }
  }
}