var app = angular.module('capil', ['ngRoute']);
var baseUrl = window.location.origin + "/form_capil/pendaftaran.html";

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

app.controller('login', function($scope){
  var user = {
    username : "admin",
    password : "admin"
  }

  $scope.login = function(username, password)
  {
    if (username == user.username && password == user.password)
    {
      alert("Login berhasil");
    }
    else
    {
      alert('Login gagal...');
    }
  }
})

app.controller('form-title', function($scope, $location){

  $scope.next = function(halamanBerikut)
  {
    window.location.replace(baseUrl + "#!/"+ halamanBerikut);
  }
});

app.controller('home', function($scope){
  var data = [{
    title : "Pendaftaran",
    deskripsi : "Pendaftaran akte kelahiran"
  },
  {
    title : "Upload berkas",
    deskripsi : "Upload berkas yang diperlukan untuk melengkapi pendaftaran."
  },
  {
    title : "Cek Berkas",
    deskripsi : "Cek kelengkapan berkas yang di masukkan"
  },
  {
    title : "Cek status",
    deskripsi : "Cek status pendaftaran"
  }
  ];

  $scope.modal = function(title)
  {
    if (title == 'pendaftaran')
    {
      $scope.title = data[0].title;
      $scope.deskripsi = data[0].deskripsi;
    }
    else if (title == 'upload')
    {
      $scope.title = data[1].title;
      $scope.deskripsi = data[1].deskripsi;
    }
    else if (title == 'cek')
    {
      $scope.title = data[2].title;
      $scope.deskripsi = data[2].deskripsi;
    }
    else
    {
      $scope.title = data[3].title;
      $scope.deskripsi = data[3].deskripsi;
    }
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

  $('#daftar').click(function(){
    window.location.replace('pendaftaran.html');
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

  $('form').on('submit', function(e){
    return false;
  })

  $('.btn-collapse').click(function(){
    $('.menu li').not('.menu li:first-child').slideToggle();
  })
});
