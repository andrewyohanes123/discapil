var app = angular.module('capil', ['ngRoute']);
var baseUrl = window.location.origin + "/form_capil/pendaftaran.html";

app.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl : "form1.html",
    controller: "no_kk"
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

app.controller('no_kk', function($scope){
  var no_kk = {
    no_kk : 1234567890,
    nama_kk : "Kepala keluarga"
  }

  $('#no_kk').on('keyup', function(){
    var no = $(this).val()
    // console.log('ada');
    if (no == no_kk.no_kk)
    {
      console.log('sama');
      $scope.nama_kk = no_kk.nama_kk;
    }
  });

<<<<<<< HEAD
  // $('#btn').click(function(){
  //   if ($scope.nomor == '' || $scope.nomor == null)
  //   {
  //     $('.notifikasi-body').empty();
  //     $('.notifikasi').css('display', 'flex');
  //     $('.notifikasi-body').append('Nomor KK kosong!');
  //     setTimeout(function(){
  //       $('.notifikasi').fadeOut();
  //     },1500);
  //   }
  //   else
  //   {
  //     $('#btn').attr('ng-click', 'next("halaman2")');
  //   }
  // });
=======
  $('#btn').click(function(){
    if ($scope.nomor == '' || $scope.nomor == null)
    {
      $('.notifikasi-body').empty();
      $('.notifikasi').css('display', 'flex');
      $('.notifikasi-body').append('Nomor KK kosong!');
      setTimeout(function(){
        $('.notifikasi').fadeOut();
      },1500);
    }
    else
    {
      $('#btn').attr('ng-click', 'next("halaman2")');
    }
  });
>>>>>>> 19e4a859ad1d842933b67ef0c893328ac8c70489

  // console.log($scope.no_kk);
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

// app.factory('data-orang', function())

app.controller('form-title', function($scope, $location){

  $scope.next = function(halamanBerikut)
  {
    window.location.replace(baseUrl + "#!/"+ halamanBerikut);
  }

  var orang = [
    {
      nik : 123456789,
      nama : "Seseorang sadja"
    },
    {
      nik : 987654321,
      nama : "Orang begitu sadja"
    },
    {
      nik : 567891234,
      nama : "Begitu begitu"
    },
    {
      nik : 432156789,
      nama : "Seseorang begitu"
    },
    {
      nik : 987123456,
      nama : "Kepala keluarga"
    }
  ]

  // console.log($scope.no_kk);

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
  });

  $('.submenu li a').click(function(){
    $('.submenu li a').removeClass('submenu-active');
    $('.sidebar-menu li:first-child a').removeClass('active');
    $(this).addClass('submenu-active');
  })

  $('.sidebar-menu li:first-child a').not('.submenu li:first-child a').click(function(){
    $('.submenu li a').removeClass('submenu-active');
    $('.sidebar-menu li:first-child a').not('.submenu li:first-child a').addClass('active');
  })

  $('.sidebar-menu').children('li').children('a').click(function(){
    $(this).parent().children('.submenu').slideToggle();
    $(this).children('span').children('i').toggleClass('fa-angle-right');
    $(this).children('span').children('i').toggleClass('fa-angle-down');
    // return false;
  });

  $('.head').click(function(){
    $(this).children('span.collapse-icon').children('i.fa').toggleClass('icon-up');
    $(this).siblings('div.collapse-body').slideToggle();
  });

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
  });

  $(document).on('click', '#dlmManado',function(){
    $('#manado').show();
    $('#luar_manado').hide();
    $('.tab').removeClass('click');
    $(this).addClass('click');
  });

  $(document).on('click', '#luarManado',function(){
    $('#manado').hide();
    $('#luar_manado').show();
    $('.tab').removeClass('click');
    $(this).addClass('click');
  });

  $('.btn-collapse').click(function(){
    $('.menu li').not('.menu li:first-child').slideToggle();
  })
});
