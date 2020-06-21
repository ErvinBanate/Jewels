window.addEventListener("load", function() {
  document.getElementById("fileUpload").onchange = function(event) {
    console.log(event);
    var reader = new FileReader();
    reader.readAsDataURL(event.srcElement.files[0]);
    var me = this;
    reader.onload = function () {
      var fileContent = reader.result;
      document.getElementById("base64").innerHTML = fileContent;
    }
  }
});