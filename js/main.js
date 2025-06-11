document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("B3chDBzEpo7GvLByU");
  // Variables
  const header = document.querySelector("header");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const dots = document.querySelectorAll(".dot");
  const testimonialSlides = document.querySelectorAll(".testimonial-slide");
  const contactForm = document.getElementById("contactForm");

  // Sticky Header
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  function hideSlider() {
    document.getElementById("notification-slider").classList.remove("show");
  }
  function showSlider(message) {
    const slider = document.getElementById("notification-slider");
    document.getElementById("slider-message").textContent = message;
    slider.classList.add("show");

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      hideSlider();
    }, 5000);
  }

  document.querySelector(".hideSlider").addEventListener("click", () => {
    hideSlider();
  });

  // Mobile Navigation Toggle
  if (navToggle) {
    console.log("navToggle");
    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");

      // Toggle hamburger animation
      const spans = navToggle.querySelectorAll("span");
      spans.forEach((span) => span.classList.toggle("active"));
    });
  }

  // Close mobile nav when clicking a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", function () {
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");

        // Reset hamburger icon
        const spans = navToggle.querySelectorAll("span");
        spans.forEach((span) => span.classList.remove("active"));
      }
    });
  });

  // Testimonial Slider
  if (dots.length > 0 && testimonialSlides.length > 0) {
    console.log("Testimonial Script");
    let currentSlide = 0;

    showSlide(currentSlide);

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentSlide = index;
        showSlide(currentSlide);
      });
    });

    setInterval(() => {
      currentSlide = (currentSlide + 1) % testimonialSlides.length;
      showSlide(currentSlide);
    }, 5000);

    function showSlide(index) {
      testimonialSlides.forEach((slide) => {
        slide.classList.remove("active");
      });
      dots.forEach((dot) => {
        dot.classList.remove("active");
      });

      testimonialSlides[index].classList.add("active");
      dots[index].classList.add("active");
    }
  }

  // Contact Form Submission
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const number = document.getElementById("number").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !number) {
        showSlider("Please fill all the required fields.");
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showSlider("Please enter a valid email address.");
        return;
      }

      const numberPattern = /^\+?\d{7,15}$/;
      if (!numberPattern.test(number)) {
        showSlider("Please enter a valid phone number.");
        return;
      }

      // Send email using EmailJS
      emailjs
        .sendForm("emailjsservice", "template_90a6rja", "#contactForm")
        .then(
          function (response) {
            showSlider("Thank you😊! Looking forward speaking with you.");
            contactForm.reset();
          },
          function (error) {
            console.error("Email sending error:", error);
            showSlider("Oops😕! Something went wrong. Please try again later");
          }
        );
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Calculate header height for offset
        const headerHeight = header.offsetHeight;

        window.scrollTo({
          top: targetElement.offsetTop - headerHeight,
          behavior: "smooth",
        });
      }
    });
  });

  // Animation on scroll
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".service-card, .work-item, .about-image, .about-text"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        element.classList.add("animate");
      }
    });
  };

  // Run animation check on load and scroll
  window.addEventListener("load", animateOnScroll);
  window.addEventListener("scroll", animateOnScroll);

  // Add CSS for animations
  const style = document.createElement("style");
  style.textContent = `
        .service-card, .work-item, .about-image, .about-text {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .service-card.animate, .work-item.animate, .about-image.animate, .about-text.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .nav-toggle span.active:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle span.active:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle span.active:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
    `;
  document.head.appendChild(style);
});