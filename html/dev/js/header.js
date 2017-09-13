+function($){
	'use strict';
	$(function(){
		var header = (function(){
			var _modal = $("#myModal");
			$("header").on("click",".menu.popup",function(){
				_modal.show();
			});

			$("#myModalMask").on("click",function(){
				_modal.hide();
			});
		})();

		window.modules = window.modules || {};
		window.modules.header = header;
	});
}(jQuery)
