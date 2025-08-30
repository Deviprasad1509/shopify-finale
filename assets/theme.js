// SR Enterprises Theme JavaScript
// Enhanced functionality for the Shopify theme

document.addEventListener('DOMContentLoaded', function() {
  // Initialize theme functionality
  initTheme();
});

function initTheme() {
  // Mobile menu toggle
  initMobileMenu();

  // Product image zoom
  initProductZoom();

  // Cart functionality
  initCart();

  // Form enhancements
  initForms();

  // Accessibility improvements
  initAccessibility();

  // Performance optimizations
  initPerformance();
}

function initMobileMenu() {
  // Mobile menu toggle functionality
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
    });
  }
}

function initProductZoom() {
  // Product image zoom on hover
  const productImages = document.querySelectorAll('.product-card img');

  productImages.forEach(img => {
    img.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1)';
    });

    img.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
}

function initCart() {
  // Cart quantity update functionality
  const quantityButtons = document.querySelectorAll('.quantity-btn');
  const quantityInputs = document.querySelectorAll('.quantity-input');

  quantityButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const input = this.parentElement.querySelector('.quantity-input');
      const currentValue = parseInt(input.value);

      if (this.classList.contains('quantity-plus')) {
        input.value = currentValue + 1;
      } else if (this.classList.contains('quantity-minus') && currentValue > 1) {
        input.value = currentValue - 1;
      }

      // Trigger change event for form submission
      input.dispatchEvent(new Event('change'));
    });
  });

  // Auto-submit quantity changes
  quantityInputs.forEach(input => {
    input.addEventListener('change', function() {
      const form = this.closest('form');
      if (form) {
        // Add loading state
        this.disabled = true;
        form.submit();
      }
    });
  });
}

function initForms() {
  // Form validation and enhancement
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      // Add loading state to submit buttons
      const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Processing...';
      }
    });
  });

  // Newsletter form
  const newsletterForm = document.querySelector('.newsletter form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;

      if (email) {
        // Here you would typically send to your newsletter service
        alert('Thank you for subscribing! We\'ll keep you updated with our latest offers.');
        this.reset();
      }
    });
  }
}

function initAccessibility() {
  // Keyboard navigation improvements
  const focusableElements = document.querySelectorAll('a, button, input, select, textarea');

  focusableElements.forEach(element => {
    element.addEventListener('focus', function() {
      this.style.outline = '2px solid #059669';
      this.style.outlineOffset = '2px';
    });

    element.addEventListener('blur', function() {
      this.style.outline = '';
      this.style.outlineOffset = '';
    });
  });

  // Skip to content link
  const skipLink = document.querySelector('a[href="#main-content"]');
  if (skipLink) {
    skipLink.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector('#main-content');
      if (target) {
        target.focus();
        target.scrollIntoView();
      }
    });
  }
}

function initPerformance() {
  // Lazy loading for images
  const images = document.querySelectorAll('img[data-src]');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for browsers without IntersectionObserver
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  }

  // Preload critical resources
  const criticalImages = document.querySelectorAll('.product-card img');
  criticalImages.forEach(img => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = img.src;
    document.head.appendChild(link);
  });
}

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Export functions for potential use in other scripts
window.SREnterprisesTheme = {
  initTheme,
  initMobileMenu,
  initProductZoom,
  initCart,
  initForms,
  initAccessibility,
  initPerformance
};