$(function() {
  'use strict';

  var _$el = {
        window: $(window),
        header: $('header'),
        city: $('.city')
      },
      _cityRules = {
        normalPosition: 1735,
        scrollSpeed: 0.4
      },
      _panelsVisibilityMargin = 160,
      _panels = [{
        selector: '.panel-game'
      }, {
        selector: '.panel-cards'
      }, {
        selector: '.panel-project'
      }];

  function _onScroll() {
    var windowHeight = _$el.window.height(),
        scrollTop = _$el.window.scrollTop(),
        scrollBottom = scrollTop + windowHeight,
        windowCenter = scrollTop + (windowHeight / 2);

    _$el.city.css('bottom', (_cityRules.normalPosition - scrollBottom) * _cityRules.scrollSpeed);

    $.each(_panels, function(index, panel) {
      var $panel = $(panel.selector),
          $hologramPanel = $panel.find('.hologram-panel'),
          $hologramLaser = $panel.find('.hologram-laser'),
          panelMinCenter = panel.center - _panelsVisibilityMargin,
          panelMaxCenter = panel.center + _panelsVisibilityMargin,
          panelTopOffset = (Math.abs(windowCenter - panel.center) * 0.2);

      if(windowCenter > panel.center) {
        $panel.css('top', panel.top - panelTopOffset);
        $hologramLaser.css('top', panel.hologramLaserTop + panelTopOffset);
      }
      else if(windowCenter < panel.center) {
        $panel.css('top', panel.top + panelTopOffset);
        $hologramLaser.css('top', panel.hologramLaserTop - panelTopOffset);
      }
      else {
        $panel.css('top', panel.top);
        $hologramLaser.css('top', panel.hologramLaserTop);
      }

      if(panelMinCenter <= windowCenter && panelMaxCenter >= windowCenter) {
        if($panel.css('display') != 'block') {
          $hologramPanel
            .velocity('stop', true)
            .css({
              top: 160,
              left: 500,
              width: 0,
              height: 0
            });

          $panel.css('display', 'block');

          $hologramPanel.velocity({
            top: 0,
            left: 0,
            width: 1000,
            height: 320
          }, {
            display: 'block',
            duration: 250,
            easing: 'linear',
            complete: function() {
              $panel.find('.column span').css('opacity', 1);
            }
          });
        }
      }
      else if($panel.css('display') == 'block') {
        $panel.css('display', 'none');
        $panel.find('.column span').css('opacity', 0);
      }
    });
  }

  function _init() {
    $.each(_panels, function(index, panel) {
      var $panel = $(panel.selector),
          $hologramLaser = $panel.find('.hologram-laser');

      $panel.css({
        visibility: 'hidden',
        display: 'block'
      });

      $.extend(true, panel, {
        height: $panel.outerHeight(),
        top: $panel.position().top,
        hologramLaserTop: $hologramLaser.position().top,
        center: $panel.offset().top + ($panel.outerHeight() / 2)
      });

      $panel.css({
        visibility: 'visible',
        display: 'none'
      });
    });

    _onScroll();
  }

  _init();

  _$el.window
    .scroll(_onScroll)
    .resize(_onScroll);

});