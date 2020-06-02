$(document).on('pagebeforeshow', function () {
  console.log("stylesheet function running")
  var URL = $.mobile.path.parseUrl(window.location).toString().toLowerCase();
  console.log(URL)
  
  /*
  if (URL.indexOf("/commissions/voodoo") > -1) {
    var newCss = document.createElement('link');
    newCss.rel = 'stylesheet';
    newCss.type = 'text/css';
    newCss.href = '/data/static/scss/stylesheets/sourcerer-stylesheet.css';
    console.log("Im on VooDoos Page")

    document.body.appendChild(newCss);
    console.log("child appended")
  } else {
    var newCss = document.createElement('link');
    newCss.rel = 'stylesheet';
    newCss.type = 'text/css';
    newCss.href = '/assets/css/style.css';
    console.log("Im NOT on VooDoos Page")

    document.body.appendChild(newCss);
    console.log("child appended")
  }
  */
});
