window.onload = function () {
  var sectionElement = document.getElementById('helloWorld');

  if(sectionElement.style.display == "block"){
    sectionElement.style.display = "none";
  }else {
    var timer = setInterval(function(){
      sectionElement.style.display = "block";
      sectionElement.className = "faded";
    }, 1000);
  }
}
  var button = document.getElementById('button');
  var response = document.getElementById('response');



  button.addEventListener('click', function(){
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){

      if(xhr.readyState == 4 && xhr.status == 200){
        response.innerHTML = JSON.parse(xhr.responseText).value.joke;
      }
      else{
        response.innerHTML = "failed: "+ xhr.statusText;
      }
    }

    xhr.open("GET", "http://api.icndb.com/jokes/random", true);
    xhr.send();

  });
