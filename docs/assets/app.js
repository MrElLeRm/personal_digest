(function () {
  var stored = null;
  try { stored = localStorage.getItem('digest-theme'); } catch (e) {}
  var initial = stored || 'dark';
  document.documentElement.setAttribute('data-theme', initial);

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.querySelector('.theme-toggle');
    if (btn) {
      var label = btn.querySelector('.label');
      function refresh() {
        var t = document.documentElement.getAttribute('data-theme');
        if (label) label.textContent = t === 'light' ? 'Dark' : 'Light';
      }
      refresh();
      btn.addEventListener('click', function () {
        var cur = document.documentElement.getAttribute('data-theme') || 'dark';
        var next = cur === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        try { localStorage.setItem('digest-theme', next); } catch (e) {}
        refresh();
      });
    }

    var links = document.querySelectorAll('.toc a');
    var sections = [];
    links.forEach(function (l) {
      var id = l.getAttribute('href');
      if (id && id.charAt(0) === '#') {
        var el = document.querySelector(id);
        if (el) sections.push({ link: l, el: el });
      }
    });
    if (sections.length && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            links.forEach(function (l) { l.classList.remove('active'); });
            var match = sections.find(function (s) { return s.el === e.target; });
            if (match) match.link.classList.add('active');
          }
        });
      }, { rootMargin: '-30% 0px -60% 0px' });
      sections.forEach(function (s) { io.observe(s.el); });
    }
  });
})();
