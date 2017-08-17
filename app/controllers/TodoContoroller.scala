package controllers

import javax.inject.{Inject, Singleton}

import controllers.dto.{CommonDto, CommonResut, TodoDto}
import db.DefaultDB
import model.GroupTodoView
import play.api.i18n.MessagesApi
import play.api.libs.json._
import play.api.mvc.{Action, Controller}
import services.repository.{TodoGroupService, TodoService}

@Singleton
class TodoContoroller  @Inject()(val messagesApi: MessagesApi,
           defaultDB: DefaultDB,todoService: TodoService, todoGroupService: TodoGroupService)
           extends ControllerSupport with CommonDto with TodoDto {
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
                val groupId = todoGroupSeq(0).id
                Ok(Json.toJson(GroupTodoView(groupId, Option(todoService.todoList(db, groupId)))))
            }
          }
        }
    }
  }

  def groupTodos(groupId: Long) = Action { implicit request =>
    request.session.get("loginUserId") match {
      case None =>
        Ok("")
      case Some(loginUserId) =>
        db.withTransaction { tr =>
          try {
            Ok(Json.toJson(GroupTodoView(groupId, Option(todoService.todoList(db, groupId)))))
          }
        }
    }
  }

  /*********************************************************************
    * controller for todo
    ********************************************************************/
  def addCategoryTodo(categoryId: Long) = Action { implicit request =>
    request.session.get("loginUserId") match {
      case None =>
        Ok(Json.toJson(CommonResut("fail","")))
      case Some(loginUserId) =>
        db.withTransaction { tr =>
          try {
            addTodoForm.bindFromRequest.fold(
              errors => {},
              validForm => {
                val id = todoService.addTodo(db, categoryId, validForm.title, validForm.text)
              }
            )
          }
          Ok(Json.toJson(CommonResut("success","")))
        }
    }
  }

  def delTodo(todoId: Long) = Action { implicit request =>
    request.session.get("loginUserId") match {
      case None =>
        Ok(Json.toJson(CommonResut("fail","")))
      case Some(loginUserId) =>
        db.withTransaction { tr =>
          try {
            todoService.deleteTodo(db, todoId)
          }
          Ok(Json.toJson(CommonResut("success","")))
        }
    }
  }

  def moveTodo(categoryId: Long) = Action { implicit request =>
    db.withTransaction { tr =>
      try {
        moveTodoForm.bindFromRequest.fold(
          errors => {
            Ok(Json.toJson(CommonResut("fail","")))
          },
          validForm => {
            todoService.getTodo(db, validForm.todoId).map{
              todo =>
                val nextTodos = todoService.getTodoByCategory(db, categoryId)
                nextTodos.zipWithIndex.foreach {
                  case (upTodo, index) =>
                    todoService.updateTodo(db, upTodo.copy(index = index + 1))
                }
                todoService.updateTodo(db, todo.copy(category_id = categoryId,index = nextTodos.length + 1))
                todoService.getTodoByCategory(db, todo.category_id).zipWithIndex.foreach{
                  case (upTodo, index) =>
                    todoService.updateTodo(db, upTodo.copy(index = index + 1))
                }
            }
            Ok(Json.toJson(CommonResut("success","")))
          }
        )
      }
    }
  }


  /*********************************************************************
    * controller for todo_category
    ********************************************************************/
  def addTodoList(groupId: Long) = Action { implicit request =>
    request.session.get("loginUserId") match {
      case None =>
        Ok(Json.toJson(CommonResut("fail","")))
      case Some(loginUserId) =>
        db.withTransaction { tr =>
          try {
            addTodoListForm.bindFromRequest.fold(
              errors => {},
              validForm => {
                val id = todoService.addTodoCategory(db, groupId, validForm.listTitle)
              }
            )
          }
          Ok(Json.toJson(CommonResut("success","")))
        }
    }
  }

  def addGroupTodoList(groupId: Long) = Action { implicit request =>
    request.session.get("loginUserId") match {
      case None =>
        Ok("")
      case Some(loginUserId) =>
        db.withTransaction { tr =>
          try {
            addTodoListForm.bindFromRequest.fold(
              errors => {},
              validForm => {
                val id = todoService.addTodoCategory(db, groupId, validForm.listTitle)
              }
            )
          }
          val todoGroupSeq = todoGroupService.findUserGroup(db, loginUserId)
          todoGroupSeq.length match {
            case 0 =>
              Ok("")
            case _ =>
              Ok(Json.toJson(GroupTodoView( todoGroupSeq(0).id, Option(todoService.todoList(db, todoGroupSeq(0).id)))))
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
              Ok(Json.toJson(GroupTodoView( todoGroupSeq(0).id, Option(todoService.todoList(db, todoGroupSeq(0).id)))))
          }
        }
    }
  }

  def moveTodoList(groupId: Long) = Action { implicit request =>
    db.withTransaction { tr =>
      try {
        moveTodoListForm.bindFromRequest.fold(
          errors => {
            Ok(Json.toJson(CommonResut("fail","")))
          },
          validForm => {
            todoService.getTodoCategory(db, validForm.categoryId).map{
              moveCategory =>
                moveCategory.index < validForm.index match{
                  case true  => {
                    todoService.getAllTodoCategory(db, groupId).zipWithIndex.foreach{
                      case (todoCategory, index) =>
                      if(todoCategory.id == moveCategory.id){
                        todoService.updateTodoCategory(db, todoCategory.copy(index = validForm.index))
                      }else if(moveCategory.index < todoCategory.index && todoCategory.index <= validForm.index){
                        todoService.updateTodoCategory(db, todoCategory.copy(index = index ))
                      }
                    }
                  }
                  case false => {
                    todoService.getAllTodoCategory(db, groupId).zipWithIndex.foreach{
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
            Ok(Json.toJson(CommonResut("success","")))
          }
        )
      }
    }
  }
}