(function($){
    $.fn.ckSlide = function(opts){
        opts = $.extend({}, $.fn.ckSlide.opts, opts);
        $('.ck-slide').css({height : $(window).height()});
        this.each(function(){
            var slidewrap = $(this).find('.ck-slide-wrapper');
            var slide = slidewrap.find('li.ck-slide-item');
            var count = slide.length;
            var that = this;
            var index = 0;
            var time = null;
            console.log(count)
            $(this).data('opts', opts);
            // next
            $(this).find('.ck-next').on('click', function(){
                if(opts['isAnimate'] == true){
                    return;
                }

                var old = index;
                if(index >= count - 1){
                    index = 0;
                } else {
                    index++;
                }
                change.call(that, index, old);
            });
            // prev
            $(this).find('.ck-prev').bind('click', function(){
                if(opts['isAnimate'] == true){
                    return;
                }

                var old = index;
                if(index <= 0){
                    index = count - 1;
                } else {
                    index--;
                }
                change.call(that, index, old);
            });
            $(this).find('.ck-slidebox li div').each(function(cindex){
                $(this).bind('click.slidebox', function(){
                    change.call(that, cindex, index);
                    index = cindex;
                });
            });

            // focus clean auto play
            $(this).find('.ck-slidebox li div').bind('mouseover', function(){
                if(opts.autoPlay){
                    clearInterval(time);
                }
                $(this).find('.ctrl-slide').css({opacity : 0.6});
            });
            //  leave
            $(this).find('.ck-slidebox li div').bind('mouseleave', function(){
                if(opts.autoPlay){
                    startAtuoPlay();
                }
                $(this).find('.ctrl-slide').css({opacity : 0.15});
            });
            startAtuoPlay();
            // auto play
            function startAtuoPlay(){
                if(opts.autoPlay){
                    time = setInterval(function(){
                        var old = index;
                        if(index >= count - 1){
                            index = 0;
                        } else {
                            index++;
                        }
                        change.call(that, index, old);
                    }, 8000);
                }
            }

            // 修正box
            var box = $(this).find('.ck-slidebox');
            box.css({
                'margin-left' : -(box.width() / 2)
            })
            // dir
            switch(opts.dir){
                case "x":
                    opts['width'] = $(this).width();
                    slidewrap.css({
                        'width' : count * opts['width']
                    });
                    slide.css({
                        'float' : 'left',
                        'position' : 'relative'
                    });
                    slidewrap.wrap('<div class="ck-slide-dir"></div>');
                    slide.show();
                    break;
            }
        });
    };
    function change(show, hide){
        //console.time(name);

        var opts = $(this).data('opts');
        if(opts.dir == 'x'){
            var x = show * opts['width'];
            $(this).find('.ck-slide-wrapper').stop().animate({'margin-left' : -x}, function(){opts['isAnimate'] = false;});
            opts['isAnimate'] = true;
        } else {
            //$(this).find('.ck-slide-wrapper li').eq(hide).stop().animate({opacity : 0}, 1000);
            //$(this).find('.ck-slide-wrapper li').eq(show).show().css({opacity : 0}).stop().animate({opacity : 1}, 1000);
            $(this).find('.ck-slide-wrapper li').eq(hide).stop().fadeIn(1000);
            $(this).find('.ck-slide-wrapper li').eq(show).stop().fadeOut(1000);
        }

        $(this).find('.ck-slidebox li').removeClass('current');
        $(this).find('.ck-slidebox li').eq(show).addClass('current');

        //console.timeEnd(name);
    }

    $.fn.ckSlide.opts = {
        autoPlay : true,
        dir : null,
        isAnimate : false
    };
})(jQuery);