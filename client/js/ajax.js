var $ = {};
$.ajax = function(options){
  var xhr = new XMLHttpRequest();
  xhr.open(options.method, options.url, false);
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
      console.log(xhr.response);
    }
  };
  xhr.send();
}