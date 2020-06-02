function selectstylesheet() {
  var URL = (window.location).toString().toLowerCase()
  
  if (URL.indexOf("/commissions/voodoo") > -1) {
    var newCss = document.createElement('link');
    newCss.rel = 'stylesheet';
    newCss.type = 'text/css';
    newCss.href = '/data/static/scss/stylesheets/sourcerer-stylesheet.css';

    document.body.appendChild(newCss);
  } else {
    var newCss = document.createElement('link');
    newCss.rel = 'stylesheet';
    newCss.type = 'text/css';
    newCss.href = '/assets/css/style.css';

    document.body.appendChild(newCss);
  }
};

window.onload = selectstylesheet();
