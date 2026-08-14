(function () {
  "use strict";

  const ROLE_KEY = "enpath-demo-role";
  const destinations = {
    hr: "hr-admin-prototype.html",
    manager: "line-manager.html",
    employee: "employee-prototype.html"
  };

  function remember(role) {
    try {
      localStorage.setItem(ROLE_KEY, role);
    } catch (error) {
      window.name = `__ENPATH_DEMO_ROLE__${role}`;
    }
  }

  function forget() {
    try {
      localStorage.removeItem(ROLE_KEY);
    } catch (error) {
      if (window.name.startsWith("__ENPATH_DEMO_ROLE__")) window.name = "";
    }
  }

  function loginAs(role) {
    const destination = destinations[role];
    if (!destination) return;
    remember(role);
    location.href = destination;
  }

  function logout() {
    forget();
    location.href = "login.html";
  }

  document.addEventListener("click", event => {
    const login = event.target.closest("[data-login-role]");
    if (login) {
      event.preventDefault();
      loginAs(login.dataset.loginRole);
      return;
    }

    const logoutControl = event.target.closest("[data-demo-logout]");
    if (logoutControl) {
      event.preventDefault();
      logout();
    }
  });

  window.EnPathDemo = { loginAs, logout };
})();
