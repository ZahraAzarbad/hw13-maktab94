const loginBtn = document.getElementById("login");
const signupBtn = document.getElementById("signup");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const signupPage = document.getElementById("signup-page");
const loginPage = document.getElementById("login-page");
const backTologin = document.getElementById("back-to-login");
const signupInputName = document.getElementById("signup-input-name");
const signupInputEmail = document.getElementById("signup-input-email");
const signupInputPassword = document.getElementById("signup-input-password");
const signupInputConfirmPassword = document.getElementById(
  "signup-input-confirm-password"
);
const signupEnterBtn = document.getElementById("signup-enter-btn");



loginBtn.addEventListener("click", (e) => {
  const em = emailInput.value;
  const pas = passwordInput.value;
  let users = [];

  const promise = fetch(`https://6474eff27de100807b1bf8be.mockapi.io/auth/users`);

promise
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    users = [...data];

    users.forEach((user) => {
      if (user.email === em && user.password === pas) {
        window.location = `http://127.0.0.1:5500/weather.html`;
      }
    });
  });
  
});


signupBtn.addEventListener("click", (e) => {
  signupPage.classList.remove("hidden");
  loginPage.classList.add("hidden");
});
backTologin.addEventListener("click", (e) => {
  loginPage.classList.remove("hidden");
  signupPage.classList.add("hidden");
});

signupEnterBtn.addEventListener("click", (e) => {
  if (signupInputPassword.value !== signupInputConfirmPassword.value) {
    return;
  }

  checkEmail(signupInputEmail.value).then((valid)=>{
    console.log(valid);
if(valid){
  const user = {
    name: signupInputName.value,
    email: signupInputEmail.value,
    password: signupInputPassword.value,
  };
  insertUser(user);
  
}
else{
  alert("this email invalid!!");
}
  })
});

function insertUser(obj){
  const post = fetch(`https://6474eff27de100807b1bf8be.mockapi.io/auth/users`,{
    method:'POST',
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    body:JSON.stringify(obj)
  });
  post.then((response)=>{
        window.location = `http://127.0.0.1:5500/weather.html`;
  })

}

async function checkEmail(email){
  let valid = true;
  const promise = await fetch(`https://6474eff27de100807b1bf8be.mockapi.io/auth/users`);
const data = await promise.json();
users = [...data];

users.forEach((user) => {
  if (user.email === email) {
    valid=false;
  }
});
return valid
}