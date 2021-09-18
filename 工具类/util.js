export default {
  /***
  * @name isEmpty 是否为空(不区分数据类型)
  */
  isEmpty(d) {
    return !d || JSON.stringify(d) == "{}" || d.length == 0 ? true : false
  },
  /***
  * @name isNull 是否为null
  */
  isNull(d) {
    return d == null
  },
  /***
  * @name isUndefined 是否为undefined
  */
  isUndefined(d) {
    return d === undefined
  },
  /***
  * @name copyObj 浅拷贝
  */
  copyObj(sourceObject, targetObject) {
    for (var key in sourceObject) {
      targetObject[key] = sourceObject[key];
    }
    return targetObject
  },
  //Object.assign(); //浅拷贝
  //Array.concat(); //数组中的基本数据为深拷贝，复杂数据为浅拷贝
  //Array.slice(下标,结束下标);截取子字符串 //浅拷贝
  /***
  * @name deepClone 深拷贝对象1
  */
  jsonClone(obj) {
    return parse(stringify(obj))
  },
  stringify(obj) {
    return JSON.stringify(obj, (key, val) => {
      if (typeof val === 'function') {
        return `${val}`
      }
      return val
    })
  },
  parse(str) {
    JSON.parse(str, (k, v) => {
      if (v.indexOf && v.indexOf('function') > -1) {
        return eval(`(${v})`)
      }
      return v
    })
  },
  /***
  * @name deepClone 深拷贝对象2
  */
  deepClone(obj) {
    const _toString = Object.prototype.toString

    // null, undefined, non-object, function
    if (!obj || typeof obj !== 'object') {
      return obj
    }

    // DOM Node
    if (obj.nodeType && 'cloneNode' in obj) {
      return obj.cloneNode(true)
    }

    // Date
    if (_toString.call(obj) === '[object Date]') {
      return new Date(obj.getTime())
    }

    // RegExp
    if (_toString.call(obj) === '[object RegExp]') {
      const flags = []
      if (obj.global) { flags.push('g') }
      if (obj.multiline) { flags.push('m') }
      if (obj.ignoreCase) { flags.push('i') }

      return new RegExp(obj.source, flags.join(''))
    }

    const result = Array.isArray(obj) ? [] : obj.constructor ? new obj.constructor() : {}

    for (const key in obj) {
      result[key] = deepClone(obj[key])
    }

    return result
  },

  /***
  * web存储
  */  
  setStorage(key, value) {
    localStorage.setItem(key, value)
  },
  getStorage(key) {
    return localStorage.getItem(key)
  },
  removeStorage(key) {
    localStorage.removeItem(key)
  },

  /***
  * @name downloadBolb 下载后台返回的二进制文件
  */
  downloadBolb(url) {
    axios({
      url: url,
      method: 'get',
      responseType: "arraybuffer"
    })
      .then((res) => {
        let b = new Blob([res.data]);
        // 后台返回的正常是二进制文件，异常时返回的json，所以先转成文字尝试读取错误，没有读到错误则正常下载
        let r = new FileReader();
        let self = this;
        r.readAsText(b, 'utf-8');
        r.onload = function () {
          try {
            let d = JSON.parse(r.result)
            if (d.msg) {
              console.log(d.msg)//抛出错误信息
              // self.$message.error(d.msg)
              return
            }
          } catch (e) {
            // 后台返回的文件名字
            let filename = decodeURIComponent(res.headers["content-disposition"].split("=")[1]);
            if (window.navigator.msSaveOrOpenBlob) { //兼容ie
              navigator.msSaveBlob(b, filename);
            } else {
              let url = window.URL.createObjectURL(b);
              let link = document.createElement("a");
              link.style.display = "none";
              link.href = url;
              link.setAttribute("download", filename);
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              // link.remove();
            }
          }
        }
      })
  },
  /***
  * @name timestampTransDate 时间戳转日期
  * @param timestamp(时间戳)
  * @param separator(分隔符)
  * 例： timestampTransDate(1630425600000, '-')
  * @return {string} 返回一个日期
  */
  timestampTransDate = (timestamp, separator) => {
      let arr = [];
      arr[0] = new Date(timestamp).getFullYear();
      arr[1] = new Date(timestamp).getMonth() + 1 > 9 ? new Date(timestamp).getMonth() + 1 : "0" + (new Date(timestamp).getMonth() + 1);
      arr[2] = new Date(timestamp).getDate() > 9 ? new Date(timestamp).getDate() : "0" + new Date(timestamp).getDate();
      return arr.join(separator)
  },
  /***
  * @name range 序列生成器（指定范围）
  * @param start (number)
  * @param stop (number)
  * @param step (number)
  * 例： range(1, 100, 5)
  * @return {array} 返回一个范围内的数组
  */
  range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => (start + (i * step)).toString()),
  /***
  * @name combine 数组合并去重
  * @param arguments (array) 可传入多个数组 例：let m = [1, 2, 2], n = [2, 3, 3]; combine(m, n)
  * @return {array} 返回去重后的数组
  */
  combine() {
      let arr = [].concat.apply([], arguments);  //没有去重复的新数组
      return Array.from(new Set(arr));
  },
  /***
  * @name formatJson 把元素为object的数组转化为只有value的数组
  * @param filterVal (array) object的key的集合数组
  * @param jsonData (array) 元素为object的数组
  * @return {array} 返回只有value的数组的数组
  */
  formatJson(filterVal, jsonData) {
      return jsonData.map((v) ＝>{
        return v[j];
      }
  },


}
