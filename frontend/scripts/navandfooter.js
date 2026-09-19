const baseURL = "https://the-lucii-store.onrender.com";

// --- Google OAuth URL Redirect Handler ---
(function handleOAuthRedirect() {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  const userId = urlParams.get("userId");
  const name = urlParams.get("name");

  if (token) {
    sessionStorage.setItem("accesstoken", token);
    if (userId) sessionStorage.setItem("userId", userId);
    if (name) sessionStorage.setItem("userName", name);

    // Clean query parameters from address bar
    window.history.replaceState({}, document.title, window.location.pathname);
  }
})();

const women_section_tab = document.getElementById("women-section-tab");
const women_section_tab_a = document.getElementById("women-section-tab-a-tag");
const men_section_tab = document.getElementById("men-section-tab");
const men_section_tab_a = document.getElementById("men-section-tab-a-tag");
const kids_section_tab = document.getElementById("kids-section-tab");
const kids_section_tab_a = document.getElementById("kids-section-tab-a-tag");

const women_section_toggle = document.getElementById("women-section");
const men_section_toggle = document.getElementById("men-section");
const pagetoLoad = localStorage.getItem("pagetoLoad");
let slides = document.querySelectorAll(".mySlides");

// footer
const nav_link_plus = document.getElementById("nav-link-plus");
const who_link_plus = document.getElementById("who-link-plus");
const hidden_divs_footerOne = document.getElementById("hidden-divs-footerOne");
const hidden_divs_footerTow = document.getElementById("hidden-divs-footerTwo");

// nav bar user icon
const user_icon = document.getElementById("user-icon-btn");
const user_drop_wrap = document.querySelector(".user-drop-wrap");
const closeDiv = document.getElementById("closeDiv");
const login_option = document.getElementById("login_option");
const logout_option = document.getElementById("logout_option");
const account_option = document.getElementById("account_option");

// modal
const modal_msg = document.getElementById("modal-msg");
let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];

// cart icon
const cart_count = document.getElementById("cart-count");
const cart_icon = document.getElementById("cart-icon");

// hamburger menu
const hamburger = document.getElementsByClassName("hamburger");

if (hamburger && hamburger[0]) {
  hamburger[0].addEventListener("click", () => {
    const nav2 = document.querySelector(".navbar-2");
    if (nav2.style.display == "block") {
      nav2.style.display = "none";
    } else {
      nav2.style.display = "block";
    }
  });
}

// function to display the modal
const modalfun = (msg) => {
  if (modal_msg && modal) {
    modal_msg.innerText = msg;
    modal.style.display = "block";
  } else {
    alert(msg);
  }
};

// When the user clicks on <span> (x), close the modal
if (span) {
  span.onclick = function () {
    modal.style.display = "none";
  };
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// logout
const logoutfun = () => {
  sessionStorage.clear();
  modalfun("Logged out successfully");
  setTimeout(() => {
    window.location.assign("./index.html");
  }, 1500);
};

if (user_icon) {
  user_icon.addEventListener("click", () => {
    if (user_drop_wrap) user_drop_wrap.style.display = "block";
  });
}

if (closeDiv) {
  closeDiv.addEventListener("click", () => {
    if (user_drop_wrap) user_drop_wrap.style.display = "none";
  });
}

if (cart_icon) {
  cart_icon.addEventListener("click", () => {
    window.location.assign("./cart.html");
  });
}

// validate the token
let fetchtovalidateToken = async () => {
  const token = sessionStorage.getItem("accesstoken");
  if (!token) {
    return false;
  }
  try {
    const res = await fetch(`${baseURL}/users/validatetoken`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        authorization: `${token}`,
      },
    });
    return res.ok;
  } catch (err) {
    return false;
  }
};

// to update cart count
const updateCartcount = async () => {
  const token = sessionStorage.getItem("accesstoken");
  if (!token) {
    if (cart_count) cart_count.innerText = 0;
    return;
  }

  if (sessionStorage.getItem("cartCount")) {
    if (cart_count) cart_count.innerText = sessionStorage.getItem("cartCount");
  } else {
    try {
      const response = await fetch(`${baseURL}/cart`, {
        headers: {
          "Content-type": "application/json",
          authorization: `${token}`,
        },
      });
      const res = await response.json();
      const count = Array.isArray(res)
        ? res.length
        : res.data
        ? res.data.length
        : 0;
      sessionStorage.setItem("cartCount", count);
      if (cart_count) cart_count.innerText = count;
    } catch (error) {
      if (cart_count) cart_count.innerText = 0;
    }
  }
};
updateCartcount();

// men, women and kids toggle
if (women_section_tab) {
  women_section_tab.addEventListener("click", () => {
    localStorage.setItem("pagetoLoad", "women");
    window.location.assign("./main.html");
  });
}

if (men_section_tab) {
  men_section_tab.addEventListener("click", () => {
    localStorage.setItem("pagetoLoad", "men");
    window.location.assign("./main.html");
  });
}

if (kids_section_tab) {
  kids_section_tab.addEventListener("click", () => {
    window.location.assign("#");
  });
}

// footer area opening divs
const openNaviLinkfun = () => {
  if (hidden_divs_footerOne.style.display === "block") {
    hidden_divs_footerOne.style.display = "none";
    nav_link_plus.innerText = "+";
  } else {
    hidden_divs_footerOne.style.display = "block";
    nav_link_plus.innerText = "-";
  }
};

const openWhoLinkfun = () => {
  if (hidden_divs_footerTow.style.display === "block") {
    hidden_divs_footerTow.style.display = "none";
    who_link_plus.innerText = "+";
  } else {
    hidden_divs_footerTow.style.display = "block";
    hidden_divs_footerTow.focus();
    who_link_plus.innerText = "-";
  }
};
