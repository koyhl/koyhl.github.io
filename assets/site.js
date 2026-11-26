// Shared page behaviour: frosted header on scroll, back-to-top button, reveal-on-scroll.
(function () {
  var top = document.getElementById("top");
  var toTop = document.getElementById("to-top");
  var onScroll = function () {
    top.classList.toggle("scrolled", window.scrollY > 24);
    toTop.classList.toggle("show", window.scrollY > 600);
  };
  toTop.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0 });
  });
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
(function () {
  var targets = document.querySelectorAll(".reveal, #wordmark");
  if (!("IntersectionObserver" in window)) {
    targets.forEach(function (el) { el.classList.add("in", "play"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add(e.target.id === "wordmark" ? "play" : "in");
      io.unobserve(e.target);
    });
  }, { threshold: 0.25 });
  targets.forEach(function (el) { io.observe(el); });
})();
// Email links: the address is put together only when used, so it never appears in the page source.
(function () {
  var address = function (el) {
    return el.getAttribute("data-mail-user") + "@" + el.getAttribute("data-mail-domain");
  };
  document.querySelectorAll("[data-mail-user]").forEach(function (el) {
    if (el.hasAttribute("data-mail-copy")) {
      var label = el.textContent;
      var timer;
      el.addEventListener("click", function () {
        var done = function (text) {
          el.textContent = text;
          clearTimeout(timer);
          timer = setTimeout(function () { el.textContent = label; }, 2500);
        };
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(address(el)).then(
            function () { done("Copied!"); },
            function () { done(address(el)); }
          );
        } else {
          done(address(el));
        }
      });
      return;
    }
    el.addEventListener("click", function () {
      el.href = "mailto:" + address(el);
    });
  });
})();
