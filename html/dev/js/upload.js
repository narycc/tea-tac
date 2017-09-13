+function($){
	'use strict';

		var upload = (function(){

			var parentDom = $(".liuxian-page-uploadProject"), modal = $("#categoryModal");
			var radioContainer = parentDom.find(".b-action");

			parentDom.on("tap",".btn-category",function(){
				// 将弹出显示出来；
				modal.show();

			});

			
			modal.on("tap",".item",function(){
				// 选择弹窗中的分类项，选中之后关闭弹层并且将选中的值显示在界面中； 
				var _category = $(this).parent().attr("data-type-text");
				var _subcategory = $(this).text();

				parentDom.find(".p-category").attr("data-category",$(this).attr("data-value")).text(_category + " : " + _subcategory);

				modal.fadeOut();

			});

			modal.on("tap",function(){
				modal.hide();
			});

			radioContainer.on("tap",".fakeRadio",function(){
				if($(this).hasClass("checked")){
					$(this).removeClass("checked");
				}else{
					$(this).addClass("checked");
				}
			});

			parentDom.on("tap",".btn-launch",function(){
				// 如果没有选择分类，提示选择发布的项目分类
				var _cateId = parentDom.find(".p-category").attr("data-category");
				var _content = $.trim(parentDom.find(".p-textarea").value());
				var _isPublic = radioContainer.find(".fakeRadio").hasClass("checked");

				if(_cateId == ''){
					alert("请选择一个项目分类");
					return false;
				}

				if(_content == ''){
					alert("请输入要发布的项目描述");
					return false;
				}

				alert("发布成功之后，跳转到项目列表中");

				
				
			});

			parentDom.on("keyup",".p-textarea",function(){
				var _len = $(this).val().length;
				if(_len <= 140){
					$(".p-words .cur").text(_len);
				}
			});


		})();



}(jQuery)
