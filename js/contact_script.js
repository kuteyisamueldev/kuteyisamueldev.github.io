var user_id = 30,
    access_token =  "c0d79c687daee8a0b2fc3d56a76fdf88a6e80f4b1f3ada25b6e54194f5490b6b49e9daf479" +
        "71904fb0a2c1a46e26fa4cae45f207c99391dd746c80dd4b5dfd2eSOxGB3aFPuQxRfX5KV28481weOARVYdky4o2p" +
        "hyNYIOEwWh4XA2rr9KDl9n5GeL4fy47kldkQ3wtLYTbZ2W50Q--1609152833-95a79e5d424330278aa88f6d6aa2a50ba1c" +
        "05fa67ae8c56ede4fb9010c89d4f3680b41ecb5c27b3d11680816ae165c97742f76526e97b0ac1f29cc980d155db4hSN" +
        "vAuKfcf56YyVVGlKUCoN5GYgGm24Hiow0MRhpBfjosbqGJ15f11zc1gC0kJei";


var info, array, vendor_array, vendor_info_array, full_input_array, full_info_array,
    current_tab, search_array, search_info_array;


$(document).ready(function () {
    $("#loader").show();

    $.ajax({
    headers: {
      "Content-Type" : "text/plain",
      "Accept": "*/*",
      "Access-Control-Allow-Origin": "*",
      "Sdyapp-Latitude" : 36.07225812978722,
      "Sdyapp-Longitude":  -115.1933371582291,
      "Sdyapp-Board": "goldfish_x86",
      "Sdyapp-Display": "QSR1.190920.001",
      "Sdyapp-Manufacturer": "Google",
      "Sdyapp-Hardware": "ranchu",
      "Sdyapp-Host" : "wpra9.hot.corp.google.com",
      "Sdyapp-Model" : "Android SDK built for x86",
      "Sdyapp-Brand" : "google",
      "Sdyapp-Device" : "generic_x86",
      "Sdyapp-Os-Name" : "Android",
      "Sdyapp-Os-Code": "Q",
      "Sdyapp-Os-Version" : 29
    },
    type: "POST",
    url:  "http://api.secure-dynamics.net/" + user_id + "/get/contacts/?access_token=" + access_token,
    data : {
        username: "itzsammy23",
        password: "MGU@sl!BW)0",
    },
    success: function (response) {
            array = [];
            info = [];

        storeResponse(response.contacts, info, array,"team");

    }
})

    $.ajax({
        headers: {
            "Content-Type" : "text/plain",
            "Accept": "*/*",
            "Access-Control-Allow-Origin": "*",
            "Sdyapp-Latitude" : 36.07225812978722,
            "Sdyapp-Longitude":  -115.1933371582291,
            "Sdyapp-Board": "goldfish_x86",
            "Sdyapp-Display": "QSR1.190920.001",
            "Sdyapp-Manufacturer": "Google",
            "Sdyapp-Hardware": "ranchu",
            "Sdyapp-Host" : "wpra9.hot.corp.google.com",
            "Sdyapp-Model" : "Android SDK built for x86",
            "Sdyapp-Brand" : "google",
            "Sdyapp-Device" : "generic_x86",
            "Sdyapp-Os-Name" : "Android",
            "Sdyapp-Os-Code": "Q",
            "Sdyapp-Os-Version" : 29
        },
        type: "POST",
        url:  "http://api.secure-dynamics.net/" + user_id + "/get/vendors/?access_token=" + access_token,
        data : {
            username: "itzsammy23",
            password: "MGU@sl!BW)0",
        },
        success: function (response) {
                vendor_array = [];
                vendor_info_array = [];

                storeResponse(response.vendors,vendor_info_array, vendor_array, "vendor", function () {
                   setTimeout(function() {
                       $("#loader").hide();
                    full_input_array = array.concat(vendor_array);
                    full_info_array = info.concat(vendor_info_array);
                   var new_clone = full_input_array.slice();
                   current_tab = "all";
                    displayResponse(full_input_array, full_info_array, [], function () {
                        full_input_array = new_clone;
                    });
                   }, 1400);
                });
        }
    })


    $(document).on("click", ".full-name", function () {
        var name = $(this).find('span').text();
        /*console.log(name);*/
        var data_type, info_type;
        if ($(this).data('type') === "team") {
            data_type = array;
            info_type = info;
        } else {
            data_type = vendor_array;
            info_type = vendor_info_array;
        }
        var index = data_type.indexOf(name)


        var user_position =$(".user-position").find('span');
        var text;

        if (info_type[index][5] == null) {
            text = "";
        }else {
            text = info_type[index][5];
        }

        var source;

            if(info_type[index][6] == undefined) {
                source = "<i class='bx bx-user'></i>";
            } else {
                source = `<img src="${info_type[index][6]}">`;
            }


        user_position.text(capitalize(text))
        $(".full-details--name").text(name)
        $(".full-details--position").text(info_type[index][1]);
        $(".full-details--phone").text(info_type[index][2]);
        $(".full-details--media").text(info_type[index][3]);
        $(".full-details--email").text(info_type[index][4]);
        $(".full-details--icon").html(source);

        if (user_position.hasClass("team-class")) {
            user_position.removeClass("team-class");
            $(".fa-users").removeClass("team-green");
        }

        if (user_position.hasClass("vendor-class")) {
            user_position.removeClass("vendor-class");
            $(".fa-users").removeClass("vendor-orange");
        }

        if (info_type[index][5] === "team") {
            user_position.addClass("team-class")
            $(".fa-users").addClass("team-green");
        }

        if (info_type[index][5] === "vendor") {
            user_position.addClass("vendor-class")
            $(".fa-users").addClass("vendor-orange");
        }

        if ($(window).width() > 800) {
            $("#full-details").show();
            $("#width-box").addClass("width");
            $(".unset").addClass("max-width");
            $(".alphabet-indicator").addClass("position-shift");
            $("#full-details").addClass("show-details");
        }else{
            $("#full-details").removeClass("normal-width");
            if ($("#full-details").hasClass("show-details")) {
                $("#full-details").removeClass("show-details");
            }
            $("#full-details").addClass("full-width");
            $("#full-details").addClass("animate");
            $(".modal-box").append($("#full-details").clone());
            $("#full-details").show();
            $(".modal-box").show();
        }
    });

    $(document).on("click", "#close-details", function () {
            if ($(window).width() > 800) {
                $("#full-details").hide()
                $("#width-box").removeClass("width");
                $(".alphabet-indicator").removeClass("position-shift");
            }else{
                $(".modal-box").html("");
                $(".modal-box").hide();
            }

    })

           $("#create-contact-button").click(function () {
                $(".contact-modal").show();
           });

            $("#close-create-contact").click(function () {
                $(".contact-modal").hide();
            })

    $(".contacts-tab").click(function () {
        for (var i = 0; i < $(".contacts-tab").length; i++) {
            if ($(".contacts-tab").eq(i).hasClass("active")) {
                $(".contacts-tab").removeClass("active");
            }
        }

        $(this).addClass("active");
    })

    $("#all").click(function () {
        $(".contact-list").html("");
        $(".alphabet-indicator").html("");
        var new_array = full_input_array.slice();
        displayResponse(full_input_array, full_info_array, [], function () {
                full_input_array = new_array;
        })
        $("html, body").animate({scrollTop: 0}, 1000);
        current_tab = "all";
    })

    $("#teams").click(function () {
        $(".contact-list").html("");
        $(".alphabet-indicator").html("");
        var new_teams = array.slice();
        displayResponse(array, info, [], function () {
            array = new_teams;
        })
        current_tab = "teams";
        console.log(current_tab);
        $("html, body").animate({scrollTop: 0}, 1000);
    })

    $("#vendors").click(function () {
        console.log(vendor_array);
        $(".contact-list").html("");
        $(".alphabet-indicator").html("");
        var new_vendors = vendor_array.slice();
        displayResponse(vendor_array, vendor_info_array, [], function () {
            vendor_array = new_vendors;
        })
        current_tab = "vendors";
        $("html, body").animate({scrollTop: 0}, 1000);
    })

    $(window).scroll(function() {
        for (var i = 0; i < $(".alphabet-indicator div").length; i++) {
            if($(".alphabet-indicator div a").eq(i).hasClass("current-selection")) {
                $(".alphabet-indicator div a").eq(i).removeClass("current-selection")
                $(".alphabet-indicator div a").eq(i).addClass("regular")
            }
        }

        for (var i = 0; i < $(".alphabet").length; i++) {
            var offset  = parseInt($(".alphabet").eq(i).offset().top);
            if($(window).scrollTop() >= offset){
                if($(".alphabet-indicator div a").eq(i-1).hasClass("current-selection")) {
                    $(".alphabet-indicator div a").eq(i-1).removeClass("current-selection")
                    $(".alphabet-indicator div a").eq(i-1).addClass("regular")
                }
                $(".alphabet-indicator div a").eq(i).addClass("current-selection");
            }

            if ($(window).scrollTop() == 0) {
                $(".alphabet-indicator div a").eq(0).addClass("current-selection")
            }

           /* console.log($(".alphabet").eq(i).offset().top);*/
        }

      /* console.log($(this).scrollTop());*/
    })

    $("#search-box").keyup(function () {
        if (current_tab === "all") {
            search_array = full_input_array;
            search_info_array = full_info_array;
        }

        if (current_tab === "teams") {
            search_array = array;
            search_info_array = info;
        }

        if (current_tab === "vendors") {
            search_array = vendor_array;
            search_info_array = vendor_info_array;
        }

        if ($(this).val().length >= 2) {

            var search_value = $("#search-box").val();

            var search_result = search_array.filter(val => val.toLowerCase().includes(search_value.toLowerCase()));
            var search_result_info_array = [];

            $(".contact-list").html("");
            $(".alphabet-indicator").html("");
            if (search_result.length == 0) {
                $(".contact-list").append("<div class='error-message'>No results</div>")
            } else {
                for (var i = 0; i < search_result.length; i++) {
                    var array_index = search_array.indexOf(search_result[i]);
                    search_result_info_array[i] = search_info_array[array_index];
                }

                displayResponse(search_result, search_result_info_array, [])
            }
        }

        if ($("#search-box").val().length == 0) {
            $(".contact-list").html("");
            $(".alphabet-indicator").html("");
            var search_clone = search_array.slice();
            var info_clone = search_info_array.slice();
            displayResponse(search_clone, info_clone, [])
        }
    })

    $(document).on("click", ".alphabet-indicator div a", function () {
            var position = $(this).text();
            var scroll_pos = "#" + position.toString();
            $("html, body").animate({
                scrollTop: $(scroll_pos).offset().top
            }, 1000)
    });

    $(".additional-options-dots").click(function () {
        $("#additional-options-content").toggleClass("display-content-hidden");
    })



    $("#file").on("change", function () {
        var src = URL.createObjectURL($("#file")[0].files[0]);
        $("#selected-profile-picture").html("");
        $("#selected-profile-picture").append(`<img src="${src}">`)
        $(".remove-picture").show();
        console.log($("#file")[0].files[0])
    })

    $(".remove-picture").click( function() {
        console.log("Clicked");
        $("#file").val("")
        $("#selected-profile-picture").html("");
        $("#selected-profile-picture").append("<i class='bx bx-user'></i>")
        $(".remove-picture").hide();
    })
})

