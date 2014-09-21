$(function() {
  'use strict';

  var _$el = {
        window: $(window),
        header: $('header'),
        city: $('.city')
      };

  // 1735 = bottom: 0

  _$el.window.scroll(function() {
    var scrollBottom = _$el.window.scrollTop() + _$el.window.height();

    var bottom = (1735 - scrollBottom) * 0.4;

    console.log(scrollBottom, bottom);

    _$el.city.css('bottom', bottom);
  });

});