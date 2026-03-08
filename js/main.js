// ============================================
// Mobile Menu Toggle
// ============================================
(function () {
  var menuBtn = document.querySelector('.mobile-menu-btn');
  var nav = document.getElementById('main-nav');
  var navLinks = document.querySelectorAll('.nav-link');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!isOpen));
      nav.classList.toggle('open');
    });

    // Close menu when a nav link is clicked
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        menuBtn.setAttribute('aria-expanded', 'false');
        nav.classList.remove('open');
      });
    });

    // Close menu on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        menuBtn.setAttribute('aria-expanded', 'false');
        nav.classList.remove('open');
        menuBtn.focus();
      }
    });
  }
})();

// ============================================
// Header scroll shadow
// ============================================
(function () {
  var header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }
})();

// ============================================
// Active nav link highlighting on scroll
// ============================================
(function () {
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    var scrollPos = window.scrollY + 100;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
})();

// ============================================
// Institution Dropdown
// ============================================
(function () {
  var select = document.getElementById('institution-select');
  var detailsContainer = document.getElementById('institution-details');

  if (select && detailsContainer) {
    select.addEventListener('change', function () {
      var value = select.value;
      detailsContainer.hidden = false;

      // Hide all, show selected
      var allInfo = detailsContainer.querySelectorAll('.institution-info');
      allInfo.forEach(function (el) {
        el.classList.remove('active');
      });

      var selected = detailsContainer.querySelector('[data-institution="' + value + '"]');
      if (selected) {
        selected.classList.add('active');
      }
    });
  }
})();

// ============================================
// Accessibility Statement Modal
// ============================================
(function () {
  var btn = document.getElementById('accessibility-btn');
  var modal = document.getElementById('accessibility-modal');
  var closeBtn = modal ? modal.querySelector('.modal-close') : null;

  if (btn && modal && closeBtn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      modal.hidden = false;
      closeBtn.focus();
      document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', function () {
      modal.hidden = true;
      document.body.style.overflow = '';
      btn.focus();
    });

    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        modal.hidden = true;
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) {
        modal.hidden = true;
        document.body.style.overflow = '';
        btn.focus();
      }
    });
  }
})();
