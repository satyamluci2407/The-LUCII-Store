// Ensure baseURL is available
const baseURL = "https://the-lucii-store.onrender.com";

// login and register elements
const login_toggle_btn = document.getElementById("login-toggle-btn");
const register_toggle_btn = document.getElementById("register-toggle-btn");
const login_container = document.getElementById("login-container");
const login_content_inner_div = document.getElementById(
  "login-content-inner-div"
);
const login_box = document.getElementById("login-box");
const register_box = document.getElementById("register-box");
let proceed_btn = document.getElementById("Proceed-btn");
let register_btn = document.getElementById("form-register-btn");

const login_by_google = document.getElementById("login-by-google");

// Attach Google Login Link dynamically
if (login_by_google) {
  login_by_google.setAttribute("href", `${baseURL}/auth/google`);
}

// onload verification
async function onload() {
  let res = await fetchtovalidateToken();
  if (!res) {
    if (logout_option) logout_option.style.display = "none";
    if (account_option) account_option.style.display = "none";
    if (login_option) login_option.style.display = "block";
  } else {
    if (logout_option) logout_option.style.display = "block";
    if (account_option) account_option.style.display = "block";
    if (login_option) login_option.style.display = "none";
    window.location.assign("./main.html");
  }
}
onload();

// login and register toggle ------------------------
const logintoggle = () => {
  if (login_box) login_box.style.display = "block";
  if (register_box) register_box.style.display = "none";
  if (login_toggle_btn) {
    login_toggle_btn.style.backgroundColor = "#117a7a";
    login_toggle_btn.style.color = "white";
  }
  if (register_toggle_btn) {
    register_toggle_btn.style.backgroundColor = "rgb(255, 255, 255)";
    register_toggle_btn.style.color = "black";
  }
};

const registertoggle = () => {
  if (login_box) login_box.style.display = "none";
  if (register_box) register_box.style.display = "block";
  if (register_toggle_btn) {
    register_toggle_btn.style.backgroundColor = "#117a7a";
    register_toggle_btn.style.color = "white";
  }
  if (login_toggle_btn) {
    login_toggle_btn.style.backgroundColor = "rgb(255, 255, 255)";
    login_toggle_btn.style.color = "black";
  }
};

// submit login form
const submitloginfun = async (event) => {
  event.preventDefault();

  try {
    const form = new FormData(event.target);
    const data = Object.fromEntries(form);

    if (proceed_btn) proceed_btn.value = "Loading...";

    // Route changed to /users/login
    const promise = await fetch(`${baseURL}/users/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });

    const res = await promise.json();

    // Checked promise.ok (HTTP status 200-299)
    if (promise.ok) {
      sessionStorage.setItem("accesstoken", res.token);
      if (res.userId) sessionStorage.setItem("userId", res.userId);
      if (res.name) sessionStorage.setItem("userName", res.name);

      modalfun(res.msg || "Login Successful");
      setTimeout(() => {
        window.location.assign("./main.html");
      }, 1500);
    } else {
      modalfun(res.msg || "Invalid Credentials");
    }
  } catch (error) {
    modalfun("Oops.. ☹️ Server Error");
  } finally {
    if (proceed_btn) proceed_btn.value = "Proceed";
  }
};

// submit register form
const submitregisterfun = async (event) => {
  event.preventDefault();

  try {
    const form = new FormData(event.target);
    const data = Object.fromEntries(form);

    if (data.password === data.confirm_password) {
      if (register_btn) register_btn.value = "Loading...";

      // Concatenate first and last name if present
      if (data.first_name && data.last_name) {
        data.name = `${data.first_name} ${data.last_name}`;
      }

      // Remove confirm_password before sending to MongoDB
      delete data.confirm_password;

      // Route changed to /users/register
      const promise = await fetch(`${baseURL}/users/register`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });

      const res = await promise.json();

      if (promise.ok) {
        modalfun(res.msg || "Registered Successfully");
        setTimeout(() => {
          logintoggle();
        }, 1500);
      } else {
        modalfun(res.msg || "Registration failed");
      }
    } else {
      modalfun("Passwords do not match");
    }
  } catch (error) {
    modalfun("Oops.. ☹️ Server Error");
  } finally {
    if (register_btn) register_btn.value = "Register";
  }
};
