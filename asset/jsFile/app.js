 const searchButton = document.getElementById("search");
    const searchArea = document.querySelector(".searchInput");
    const inputBox = document.getElementById("srcInputBox");

    
    searchButton.addEventListener("click", ()=>{
      
      searchArea.style.display = "flex"; 
      
    });

    
    window.addEventListener("click", (e)=> {
      if (e.target === searchButton || e.target === inputBox) {
        return;
      }
      searchArea.style.display = "none";
    });