$(function() {
  'use strict';

  var _$el = {
        window: $(window),
        header: $('header'),
        city: $('.city')
      },
      cityRules = {
        normalPosition: 1735,
        scrollSpeed: 0.4
      };

  function _onScroll() {
    var scrollBottom = _$el.window.scrollTop() + _$el.window.height();

    _$el.city.css('bottom', (cityRules.normalPosition - scrollBottom) * cityRules.scrollSpeed);
  }
  _onScroll();

  _$el.window.scroll(_onScroll);

});