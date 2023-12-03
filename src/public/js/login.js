$(document).ready(function () {
    const loginBtn = $('#loginBtn');
    
    loginBtn.on('click', function (e) {
        e.preventDefault();

        const username = $('#username').val();
        const password = $('#password').val();

        if (!username || !password) {
            alert('Please fill in all fields');
            return;
        }

        // Make an AJAX request using the fetch API
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then(account => {
            // Handle the response data
            console.log(account);

            // Check the role from the response
            const role = account.role;

            // Redirect based on the user's role
            if (res.redirected && res.status === 200){
                if (role === "admin") {
                    window.location.href = "/admin";
                } else if (role === "dentist") {
                    window.location.href = "/bookingAppointment";
                } else if (role === "staff") {
                    window.location.href = "/bookingAppointment";
                } else if (role === "patient") {
                    window.location.href = "/bookingAppointment";
                } else {
                    // Handle other roles or show an error
                    alert("Unknown user role");
                }
            } else {
                alert('Username or password is incorrect');
                throw new Error('Username or password is incorrect');
            }
            
        })
        .catch(error => {
            // Handle errors during the fetch request
            console.error(error);
        });
    });
});
