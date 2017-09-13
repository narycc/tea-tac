+function($){
	'use strict';
	$(function(){
		var login = (function(){
			var parentDom = $(".liuxian-page-login");
			

			parentDom.on("tap",".fakeRadio",function(){
				if($(this).hasClass("checked")){
					return false;
				}

				parentDom.find(".fakeRadio").removeClass("checked");
				$(this).addClass("checked");
				var _index = $(this).index();

				if(_index == 0){
					parentDom.find(".fields_teacher").addClass("hide");
					parentDom.find(".fields_student").removeClass("hide");
				}else{
					parentDom.find(".fields_student").addClass("hide");
					parentDom.find(".fields_teacher").removeClass("hide");
				}
				
			});


		})();

		window.modules = window.modules || {};
		window.modules.login = login;
	});
}(jQuery)
