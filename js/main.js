document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".statistic__num");
    const speed = 500;

    const animateCounter = (counter) => {
        const target = +counter.textContent.replace(/\D/g, "");
        let start = 0;
        let startTime = null;

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            let progress = Math.min((timestamp - startTime) / speed, 1);
            counter.textContent = Math.floor(progress * target).toLocaleString("ru-RU");
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                counter.textContent = target.toLocaleString("ru-RU");
            }
        };

        requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach((counter) => observer.observe(counter));
    document.querySelectorAll(".faq__item-name").forEach(item => {
        item.addEventListener("click", function () {
            const parent = this.closest(".faq__item");
            document.querySelectorAll(".faq__item").forEach(faq => {
                if (faq !== parent) faq.classList.remove("active");
            });
            parent.classList.toggle("active");
        });
    });

    AOS.init({
        once: false,
        duration: 700,
    });
});



const words = ["Shrtygen", "SMM", "content", "creation"];
const titleElement = document.querySelector(".hero__title span:first-of-type");
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
function typeEffect() {
  const currentWord = words[wordIndex];
  if (!isDeleting) {
    titleElement.textContent = currentWord.substring(0, charIndex);
    titleElement.style.width = `${titleElement.scrollWidth}px`;
    charIndex++;

    if (charIndex > currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000);
      return;
    }
  } else {
    titleElement.textContent = currentWord.substring(0, charIndex);
    charIndex--;

    if (charIndex < 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      titleElement.style.width = "0";
      setTimeout(typeEffect, 500);
      return;
    }
  }
  setTimeout(typeEffect, isDeleting ? 50 : 150);
}
typeEffect();