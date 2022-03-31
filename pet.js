$(document).ready(function () {
    var pet = $("<div class='pet'></div>");
    var noControllingPet = true;
    curPetName = "Ava"; // pet name can be changed
    petImgConfigJSON_URL = chrome.runtime.getURL("pet-img-config.json");

    // initialize pet
    $("body").parent().append(pet);
    $.getJSON(petImgConfigJSON_URL, function (data) {
        petImgURL = chrome.runtime.getURL(data[curPetName].stand.right);
        $('.pet').prepend($('<img>', { id: "pet-img", src: petImgURL }));
    })

    $(".pet").css({
        "left": "100px",
        "bottom": "0px",
        "z-index": "9999",
        "position": "fixed",
    });

    // Drag pet around
    // 仍需要添加判定范围，不允许超出窗口
    $(".pet").draggable({
        // axis: "x", // I want it only stand on the ground
        start: function () {
            $.getJSON(petImgConfigJSON_URL, function (data) {
                petImgURL_beforeDrag = petImgURL;
                if (petImgURL_beforeDrag == chrome.runtime.getURL(data[curPetName].stand.right)) {
                    petImgURL = chrome.runtime.getURL(data[curPetName].drag.right);
                } else if (petImgURL_beforeDrag == chrome.runtime.getURL(data[curPetName].stand.left)) {
                    petImgURL = chrome.runtime.getURL(data[curPetName].drag.left);
                }
                $("#pet-img").attr("src", petImgURL);
            })
        },
        stop: function () {
            $.getJSON(petImgConfigJSON_URL, function (data) {
                petImgURL = petImgURL_beforeDrag;
                $("#pet-img").attr("src", petImgURL);
            })
        }
    });

    // pet walk around

});
