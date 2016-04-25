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
