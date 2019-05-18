'use strict';

var findCurrent = function findCurrent(currentClassName) {
  return document.querySelector(".".concat(currentClassName));
};

var updateCarret = function updateCarret(carret, current) {
  if (carret && current) {
    var _current$offsetWidth = current.offsetWidth,
        offsetWidth = _current$offsetWidth === void 0 ? 0 : _current$offsetWidth,
        _current$offsetLeft = current.offsetLeft,
        offsetLeft = _current$offsetLeft === void 0 ? 0 : _current$offsetLeft;
    carret.style.width = "".concat(offsetWidth, "px");
    carret.style.left = "".concat(offsetLeft, "px");
  }
};

var menuCarret = function menuCarret() {
  var carretRailsClassName = 'menu__carret-rails';
  var carretClassName = 'menu__carret';
  var currentClassName = 'menu__link--current';
  var menuLinkClassName = 'menu__link';
  var current = findCurrent(currentClassName);
  var rails = document.querySelector(".".concat(carretRailsClassName));
  var carret = document.createElement('div');
  carret.setAttribute('class', carretClassName);
  updateCarret(carret, current);
  rails.append(carret);
  var links = document.querySelectorAll(".".concat(menuLinkClassName));
  links.forEach(function (link) {
    link.addEventListener('mouseover', function (e) {
      return updateCarret(carret, e.target);
    });
    link.addEventListener('mouseout', function () {
      current = findCurrent(currentClassName);
      updateCarret(carret, current);
    });
    link.addEventListener('click', function (e) {
      e.stopPropagation();
      var siblings = Array.prototype.filter.call(link.parentNode.children, function (child) {
        return child !== link;
      });
      siblings.forEach(function (link) {
        return link.classList.remove(currentClassName);
      });
      link.classList.add(currentClassName);
      current = findCurrent(currentClassName);
      updateCarret(carret, current);
    });
  });

  window.onresize = function () {
    return updateCarret(carret, current);
  };
};

var asyncImages = function asyncImages() {
  for (var i = 0; i < document.images.length; i++) {
    var img = document.images[i];
    var data_src = img.getAttribute('data-src'); // Про­пус­тить изо­бра­же­ния без data-src

    if (!data_src) continue; // Обес­пе­чить за­груз­ку смен­но­го изо­бра­же­ния в кэш

    new Image().src = data_src; // Установить загруженное изображение вместо прелоадера

    img.src = data_src;
  }
};

document.addEventListener('DOMContentLoaded', function () {
  menuCarret();
  asyncImages();
});
//# sourceMappingURL=bundle.js.map
