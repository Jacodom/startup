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
  var gitBtn = document.getElementById('gitButton');


  var config = {
    method: "GET",
    url: "http://api.icndb.com/jokes/random",
    async_value: true
  };





  button.addEventListener('click', function(){
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){

      if(xhr.readyState == 4 && xhr.status == 200){
        response.innerHTML = JSON.parse(xhr.responseText).value.joke;
      }
      else{
        response.innerHTML = "failed: " + xhr.statusText;
        response.className = "error-response";
      }
    }

    xhr.open(config.method, config.url, config.async_value);
    xhr.send();

  });





  gitBtn.addEventListener("click", function(){
    // var configGit = {
    //   method: "GET",
    //   url: "https://api.github.com/search/repositories",
    //   async_value: true,
    //   data:{
    //     q: ""
    //   }
    // }
    var promise = new Promise(function(resolve, reject){

      var configGit = {
        method: "GET",
        url: "https://api.github.com/search/repositories",
        async_value: true,
        data:{
          q: ""
        }
      }

      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function(){
        //everything is ok
        if(xhr.readyState == 4 && xhr.status == 200){
          var repos = [];
          repos = JSON.parse(xhr.responseText).items;
          if(repos!==undefined){
            resolve(repos);
          }else{
            reject("algo se rompio!");
          }
        }
      }

      var repoSearch = document.getElementById('repoSearch');

      configGit.data.q = repoSearch.value;

      var url = "";

      if(configGit.data.q != "" && configGit.data !== undefined){
        url = configGit.url + "?q=" + configGit.data.q;
      }else{
        url = configGit.url;
      }

      xhr.open(configGit.method, url, configGit.async_value);
      xhr.send();
    });

    promise.then(function(repos){
      console.log(repos);
      repos.forEach(function (repo) {
        var li = document.createElement("li");
        var text = document.createTextNode(repo.full_name);
        li.appendChild(text);
        repoList.appendChild(li);
      });
    }, function(err){
      console.log(err);
    });


    // var repoList = document.getElementById('repoList');
    // var xhr = new XMLHttpRequest();
    //
    // xhr.onreadystatechange = function(){
    //   if(xhr.readyState == 4 && xhr.status == 200){
    //     var repos = [];
    //         repos = JSON.parse(xhr.responseText).items;
    //
    //         repos.forEach(function (repo) {
    //             var li = document.createElement("li");
    //             var text = document.createTextNode(repo.full_name);
    //             li.appendChild(text);
    //             repoList.appendChild(li);
    //         });
    //   }
    // }
    //
    // var repoSearch = document.getElementById('repoSearch');
    //
    // configGit.data.q = repoSearch.value;
    //
    // var url = "";
    //
    // console.log(configGit);
    //
    // if(configGit.data.q != "" && configGit.data !== undefined){
    //   url = configGit.url + "?q=" + configGit.data.q;
    // }else{
    //   url = configGit.url;
    // }
    //
    // console.log(url);
    //
    // xhr.open(configGit.method, url, configGit.async_value);
    // xhr.send();
  });
