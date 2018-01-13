/**
 * 配置信息 把配置信息分为基础配置、提示信息
 */
(function() {
    var config = {
        IS_DEBUG: true, // 是否调试模式,线上为 false
        APP_ID: 10001,
        ACCESS_TOKEN: "sj5JanMJgkd5zq+Yj83p7ExIrf3LpTy/LIk2OAfipcaFhiBD1Ro4+Q5lue7byD/z5ZRS+AUG9tJrMHtFVolygA==",
        API_GATEWAY: 'http://aioapi.360ecmall.com',
        ALI_OSS_GATEWAY: 'http://alioss.360ecmall.com',
        COOKIE_DOMAIN: null,
        PAGE_SIZE: 10
    };

    if (config.IS_DEBUG) {
        // 配置测试相关信息
        config.API_GATEWAY = 'http://dev-aioapi.xshop.360ecmall.com';
        //config.API_GATEWAY = 'http://localhost:8080';
        config.COOKIE_DOMAIN = null;
    }
    window.config = config;
    
	var loading = $("#xedu-loading");
		function ajaxSend(options) {
			$.ajax({
				type : options.type,
				url : options.url,
				cache : false,
				dataType : 'json',
				data: JSON.stringify(options.data),
				contentType : 'application/json',
				processData : false,
				beforeSend : function(XMLHttpRequest) {
					XMLHttpRequest.setRequestHeader("utk", $.cookie("utk"));
					XMLHttpRequest.setRequestHeader("appId", config.APP_ID);
					XMLHttpRequest.setRequestHeader("atk", config.ACCESS_TOKEN);
					if (options.showLoading) {
						loading.show();
					}
					if (options.el) {
						$(options.el).hide();
					}
				},
				success : options.callback,
				error : function(xhr, status, error) {
					console.log("status: " + status + ", error: " + error);
				},
				complete : function(xhr, status) {
					if (options.showLoading) {
						setTimeout(function() {
							loading.hide();
						}, 100);
					}
					if (options.el) {
						$(options.el).show();
					}
				}
			});
		}
    
    var Api = {
		get : function(url, callback, el, showLoading) {
			var options = {
				"type" : "GET",
				"url" : url,
				"callback" : callback,
				"showLoading" : showLoading == null ? true : showLoading,
				"el": el
			}
			ajaxSend(options);
		},
		put : function(url, data, callback, el, showLoading) {
			var options = {
				"type" : "PUT",
				"url" : url,
				"callback" : callback,
				"data": data,
				"showLoading" : showLoading == null ? true : showLoading,
				"el": el
			}
			ajaxSend(options);
		},
		post : function(url, data, callback, el, showLoading) {
			var options = {
				"type" : "POST",
				"url" : url,
				"callback" : callback,
				"data": data,
				"showLoading" : showLoading == null ? true : showLoading,
				"el": el
			}
			ajaxSend(options);
		},
		del : function(url, callback, el, showLoading) {
			var options = {
				"type" : "DELETE",
				"url" : url,
				"callback" : callback,
				"showLoading" : showLoading == null ? true : showLoading,
				"el": el
			}
			ajaxSend(options);
		},
		upload: function(url, form, callback, showLoading) {
			var formData = null;
			if (form instanceof FormData) {
				formData = form;
			} else {
				formData = new FormData($(form)[0]);
			}
			$.ajax({
				url: url,
				type: 'POST',  
		        data: formData,  
		        async: false,  
		        cache: false,  
		        contentType: false,  
		        processData: false,
		        beforeSend : function(XMLHttpRequest) {
					XMLHttpRequest.setRequestHeader("utk", $.cookie("utk"));
					XMLHttpRequest.setRequestHeader("appId", config.APP_ID);
					XMLHttpRequest.setRequestHeader("atk", config.ACCESS_TOKEN);
					if (showLoading) {
						loading.show();
					}
				},
		        success: function (e) {
		        	callback(e);
		        },  
		        error: function (e) {  
		        	console.log(e);
		        },
		        complete : function(xhr, status) {
					if (showLoading) {
						setTimeout(function() {
							loading.hide();
						}, 100);
					}
				}
			});
		}
	}

	window.Api = Api;
	
})();
