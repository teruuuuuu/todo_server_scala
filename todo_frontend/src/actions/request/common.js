export default function createRequestData(url, dataType, type, data, response_action, isJsonRequest){
  if (isJsonRequest == null | isJsonRequest == false) {
    return { url: url,
             dataType:dataType,
             type:type,
             data: data,
             response_action: response_action,
             contentType: 'application/x-www-form-urlencoded; charset=UTF-8' }
  }else{
    return { url: url,
             dataType:dataType,
             type:type,
             data:  data,
             response_action: response_action,
             contentType: 'application/x-www-form-urlencoded; charset=UTF-8' }
  }

}
