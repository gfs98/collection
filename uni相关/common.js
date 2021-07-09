import * as api from './api.js'

function jumpToLogin(){
	navigateTo('/pages/views/login/login')
}
//把obj对象里的值覆盖到newobj里面
function deepCopy(newobj, obj) {
	if (typeof obj != 'object') {
		return obj
	}
	for (var attr in obj) {
		var a = {}
		if (newobj[attr]) {
			a = newobj[attr]
		}
		newobj[attr] = deepCopy(a, obj[attr])
	}
	return newobj
}
function successToShow(msg = '保存成功', callback = function() {}) {


	setTimeout(function() {
		uni.showToast({
			title: msg,
			icon: 'success',
			duration: 1000,
			success() {
				setTimeout(function() {
					callback()
				}, 500)
			}
		})
	}, 100)
	/*  uni.showToast({
	    title: msg,
	    icon: 'success',
	    duration: 1000
	  }) */
}

//操作失败的提示信息
function errorToShow(msg = '操作失败', callback = function() {}) {
	setTimeout(function() {
		uni.showToast({
			title: msg,
			icon: 'none',
			duration: 1500,
			success() {
				setTimeout(function() {
					callback()
				}, 1500)
			}
		})
	},100)

}

//加载显示
function loadToShow(msg = '加载中') {
	uni.showToast({
		title: msg,
		icon: 'loading'
	})
}

//加载隐藏
function loadToHide() {
	uni.hideToast()
}

// 提示框
function modelShow(
	title = '提示',
	content = '确认执行此操作吗?',
	callback = () => {},
	showCancel = true,
	cancelText = '取消',
	confirmText = '确定'
) {
	uni.showModal({
		title: title,
		content: content,
		showCancel: showCancel,
		cancelText: cancelText,
		confirmText: confirmText,
		cancelText: cancelText,
		success: function(res) {
			if (res.confirm) {
				// 用户点击确定操作
				setTimeout(() => {
					callback()
				}, 500)
			} else if (res.cancel) {
				// 用户取消操作
			}
		}
	})
}

//时间戳转时间格式
function timeToDate(date, flag = false) {
	var date = new Date(date * 1000) //如果date为13位不需要乘1000
	var Y = date.getFullYear() + '-'
	var M =
		(date.getMonth() + 1 < 10 ?
			'0' + (date.getMonth() + 1) :
			date.getMonth() + 1) + '-'
	var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
	var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
	var m =
		(date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
	var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
	if (flag) {
		return Y + M + D
	} else {
		return Y + M + D + h + m + s
	}
}

function time2date(micro_second) {
	var time = {}
	// 总秒数
	var second = Math.floor(micro_second)
	// 天数
	time.day = PrefixInteger(Math.floor(second / 3600 / 24), 2)
	// 小时
	time.hour = PrefixInteger(Math.floor((second / 3600) % 24), 2)
	// 分钟
	time.minute = PrefixInteger(Math.floor((second / 60) % 60), 2)
	// 秒
	time.second = PrefixInteger(Math.floor(second % 60), 2)

	var newtime = ''
	if (time.day > 0) {
		newtime =
			time.day +
			'天' +
			time.hour +
			'小时' +
			time.minute +
			'分' +
			time.second +
			'秒'
	} else {
		if (time.hour != 0) {
			newtime = time.hour + '小时' + time.minute + '分' + time.second + '秒'
		} else {
			newtime = time.minute + '分' + time.second + '秒'
		}
	}
	return newtime
}

function timeToDateObj(micro_second) {
	var time = {}
	// 总秒数
	var second = Math.floor(micro_second)
	// 天数
	time.day = Math.floor(second / 3600 / 24)
	// 小时
	time.hour = Math.floor((second / 3600) % 24)
	// 分钟
	time.minute = Math.floor((second / 60) % 60)
	// 秒
	time.second = Math.floor(second % 60)

	return time

}

//货币格式化
function formatMoney(number, places, symbol, thousand, decimal) {
	number = number || 0
	places = !isNaN((places = Math.abs(places))) ? places : 2
	symbol = symbol !== undefined ? symbol : '￥'
	thousand = thousand || ','
	decimal = decimal || '.'
	var negative = number < 0 ? '-' : '',
		i = parseInt((number = Math.abs(+number || 0).toFixed(places)), 10) + '',
		j = (j = i.length) > 3 ? j % 3 : 0
	return (
		symbol +
		negative +
		(j ? i.substr(0, j) + thousand : '') +
		i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) +
		(places ?
			decimal +
			Math.abs(number - i)
			.toFixed(places)
			.slice(2) :
			'')
	)
}

function throttle(fn, context, delay) {
	clearTimeout(fn.timeoutId)
	fn.timeoutId = setTimeout(function() {
		fn.call(context)
	}, delay)
}

