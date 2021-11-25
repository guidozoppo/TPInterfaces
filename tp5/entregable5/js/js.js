window.addEventListener("DOMContentLoaded", _=>{

document.querySelector("#imgPerfil").addEventListener("click", desplegablePerfil);


    function desplegablePerfil() {
        document.getElementById("desplegablePerfil").classList.toggle("show");
    }
    
    // Close the dropdown menu if the user clicks outside of it
   /*  window.onclick = function(event) {
      if (!event.target.matches('.dropbtn')) {
    
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    } */


    /* const container = document.querySelector(".container"),
    privacy = container.querySelector(".post .privacy"),
    arrowBack = container.querySelector(".audience .arrow-back"); */
   /*  privacy.addEventListener("click", () => {
      container.classList.add("active");
    }); */
    /* arrowBack.addEventListener("click", () => {
      container.classList.remove("active");
    }); */



})