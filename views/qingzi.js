// Dynamic Greeting Message based on Time
function displayGreeting() {
    var today = new Date();
    var hour = today.getHours();
    var greeting;
    
    if (hour < 12) {
        greeting = "Good Morning!";
    } else if (hour < 18) {
        greeting = "Good Afternoon!";
    } else {
        greeting = "Good Evening!";
    }
    
    document.getElementById("greeting").innerText = greeting + " Welcome to My Page!";
}


// Run the greeting function when the page loads
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("greeting")) {
        displayGreeting();
    }

    // Attach form validation to the submit event of the form if present
    var form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", validateForm);
    }
});


function validateForm() {
    // Validation for Name (cannot be empty)
    const inputName = document.getElementById("inputName").value;
    if (inputName.trim().length == 0) {
        document.getElementById("errorName").innerHTML = "<p class='text-danger'>You did not enter your name</p>";
    } else {
        document.getElementById("errorName").innerHTML = "<p class='text-success'>Valid name entered</p>";
    }

    // Validation for Email (must be in valid email format)
    const inputEmail = document.getElementById("inputEmail").value;
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailFormat.test(inputEmail)) {
        document.getElementById("errorEmail").innerHTML = "<p class='text-danger'>Please enter a valid email address</p>";
    } else {
        document.getElementById("errorEmail").innerHTML = "<p class='text-success'>Valid email entered</p>";
    }

    // Validation for Subject (must not be empty)
    const inputSubject = document.getElementById("inputSubject").value;
    if (inputSubject.trim().length == 0) {
        document.getElementById("errorSubject").innerHTML = "<p class='text-danger'>You did not enter a subject</p>";
    } else {
        document.getElementById("errorSubject").innerHTML = "<p class='text-success'>Valid subject entered</p>";
    }

    // Validation for Message (must not be empty and max 500 characters)
    const inputMessage = document.getElementById("inputMessage").value;
    if (inputMessage.trim().length == 0) {
        document.getElementById("errorMessage").innerHTML = "<p class='text-danger'>You did not enter a message</p>";
    } else if (inputMessage.length > 500) {
        document.getElementById("errorMessage").innerHTML = "<p class='text-danger'>Message is too long. Maximum 500 characters allowed.</p>";
    } else {
        document.getElementById("errorMessage").innerHTML = "<p class='text-success'>Valid message entered</p>";
    }
}

function resetForm() {
    document.getElementById("inputName").value = "";
    document.getElementById("inputEmail").value = "";
    document.getElementById("inputSubject").value = "";
    document.getElementById("inputMessage").value = "";
    document.getElementById("errorName").innerHTML = "";
    document.getElementById("errorEmail").innerHTML = "";
    document.getElementById("errorSubject").innerHTML = "";
    document.getElementById("errorMessage").innerHTML = "";
}