function storeResponse(response_values, info_array, input_array, type, callback) {
    var title_suffix, phone_suffix, email_suffix, name_suffix, image_suffix;

    for (var i = 0; i < response_values.rows.length; i++) {

        if (type === "team") {
            title_suffix = response_values.rows[i].contact_title;
            phone_suffix = response_values.rows[i].contact_phone;
            email_suffix = response_values.rows[i].contact_email;
            name_suffix = response_values.rows[i].contact_fname + " " + response_values.rows[i].contact_lname;
        }

        if (type === "vendor") {
            title_suffix = response_values.rows[i].vendor_title;
            phone_suffix = response_values.rows[i].vendor_phone;
            email_suffix = response_values.rows[i].vendor_email;
            name_suffix = response_values.rows[i].vendor_fname + " " + response_values.rows[i].vendor_lname;
            image_suffix = response_values.rows[i].img_path + response_values.rows[i].picture;
        }


        info_array[i] = [];
        info_array[i][0] = title_suffix;
        info_array[i][1] = response_values.rows[i].occupation;
        info_array[i][2] = phone_suffix;
        info_array[i][3] = response_values.rows[i].social_media.facebook;
        info_array[i][4] = email_suffix;
        info_array[i][5] = type;
        info_array[i][6] = image_suffix;
        input_array[i] = name_suffix;
    }

    /*console.log(vendor_array)*/

    if (callback && typeof callback === "function") {
        callback();
    }
}

