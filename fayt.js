(function () {
  var slider = document.querySelector('.hero-slider');
  if (!slider) return;

  var track = slider.querySelector('.hero-slider__track');
  var slides = slider.querySelectorAll('.hero-slider__slide');
  var dots = slider.querySelectorAll('.hero-slider__dot');
  var prevBtn = slider.querySelector('.hero-slider__arrow--prev');
  var nextBtn = slider.querySelector('.hero-slider__arrow--next');

  var total = slides.length;
  var current = 0;
  var timer = null;
  var delay = 5000; // 5 seconds between slides

  // Show the slide at a given index (wraps around for infinite loop)
  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = 'translateX(-' + current * 100 + '%)';

    dots.forEach(function (dot, i) {
      dot.classList.toggle('is-active', i === current);
    });
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  // Autoplay helpers
  function startAutoplay() {
    stopAutoplay();
    timer = setInterval(next, delay);
  }
  function stopAutoplay() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  // Arrow clicks (a click also pauses autoplay)
  nextBtn.addEventListener('click', function () { stopAutoplay(); next(); });
  prevBtn.addEventListener('click', function () { stopAutoplay(); prev(); });

  // Dot clicks jump to that slide
  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () { stopAutoplay(); goTo(i); });
  });

  // Pause while hovering, resume when the mouse leaves
  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);

  // Touch swipe support for mobile
  var startX = 0;
  slider.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
    stopAutoplay();
  }, { passive: true });
  slider.addEventListener('touchend', function (e) {
    var diff = e.changedTouches[0].clientX - startX;
    if (Math.abs(diff) > 50) { diff < 0 ? next() : prev(); }
  }, { passive: true });

  // Start
  goTo(0);
  startAutoplay();
})();
