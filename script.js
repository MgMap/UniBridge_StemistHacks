// Create an array to store User objects
users = [];

function createUserAndLogin() {
  var form = document.getElementById("createAccount");

  //get variable values from form
  var username = parseFloat(form.elements["username"].value);
  var email = parseFloat(form.elements["email"].value);
  var DOB  = parseFloat(form.elements["DOB"].value);
  //split DOB
  const dateComponents = DOB.split('/');
  
  if (dateComponents.length === 3) {
    const month = parseInt(dateComponents[0], 10);
    const day = parseInt(dateComponents[1], 10);
    const year = parseInt(dateComponents[2], 10);
  }
  var password = parseFloat(form.elements["password"].value);

   // Get the user's name from the form
  var name = form.elements["username"].value;
  
  // Create a new User object and push it into the array
  const newUser = new User(username, email, day, month, year, "password");
  users.push(newUser);
   window.location.href = "https://replit.com/@ThetPaingDaNa/Frontend-Hackathon?from=notifications#Template/account.html";
}
