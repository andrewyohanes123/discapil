(function($){
  $.fn.notifikasi = function(pesan, timeout = 2000)
  {
      $('.notifikasi').css('animation', '750ms notif-in forwards');
      $('.notifikasi').css('display', 'flex');
      $('.notifikasi-body').empty();
      $('.notifikasi-body').text(pesan);
      setTimeout(function(){
        $('.notifikasi').css('animation', '750ms notif-out forwards');
      }, timeout)
  }

  $.fn.modalPopup = function(mode, config)
  {
    var setting = $.extend({
      backgroundClick : true,
      keyboardDetect : true,
      key : 27,
      titleBackground : "#ddd",
      titleFontColor : "black"
    },config)
    if (mode == 'show')
    {
      $('.modal').show();
      $('.modal-titlebar').css('background', setting.titleBackground);
      $('.modal-titlebar .title').css('color', setting.titleFontColor)
      $('body').css('overflow-y', 'hidden');
    }
    else if (mode == 'hide')
    {
      modalOut();
    }

    if (setting.backgroundClick)
    {
      $('.modal-window').parent().click(function(){
        modalOut();
      }).children().click(function(){
        return false;
      });
    }

    $('.btn-modal').click(function(){
      modalOut();
    })

    $('.close').click(function(){
      modalOut();
    })

    if  (setting.keyboardDetect)
    {
      $(document).on('keyup', function(e){
        var modal = $('.modal').css('display');
        if (modal == 'block')
        {
          if (e.keyCode == setting.key)
          {
            modalOut();
          }
        }
      })
    }

    function modalOut ()
    {
      $('.modal-window').css('animation', 'modal-out 750ms forwards');
      $('body').css('overflow', 'auto');
      $('#modal').fadeOut();
      setTimeout(function(){
        $('.modal-window').css('animation', 'modal-in 750ms forwards');
      }, 500);
    }
  }

  $.fn.imgModal = function(src, config)
  {
    var setting = $.extend({
      img_width : "50%",
      keyboardDetect : true,
      backgroundClick : true
    }, config)
    if (src != "")
    {
      var modal = $('.modal').css('display');
      if (modal != 'block')
      {
        $('body').css('overflow', 'hidden')
        $('.img-modal').fadeIn();
        $('.img-content').show();
        $('.img-content').attr('src', src);
        $('.img-content').css('animation', 'img-modal-in 750ms forwards');
        // $('.img-content').css('width', setting.img_width);

        $('.img-content').click(function(){
          $('.img-content').toggleClass('img-width');
        });

        if (setting.backgroundClick)
        {
          $('.img-modal').click(function(){
            $('.img-content').css('animation', 'img-modal-out 750ms forwards');
            setTimeout(function(){
              $('.img-modal').fadeOut();
            }, 800);
            $('body').css('overflow', 'auto');
          }).children().click(function(){
            $('.img-content').click(function(){
              $('.img-content').toggleClass('img-width');
            });
            return false;
          })
        }
      }
      else
      {
        $('.modal').css('overflow', 'hidden')
        $('.img-modal').fadeIn();
        $('.img-content').show();
        $('.img-content').attr('src', src);
        $('.img-content').css('animation', 'img-modal-in 750ms forwards');
        // $('.img-content').css('width', setting.img_width);

        $('.img-content').click(function(){
          $('.img-content').toggleClass('img-width');
        });

        if (setting.backgroundClick)
        {
          $('.img-modal').click(function(){
            $('.img-content').css('animation', 'img-modal-out 750ms forwards');
            setTimeout(function(){
              $('.img-modal').fadeOut();
            }, 800);
            $('.modal').css('overflow', 'auto');
          }).children().click(function(){
            $('.img-content').click(function(){
              $('.img-content').toggleClass('img-width');
            });
            return false;
          })
        }
      }
    }
  }

  $.fn.errorWarning = function(arr)
  {
    $.each(arr, function(val, key){

    })
  }
})(jQuery)
