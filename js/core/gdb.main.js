var GDB = {};
(function(S){
    var main = {
        init : function(){
            var scrollFunc = function(e){
                var direct = 0;
                if($(document).scrollTop() > 0){
                    $("#gdb_header").addClass("header-black");
                    $("#gdb_header").removeClass("header-white")
                } else {
                    $("#gdb_header").addClass("header-white");
                    $("#gdb_header").removeClass("header-black")
                }
            };
            if(document.addEventListener){
                document.addEventListener('DOMMouseScroll', scrollFunc, false);
                document.addEventListener('touchmove', scrollFunc, false)
            }

            $(window).scroll(function(){
                scrollFunc()
            });
            $('#gdb_navdrop').mouseenter(function(){
                $(this).children('div.subnavbox').stop().show()
            }).mouseleave(function(){
                $(this).children('div.subnavbox').stop().hide()
            });
            $('#gdb_feature_showmore').bind('click', function(){
                $('#gdb_feature_morebox').slideDown();
                var top = $('#gdb_feature_morebox').offset().top - 150;
                $("html,body").animate({
                    scrollTop : top
                }, 1000);
            });
            $('#gdb_feature_hideicon').bind('click', function(){
                $('#gdb_feature_morebox').slideUp();
                $("html,body").animate({
                    scrollTop : 0
                }, 1000);
            });
            var bodyWidth = $(window).width();
            main.rootFontSize(10, bodyWidth);
            $(window).resize(function(){
                main.rootFontSize(10, bodyWidth);
            });
            main.serviceSolutionH();
            main.homeLogin();
        },
        rootFontSize : function(num, w){
            var rfs = (num / 1920) * document.documentElement.clientWidth;
            var rootfootsize = Math.round(rfs);
            if(w > 1900){
                rootfootsize = 10
            } else {
                if(rootfootsize < 7){
                    rootfootsize = 7;
                }
            }

            document.documentElement.style.fontSize = rootfootsize + 'px';
        },
        serviceSolutionH : function(w){
            var hOne = $('.service-solution-txtone').height(),
                hTwo = $('.service-solution-txttwo').height(),
                hThree = $('.service-solution-txtthree').height(),
                hFour = $('.service-solution-txtfour').height();
            var arrs = [hOne, hTwo, hThree, hFour];
            var boxH = Math.max.apply({}, arrs);

            $('.service-solution-txtcontent').height(boxH);
        },
        homeLogin : function(){
            $('#login').bind('click', function(){
                $('#loginbox').show()
            });
            $('#loginclose').bind('click', function(){
                $('#loginbox').hide()
            });
        }
    };
    $(document).ready(function(e){
        main.init()
    });
    return S.main = main
})(GDB);