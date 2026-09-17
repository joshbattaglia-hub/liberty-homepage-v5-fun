(function () {
  var track = document.getElementById('slides');
  var dots = Array.prototype.slice.call(document.querySelectorAll('.dot'));
  var prev = document.getElementById('prev');
  var next = document.getElementById('next');
  var total = 3;
  var index = 0;
  var timer = null;
  var AUTOPLAY_MS = 5500;

  function goTo(i) {
    index = ((i % total) + total) % total;
    track.style.transform = 'translateX(-' + (index * (100 / total)) + '%)';
    dots.forEach(function (d, di) {
      var on = di === index;
      d.classList.toggle('on', on);
      d.setAttribute('aria-selected', on ? 'true' : 'false');
    });
  }

  function nextSlide() { goTo(index + 1); }
  function prevSlide() { goTo(index - 1); }

  function stopAutoplay() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  function startAutoplay() {
    stopAutoplay();
    timer = setInterval(nextSlide, AUTOPLAY_MS);
  }

  function pauseForInteraction() {
    stopAutoplay();
    startAutoplay();
  }

  prev.addEventListener('click', function () { prevSlide(); pauseForInteraction(); });
  next.addEventListener('click', function () { nextSlide(); pauseForInteraction(); });
  dots.forEach(function (d) {
    d.addEventListener('click', function () {
      goTo(parseInt(d.getAttribute('data-index'), 10));
      pauseForInteraction();
    });
  });

  var slider = document.querySelector('.hero-slider');
  slider.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { prevSlide(); pauseForInteraction(); e.preventDefault(); }
    if (e.key === 'ArrowRight') { nextSlide(); pauseForInteraction(); e.preventDefault(); }
  });
  slider.setAttribute('tabindex', '0');

  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);
  slider.addEventListener('focusin', stopAutoplay);
  slider.addEventListener('focusout', function (e) {
    if (!slider.contains(e.relatedTarget)) startAutoplay();
  });

  goTo(0);
  startAutoplay();
})();
