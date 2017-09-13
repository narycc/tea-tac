+function($,_){
  'use strict';

  $(function(){
    var offCanvas = (function(){

      var $offCanvas = null;
      var $body = $(document.body);

      //click trigger to pull out off canvas
      $(document).on('tap','.js-pull-off-canvas',function(event){
        event.preventDefault();
        
        _pullInOffCanvas($($(this).attr('data-target')));
        $offCanvas.trigger('pullInOffCanvas.oneplus');
      });

      function _pullInOffCanvas ($targetOffCanvas) {

        $offCanvas = $targetOffCanvas;
        if($('.exit-off-canvas').length <= 0){
          $offCanvas.eq(0).after('<div class="exit-off-canvas js-exit-off-canvas"></div>');
        }
        $('.js-off-canvas').removeClass('canvas-in');
        $offCanvas.addClass('canvas-in');
        $body.on('touchmove', '.main-section', function(event){
          event.preventDefault();
          event.stopPropagation();
        })

        var isTouchableDevice = !!('createTouch' in document);
        if(isTouchableDevice){
          $body.css('overflow','hidden');
        }

      }

      $(document).on('tap','.js-exit-off-canvas',function(event){
        event.preventDefault();
        event.stopPropagation();
        $(this).remove();
        $offCanvas.removeClass('canvas-in');
        $body.css('overflow','initial');
        $body.find('.main-section').off('touchmove');
      });

      return {
        AUTHOR: 'Michael',
        VERSION: '1.0.0',
        LAST_MODIFIED: '2015-08-05',
        pullInOffCanvas: _pullInOffCanvas
      }
      
    })(); 

    window.modules = window.modules || {};
    window.modules.offCanvas = offCanvas; 
  });


}(jQuery,_);
