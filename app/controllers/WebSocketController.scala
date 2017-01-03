package controllers

import java.net.URL
import javax.inject._

import akka.actor.ActorSystem
import akka.event.Logging
import akka.stream.Materializer
import akka.stream.scaladsl.{BroadcastHub, Flow, Keep, MergeHub, Source}
import play.api.mvc._

import scala.concurrent.{ExecutionContext, Future}

/**
  * A very simple chat client using websockets.
  */
@Singleton
class WebSocketController @Inject()(implicit actorSystem: ActorSystem,
                               mat: Materializer,
                               executionContext: ExecutionContext)
  extends Controller {

  private type WSMessage = String

  private val logger = org.slf4j.LoggerFactory.getLogger(this.getClass)

  private implicit val logging = Logging(actorSystem.eventStream, logger.getName)

  // chat room many clients -> merge hub -> broadcasthub -> many clients
  private val (chatSink, chatSource) = {

    // Don't log MergeHub$ProducerFailed as error if the client disconnects.
    // recoverWithRetries -1 is essentially "recoverWith"
    val source = MergeHub.source[WSMessage]
      .log("source")
      .recoverWithRetries(-1, { case _: Exception ⇒ Source.empty })

    val sink = BroadcastHub.sink[WSMessage]
    source.toMat(sink)(Keep.both).run()
  }

  private val userFlow: Flow[WSMessage, WSMessage, _] = {
    Flow.fromSinkAndSource(chatSink, chatSource).log("userFlow")
  }


  def chat: WebSocket = {
    WebSocket.acceptOrResult[WSMessage, WSMessage] {
      case rh if sameOriginCheck(rh) =>
        Future.successful(userFlow).map { flow =>
          Right(flow)
        }.recover {
          case e: Exception =>
            val msg = "Cannot create websocket"
            logger.error(msg, e)
            val result = InternalServerError(msg)
            Left(result)
        }

      case rejected =>
        logger.error(s"Request ${rejected} failed same origin check")
        Future.successful {
          Left(Forbidden("forbidden"))
        }
    }
  }

  /**
    * Checks that the WebSocket comes from the same origin.  This is necessary to protect
    * against Cross-Site WebSocket Hijacking as WebSocket does not implement Same Origin Policy.
    *
    * See https://tools.ietf.org/html/rfc6455#section-1.3 and
    * http://blog.dewhurstsecurity.com/2013/08/30/security-testing-html5-websockets.html
    */
  private def sameOriginCheck(rh: RequestHeader): Boolean = {
    rh.headers.get("Origin") match {
      case _ =>
        true
        /*
      case Some(originValue) if originMatches(originValue) =>
        logger.debug(s"originCheck: originValue = $originValue")
        true

      case Some(badOrigin) =>
        logger.error(s"originCheck: rejecting request because Origin header value ${badOrigin} is not in the same origin")
        false

      case None =>
        logger.error("originCheck: rejecting request because no Origin header found")
        false
        */
    }
  }

  /**
    * Returns true if the value of the Origin header contains an acceptable value.
    */
  private def originMatches(origin: String): Boolean = {
    try {
      val url = new URL(origin)
      url.getHost == "localhost" &&
        (url.getPort match { case 9000 | 19001 => true; case _ => false })
    } catch {
      case e: Exception => false
    }
  }

}
