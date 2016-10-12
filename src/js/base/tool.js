var $ = require('jquery'),
    store = require('lib/store/store.min.js');
var	tool =  {

		ApiUrl : 'http://u.api.guxiansheng.cn/',
		ApiLogin : 'http://login.stocksir.com/',
		ApiContent : 'http://content.api.guxiansheng.cn/',
		ApiGuJi : 'http://clb.api.guxiansheng.cn/',
		ApiMember : 'http://u.api.guxiansheng.cn/',
		ApiSeller : 'http://seller.api.guxiansheng.cn/',
		ApiGeGu	: '10.24.165.206:8081',
		PdfUrl	: 'http://pdf.guxiansheng.cn/',
		ApiTps : 'http://tps.api.guxiansheng.cn/',//第三方接口地址
		/**
		 * [jsonp description] jsonp跨域请求
		 * @param  {[type]}   arg      [description]
		 * @param  {Function} callback [description]
		 * @return {[type]}            [description]
		 */
		jsonp: function(arg,callback){
			if(!arg.url){
				throw new Error('参数错误！');
			}
			var _THIS_ = new Object();
			$.extend(_THIS_,{
				url: url,    //请求的url地址
		        dataType: "jsonp",   //返回格式为json
		        data: data,    //参数值{a:2,b:c}
		        type: type,   //请求方式post get
		        jsonp: 'callback',
		        jsonpCallback: callback
			},arg);
			$.ajax(_THIS_);
		},
		/**
		 * [targetEvent description] 绑定事件
		 * @param  {[type]}   args     [description]
		 * @param  {Function} callback [description]
		 * @return {[type]}            [description]
		 */
		targetEvent: function (args, callback) {
            if (!args.elem) {
                throw new Error('targetEvent绑定事件节点不存在');
            }
            var _THIS_ = new Object();
            $.extend(_THIS_, {
                elem: null,
                evtname: 'touchend'
            }, args);
            if (_THIS_.elem && _THIS_.elem.length) {
                $(document).on(_THIS_.evtname, _THIS_.elem, function (event) {
                    event = event || window.event;
                    typeof callback === 'function' && callback.call(this, event);
                    event.preventDefault();event.stopPropagation();
                });
            }
        },
        /**
         * [getQueryString description] 获取单个URL参数
         * @return {[type]} [description]
         */
        getQueryString: function(){
        	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		    var r = window.location.search.substr(1).match(reg);
		    if (r != null) return decodeURIComponent(r[2]); return null;
        },
        /**
		 * 获取url中的参数
		 * @returns {Object}
		 * {
		 * 	  has: true|false 当前url是否有参数
		 *    data: {name:'aa'} has为true时，url中query格式的参数转换成json格式
		 * }
		 */
        getUrlArgs: function(){
			var url = location.search.replace(/#.*$/,''); //获取url中"?"符后的字串
			var result = {
			  has: false, //url中是否有传参数
			  data: {} //如果has是true,则data里有值
			};
			if (url.indexOf("?") != -1) {
			  result.has = true;
			  url = url.substr(1);
			  result.data = this.queryToJson(url);
			}
			return result;
        },
        /**
		 * 把query格式的数据转换成json格式
		 * @param querystr {String} query格式参数 name=aa&sex=man
		 * @param decode {Boolean} 参数值是否解码，默认为true
		 * @returns {Object} {name:'aa',sex:'man'}
		 */
        queryToJson: function(querystr,decode){
        	if(typeof decode != 'boolean'){
				decode = true;
			}
			var result = {};
			var arr = querystr.split("&");
		    for(var i = 0; i < arr.length; i ++) {
		  	   var itemarr = arr[i].split('=');
		  	   if(decode){
		  		  result[itemarr[0]] = decodeURIComponent(itemarr[1]);
		  	   }
		  	   else{
		  		  result[itemarr[0]] = itemarr[1];
		  	   }
		    }
		    return result;
        },
        /**
         * [storeSet description] 设置单个 localStorage
         * @param  {[type]} name  [description]
         * @param  {[type]} value [description]
         * @return {[type]}       [description]
         */
        storeSet: function(name,value){
    		if(store){
    			store.set(name,value);
    		}
        },
        /**
         * [storeSetall description] 设置多个 localStorage
         * @param  {[type]} objarr [description]  {} or []
         * @return {[type]}        [description]
         */
        storeSetall: function(objarr){
        	if(store){
        		store.setAll(objarr)
        	}
        },
        /**
         * [storeGet description] 获取某个localStorage值
         * @param  {[type]} name [description]
         * @return {[type]}      [description]
         */
        storeGet: function(name){
        	if(store){
        		store.get(name)
        	}
        },
        /**
         * [storeHas description] 判断某个localStorage是否存在
         * @param  {[type]} key [description]
         * @return {[type]}     [description]
         */
        storeHas: function(key){
        	if(store){
        		return store.has(key)
        	}
        },
        /**
         * [storeDel description] 删除某个 localStorage值
         * @param  {[type]} key [description]
         * @return {[type]}     [description]
         */
        storeDel: function(key){
        	if(store){
        		store.remove(key);
        	}
        }
};

 module.exports = tool;