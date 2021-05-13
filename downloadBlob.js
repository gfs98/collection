axios({
    url:"/api/cfs/shared/download?sharedCode="+this.downForm.sharedCode+"&sharedPass="+this.downForm.sharedPass,
    method: 'get',
    responseType: "arraybuffer"
  })
  .then((res)=>{
    console.log(res)
    let b = new Blob([res.data]);
      let r = new FileReader();
      let self=this;
      r.readAsText(b, 'utf-8');
      r.onload = function (){
        try {
          let d = JSON.parse(r.result)
          if (d.msg) {
            self.$message.error(d.msg)
            return
          }
        } catch(e) {
          let filename=decodeURIComponent(res.headers["content-disposition"].split("=")[1]);
          if (window.navigator.msSaveOrOpenBlob) {//兼容ie
              navigator.msSaveBlob(b, filename);
          }else{
            let url = window.URL.createObjectURL( b );
            let link = document.createElement("a");
            link.style.display = "none";
            link.href = url;
            link.setAttribute("download",filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            // link.remove();
          }
        }
      }
  })