// 时间格式化输出，如11:03 25:19 每1s都会调用一次
function dateformat(micro_second) {
	var time = {}
	// 总秒数
	var second = Math.floor(micro_second / 1000) // 天数
	time.day = PrefixInteger(Math.floor(second / 3600 / 24), 2) // 小时
	time.hour = PrefixInteger(Math.floor((second / 3600) % 24), 2) // 分钟
	time.minute = PrefixInteger(Math.floor((second / 60) % 60), 2) // 秒
	time.second = PrefixInteger(Math.floor(second % 60), 2)
	return time
}

//不足位数前面补0
function PrefixInteger(num, length) {
	return (Array(length).join('0') + num).slice(-length)
}

//验证是否是手机号
function isPhoneNumber(str) {
	var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
	if (!myreg.test(str)) {
		return false
	} else {
		return true
	}
}

/**
 *
 * 对象参数转为url参数
 *
 */
function builderUrlParams(url, data) {
	if (typeof url == 'undefined' || url == null || url == '') {
		return ''
	}
	if (typeof data == 'undefined' || data == null || typeof data != 'object') {
		return url
	}
	url += url.indexOf('?') != -1 ? '' : '?'
	for (var k in data) {
		url += (url.indexOf('=') != -1 ? '&' : '') + k + '=' + encodeURI(data[k])
	}
	return url
}
/**
 *
 * 解析url参数
 *
 */
function parseQueryString(url){
  var str = url.split('?')[1],
      items = str.split('&'),
      result = {},
      res = {};

  for(var i = 0, len = items.length; i <len; ++i){
    res = items[i].split("=");
    result[res[0]] = res[1];
  }
  return result;
}

/**
 * 使用循环的方式判断一个元素是否存在于一个数组中
 * @param {Object} arr 数组
 * @param {Object} value 元素值
 */
function isInArray(arr, value) {
	for (var i = 0; i < arr.length; i++) {
		if (value === arr[i]) {
			return true
		}
	}
	return false
}
/**
 * 统一跳转
 */
function navigateTo(url) {
	uni.navigateTo({
		url: url,
		animationType: 'pop-in',
		animationDuration: 300
	})
}

/**
 *  关闭当前页面并跳转
 */
function redirectTo(url) {
	uni.redirectTo({
		url: url,
		animationType: 'pop-in',
		animationDuration: 300
	})
}

/**
 * 获取url参数
 *
 * @param {*} name
 * @param {*} [url=window.location.serach]
 * @returns
 */
function getQueryString(name, url) {
	var url = url || window.location.href
	var reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i')
	var r = url.substr(1).match(reg)
	if (r != null) {
		return r[2]
	}
	return null
}

/**
 *
 *  判断是否在微信浏览器 true是
 */
function isWeiXinBrowser() {
	// #ifdef H5
	// window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
	let ua = window.navigator.userAgent.toLowerCase()
	// 通过正则表达式匹配ua中是否含有MicroMessenger字符串
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true
	} else {
		return false
	}
	// #endif

	return false
}
//转换头像
function transAvatar(avatarid) {
	return avatarid?api.apiBaseUrl+'/file/preview?id='+avatarid+'&accessToken='+ api.userToken.accessToken+'&clientId='+ api.clientId:null
}
const getFileInfo = async(id)=>{
	let info = null
	if(id){
		info = await api.get('/file/query',{id:id},res => {
			res.path = transAvatar(id)
			res.name = res.originName
			return res
		})
	}
	return info
}
//把文件转换成可以显示的
function transLogoData(logoData){
	if(logoData){
		logoData.forEach(item=>{
			item.name = item.originName
			item.path = transAvatar(item,false)
		})
	}
	return logoData
}
//替换imgurl
function transImgUrl(content){
	// <img [^>]*src=['"]([^'"]+)[^>]*>
	let newStr
	let newContent= content.replace(/src=[\'\"]?([^\'\"]*)[\'\"]?/gi,function(match,capture){
		let params = parseQueryString(capture)
		newStr='src="/api/quan/file/preview?id='
			+params.id+
			'&accessToken='
			+api.userToken.accessToken+
			'&clientId='
			+api.clientId+
			'"';
		return newStr;
	});
	return newContent;
}
function saveTransImgUrl(content){
	let newStr
	let newContent= content.replace(/src=[\'\"]?([^\'\"]*)[\'\"]?/gi,function(match,capture){
		// console.log(match,capture)
		let params = parseQueryString(capture)
		newStr='src="/api/quan/file/preview?id='
			+params.id+
			'&accessToken='
			+'accessToken'+
			'&clientId='
			+'clientId'+
			'"';
		return newStr;
	});
	return newContent;
}


export {
	deepCopy,
	jumpToLogin,
	timeToDate,
	formatMoney,
	successToShow,
	throttle,
	errorToShow,
	time2date,
	isPhoneNumber,
	isInArray,
	loadToShow,
	loadToHide,
	navigateTo,
	redirectTo,
	modelShow,
	builderUrlParams,
	parseQueryString,
	isWeiXinBrowser,
	dateformat,
	getQueryString,
	timeToDateObj,
	transAvatar,
	transLogoData,
	transImgUrl,
	saveTransImgUrl,
	getFileInfo
}
