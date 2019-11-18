var accMul = function (arg1, arg2) {
  var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
  try { m += s1.split(".")[1].length } catch (e) { }
  try { m += s2.split(".")[1].length } catch (e) { }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}
var jia = function (arg1, arg2, arg3) {
  var m = 0, s1 = arg1.toString(), s2 = arg2.toString(), s3 = arg3.toString();
  try { m += s1.split(".")[1].length } catch (e) { }
  return (Number(s1.replace(".", "")) + Number(s2.replace(".", "")) + Number(s3.replace(".", ""))) / Math.pow(10, m)
}
var jia2 = function (arg1, arg2) {
  var m = 0, s1 = arg1.toString(), s2 = arg2.toString()
  try { m += s1.split(".")[1].length } catch (e) { }
  return (Number(s1.replace(".", "")) + Number(s2.replace(".", "")) ) / Math.pow(10, m)
}
var jia1 = function (arg1) {
  var m = 0, s1 = arg1.toString();
  try { m += s1.split(".")[1].length } catch (e) { }
  return (Number(s1.replace(".", ""))) / Math.pow(10, m)
}
// 图片压缩
var uplodeimg = function (data) {
  return new Promise((resovle) => {
    if (data.size > 1000000) {
      let reader = new FileReader();
      reader.readAsDataURL(data);
      reader.onload = function (e) {
        let image = new Image(); //新建一个img标签（还没嵌入DOM节点)
        image.src = e.target.result;
        image.onload = function () {
          let canvas = document.createElement("canvas"),
            context = canvas.getContext("2d"),
            imageWidth = image.width / 2, //压缩后图片的大小
            imageHeight = image.height / 2,
            data = "";
          canvas.width = imageWidth;
          canvas.height = imageHeight;
          context.drawImage(image, 0, 0, imageWidth, imageHeight);
          var dataurl = canvas.toDataURL("image/jpeg", 0.8);
          var arr = dataurl.split(","),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          var newFile = new Blob([u8arr], { type: mime });
          console.log(newFile, 22222);
          //压缩完成
          resovle(newFile)
          // return newFile 
        };
      };
    } else {
      resovle(data) 
    }
  })
}
export default { accMul, jia, jia1, uplodeimg ,jia2}