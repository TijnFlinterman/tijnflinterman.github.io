(function () {
  var doc = document;
  var body = doc.body;
  var LINE = 22;
  var mq = window.matchMedia("(max-width: 900px)");

  // "My time" in the top bar
  var timeEl = doc.getElementById("localTime");
  function tick() {
    if (!timeEl) return;
    var opts = { hour: "2-digit", minute: "2-digit" };
    var tz = timeEl.getAttribute("data-tz");
    var text;
    try {
      text = new Intl.DateTimeFormat("en-US", tz ? Object.assign({ timeZone: tz }, opts) : opts).format(new Date());
    } catch (e) {
      text = new Intl.DateTimeFormat("en-US", opts).format(new Date());
    }
    timeEl.textContent = text;
  }
  tick();
  setInterval(tick, 30000);

  // Line numbers in the gutter follow the height of the content
  var inner = doc.getElementById("editorInner");
  var gutter = doc.getElementById("gutter");
  var count = 0;
  var queued = false;
  function drawGutter() {
    queued = false;
    if (!inner || !gutter || gutter.offsetParent === null) return;
    var n = Math.max(1, Math.ceil((inner.offsetHeight - 16) / LINE));
    if (n === count) return;
    if (n > count) {
      var frag = doc.createDocumentFragment();
      for (var i = count + 1; i <= n; i++) {
        var s = doc.createElement("span");
        s.textContent = i;
        frag.appendChild(s);
      }
      gutter.appendChild(frag);
    } else {
      while (gutter.children.length > n) gutter.removeChild(gutter.lastChild);
    }
    count = n;
  }
  function queueGutter() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(drawGutter);
  }
  if (inner && "ResizeObserver" in window) new ResizeObserver(queueGutter).observe(inner);
  window.addEventListener("load", queueGutter);
  window.addEventListener("resize", queueGutter);
  queueGutter();

  // Profile drawer on small screens
  var menuBtn = doc.getElementById("menuBtn");
  var closeBtn = doc.getElementById("drawerClose");
  var scrim = doc.getElementById("scrim");
  var profile = doc.getElementById("profile");
  function setDrawer(open) {
    body.classList.toggle("drawer-open", open);
    if (menuBtn) {
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? "Close profile" : "Open profile");
    }
    if (open && closeBtn) closeBtn.focus();
    if (!open && menuBtn && doc.activeElement && profile && profile.contains(doc.activeElement)) menuBtn.focus();
  }
  if (menuBtn) menuBtn.addEventListener("click", function () { setDrawer(!body.classList.contains("drawer-open")); });
  if (closeBtn) closeBtn.addEventListener("click", function () { setDrawer(false); });
  if (scrim) scrim.addEventListener("click", function () { setDrawer(false); });
  doc.addEventListener("keydown", function (e) { if (e.key === "Escape" && body.classList.contains("drawer-open")) setDrawer(false); });
  var onChange = function () { if (!mq.matches) setDrawer(false); };
  if (mq.addEventListener) mq.addEventListener("change", onChange); else if (mq.addListener) mq.addListener(onChange);

  // Feedback: show three, reveal the rest on request
  var quotes = doc.getElementById("quotes");
  var more = doc.getElementById("loadMore");
  if (quotes && more) {
    var items = Array.prototype.slice.call(quotes.children);
    var STEP = 3;
    var shown = STEP;
    var render = function () {
      items.forEach(function (li, i) { li.hidden = i >= shown; });
      more.hidden = shown >= items.length;
    };
    more.addEventListener("click", function () {
      var first = shown;
      shown += STEP;
      render();
      if (items[first]) { var q = items[first].querySelector("blockquote"); if (q) { q.setAttribute("tabindex", "-1"); q.focus({ preventScroll: true }); } }
    });
    render();
  }

  // Contact form: without a form service, open the visitor's email app
  var form = doc.querySelector("form[data-mailto]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = form.elements;
      var subject = f.subject.value;
      var text = "From: " + f.first_name.value + " " + f.last_name.value + " <" + f.email.value + ">\n\n" + f.message.value;
      window.location.href = "mailto:" + form.getAttribute("data-mailto") + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(text);
      var note = doc.getElementById("formNote");
      if (note) note.textContent = "Opening your email app. If nothing happens, write to " + form.getAttribute("data-mailto") + ".";
    });
  }

  // Index: highlight the section in view: highlight the section in view
  var links = Array.prototype.slice.call(doc.querySelectorAll(".index a[href^='#']"));
  var editor = doc.getElementById("editor");
  if (links.length && "IntersectionObserver" in window) {
    var map = {};
    var targets = [];
    links.forEach(function (a) {
      var el = doc.getElementById(a.getAttribute("href").slice(1));
      if (el) { map[el.id] = a; targets.push(el); }
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove("is-active"); a.removeAttribute("aria-current"); });
        var a = map[en.target.id];
        if (a) { a.classList.add("is-active"); a.setAttribute("aria-current", "true"); }
      });
    }, { root: editor, rootMargin: "-5% 0px -75% 0px" });
    targets.forEach(function (t) { io.observe(t); });
    if (map["work-info"]) map["work-info"].classList.add("is-active");
  }
})();
