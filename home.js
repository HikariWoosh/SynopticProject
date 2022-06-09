function openTab(evt, userType) {
    // Declare all variables
    var i, tabcontent, tabpages;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tabpages = document.getElementsByClassName("tabpages");
    for (i = 0; i < tabpages.length; i++) {
      tabpages[i].className = tabpages[i].className.replace(" active", "");
    }
    
    
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(userType).style.display = "block";
    evt.currentTarget.className += " active";
  }
  document.getElementById("defaultOpen").click();
