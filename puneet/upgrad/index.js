function myFunction() {
  var x = document.getElementById("form1");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}
function myFunction2(){
	var y = document.getElementById("name").value;
	var z = document.getElementById("phone").value;
    /*var x = document.getElementById("data");
    var a = document.getElementById("form1");*/
    var tab = document.getElementById("tab");
	/*document.getElementById("demo").innerHTML = y;
	document.getElementById("task").innerHTML = z;
	if (y!= "" || z!= "") {
		x.style.display = "table-row";
	}
	a.style.display = "none";*/
	var newRow = tab.insertRow(tab.rows.length);
	var cel1 = newRow.insertCell(0);
	var cel2 = newRow.insertCell(1);
	var cel3 = newRow.insertCell(2);

	cel1.innerHTML = y;
	cel2.innerHTML = z;
	cel3.innerHTML = 'delete';

}
/*document.getElementById("submit").addEventListener("click", function(event){
    event.preventDefault();
   handleFireButton();
});*/