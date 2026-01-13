// Reveal on scroll animation
const revealElements = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach((element) => {
  const delay = element.dataset.revealDelay;
  if (delay) {
    element.style.transitionDelay = `${delay}ms`;
  }
  observer.observe(element);
});

// Navbar scroll effect
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const navMenu = document.getElementById("nav-menu");

mobileMenuBtn.addEventListener("click", () => {
  const isExpanded = mobileMenuBtn.getAttribute("aria-expanded") === "true";
  mobileMenuBtn.setAttribute("aria-expanded", !isExpanded);
  mobileMenuBtn.classList.toggle("hamburger-active");
  navMenu.classList.toggle("nav-menu-active");
});

// Close mobile menu when clicking a link
const navLinks = navMenu.querySelectorAll("a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenuBtn.setAttribute("aria-expanded", "false");
    mobileMenuBtn.classList.remove("hamburger-active");
    navMenu.classList.remove("nav-menu-active");
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
    mobileMenuBtn.setAttribute("aria-expanded", "false");
    mobileMenuBtn.classList.remove("hamburger-active");
    navMenu.classList.remove("nav-menu-active");
  }
});

// Form validation and submission feedback
const contactForm = document.querySelector("#contact form");

if (contactForm) {
  // Client-side validation
  const emailInput = contactForm.querySelector('input[name="email"]');

  // Email validation
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Add validation on blur
  if (emailInput) {
    emailInput.addEventListener("blur", () => {
      if (emailInput.value && !validateEmail(emailInput.value)) {
        emailInput.setCustomValidity("Please enter a valid email address");
      } else {
        emailInput.setCustomValidity("");
      }
    });
  }

  contactForm.addEventListener("submit", () => {
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    // Validate before submission
    if (!contactForm.checkValidity()) {
      return; // Let browser handle validation feedback
    }

    // Update button state
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.7";

    // Re-enable button after timeout in case of network error
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      submitBtn.style.opacity = "1";
    }, 5000);

    // FormSubmit will handle the actual submission and redirect
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#") return;

    e.preventDefault();
    const target = document.querySelector(href);

    if (target) {
      const navbarHeight = navbar.offsetHeight;
      const targetPosition = target.offsetTop - navbarHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  });
});

// Slow the hero video playback for a calmer feel
document.querySelectorAll(".hero-video-media").forEach((video) => {
  const playbackSpeed = 0.55;

  // Set playback rate immediately to prevent flash of normal speed
  video.playbackRate = playbackSpeed;

  // Set rate on multiple events to ensure it's applied
  const setRate = () => {
    video.playbackRate = playbackSpeed;
  };

  video.addEventListener("loadedmetadata", setRate);
  video.addEventListener("loadeddata", setRate);
  video.addEventListener("play", setRate);

  // Double-check after a brief delay
  setTimeout(setRate, 100);
});
