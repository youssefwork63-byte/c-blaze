// تبديل الثيم
(function () {
  var btn = document.getElementById('themeToggle');
  if (!btn) return;
  btn.addEventListener('click', function () {
    document.body.classList.toggle('theme-hot');
    if (document.body.classList.contains('theme-hot')) {
      btn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
      btn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
  });
})();

// سكرول ناعم
var links = document.querySelectorAll('a[href^="#"]');
for (var i = 0; i < links.length; i++) {
  links[i].addEventListener('click', function (e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
    }
  });
}

// ظهور عند التمرير
(function () {
  var items = document.querySelectorAll('.reveal');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.12 });
  items.forEach(function (el) { observer.observe(el); });
})();

// عدادات متحركة
(function () {
  var els = document.querySelectorAll('.stat-number');
  els.forEach(function (el) {
    var end = parseInt(el.getAttribute('data-counter'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var cur = 0;
    var step = Math.max(1, Math.floor(end / 60));
    var iv = setInterval(function () {
      cur += step;
      if (cur >= end) { cur = end; clearInterval(iv); }
      el.textContent = cur + suffix;
    }, 30);
  });
})();

// Ripple
document.addEventListener('click', function (e) {
  var t = e.target.closest('.btn, .card-hot, .product-card, .price-card');
  if (!t) return;
  var r = t.getBoundingClientRect();
  var x = e.clientX - r.left;
  var y = e.clientY - r.top;
  t.style.setProperty('--x', x + 'px');
  t.style.setProperty('--y', y + 'px');
});

// فورم الفوتر → واتس
var contactForm = document.getElementById('contactForm');
var formStatus = document.getElementById('formStatus');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var subject = document.getElementById('subject').value.trim();
    var service = document.getElementById('service').value.trim();

    if (!name || !email || !subject || !service) {
      if (formStatus) formStatus.textContent = 'يرجى تعبئة جميع الحقول.';
      return;
    }

    var msg = 'مرحبا، أنا ' + name + ' (' + email + ')\nالموضوع: ' + subject + '\nالخدمة: ' + service + '\nأرغب بالتواصل.';
    var enc = encodeURIComponent(msg);
    var phone = '963932955840';
    var url = 'https://wa.me/' + phone + '?text=' + enc;

    if (formStatus) {
      formStatus.textContent = 'جارٍ التوجيه إلى واتس...';
      setTimeout(function () { window.location.href = url; }, 600);
    } else {
      window.location.href = url;
    }
  });
}