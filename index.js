const loginBtn = document.getElementById("login");
const signupBtn = document.getElementById("signup");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
let users = [];

const promise = fetch(`https://6474eff27de100807b1bf8be.mockapi.io/auth/users`);

promise
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    users = [...data];
  });

loginBtn.addEventListener("click", (e) => {
  const em = emailInput.value;
  users.forEach((user) => {
    if (user.email === em) {
      console.log(user);
    }
  });
});

function checkAuthorization() {}
