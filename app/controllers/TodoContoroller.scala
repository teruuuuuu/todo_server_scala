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
                val id = todoService.addTodo(db, validForm.categoryId, validForm.title, validForm.text)
              }
            )
          }
          Ok(Json.toJson(CommonResut("success","")))
        }
    }
  }

  def todoPrefright(categoryId: Long, todoId: Long) = Action {
    Ok(Json.toJson(CommonResut("success","")))
  }

  def delTodo(categoryId: Long, todoId: Long) = Action { implicit request =>
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

  def moveTodo(categoryId: Long, todoId: Long) = Action { implicit request =>
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
                    todoService.updateTodo(db, upTodo.copy(index = index + 1 ))
                }
                todoService.getTodoByCategory(db, todo.category_id).zipWithIndex.foreach{
                  case (upTodo, index) =>
                    todoService.updateTodo(db, upTodo.copy(index = index + 1))
                }
                todoService.updateTodo(db, todo.copy(category_id = categoryId,index = nextTodos.length + 1, title = validForm.title, text = validForm.text))

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

  def deleteCategory(groupId: Long, categoryId: Long) = Action { implicit request =>
    request.session.get("loginUserId") match {
      case None =>
        Ok(Json.toJson(CommonResut("fail","")))
      case Some(loginUserId) =>
        db.withTransaction { tr =>
          try {
            todoService.getTodoByCategory(db, categoryId).foreach{
              todo =>
                todoService.deleteTodo(db, todo.id)
            }
            todoService.deleteTodoCategory(db, categoryId)
          }
          Ok(Json.toJson(CommonResut("success","")))
        }
    }
  }

  def categoriesPrefright(groupId: Long, categoryId: Long) = Action {
    Ok(Json.toJson(CommonResut("success","")))
  }

  def moveTodoList(groupId: Long, categoryId: Long) = Action { implicit request =>
    db.withTransaction { tr =>
      try {
        moveTodoListForm.bindFromRequest.fold(
          errors => {
            Ok(Json.toJson(CommonResut("fail","")))
          },
          validForm => {
            val currentIndex = todoService.getAllTodoCategory(db, groupId).filter(_.id == validForm.categoryId) match {
              case x if x.size >= 1 => x.head.index
              case _ => 1
            }
            val nextIndex = todoService.getAllTodoCategory(db, groupId).filter(_.id == validForm.nextIndexId) match {
              case x if x.size >= 1 => x.head.index
              case _ => 1
            }
            var nextUpdateIndex = 1
            val allTodoCategory = todoService.getAllTodoCategory(db, groupId)
            val moveTodoList = todoService.getTodoCategory(db, validForm.categoryId).head
            currentIndex > nextIndex match {
              case true =>
                // 左にドラッグ&ドロップ
                allTodoCategory.zipWithIndex.foreach {
                  case (todoCategory, index) =>
                    if(todoCategory.id == validForm.categoryId){
                    } else if(todoCategory.index <= currentIndex && todoCategory.index >= nextIndex) {
                      if(todoCategory.id == validForm.nextIndexId) {
                        nextUpdateIndex = index + 1
                      }
                      todoService.updateTodoCategory(db, todoCategory.copy(index = index + 2))
                    } else {
                      todoService.updateTodoCategory(db, todoCategory.copy(index = index + 1))
                    }
                }
                todoService.updateTodoCategory(db, moveTodoList.copy(index = nextUpdateIndex))
              case false =>
                // 右にドラッグ&ドロップ
                allTodoCategory.zipWithIndex.foreach {
                  case (todoCategory, index) =>
                    if(todoCategory.id == validForm.categoryId){
                    } else if(todoCategory.index >= currentIndex && todoCategory.index <= nextIndex) {
                      if(todoCategory.id == validForm.nextIndexId) {
                        nextUpdateIndex = index + 1
                      }
                      todoService.updateTodoCategory(db, todoCategory.copy(index = index))
                    } else {
                      todoService.updateTodoCategory(db, todoCategory.copy(index = index + 1))
                    }
                }
                todoService.updateTodoCategory(db, moveTodoList.copy(index = nextUpdateIndex))
            }

            Ok(Json.toJson(CommonResut("success","")))
          }
        )
      }
    }
  }
}