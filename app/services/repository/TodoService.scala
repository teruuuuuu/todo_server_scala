package services.repository

import javax.inject.Inject

import anorm.SqlParser.get
import anorm.{SQL, ~}
import model.{Todo, TodoCategory, TodoView}
import play.api.db.Database


@javax.inject.Singleton
class TodoService @Inject()() {
  val todoParser = {
    get[Long]("id") ~
      get[Long]("category_id") ~
      get[String]("title") ~
      get[String]("text") ~
      get[Int]("index") map {
      case id ~ category_id ~ title ~ text ~ index => Todo(id, category_id, title, text, index)
    }
  }

  val todoCategoryParser = {
    get[Long]("id") ~
      get[String]("name") ~
      get[Int]("index") map {
      case id ~ name ~ index => TodoCategory(id, name, index)
    }
  }


  /**********************************************************************************
    * SQL for Todo
    **********************************************************************************/
  def addTodo(db: Database, category_id: Long, title:String, text:String): Option[Long] = {
    insertTodo(db, new Todo(0, category_id, title, text, 0))
  }

  def insertTodo(db: Database, todo: Todo) = {
    db.withConnection { implicit connection =>
      SQL(
        """
          insert into todo (id, category_id, title, text, index) values
          ( (select nextval('todo_id_seq')),
            {category_id},
            {title},
            {text},
            (select count(*) + 1 from todo where category_id = {category_id})
           )
        """
      ).on(
        'category_id -> todo.category_id,
        'title -> todo.title,
        'text -> todo.text
      ).executeInsert()
    }
  }

  def updateTodo(db: Database, todo: Todo) = {
    db.withConnection { implicit connection =>
      SQL(
        """
          update todo
          set category_id = {category_id},
          title = {title},
          text = {text},
          index = {index}
          where id = {id}
        """
      ).on(
        'id -> todo.id,
        'category_id -> todo.category_id,
        'title -> todo.title,
        'text -> todo.text,
        'index -> todo.index
      ).executeUpdate()
    }
  }

  def deleteTodo(db: Database, todoId: Long) = {
    db.withConnection { implicit connection =>
      SQL(
        """
          delete from todo
          where id = {id}
        """
      ).on(
        'id -> todoId
      ).execute()
    }
  }

  def getTodo(db: Database, id: Long): Option[Todo] = {
    db.withConnection { implicit connection =>
      SQL("select * from todo where id = {id}").on('id -> id).as(todoParser.singleOpt)
    }
  }

  def getTodoByCategory(db: Database, categoryId: Long): Seq[Todo] = {
    db.withConnection { implicit connection =>
      SQL("select * from todo where category_id = {category_id}").on('category_id -> categoryId).as(todoParser.*)
    }
  }

  def getAllTodo(db: Database): Seq[Todo] = {
    db.withConnection { implicit connection =>
      var sqlResult = SQL("select * from todo order by index").as(todoParser.*)
      for {
        todo <- sqlResult
      } yield Todo(todo.id, todo.category_id, todo.title.trim, todo.text.trim, todo.index)

    }
  }


  /**********************************************************************************
    * SQL for TodoCategory
    *********************************************************************************/
  def addTodoCategory(db: Database,  name:String): Option[Long] = {
    insertTodoCategory(db, new TodoCategory(0, name, 0))
  }

  def insertTodoCategory(db: Database, todoCategory: TodoCategory): Option[Long] ={
    db.withConnection { implicit connection =>
      SQL(
        """
          insert into todo_category (id, name, index) values
          ( (select nextval('todo_category_id_seq')),
            {name},
            (select max(index) + 1 from todo_category)
           )
        """
      ).on(
        'name -> todoCategory.name
      ).executeInsert()
    }
  }


  def updateTodoCategory(db: Database, todoCategory: TodoCategory): Option[Long] ={
    db.withConnection { implicit connection =>
      SQL(
        """
          update todo_category set
          name = {name},
          index = {index}
          where id = {id}
        """
      ).on(
        'id -> todoCategory.id,
        'name -> todoCategory.name,
        'index -> todoCategory.index
      ).executeInsert()
    }
  }

  def deleteTodoCategory(db: Database, todoCategoryId: Long) = {
    db.withConnection { implicit connection =>
      SQL(
        """
          delete from todo_category
          where id = {id}
        """
      ).on(
        'id -> todoCategoryId
      ).execute()
    }
  }

  def getTodoCategory(db: Database, categoryId: Long): Option[TodoCategory] = {
    db.withConnection { implicit connection =>
      SQL("select * from todo_category where id = {id}").on('id -> categoryId).as(todoCategoryParser.singleOpt)
    }
  }

  def getAllTodoCategory(db: Database): Seq[TodoCategory] = {
    db.withConnection { implicit connection =>
      var sqlResult = SQL("select * from todo_category order by index").as(todoCategoryParser.*)
      for {
        category <- sqlResult
      } yield TodoCategory(category.id, category.name.trim, category.index)
    }
  }

  /**********************************************************************************
    * SQL for view
    *********************************************************************************/
  def todoList(db: Database): Seq[TodoView] = {
    val todoCategorys = getAllTodoCategory(db)
    val todos = getAllTodo(db)
    val todoGroup = todos.groupBy(_.category_id)

    var ret = Seq[TodoView]()
    val mergedList = todoCategorys.groupBy(_.id).map(cat =>
      cat._2.map(_.name).map(name =>
        cat._2.map(_.index).map(index =>
          todoGroup.contains(cat._1) match{
            case true =>
              ret = ret :+ TodoView(cat._1, name, index, todoGroup.get(cat._1))
              //TodoView(cat._1, name._1, index._1, todoGroup.get(cat._1)) 深くなるのでやめとく
            case false =>
              ret = ret :+ TodoView(cat._1, name, index, Option(Seq[Todo]()))
          }

        )
      )
    )
    ret.sortBy(_.category_index)
  }
}
