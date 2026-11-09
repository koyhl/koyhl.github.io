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
