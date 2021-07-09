export default {
  isKong(obj) {
    if (JSON.stringify(obj) == "{}" || obj == "" || JSON.stringify(obj) == "null") {
      return true
    } else if (obj.length == 0) {
      return true
    }
  },
  isNull(d) {
    !d && typeof (d) != 'undefined' && d != 0
  },
  // 浅拷贝
  copyObj(sourceObject, targetObject) {
    for (var key in sourceObject) {
      targetObject[key] = sourceObject[key];
    }
    return targetObject
  },
  //Object.assign(); //浅拷贝
  //Array.concat(); //数组中的基本数据为深拷贝，复杂数据为浅拷贝
  //Array.slice(下标,结束下标);截取子字符串 //浅拷贝
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
  // 深拷贝对象1
  jsonClone(obj) {
    return parse(stringify(obj))
  },

  // 深拷贝对象2
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

  //  web存储
  setStorage(key, value) {
    localStorage.setItem(key, value)
  },
  getStorage(key) {
    return localStorage.getItem(key)
  },
  removeStorage(key) {
    localStorage.removeItem(key)
  },

  //download方法
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
  }

}
