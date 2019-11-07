function setupScrollToTopButton() {
  var topButton = $('#scrollToTop');
  topButton.hide();
  topButton.click(function() {
    $('html, body').animate({ scrollTop: 0 }, 200);
    return false;
  });

  var lastScrollTop = 0;
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100 && $(this).scrollTop() < lastScrollTop) {
      topButton.show();
    } else if (topButton.is(":visible")) {
      topButton.hide();
    }

    lastScrollTop = $(this).scrollTop();
  });
}
