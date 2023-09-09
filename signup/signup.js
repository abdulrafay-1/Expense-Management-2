var users = JSON.parse(localStorage.getItem("users")) || [];
console.log(users);

// Form will not refresh
var btn = document.getElementById("btn");
btn.addEventListener('click', function (event) {
    event.preventDefault();
});

// Form Validation

function signup() {

    var username = document.getElementById('exampleInputUsername1').value.trim().toLowerCase();
    var email = document.getElementById('exampleInputEmail1').value.trim().toLowerCase();
    var password = document.getElementById('exampleInputPassword1').value;
    var alertbox = document.getElementById("hide");

    // Display alert for 3s
    setTimeout(function () {
        alertbox.classList.add("myalert");
    }, 3000);

    // All Validation

    if (!(email && password && username)) {
        alertbox.classList.remove("myalert");
        alertbox.firstElementChild.innerHTML = "Please Enter Input Fields";
    } else if (username.length < 3) {
        alertbox.classList.remove("myalert");
        alertbox.firstElementChild.innerHTML = "Username must be at least 3 characters long.";
    } else if (!(email.includes("@") && email.includes("."))) {
        alertbox.classList.remove("myalert");
        alertbox.firstElementChild.innerHTML = "Invalid email";
    } else if (password.length < 6 && !(/\d/.test(password))) {
        alertbox.classList.remove("myalert");
        alertbox.firstElementChild.innerHTML = "Password must include at least 6 characters, including numbers.";
    } else {
        var checkuser = users.find(function (item) {
            return item.username === username;
        });

        if (checkuser) {
            alertbox.classList.remove("myalert");
            alertbox.firstElementChild.innerHTML = "User already exists.";
        } else {
            users.push({
                username,
                email,
                password,
            });
            Swal.fire(
                'Signup Succesfull !',
                'Account created successfully',
                'success'
            )
            setTimeout(function () {
                window.location.replace("../dashboard.html")
            }, 1500)
            localStorage.setItem("users", JSON.stringify(users));
            clearInput();
        }
    }

    console.log(users);
}

function clearInput() {
    document.getElementById('exampleInputUsername1').value = "";
    document.getElementById('exampleInputEmail1').value = "";
    document.getElementById('exampleInputPassword1').value = "";
}

function showpass() {
    var passcheck = document.getElementById("exampleInputPassword1");
    if (passcheck.type === "password") {
        passcheck.type = "text";
    } else {
        passcheck.type = "password";
    }
}
// Sign up Ended

// Sign In Started
function login() {
    var email = document.getElementById('exampleInputEmail1').value.trim().toLowerCase();
    var password = document.getElementById('exampleInputPassword1').value;
    var alertbox = document.getElementById("hide");

    // Display alert for 3s
    setTimeout(function () {
        alertbox.classList.add("myalert");
    }, 3000);

    var checkuser = users.find(function (item) {
        return item.email === email;
    });

    if (!(email && password)) {
        alertbox.classList.remove("myalert");
        alertbox.firstElementChild.innerHTML = "Please Enter Input Fields";
    } else if (!(email.includes("@"))) {
        alertbox.classList.remove("myalert");
        alertbox.firstElementChild.innerHTML = "Invalid email";
    } else if (checkuser && checkuser.password === password) {
        Swal.fire(
            'Login Successfull!',
            'Account Login successfully!',
            'success'
        )
        console.log(checkuser)
        setTimeout(function () {
            window.location.href = "./dashboard.html"
        }, 1000);

    } else if (checkuser.password != password) {
        alertbox.classList.remove("myalert");
        alertbox.firstElementChild.innerHTML = "Incorrect password";

    } else {
        alertbox.classList.remove("myalert");
        alertbox.firstElementChild.innerHTML = "User not found";
    }

}

function logout() {
    window.location.replace("./index.html")
}

