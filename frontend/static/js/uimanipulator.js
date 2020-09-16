var coll = document.getElementsByClassName("collapsible");
var i;
for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        console.log("ovdje sam");
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}

var toggleMenu= function (){
   var nav =document.getElementById('nav');
    if (nav.className==="nav"){
        nav.className +=".respon"
   }else{
        nav.className = "nav"
   }

}
