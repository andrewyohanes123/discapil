var app = angular.module('capil', ['ngRoute']);
var baseUrl = window.location.origin + "/capil/pendaftaran.html";

app.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl : "form1.html"
  })
  .when('/halaman2', {
    templateUrl : "form2.html"
  })
  .when('/halaman3', {
    templateUrl : "form3.html"
  })
  .when('/halaman4', {
    templateUrl : "form4.html"
  })
  .when('/halaman5', {
    templateUrl : "form5.html"
  })
  .when('/halaman6', {
    templateUrl : "form6.html"
  })
  .when('/halaman7', {
    templateUrl : "form7.html"
  })
});

app.controller('form-title', function($scope, $location){

  $scope.next = function(halamanBerikut)
  {
    window.location.replace(baseUrl + "#!/"+ halamanBerikut);
  }

  $scope.submit = function()
  {
    var data = {};
  }
})


$(document).ready(function(){
  $('span.info').click(function(){
    $('#modal').css('display', 'block');
    $('body').css('overflow', 'hidden');
  })

  $('#cek_status').click(function(){
    window.location.replace('cek_status.html');
  });

  $('#upload_file').click(function(){
    window.location.replace('upload_file.html');
  });

  $('.btn-modal').click(function(){
    $('.modal-window').css('animation', 'modal-out 750ms forwards');
    $('body').css('overflow', 'auto');
    $('#modal').fadeOut();
    setTimeout(function(){
      $('.modal-window').css('animation', 'modal-in 750ms forwards');
    }, 500);
  });
  $(document).on('keydown', function(e){
    if ($('#modal').css('display') == 'block')
    {
      if (e.keyCode == 27)
      {
        $('.modal-window').css('animation', 'modal-out 750ms forwards');
        $('#modal').fadeOut();
        $('body').css('overflow', 'auto');
        setTimeout(function(){
          $('.modal-window').css('animation', 'modal-in 750ms forwards');
        }, 500);
      }
    }
  });

  $('.btn-collapse').click(function(){
    $('.menu li').not('.menu li:first-child').slideToggle();
  })
});
