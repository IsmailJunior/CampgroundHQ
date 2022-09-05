/** @format */

function previewMultiple(event) {
  var images = document.getElementById("image");
  var number = images.files.length;
  for (i = 0; i < number; i++) {
    var urls = URL.createObjectURL(event.target.files[i]);
    document.getElementById("formFile").innerHTML +=
      '<img src="' +
      urls +
      '" class="w-25 img-thumbnail position-relative d-inline" style="height: 7rem;">';
  }
}

