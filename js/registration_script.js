var current_tab = 0, errors = [];

$(document).ready(function () {

    $(".forward").click(function (e) {
            e.preventDefault();
            $(".show__error__messages").html("");
            var error_messages = [];
            var index = 0;

        for(var i = 0; i < $(".registration__tab").eq(current_tab).find(".form-field").length; i++) {
            console.log($(".registration__tab").eq(current_tab).find(".form-field").eq(i).val())
            var field = $(".registration__tab").eq(current_tab).find(".form-field").eq(i);

            if (checkIfEmpty(field) === "Empty"){
                error_messages[index] = "empty";
                index++;
            }
        }

        if (error_messages.length != 0 || errors.length != 0) {
            $(".show__error__messages").append("<p>Please fill all fields and fix all errors</p>")
        } else {

            $(".registration__tab").eq(current_tab).hide();
            var next_tab = current_tab + 1;
            $(".registration__tab").eq(next_tab).show();
            $(".registration__stages .stage div").eq(next_tab).addClass("activated");
            $(".stage__indicator .straight__line").eq(next_tab).addClass("activated");
            $(".stage__indicator .rounded__circle").eq(next_tab).addClass("activated");
            current_tab = next_tab;

        }

            if (current_tab == 1) {
                $(".back").removeClass("hidden__display");
            }

            if (current_tab === 2) {
                $(".forward").hide();
                $(".finish").show();
            }
    })

    $(".back").click(function (e) {
            e.preventDefault();
        $(".show__error__messages").text("");
            if (current_tab != 0) {
                if (current_tab === 2) {
                    $(".finish").hide();
                    $(".forward").show();
                }
                $(".registration__tab").eq(current_tab).hide();
                var new_tab = current_tab - 1;
                $(".registration__tab").eq(new_tab).show();
                $(".registration__stages .stage div").eq(current_tab).removeClass("activated");
                $(".stage__indicator .straight__line").eq(current_tab).removeClass("activated");
                $(".stage__indicator .rounded__circle").eq(current_tab).removeClass("activated");
                current_tab = new_tab;

                if (current_tab == 0){
                    $(".back").addClass("hidden__display");
                }
            }

    })

    $(".finish").click(function (e) {
        e.preventDefault();
        $(".show__error__messages").text("");

        var final_tab_error_messages = [];
        var index = 0;

        for(var i = 0; i < $(".registration__tab").eq(2).find(".form-field").length; i++) {
            console.log($(".registration__tab").eq(2).find(".form-field").eq(i).val())
            var field = $(".registration__tab").eq(2).find(".form-field").eq(i);

            if (checkIfEmpty(field) === "Empty"){
                final_tab_error_messages[index] = "empty";
                index++;
            }
        }

        if (final_tab_error_messages.length != 0 || errors.length != 0) {
            $(".show__error__messages").append("<p>Please fill all fields and fix all errors</p>")
        } else{
            $("#registration__form").trigger("submit");
        }
    })

    $("#username").keyup(function () {
        $(".username_error").text("");
        var checkInterval = setInterval(function () {
                if ($("#username").val().length < 3) {
                    $(".username_error").text("Your username is too short");
                    errors[0] = "Username too short";
                    $("#username").css("border", "1px solid #ff0000");
                } else{
                    $("#username").css("border", "1px solid #00ff77");
                    errors = [];
                    clearInterval(checkInterval);
                }
        }, 2000)
    })

    $("#password").keyup(function () {
        $(".password_error").text("");
        var checkInterval = setInterval(function () {
            if ($("#password").val().length < 8) {
                $(".password_error").text("Your password should be at least 8 characters long");
                errors[0] = "Password too short";
                $("#password").css("border", "1px solid #ff0000");
            } else{
                $("#password").css("border", "1px solid #00ff77");
                errors = [];
                clearInterval(checkInterval);
            }
        }, 2000)
    })

    $("#confirm_password").keyup(function () {
        $(".confirm_password_error").text("");
        var checkInterval = setInterval(function () {
            if ($("#confirm_password").val() != $("#password").val()) {
                $(".confirm_password_error").text("Passwords do not match");
                errors[0] = "Password don't match";
                $("#confirm_password").css("border", "1px solid #ff0000");
            } else{
                $("#confirm_password").css("border", "1px solid #00ff77");
                errors = [];
                clearInterval(checkInterval);
            }
        }, 2000)
    })

    $("#email").keyup(function () {
        $(".email_error").text("");
        var checkInterval = setInterval(function () {
            if (!validateEmail($("#email").val())) {
                $(".email_error").text("Invalid email address");
                errors[0] = "Invalid email address";
                $("#email").css("border", "1px solid #ff0000");
            } else{
                $("#email").css("border", "1px solid #00ff77");
                errors = [];
                clearInterval(checkInterval);
            }
        }, 2000)
    })
})

function checkIfEmpty(field) {
    if (field.val() == "" || field.val() == null) {
        return "Empty";
    } else {
        return "Not empty";
    }
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}