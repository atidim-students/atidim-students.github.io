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

    // Close menu on click outside
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('open') && !nav.contains(e.target) && !menuBtn.contains(e.target)) {
        menuBtn.setAttribute('aria-expanded', 'false');
        nav.classList.remove('open');
      }
    });
  }
})();

// ============================================
// Header scroll shadow + Active nav highlighting
// ============================================
(function () {
  var header = document.getElementById('site-header');
  var sections = document.querySelectorAll('section[id], footer[id]');
  var navLinks = document.querySelectorAll('.nav-link');
  var sectionLabel = document.getElementById('current-section-label');
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      // Header shadow
      if (header) {
        if (window.scrollY > 10) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }

      // Active nav link
      var scrollPos = window.scrollY + 100;
      var atBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 2);

      // Clear label when at top (hero)
      if (window.scrollY < 200 && sectionLabel) {
        sectionLabel.textContent = '';
      }

      if (atBottom) {
        navLinks.forEach(function (link) { link.classList.remove('active'); });
        var lastLink = navLinks[navLinks.length - 1];
        if (lastLink) {
          lastLink.classList.add('active');
          if (sectionLabel) sectionLabel.textContent = lastLink.textContent;
        }
      } else {
        sections.forEach(function (section) {
          var top = section.offsetTop;
          var height = section.offsetHeight;
          var id = section.getAttribute('id');

          if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(function (link) {
              link.classList.remove('active');
              if (link.getAttribute('href') === '#' + id) {
                link.classList.add('active');
                if (sectionLabel) sectionLabel.textContent = link.textContent;
              }
            });
          }
        });
      }

      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
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
// Accessibility Statement Modal (with focus trap)
// ============================================
(function () {
  var btn = document.getElementById('accessibility-btn');
  var modal = document.getElementById('accessibility-modal');
  var closeBtn = modal ? modal.querySelector('.modal-close') : null;
  var modalDialog = modal ? modal.querySelector('.modal') : null;

  function getFocusableElements() {
    if (!modalDialog) return [];
    return Array.from(modalDialog.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ));
  }

  function trapFocus(e) {
    if (e.key !== 'Tab') return;
    var focusable = getFocusableElements();
    if (focusable.length === 0) return;

    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
    document.removeEventListener('keydown', trapFocus);
    btn.focus();
  }

  if (btn && modal && closeBtn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      modal.hidden = false;
      closeBtn.focus();
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', trapFocus);
    });

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) {
        closeModal();
      }
    });
  }
})();
