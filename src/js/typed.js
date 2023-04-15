import Typed from 'typed.js'

var strings = [];

if (location.pathname.includes('slovenscina.html')) {
  strings = ["Programer", 'Izdelujem spletne strani', "Razvijam aplikacije", "Uporabljam sodobne tehnologije"];
} else { // if browser language is not Slovenian
  strings = ["I'm a Programmer", 'I Build Websites', "I Solve Problems", "I enjoy experimenting with new technologies"];
}

var options = {
  strings: strings,
  typeSpeed: 70,
  backSpeed: 40,
  backDelay: 1500,
  loop: true,
}

var typed = new Typed('#headline', options)
