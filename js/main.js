/* global emailjs */
document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("B3chDBzEpo7GvLByU");
  // Variables
  const header = document.querySelector("header");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const workItems = document.querySelectorAll(".work-item");
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

  // Mobile Navigation Toggle
  if (navToggle) {
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

  // Portfolio Filter
  if (filterBtns.length > 0 && workItems.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Remove active class from all buttons
        filterBtns.forEach((btn) => btn.classList.remove("active"));

        // Work section scroll animations
        const workItems = document.querySelectorAll('.work-item');
        workItems.forEach((item, index) => {
            item.style.setProperty('--index', index);
        });

        const observerOptions = {
            threshold: 0.2,
            rootMargin: "0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        workItems.forEach(item => observer.observe(item));

        // Add active class to clicked button
        this.classList.add("active");

        const filterValue = this.getAttribute("data-filter");

        // Filter work items
        workItems.forEach((item) => {
          if (
            filterValue === "all" ||
            item.getAttribute("data-category") === filterValue
          ) {
            item.style.display = "block";
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "scale(1)";
            }, 50);
          } else {
            item.style.opacity = "0";
            item.style.transform = "scale(0.8)";
            setTimeout(() => {
              item.style.display = "none";
            }, 300);
          }
        });
      });
    });
  }

  // Testimonial Slider
  if (dots.length > 0 && testimonialSlides.length > 0) {
    // Set initial state
    showSlide(0);

    // Add click event to dots
    dots.forEach((dot, index) => {
      dot.addEventListener("click", function () {
        showSlide(index);
      });
    });

    // Auto slide every 5 seconds
    let currentSlide = 0;
    setInterval(() => {
      currentSlide = (currentSlide + 1) % testimonialSlides.length;
      showSlide(currentSlide);
    }, 5000);

    function showSlide(index) {
      // Hide all slides
      testimonialSlides.forEach((slide) => {
        slide.style.display = "none";
      });

      // Remove active class from all dots
      dots.forEach((dot) => {
        dot.classList.remove("active");
      });

      // Show the selected slide and activate the dot
      testimonialSlides[index].style.display = "block";
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

      if (!name || !email || !number || !message) {
        alert("Please fill all the required fields.");
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      const numberPattern = /^\+?\d{7,15}$/;
      if (!numberPattern.test(number)) {
        alert("Please enter a valid phone number.");
        return;
      }

      // Send email using EmailJS
      emailjs
        .sendForm("emailjsservice", "template_90a6rja", "#contactForm")
        .then(
          function (response) {
            alert("Thank you! Your message has been sent.");
            contactForm.reset();
          },
          function (error) {
            console.error("Email sending error:", error);
            alert("Oops! Something went wrong. Please try again later.");
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
      ".service-card, .work-item, .team-member, .about-image, .about-text"
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
        .service-card, .work-item, .team-member, .about-image, .about-text {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .service-card.animate, .work-item.animate, .team-member.animate, .about-image.animate, .about-text.animate {
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
