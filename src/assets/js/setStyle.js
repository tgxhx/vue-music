/**
 * Created by 12 on 2017/6/11.
 */
function setStyle(obj,json) {
  for (var i in json) {
    obj.style[i] = json[i]
  }
}
