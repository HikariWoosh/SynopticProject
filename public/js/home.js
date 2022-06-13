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

   //function getNumber is used to store the phone number that the user will input
function getNumber(x){
  var x;
  
  x = document.getElementById("phoneNumber").value;

  document.getElementById("phoneNumber").value = '';
  //testing to see if it has stored the value
  console.log(x)

}

//Restricts input into text field to only numbers

function restrictInput(textField){
  var number = 
  textField.addEventListener(event, )
}
