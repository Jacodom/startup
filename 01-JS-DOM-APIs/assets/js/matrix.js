window.onload = function(){
  var matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ]


  var buildTable = function(matrix) {
    var table = document.createElement('table');
    var thead = document.createElement('thead');
    var tr = document.createElement('tr');

    matrix[0].forEach(function(v){
      var th = document.createElement('th');
      var text = document.createTextNode(v);
      th.appendChild(text);
      tr.appendChild(th);
    }, tr);

    thead.appendChild(tr);

    table.appendChild(thead);

    var tbody = document.createElement('tbody');

    var tr = document.createElement('tr');
    matrix[1].forEach(function(v){
      var td = document.createElement('td');
      var text = document.createTextNode(v);
      td.appendChild(text);
      tr.appendChild(td);
    }, tr);

    tbody.appendChild(tr);

    var tr = document.createElement('tr');
    matrix[2].forEach(function (v) {
      var td = document.createElement('td');
      var text = document.createTextNode(v);
      td.appendChild(text);
      tr.appendChild(td);
    }, tr);

    tbody.appendChild(tr);

    table.appendChild(tbody);
    var section = document.getElementById('matrix');
    section.appendChild(table);
  }

  buildTable(matrix);
}
