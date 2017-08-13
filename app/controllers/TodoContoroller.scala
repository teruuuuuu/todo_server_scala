package controllers

import javax.inject.{Inject, Singleton}

import controllers.dto.TodoDto
import db.DefaultDB
import play.api.i18n.MessagesApi
import play.api.libs.json._
import play.api.mvc.{Action, Controller}
import services.repository.{TodoGroupService, TodoService}

@Singleton
class TodoContoroller  @Inject()(val messagesApi: MessagesApi,
           defaultDB: DefaultDB,todoService: TodoService, todoGroupService: TodoGroupService)
           extends ControllerSupport with TodoDto {
  val db = defaultDB.db
  def todoViewRes(groupId: Long): Unit = {
    Json.toJson(todoService.todoList(db, groupId))
  }

  def todos = Action { implicit request =>
    request.session.get("loginUserId") match {
      case None =>
        Ok("")
      case Some(loginUserId) =>
        db.withTransaction { tr =>
          try {
            val todoGroupSeq = todoGroupService.findUserGroup(db, loginUserId)
            todoGroupSeq.length match {
              case 0 =>
                Ok("")
              case _ =>
                Ok(Json.toJson(todoService.todoList(db, todoGroupSeq(0).id)))
            }
          }
        }
    }
  }


  /*********************************************************************
    * controller for todo
    ********************************************************************/
  def addTodo = Action { implicit request =>
    request.session.get("loginUserId") match {
      case None =>
        Ok("")
      case Some(loginUserId) =>
        db.withTransaction { tr =>
          try {
            addTodoForm.bindFromRequest.fold(
              errors => {},
              validForm => {
                val id = todoService.addTodo(db, validForm.categoryId, validForm.title, validForm.text)
              }
            )
          }
          val todoGroupSeq = todoGroupService.findUserGroup(db, loginUserId)
          todoGroupSeq.length match {
            case 0 =>
              Ok("")
            case _ =>
              Ok(Json.toJson(todoService.todoList(db, todoGroupSeq(0).id)))
          }
        }
    }
  }

  def delTodo = Action { implicit request =>
    request.session.get("loginUserId") match {
      case None =>
        Ok("")
      case Some(loginUserId) =>
        db.withTransaction { tr =>
          try {
            delTodoForm.bindFromRequest.fold(
              errors => {},
              validForm => {
                val id = todoService.deleteTodo(db, validForm.todoId)
              }
            )
          }
          val todoGroupSeq = todoGroupService.findUserGroup(db, loginUserId)
          todoGroupSeq.length match {
            case 0 =>
              Ok("")
            case _ =>
              Ok(Json.toJson(todoService.todoList(db, todoGroupSeq(0).id)))
          }
        }
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
    request.session.get("loginUserId") match {
      case None =>
        Ok("")
      case Some(loginUserId) =>
        db.withTransaction { tr =>
          try {
            addTodoListForm.bindFromRequest.fold(
              errors => {},
              validForm => {
                val id = todoService.addTodoCategory(db, validForm.listTitle)
              }
            )
          }
          val todoGroupSeq = todoGroupService.findUserGroup(db, loginUserId)
          todoGroupSeq.length match {
            case 0 =>
              Ok("")
            case _ =>
              Ok(Json.toJson(todoService.todoList(db, todoGroupSeq(0).id)))
          }
        }
    }

  }

  def delTodoList = Action { implicit request =>
    request.session.get("loginUserId") match {
      case None =>
        Ok("")
      case Some(loginUserId) =>
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
          val todoGroupSeq = todoGroupService.findUserGroup(db, loginUserId)
          todoGroupSeq.length match {
            case 0 =>
              Ok("")
            case _ =>
              Ok(Json.toJson(todoService.todoList(db, todoGroupSeq(0).id)))
          }
        }
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
                    todoService.getAllTodoCategory(db, 1).zipWithIndex.foreach{
                      case (todoCategory, index) =>
                      if(todoCategory.id == moveCategory.id){
                        todoService.updateTodoCategory(db, todoCategory.copy(index = validForm.index))
                      }else if(moveCategory.index < todoCategory.index && todoCategory.index <= validForm.index){
                        todoService.updateTodoCategory(db, todoCategory.copy(index = index ))
                      }
                    }
                  }
                  case false => {
                    todoService.getAllTodoCategory(db, 1).zipWithIndex.foreach{
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