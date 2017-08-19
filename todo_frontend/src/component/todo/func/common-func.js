export function callBack(webSocket) {
  function method(){
    webSocket.send("update")
  }
  return method;
} 
