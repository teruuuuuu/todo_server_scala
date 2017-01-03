package db

import javax.inject.Inject

import play.api.db.DBApi


@javax.inject.Singleton
class DefaultDB @Inject()(dbapi: DBApi){

  val db = dbapi.database("default")
}

