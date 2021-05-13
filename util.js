export default {
    copyObj(sourceObject, targetObject) {
        for (var key in sourceObject) {
            targetObject[key] = sourceObject[key];
        }
        return targetObject
    },
    isKong(sj) {
        if(JSON.stringify(sj) == "{}"||sj == ""){
            return true
        }else if(sj.length == 0){
            return true
        }
    },
    isNull(d){
        !d && typeof(d)!='undefined' && d!=0
    }
}