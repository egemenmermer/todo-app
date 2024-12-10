document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:8080/api/v1/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });

    const messageElement = document.getElementById('message');

    if (response.ok) {
        messageElement.id = 'success-message';
        messageElement.textContent = 'Login successful! Redirecting...';

        // Redirect to index.html after 2 seconds
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    } else {
        const errorMessage = await response.text();
        messageElement.id = 'error-message';
        messageElement.textContent = errorMessage;
    }
});