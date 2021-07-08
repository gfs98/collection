function mainNext(ids){
  let fileList = [];
  function* main(ids){
    // debugger
    let idsArr = [];
    if (ids) {
      if (ids.indexOf(",") != -1) {
        idsArr = ids.split(",");
      } else {
        idsArr = [ids];
      }
      for (let i = 0, len = idsArr.length; i < len; i++) { // 编程式
      console.log(idsArr)
        yield getFile(idsArr[i],i,len,idsArr)
      }
    }
  }
  const ite = main(ids);
  ite.next();
  function getFile(id,i,len,ids){
    console.log(id,i,len)
    //axios请求files数据
    //下面的代码要再then后写
    fileList.push(1)
    if (i<len-1){
      ids.splice(i,1)
      setTimeout(function(ids){
        ite.next(ids);
      },500)
    }
  }
  setTimeout(function(ids){
    console.log(fileList)
  },600)

},
