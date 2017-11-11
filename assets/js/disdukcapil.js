(function($){
  $.fn.notifikasi = function(pesan, timeout)
  {
    if (timeout === undefined)
    {
      timeout = 2000;
    }
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
      $(this).show();
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
      $('.modal').fadeOut();
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
      backgroundClick : true,
      key : 27
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
        else if (setting.keyboardDetect)
        {
          $(document).on('keyup', function(e){
            var modal = $('.img-modal').css('display');
            if (modal == 'block');
            {
              if (e.keyCode == setting.key)
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

  $.fn.loadingMsg = function(mode, pesan, progress)
  {
    if (progress === undefined)
    {
      progress = null;
    }

    if (mode == 'show')
    {
      $(this).css('animation', '750ms loading-in forwards');
      $(this).show();
      $(this).children('.text').empty();
      $(this).children('.text').text(pesan);
      if (progress != null)
      {
        $(this).children('.progress').show();
        $(this).children('.progress').empty();
        $(this).children('.progress').text(progress + "%");
      }
    }
    else if (mode == 'hide')
    {
      $(this).css('animation', '750ms loading-out forwards');
    }
  }

  $.fn.pesanError = function(mode, error)
  {
    if (mode == "PHPDBERROR")
    {
      $('.errors').show();
      $.each(error, function(val, key){
        $('.errors').append('<p>' + key + '</p>');
      })
    }
    else if (mode == "PHPERROR")
    {
      $('.errors').show();
      $.each(error, function(val, key){
        $('.errors').append('<div class="error">' +
        '<p>Type : ' + key.type + '</p>' +
        '<p>Message : ' + key.message + '</p>' +
        '<p>File : ' + key.file + '</p>' +
        '<p>Line : ' + key.line + '</p>' +
        '<p>Code :' + key.code + '</p></div>'
      );
      })
    }
  }

  jQuery.fn.ForceNumericOnly = function()
  {
    return this.each(function()
    {
      $(this).keydown(function(e)
      {
        var key = e.charCode || e.keyCode || 0;
        // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
        // home, end, period, and numpad decimal
        return (
          key == 8 ||
          key == 9 ||
          key == 13 ||
          key == 46 ||
          key == 110 ||
          key == 190 ||
          (key >= 35 && key <= 40) ||
          (key >= 48 && key <= 57) ||
          (key >= 96 && key <= 105));
      });
    });
};
})(jQuery)
