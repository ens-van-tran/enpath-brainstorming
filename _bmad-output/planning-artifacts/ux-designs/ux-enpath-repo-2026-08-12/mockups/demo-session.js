(function () {
  "use strict";

  const ROLE_KEY = "enpath-demo-role";
  const STATE_PREFIX = "__ENPATH_DEMO_STATE__";
  const ROLE_PREFIX = "__ENPATH_DEMO_ROLE__";
  const destinations = {
    hr: "hr-admin.html",
    manager: "line-manager.html",
    employee: "employee.html",
    reviewer: "contextual-reviewer.html"
  };

  function remember(role) {
    try {
      localStorage.setItem(ROLE_KEY, role);
    } catch (error) {
      // Preserve schema-v7 (and migrated legacy) shared state in direct-file sessions.
      if (!window.name.startsWith(STATE_PREFIX)) window.name = `${ROLE_PREFIX}${role}`;
    }
  }

  function forget() {
    try {
      localStorage.removeItem(ROLE_KEY);
    } catch (error) {
      if (window.name.startsWith(ROLE_PREFIX)) window.name = "";
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