function displayResponse(input_array, info_array, letters = [], callback) {
    /*console.log(input_array)*/
    var index = 0;

    var clone = input_array.slice();
    var ordered = input_array.sort();
    var user_class;

    for (var i = 0; i < ordered.length; i++) {
        var initials = ordered[i].charAt(0);
        if (letters.indexOf(initials) === -1) {
            letters[index] = initials;
            $(".contact-list").append(`
            <div class="col-md-12 alphabet" id="${initials}">${initials}</div>
            `);
            index++;
            /* console.log(initials);*/
        }
        var title_index = clone.indexOf(ordered[i]);

        var title;
        if (info_array[title_index][1] == null) {
            title = "";
        } else {
            title = info_array[title_index][1];
        }
            if (info_array[title_index][5] === "team") {
                user_class = "team-class";
            }
            if (info_array[title_index][5] === "vendor"){
                user_class = "vendor-class";
            }

            var src;

            if(info_array[title_index][6] == undefined) {
                src = "<i class='bx bx-user'></i>";
            } else {
                src = `<img src="${info_array[title_index][6]}">`;
            }


        $('.contact-list').append(`
                  <div class="col-md-12 contact-list-item">
           <div class="contact-list-box display-flex w-100">
                <div class="icon">
                    ${src}
                </div>
                <div class="contact-short-info">
                    <div class="full-name" data-type="${info_array[title_index][5]}"><h5>${info_array[title_index][0]} <span>${ordered[i]}</span></h5></div>
                    <div class="position">${title}</div>
                </div>
                <div class="team ${user_class}" data-index="${title_index}">${capitalize(info_array[title_index][5])}</div>
            </div>
        </div>
        `)

        /*console.log(info_array[title_index][0] + " " + ordered[i])*/
    }

    for (var i = 0; i < letters.length; i++) {
        var index_selection;
        if (letters[i] === "A") {
            index_selection = "current-selection";
        } else{
            index_selection = "regular";
        }

        $(".alphabet-indicator").append(`
            <div><a class="${index_selection}">${letters[i]}</a></div>
        `)
    }

    if (callback && typeof callback === "function") {
        callback();
    }
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
