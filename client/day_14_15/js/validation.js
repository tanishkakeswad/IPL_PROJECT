function login(u, p) {
    // For test runner: use arguments. For browser: get by ID.
    const username = (typeof u === 'string') ? u : document.getElementById("loginUsername")?.value;
    const password = (typeof p === 'string') ? p : document.getElementById("loginPassword")?.value;

    if (!username || !password) {
        alert("Fields should not be empty");
        return;
    }

    console.log(`Login clicked. Username: ${username}, Password: ${password}`);
}

function register(n, e, u, p) {
    // Mapping test arguments to local variables
    const name = (typeof n === 'string') ? n : document.getElementById("registerName")?.value;
    const email = (typeof e === 'string') ? e : document.getElementById("registerEmail")?.value;
    const username = (typeof u === 'string') ? u : document.getElementById("registerUsername")?.value;
    const password = (typeof p === 'string') ? p : document.getElementById("registerPassword")?.value;

    // 1. Mandatory fields
    if (!name || !email || !username || !password) {
        alert("Every field is required");
        return;
    }

    // 2. Username: No special characters (Alphanumeric)
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
        alert("Username should not contain special characters");
        return;
    }

    // 3. Email: Valid format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Invalid email");
        return;
    }

    // 4. Password: At least 8 chars, 1 Capital, 1 Numeric
    if (password.length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
        alert("Passwords should be at least 8 digits and must contain at least one capital letter and one numeric");
        return;
    }

    console.log(`Register clicked. Name: ${name}, Email: ${email}, Username: ${username}, Password: ${password}`);
}

if (typeof module !== 'undefined') {
    module.exports = { login, register };
}
