/*==================================================
    Skeetra Investor Page
    investors.js
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /* ===========================
       Sticky Header
    =========================== */

    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    /* ===========================
       Mobile Navigation
    =========================== */

    const mobileToggle = document.querySelector(".mobile-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (mobileToggle) {
        mobileToggle.addEventListener("click", () => {
            navLinks.classList.toggle("open");
            mobileToggle.classList.toggle("active");
        });
    }

    /* ===========================
       Smooth Scrolling
    =========================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            if (navLinks) {
                navLinks.classList.remove("open");
            }

        });

    });

    /* ===========================
       Fade In Animation
    =========================== */

    const fadeElements = document.querySelectorAll(`
        .market,
        .why,
        .cinematic,
        .investment,
        .growth,
        .ecosystem,
        .future,
        .cta,
        .stat,
        .feature,
        .glass-card,
        .thesis-card
    `);

    const fadeObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.classList = entry.target.classList;

                entry.target.classList.add("show");

            }

        });

    }, {
        threshold: .15
    });

    fadeElements.forEach(el => {

        el.classList.add("fade");
        fadeObserver.observe(el);

    });

    /* ===========================
       Counter Animation
    =========================== */

    function animateCounter(counter) {

        const target = Number(counter.dataset.target);

        const duration = 1800;

        let start = 0;

        const step = timestamp => {

            if (!counter.startTime) {

                counter.startTime = timestamp;

            }

            const progress = Math.min((timestamp - counter.startTime) / duration, 1);

            const value = Math.floor(progress * target);

            counter.innerText = value.toLocaleString();

            if (progress < 1) {

                requestAnimationFrame(step);

            } else {

                counter.innerText = target.toLocaleString();

            }

        };

        requestAnimationFrame(step);

    }

    const counters = document.querySelectorAll(".counter");

    const counterObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                animateCounter(entry.target);

                counterObserver.unobserve(entry.target);

            }

        });

    });

    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

    /* ===========================
       Hero Parallax
    =========================== */

    const heroImage = document.querySelector(".hero-image");

    const growthImage = document.querySelector(".growth-bg");

    window.addEventListener("scroll", () => {

        const y = window.pageYOffset;

        if (heroImage) {

            heroImage.style.transform =
                `translateY(${y * 0.25}px) scale(1.08)`;

        }

        if (growthImage) {

            growthImage.style.transform =
                `translateY(${y * 0.15}px) scale(1.08)`;

        }

    });

    /* ===========================
       Card Hover Tilt
    =========================== */

    const cards = document.querySelectorAll(`
        .glass-card,
        .thesis-card,
        .stat
    `);

    cards.forEach(card => {

        card.addEventListener("mousemove", e => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;

            const y = e.clientY - rect.top;

            const rotateX = (y - rect.height / 2) / -20;

            const rotateY = (x - rect.width / 2) / 20;

            card.style.transform = `
                perspective(1200px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-8px)
            `;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

    /* ===========================
       Button Ripple Effect
    =========================== */

    document.querySelectorAll(".btn-primary,.btn-secondary").forEach(button => {

        button.addEventListener("click", function (e) {

            const circle = document.createElement("span");

            const diameter = Math.max(this.clientWidth, this.clientHeight);

            const radius = diameter / 2;

            circle.style.width = circle.style.height = `${diameter}px`;

            circle.style.left = `${e.clientX - this.getBoundingClientRect().left - radius}px`;

            circle.style.top = `${e.clientY - this.getBoundingClientRect().top - radius}px`;

            circle.classList.add("ripple");

            const ripple = this.getElementsByClassName("ripple")[0];

            if (ripple) {

                ripple.remove();

            }

            this.appendChild(circle);

        });

    });

    /* ===========================
       Reveal Images
    =========================== */

    const images = document.querySelectorAll("img");

    const imageObserver = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0px)";

            }

        });

    }, {
        threshold: .2
    });

    images.forEach(image => {

        image.style.opacity = "0";
        image.style.transform = "translateY(40px)";
        image.style.transition = "1s ease";

        imageObserver.observe(image);

    });

    /* ===========================
       Scroll Progress Bar
    =========================== */

    const progressBar = document.createElement("div");

    progressBar.id = "progress-bar";

    document.body.appendChild(progressBar);

    window.addEventListener("scroll", () => {

        const totalHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progress =
            (window.scrollY / totalHeight) * 100;

        progressBar.style.width = progress + "%";

    });

});
