document.getElementById('loginBtn').addEventListener('click', function() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('createAccountForm').classList.add('hidden');
    document.getElementById('auth').classList.add('hidden');
});

document.getElementById('createAccountBtn').addEventListener('click', function() {
    document.getElementById('createAccountForm').classList.remove('hidden');
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('auth').classList.add('hidden');
});

document.getElementById('guestBtn').addEventListener('click', function() {
    document.getElementById('quiz').classList.remove('hidden');
    document.getElementById('search').classList.remove('hidden');
    document.getElementById('auth').classList.add('hidden');
});

document.getElementById('submitLogin').addEventListener('click', function() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Simple client-side validation
    if (email && password) {
        alert('Login successful!');
        document.getElementById('quiz').classList.remove('hidden');
        document.getElementById('search').classList.remove('hidden');
        document.getElementById('loginForm').classList.add('hidden');
    } else {
        alert('Please enter both email and password.');
    }
});

document.getElementById('submitCreateAccount').addEventListener('click', function() {
    const email = document.getElementById('createEmail').value;
    const password = document.getElementById('createPassword').value;

    // Simple client-side validation
    if (email && password) {
        alert('Account created successfully!');
        document.getElementById('quiz').classList.remove('hidden');
        document.getElementById('search').classList.remove('hidden');
        document.getElementById('createAccountForm').classList.add('hidden');
    } else {
        alert('Please enter both email and password.');
    }
});
