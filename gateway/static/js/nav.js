$(() => {
  // make current nav tab active
  $('.navbar-nav > a.nav-item').each((idx, elem) => {
    let href = $(elem).attr('href');
    if (href === location.pathname) {
        $(elem).addClass('active');
    }
  });
});
