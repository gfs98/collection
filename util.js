export default {
    isKong(sj) {
        if(JSON.stringify(sj) == "{}"||sj == ""||JSON.stringify(sj) == "null"){
            return true
        }else if(sj.length == 0){
            return true
        }
    },
    isNull(d){
        !d && typeof(d)!='undefined' && d!=0
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
    }

    parse(str) {
      JSON.parse(str, (k, v) => {
        if (v.indexOf && v.indexOf('function') > -1) {
          return eval(`(${v})`)
        }
        return v
      })
    }
    // 深拷贝对象1
    jsonClone(obj) {
      return parse(stringify(obj))
    }

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
    }

}
