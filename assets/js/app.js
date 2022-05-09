$(function () {
    $(".toggle-menu").on("click", function (e) {
        e.preventDefault();
        $(".nav-mobile").toggleClass("show");
    });
    $(document).on("click", function (t) {
        (0 !== $("header").has(t.target).length && 1 !== $(".btn-close").has(t.target).length) || $(".nav-mobile").removeClass("show");
    });
    $("header a").on("click", function (e) {
        if (this.hash !== "") {
            e.preventDefault();
            var hash = this.hash;
            $("html, body").animate(
                {
                    scrollTop: $(hash).offset().top,
                },
                800,
                function () {
                    window.location.hash = hash;
                }
            );
        }
    });

    new spine.SpinePlayer(`smoke-effect-1`, {
        jsonUrl: "assets/js/spine/smoke-web.json",
        atlasUrl: "assets/js/spine/smoke-web.atlas",
        alpha: true,
        backgroundColor: "#00000000",
        animation: "animation",
        showControls: false,
    });

    var body = $("#starshine"),
        template = $(".template.shine"),
        stars = 150,
        sparkle = 20;

    var size = "small";
    var createStar = function () {
        template
            .clone()
            .removeAttr("id")
            .css({
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                webkitAnimationDelay: Math.random() * sparkle + "s",
                mozAnimationDelay: Math.random() * sparkle + "s",
            })
            .addClass(size)
            .appendTo(body);
    };

    for (var i = 0; i < stars; i++) {
        if (i % 2 === 0) {
            size = "small";
        } else if (i % 3 === 0) {
            size = "medium";
        } else {
            size = "large";
        }

        createStar();
    }

    $(".js-selectbox").each(function () {
        const selectedOption = $(this).children("option:selected").text();
        var $this = $(this),
            numberOfOptions = $(this).children('option:not([value=""])');
        $this.wrap('<div class="select"></div>');
        $this.after('<div class="select-display form-control"></div>');
        var $selectDisplay = $this.next(".select-display");
        $selectDisplay.text(selectedOption);
        var $list = $("<ul />", {
            class: "options",
        }).insertAfter($selectDisplay);
        for (var i = 0; i < numberOfOptions.length; i++) {
            $("<li />", {
                text: $(numberOfOptions[i]).text(),
                rel: $(numberOfOptions[i]).val(),
                class: $(numberOfOptions[i]).text() === selectedOption ? "active" : "false",
            }).appendTo($list);
        }
        $this.closest(".form-select").addClass("active");
        var $listItems = $list.children("li");
        $selectDisplay.on("click", function (e) {
            e.preventDefault();
            $(".select-display.active")
                .not(e.target)
                .each(function () {
                    $(this).removeClass("active");
                    $(this).next("ul.options").hide();
                });

            $(this).toggleClass("active").next("ul.options").toggle();
        });
        $listItems.on("click", function (e) {
            e.preventDefault();
            $listItems.removeClass("active");
            $(e.target).addClass("active");
            $selectDisplay.text($(this).text()).removeClass("active");
            $this.val($(this).attr("rel")).trigger("change");
            $list.hide();
        });
    });

    $(document).on("click", function (e) {
        if ($(e.target).closest(".form-select").length === 0) {
            $(".form-select").each(function () {
                $(this).find(".select-display").removeClass("active");
                $(this).find(".options").hide();
            });
        }
    });
});
