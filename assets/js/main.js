var app = angular.module('capil', ['ngRoute', 'ngCookies', 'ngFileUpload']);
var dash = angular.module('dash', ['ngRoute', 'ngCookies']);
var baseUrl = window.location.origin + "/form_capil/pendaftaran.html";
if (window.location.origin == undefined)
{
  baseUrl = window.location.protocol + "//" + window.location.host + "/form_capil/pendaftaran.html";
}
else
{
  baseUrl = window.location.origin + "/form_capil/pendaftaran.html";
}

var backendUrl = window.location.origin + "/capil_dev/akte_lahir/api";

if (window.location.origin == undefined)
{
  backendUrl = window.location.protocol + "//" + window.location.host + "/capil_dev/akte_lahir/api";
}
else
{
  backendUrl = window.location.origin + "/capil_dev/akte_lahir/api";
}

var linkFile = window.location.origin + "/capil_dev/akte_lahir/assets/berkas/";
var img = "data:image/jpeg;base64,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"

dash.run(function($http){
  $http.defaults.headers.get = {'Sirius-Key' : '7f7d47f1ff6bf26a221b21ae3bde1074'};
  $http.defaults.headers.post = {'Sirius-Key' : '7f7d47f1ff6bf26a221b21ae3bde1074'};
});

app.run(function($http){
  $http.defaults.headers.get = {'Sirius-Key' : '7f7d47f1ff6bf26a221b21ae3bde1074'};
  $http.defaults.headers.post = {'Sirius-Key' : '7f7d47f1ff6bf26a221b21ae3bde1074'};
});
// Dashboard
dash.config(function($routeProvider){
  // $locationProvider.html5Mode(true);
  // $locationProvider.hashPrefix('');
  $routeProvider
  .when('/semua', {
    templateUrl : "dashboard/main.html",
    controller : "listPendaftaran"
  })
  .when('/dashboard', {
    templateUrl : "dashboard/dash.html",
    controller : "dash"
  })
  .when('/tidak_diverifikasi', {
    templateUrl : "dashboard/akte_verifikasi.html",
    controller : "blm_verif"
  })
  .when('/diverifikasi', {
    templateUrl : "dashboard/verifikasi.html",
    controller : "verif"
  })
  .when('/selesai', {
    templateUrl : "dashboard/selesai.html",
    controller : "selesai"
  })
  .when('/user', {
    templateUrl : "dashboard/user.html",
    controller : 'user'
  })
  .otherwise({
    redirectTo : "/dashboard"
  })
});

dash.controller('dash', function($scope, $http){
  $scope.getScore = function()
  {
    $http.get(backendUrl + "/ambil_jumlah_pendaftaran").then(function(resp){
      $scope.val = resp.data.data;
    });
  }
  $scope.getScore();
  $('.submenu li a').removeClass('submenu-active');
  $('#dashboard').addClass('active');
})

dash.controller('user', function($scope, $http){
  $scope.get = function(limit, offset, cari)
  {
    var cari = {
      nama : cari
    }
    $http({
      url : backendUrl + "/ambil_pengguna/" + limit + "/" + offset,
      method : "GET",
      params : cari
    }).then(function(resp){
      // console.log(resp.data.data.list);
      angular.forEach(resp.data.data.list, function(val){
        if (val.aktif == 1)
        {
          val.mode = "Aktif";
        }
        else
        {
          val.mode = "Terblokir"
        }
        $scope.pengguna = resp.data.data.list;
      })
      $scope.totalData = resp.data.data.total;
      $scope.totalHalaman = Math.ceil($scope.totalData/parseInt($scope.limit))
    });
  }

  $scope.cek_user = function()
  {
    $http.get(backendUrl + "/cek").then(function(resp){
      $scope.current_user = resp.data.data;
    });
  }

  $scope.cek_user();

  $('.sidebar-menu li a').removeClass('active');
  $('.sidebar-menu ul.submenu li a').removeClass('submenu-active');
  $('#user').addClass('submenu-active');

  $scope.blokir = "0";

  $scope.tambah_user = function(id, nama, username, aktif, mode, btn)
  {
    if (mode === undefined)
    {
      mode = 'Tambah user';
    }

    if (btn === undefined)
    {
      btn = 'next';
    }
    $scope.id = id;
    $scope.blokir = aktif + "";
    $scope.nama_lengkap = nama;
    $scope.username = username;
    $scope.mode = mode;
    $scope.btn = btn;
    $('.modal').modalPopup('show');
  }

  $scope.exec = function(mode)
  {
    if (mode === undefined)
    {
      mode = 'tambah';
    }

    if (mode == 'Tambah user')
    {
      var data = {
        username : $scope.username,
        nama : $scope.nama_lengkap,
        password : $scope.password,
        aktif : $scope.blokir
      }
      $http.post(backendUrl + "/tambah_pengguna", data).then(function(resp){
        if (resp.data.status)
        {
          $scope.nama_lengkap = '';
          $scope.password = '';
          $scope.username =  '';
          $scope.blokir = "1";
          $('#modal').modalPopup('hide');
          setTimeout(function(){
            $scope.get($scope.limit, $scope.offset);
            $('.notifikasi').notifikasi(resp.data.data);
          },500)
        }
      })
    }
    else if (mode == 'Hapus')
    {
      $http.get(backendUrl + "/hapus_pengguna/" + $scope.id).then(function(resp){
        if (resp.data.status)
        {
          $scope.nama_lengkap = '';
          $scope.password = '';
          $scope.username = '';
          $scope.blokir = "1";
          $('#modal').modalPopup('hide');
          setTimeout(function(){
            $scope.get($scope.limit, $scope.offset);
            $('.notifikasi').notifikasi(resp.data.data);
          },500)
        }
      })
    }
    else
    {
      if ($('#pass').val() == '' || $('#pass').val() == null)
      {
        var data = {
          id_pengguna : $scope.id,
          nama : $scope.nama_lengkap,
          username : $scope.username,
          password : '',
          aktif : $scope.blokir
        }

        $http.post(backendUrl + "/edit_pengguna", data).then(function(resp){
          if (resp.data.status)
          {
            $scope.nama_lengkap = '';
            $scope.password = '';
            $scope.username = '';
            $scope.blokir = "1";
            $('#modal').modalPopup('hide');
            setTimeout(function(){
              $scope.get($scope.limit, $scope.offset);
              $('.notifikasi').notifikasi(resp.data.data);
            },500)
          }
        })
      }
      else
      {
        var data = {
          id_pengguna : $scope.id,
          nama : $scope.nama_lengkap,
          username : $scope.username,
          password : $scope.password,
          aktif : $scope.blokir
        }

        $http.post(backendUrl + "/edit_pengguna", data).then(function(resp){
          if (resp.data.status)
          {
            $scope.nama_lengkap = '';
            $scope.password = '';
            $scope.username = '';
            $scope.blokir = "1";
            $('#modal').modalPopup('hide');
            setTimeout(function(){
              $scope.get($scope.limit, $scope.offset);
              $('.notifikasi').notifikasi(resp.data.data);
            },500)
          }
        });
      }
    }
  }

  $('#limit').change(function(){
    var ini = $(this).val();
    var cari = $('#nama').val();
    $scope.get(ini, $scope.offset, cari)
  });

  $('#nama').keyup(function(){
    var ini = $(this).val();
    $scope.get($('#limit').val(), $scope.offset, ini);
  });

  $scope.prev = function()
  {
    var order = $('#order').val();
    var sort = $('#sort').val();
    var tgl = $('#tgl').val();
    var tgl2 = $('#tgl2').val();
    var cari = $('#cari').val();
    var limit = $('#batas').val();
    if ($scope.currentpage <= 0)
    {
      $scope.currentpage = 1;
      var offset = ($scope.currentpage - 1) * (parseInt(limit));
      $scope.getDaftar(order, sort, tgl, tgl2, cari, limit, offset)
    }
    else
    {
      $scope.currentpage--;
      var offset = ($scope.currentpage - 1) * (parseInt($scope.limit));
      $scope.get($scope.limit, offset);
    }
  }

  $scope.pindahHalaman = function()
  {
    var order = $('#order').val();
    var sort = $('#sort').val();
    var tgl = $('#tgl').val();
    var tgl2 = $('#tgl2').val();
    var cari = $('#cari').val();
    var limit = $('#batas').val();
    if ($scope.currentpage == $scope.totalHalaman)
    {
      $scope.currentpage = $scope.totalHalaman;
      var offset = ($scope.currentpage - 1) * (parseInt($scope.limit));
      $scope.get($scope.limit, offset);
    }
    else
    {
      $scope.currentpage++;
      var offset = ($scope.currentpage - 1) * (parseInt($scope.limit));
      $scope.get($scope.limit, offset);
    }
  }

  $scope.limit = "5"
  $scope.currentpage = 1;
  $scope.offset = ($scope.currentpage - 1) * (parseInt($scope.limit));
  $scope.get($scope.limit, $scope.offset);
});

dash.controller('selesai', function($scope, $http){

  $('.sidebar-menu li a').removeClass('active');
  $('.sidebar-menu ul.submenu li a').removeClass('submenu-active');
  $('#selesai').addClass('submenu-active');

  $scope.batas = "5";
  $scope.sort = "asc";
  $scope.order = "no_kk"
  $scope.tgl = moment().startOf('month').format('YYYY-MM-DD');
  $scope.tgl2 = moment().endOf('month').format('YYYY-MM-DD');
  $scope.currentpage = 1;

  $('tr th').click(function(){
    var data = $(this).data('order');
    if (!data)
    {
      return false;
    }
    else
    {
      $scope.order= data;
      if ($scope.sort == "asc")
      {
        $scope.sort = "desc";
      }
      else
      {
        $scope.sort = "asc";
      }

      $scope.getDaftar();
    }
  });

  $scope.updateKeterangan = function(id)
  {
    var data = {
      id_bayi : id,
      approving_note : $scope.keterangan
    }
    $('.loading').loadingMsg('show', 'Mengirim');
    $http.post(backendUrl + "/update_approving_note", data).then(function(resp){
      var status = resp.data.status;
      var pesan = resp.data.data;
      $('.loading').loadingMsg('hide', 'Mengirim');
      $('.notifikasi').notifikasi(pesan, 3000);
    });
  }

  $scope.offset = ($scope.currentpage - 1) * (parseInt($scope.batas));

  $scope.getDaftar = function() {
    $('.loading').loadingMsg('show', 'Loading...');
    var data = {
      order_by : $scope.order,
      sort_type : $scope.sort,
      date_start : $scope.tgl,
      date_end : $scope.tgl2,
      no_kk : $scope.cari,
      approved : 1,
      selesai : 1
    }
    // var offset = (1 - 1) * (parseInt($scope.batas))
    $http({
      url : backendUrl + "/ambil_pendaftaran/" + $scope.batas + "/" + $scope.offset,
      params : data,
      method : "GET"
    }).then(function(resp){
      $('.loading').loadingMsg('hide', 'Loading...');
      moment.locale('id')
      angular.forEach(resp.data.data.list, function(val, key){
        val.tanggal_lahir = moment(val.tanggal_lahir).format('DD MMMM YYYY');
        val.tanggal_pendaftaran = moment(val.tanggal_pendaftaran).format('DD MMMM YYYY');
      })
      $scope.daftar = resp.data.data.list;
      $scope.totalData = resp.data.data.total;
      $scope.totalHalaman = Math.ceil($scope.totalData/parseInt($scope.batas))
    });
  }

  $scope.verifikasi = function(id)
  {
    var data = {
      id_bayi : id
    }
    $http.post(backendUrl + "/approve_pendaftaran", data).then(function(resp){
      $scope.getDaftar()
    });
  }

  $scope.prev = function()
  {
    if ($scope.currentpage <= 0)
    {
      $scope.currentpage = 1;
      var offset = ($scope.currentpage - 1) * (parseInt($scope.batas));
      $scope.getDaftar()
    }
    else
    {
      $scope.currentpage--;
      var offset = ($scope.currentpage - 1) * (parseInt($scope.batas));
      $scope.getDaftar()
    }
  }

  $scope.pindahHalaman = function()
  {
    if ($scope.currentpage == $scope.totalHalaman)
    {
      $scope.currentpage = $scope.totalHalaman;
      var offset = ($scope.currentpage - 1) * (parseInt($scope.batas));
      $scope.getDaftar()
    }
    else
    {
      $scope.currentpage++;
      var offset = ($scope.currentpage - 1) * (parseInt($scope.batas));
      $scope.getDaftar()
    }
  }

  // console.log($scope.totalData);

  $('#tgl').flatpickr({
    locale : "id"
  });

  $('#order').change(function(){
    var order = $('#order').val();
    $scope.order = order;
    $scope.offset = ($scope.currentpage - 1) * (parseInt($scope.batas));
    $scope.getDaftar();
  });

  $('#sort').change(function(){
    var sort = $('#sort').val();
    $scope.sort = sort;
    $scope.offset = ($scope.currentpage - 1) * (parseInt($scope.batas));
    $scope.getDaftar();
  });

  $('#tgl').change(function(){
    var tgl = $('#tgl').val();
    $scope.tgl = tgl;
    $scope.tgl2 = moment(tgl).endOf('month').format('YYYY-MM-DD');
    $(this).blur()
    $('#tgl2').flatpickr({
      locale : "id",
      minDate : $(this).val()
    });
    $('#tgl2').focus();
    $scope.getDaftar();
  });

  $('#tgl2').change(function(){
    var tgl2 = $('#tgl2').val();
    $scope.tgl2 = tgl2;
    $scope.offset = ($scope.currentpage - 1) * (parseInt($scope.batas));
    $scope.getDaftar();
  });

  $('#cari').keyup(function(){
    var order = $('#order').val();
    var sort = $('#sort').val();
    var tgl = $('#tgl').val();
    var tgl2 = $('#tgl2').val();
    var cari = $('#cari').val();
    var limit = $('#batas').val();
    $scope.currentpage = 1;
    $scope.offset = ($scope.currentpage - 1) * (parseInt($scope.batas));
    $scope.getDaftar();
  })

  $('#batas').change(function(){
    var limit = $(this).val();
    $scope.batas = limit;
    $scope.currentpage = 1;
    $scope.offset = ($scope.currentpage - 1) * (parseInt($scope.batas));
    $scope.getDaftar()
  });

  $('.head').on('click', function(){
    $(this).children('span.collapse-icon').children('i.fa').toggleClass('icon-up');
    $(this).siblings('div.collapse-body').slideToggle();
    $(this).siblings('div.containers').slideToggle();
  });

  $scope.detail = function(id_bayi) {
    moment.locale('id');
    $http.get(backendUrl + "/ambil_detail_pendaftaran/" + id_bayi).then(function(resp){
      $scope.id_bayi = id_bayi;
      var hasil = resp.data.data;

      if (hasil.nik == '' || hasil.nik == null || hasil.nik == "0")
      {
        $scope.keterangan_pendaftaran = "Pembuatan Kartu Keluarga & Akte Kelahiran";
      }
      else
      {
        $scope.keterangan_pendaftaran = "Pembuatan Akte Kelahiran"
      }

      $scope.nomor_kk = hasil.no_kk;
      $scope.nama_kepala_keluarga = hasil.nama_kepala_keluarga;
      $scope.nama_bayi = hasil.nama;
      $scope.berat = hasil.berat + " Kg";
      $scope.panjang = hasil.panjang + " Cm";
      $scope.waktu_lahir = hasil.waktu_lahir;
      $scope.penolong_kelahiran = hasil.penolong_kelahiran;
      $scope.tempat_dilahirkan = hasil.tempat_dilahirkan;
      $scope.tempat_kelahiran = hasil.tempat_kelahiran;
      $scope.jenis_kelamin = hasil.jenis_kelamin;
      $scope.jenis_kelahiran = hasil.jenis_kelahiran;
      $scope.kelahiran_ke = hasil.kelahiran_ke;
      $scope.tanggal_lahir = moment(hasil.tanggal_lahir).format('DD MMMM YYYY');
      $scope.nama_ibu = hasil.nama_ibu;
      $scope.nik_ibu = hasil.nik_ibu;
      $scope.nik_ayah = hasil.nik_ayah;
      $scope.nama_ayah = hasil.nama_ayah;
      $scope.pelapor = hasil.pelapor;
      $scope.saksi = hasil.saksi;
      $scope.data_keluarga = hasil;
      $scope.keterangan = hasil.approving_note;

      var berkas = resp.data.data;
      var status = resp.data.status;
      if (status)
      {
        if (berkas.berkas_akta_perkawinan == null)
        {
          $scope.akte_perkawinan = "Belum upload";
        }
        else
        {
          $scope.akte_perkawinan_link = linkFile + berkas.berkas_akta_perkawinan;
          $scope.akte_perkawinan = berkas.berkas_akta_perkawinan;
        }

        if (berkas.berkas_akte_kelahiran_ibu == null)
        {
          $scope.akte_kelahiran_ibu = "Belum upload";
        }
        else
        {
          $scope.akte_kelahiran_ibu = berkas.berkas_akte_kelahiran_ibu;
          $scope.akte_kelahiran_ibu_link = linkFile + berkas.berkas_akte_kelahiran_ibu;
        }

        if (berkas.berkas_berita_acara_kepolisian == null)
        {
          $scope.berita_acara = "Belum upload";
        }
        else
        {
          $scope.berita_acara = berkas.berkas_berita_acara_kepolisian;
          $scope.berita_acara_link = linkFile + berkas.berkas_berita_acara_kepolisian;
        }

        if (berkas.berkas_kk == null)
        {
          $scope.kk = "Belum upload";
        }
        else
        {
          $scope.kk = berkas.berkas_kk;
          $scope.kk_link = linkFile + berkas.berkas_kk;
        }

        if (berkas.berkas_ktp_ayah == null )
        {
          $scope.ktp_ayah = "Belum upload";
        }
        else
        {
          $scope.ktp_ayah_link = linkFile + berkas.berkas_ktp_ayah;
          $scope.ktp_ayah = berkas.berkas_ktp_ayah;
        }

        if (berkas.berkas_ktp_ibu == null )
        {
          $scope.ktp_ibu = "Belum upload";
        }
        else
        {
          $scope.ktp_ibu_link = linkFile + berkas.berkas_ktp_ayah;
          $scope.ktp_ibu =  berkas.berkas_ktp_ayah;
        }

        if (berkas.berkas_ktp_saksi1 == null)
        {
          $scope.ktp_saksi1 = "Belum upload";
        }
        else
        {
          $scope.ktp_saksi1 = berkas.berkas_ktp_saksi1;
          $scope.ktp_saksi1_link = linkFile + berkas.berkas_ktp_saksi1;
        }

        if (berkas.berkas_ktp_saksi2 == null)
        {
          $scope.ktp_saksi2 = "Belum upload";
        }
        else
        {
          $scope.ktp_saksi2_link = linkFile + berkas.berkas_ktp_saksi2;
          $scope.ktp_saksi2 = berkas.berkas_ktp_saksi2;
        }

        if (berkas.berkas_surat_ket_kelahiran == null)
        {
          $scope.surat_ket_kelahiran = "Belum upload";
        }
        else
        {
          $scope.surat_ket_kelahiran = berkas.berkas_surat_ket_kelahiran;
          $scope.surat_ket_kelahiran_link = linkFile + berkas.berkas_surat_ket_kelahiran;
        }

        if (berkas.berkas_surat_pernyataan_belum_catat_kawin_ibu == null)
        {
          $scope.surat_pernyataan_belum_nikah = "Belum upload";
        }
        else
        {
          $scope.surat_pernyataan_belum_nikah_link = linkFile + berkas.berkas_surat_pernyataan_belum_catat_kawin_ibu;
          $scope.surat_pernyataan_belum_nikah = berkas.berkas_surat_pernyataan_belum_catat_kawin_ibu;
        }
      }
    });

    $('.modal').modalPopup('show', {
      titleBackground : "#14569a",
      titleFontColor : "white",
      key : 27
    });

    $('a.ng-binding').click(function(){
      var src = $(this).attr('href');
      $('.img-modal').imgModal(src);
    });
  }

  $scope.getDaftar();
})

dash.controller('verif', function($scope, $http){

  $('.sidebar-menu li a').removeClass('active');
  $('.sidebar-menu ul.submenu li a').removeClass('submenu-active');
  $('#verif').addClass('submenu-active');

  $scope.batas = "5";
  $scope.sort = "asc";
  $scope.order = "no_kk"
  $scope.tgl = moment().startOf('month').format('YYYY-MM-DD');
  $scope.tgl2 = moment().endOf('month').format('YYYY-MM-DD');
  $scope.currentpage = 1;

  $('tr th').click(function(){
    var data = $(this).data('order');
    if (!data)
    {
      return false;
    }
    else
    {
      $scope.order= data;
      if ($scope.sort == "asc")
      {
        $scope.sort = "desc";
      }
      else
      {
        $scope.sort = "asc";
      }

      $scope.getDaftar();
    }
  });

  $scope.updateKeterangan = function(id)
  {
    var data = {
      id_bayi : id,
      approving_note : $scope.keterangan
    }
    $('.loading').loadingMsg('show', 'Mengirim');
    $http.post(backendUrl + "/update_approving_note", data).then(function(resp){
      var status = resp.data.status;
      var pesan = resp.data.data;
      $('.loading').loadingMsg('hide', 'Mengirim');
      $('.notifikasi').notifikasi(pesan, 3000);
    });
  }

  $scope.selesai = function(id)
  {
    $('.loading').loadingMsg('show', 'Memproses');
    $http.post(backendUrl + "/selesai_pendaftaran/" + id).then(function(resp){
      $('.loading').loadingMsg('hide', 'Memproses');
      var status = resp.data.status;
      if (status)
      {
        $scope.getDaftar();
      }
    })
  }

  $scope.offset = ($scope.currentpage - 1) * (parseInt($scope.batas));

  $scope.getDaftar = function() {
    $('.loading').loadingMsg('show', 'Loading...');
    var data = {
      order_by : $scope.order,
      sort_type : $scope.sort,
      date_start : $scope.tgl,
      date_end : $scope.tgl2,
      no_kk : $scope.cari,
      approved : 1,
      selesai : 0
    }
    // var offset = (1 - 1) * (parseInt($scope.batas))
    $http({
      url : backendUrl + "/ambil_pendaftaran/" + $scope.batas + "/" + $scope.offset,
      params : data,
      method : "GET"
    }).then(function(resp){
      $('.loading').loadingMsg('hide', 'Loading...');
      moment.locale('id')
      angular.forEach(resp.data.data.list, function(val, key){
        val.tanggal_lahir = moment(val.tanggal_lahir).format('DD MMMM YYYY');
        val.tanggal_pendaftaran = moment(val.tanggal_pendaftaran).format('DD MMMM YYYY');
      })
      $scope.daftar = resp.data.data.list;
      $scope.totalData = resp.data.data.total;
      $scope.totalHalaman = Math.ceil($scope.totalData/parseInt($scope.batas))
    });
  }

  $scope.verifikasi = function(id)
  {
    var data = {
      id_bayi : id
    }
    $http.post(backendUrl + "/approve_pendaftaran", data).then(function(resp){
      $scope.getDaftar()
    });
  }

  $scope.prev = function()
  {
    if ($scope.currentpage <= 0)
    {
      $scope.currentpage = 1;
      var offset = ($scope.currentpage - 1) * (parseInt($scope.batas));
      $scope.getDaftar()
    }
    else
    {
      $scope.currentpage--;
      var offset = ($scope.currentpage - 1) * (parseInt($scope.batas));
      $scope.getDaftar()
    }
  }

  $scope.pindahHalaman = function()
  {
    if ($scope.currentpage == $scope.totalHalaman)
    {
      $scope.currentpage = $scope.totalHalaman;
      var offset = ($scope.currentpage - 1) * (parseInt($scope.batas));
      $scope.getDaftar()
    }
    else
    {
      $scope.currentpage++;
      var offset = ($scope.currentpage - 1) * (parseInt($scope.batas));
      $scope.getDaftar()
    }
  }

  // console.log($scope.totalData);

  $('#tgl').flatpickr({
    locale : "id"
  });

  $('#order').change(function(){
    var order = $('#order').val();
    $scope.order = order;
    $scope.offset = ($scope.currentpage - 1) * (parseInt($scope.batas));
    $scope.getDaftar();
  });

  $('#sort').change(function(){
    var sort = $('#sort').val();
    $scope.sort = sort;
    $scope.offset = ($scope.currentpage - 1) * (parseInt($scope.batas));
    $scope.getDaftar();
  });

  $('#tgl').change(function(){
    var tgl = $('#tgl').val();
    $scope.tgl = tgl;
    $scope.tgl2 = moment().endOf('month').format('YYYY-MM-DD');
    $(this).blur();
    $('#tgl2').flatpickr({
      locale : "id",
      minDate : tgl
    });
    $('#tgl2').focus();
  });

  $('#tgl2').change(function(){
    var tgl2 = $('#tgl2').val();
    $scope.tgl2 = tgl2;
    $scope.offset = ($scope.currentpage - 1) * (parseInt($scope.batas));
    $scope.getDaftar();
  });

  $('#cari').keyup(function(){
    var cari = $('#cari').val();
    $scope.cari = cari;
    $scope.currentpage = 1;
    $scope.offset = ($scope.currentpage - 1) * (parseInt($scope.batas));
    $scope.getDaftar();
  })

  $('#batas').change(function(){
    var limit = $(this).val();
    $scope.batas = limit;
    $scope.currentpage = 1;
    $scope.offset = ($scope.currentpage - 1) * (parseInt($scope.batas));
    $scope.getDaftar()
  });

  $('.head').on('click', function(){
    $(this).children('span.collapse-icon').children('i.fa').toggleClass('icon-up');
    $(this).siblings('div.collapse-body').slideToggle();
    $(this).siblings('div.containers').slideToggle();
  });

  $scope.detail = function(id_bayi, verif) {
    moment.locale('id');
    $http.get(backendUrl + "/ambil_detail_pendaftaran/" + id_bayi).then(function(resp){
      $scope.id_bayi = id_bayi;
      var hasil = resp.data.data;

      if (hasil.nik == '' || hasil.nik == null || hasil.nik == "0")
      {
        $scope.keterangan_pendaftaran = "Pembuatan Kartu Keluarga & Akte Kelahiran";
      }
      else
      {
        $scope.keterangan_pendaftaran = "Pembuatan Akte Kelahiran"
      }

      $scope.nomor_kk = hasil.no_kk;
      $scope.verif = verif;
      $scope.nama_kepala_keluarga = hasil.nama_kepala_keluarga;
      $scope.nama_bayi = hasil.nama;
      $scope.berat = hasil.berat + " Kg";
      $scope.panjang = hasil.panjang + " Cm";
      $scope.waktu_lahir = hasil.waktu_lahir;
      $scope.penolong_kelahiran = hasil.penolong_kelahiran;
      $scope.tempat_dilahirkan = hasil.tempat_dilahirkan;
      $scope.tempat_kelahiran = hasil.tempat_kelahiran;
      $scope.jenis_kelamin = hasil.jenis_kelamin;
      $scope.jenis_kelahiran = hasil.jenis_kelahiran;
      $scope.kelahiran_ke = hasil.kelahiran_ke;
      $scope.tanggal_lahir = moment(hasil.tanggal_lahir).format('DD MMMM YYYY');
      $scope.nama_ibu = hasil.nama_ibu;
      $scope.nik_ibu = hasil.nik_ibu;
      $scope.nik_ayah = hasil.nik_ayah;
      $scope.nama_ayah = hasil.nama_ayah;
      $scope.pelapor = hasil.pelapor;
      $scope.saksi = hasil.saksi;
      $scope.data_keluarga = hasil;
      $scope.keterangan = hasil.approving_note;

      var berkas = resp.data.data;
      var status = resp.data.status;
      if (status)
      {
        if (berkas.berkas_akta_perkawinan == null)
        {
          $scope.akte_perkawinan = "Belum upload";
        }
        else
        {
          $scope.akte_perkawinan_link = linkFile + berkas.berkas_akta_perkawinan;
          $scope.akte_perkawinan = berkas.berkas_akta_perkawinan;
        }

        if (berkas.berkas_akte_kelahiran_ibu == null)
        {
          $scope.akte_kelahiran_ibu = "Belum upload";
        }
        else
        {
          $scope.akte_kelahiran_ibu = berkas.berkas_akte_kelahiran_ibu;
          $scope.akte_kelahiran_ibu_link = linkFile + berkas.berkas_akte_kelahiran_ibu;
        }

        if (berkas.berkas_berita_acara_kepolisian == null)
        {
          $scope.berita_acara = "Belum upload";
        }
        else
        {
          $scope.berita_acara = berkas.berkas_berita_acara_kepolisian;
          $scope.berita_acara_link = linkFile + berkas.berkas_berita_acara_kepolisian;
        }

        if (berkas.berkas_kk == null)
        {
          $scope.kk = "Belum upload";
        }
        else
        {
          $scope.kk = berkas.berkas_kk;
          $scope.kk_link = linkFile + berkas.berkas_kk;
        }

        if (berkas.berkas_ktp_ayah == null )
        {
          $scope.ktp_ayah = "Belum upload";
        }
        else
        {
          $scope.ktp_ayah_link = linkFile + berkas.berkas_ktp_ayah;
          $scope.ktp_ayah = berkas.berkas_ktp_ayah;
        }

        if (berkas.berkas_ktp_ibu == null )
        {
          $scope.ktp_ibu = "Belum upload";
        }
        else
        {
          $scope.ktp_ibu_link = linkFile + berkas.berkas_ktp_ayah;
          $scope.ktp_ibu =  berkas.berkas_ktp_ayah;
        }

        if (berkas.berkas_ktp_saksi1 == null)
        {
          $scope.ktp_saksi1 = "Belum upload";
        }
        else
        {
          $scope.ktp_saksi1 = berkas.berkas_ktp_saksi1;
          $scope.ktp_saksi1_link = linkFile + berkas.berkas_ktp_saksi1;
        }

        if (berkas.berkas_ktp_saksi2 == null)
        {
          $scope.ktp_saksi2 = "Belum upload";
        }
        else
        {
          $scope.ktp_saksi2_link = linkFile + berkas.berkas_ktp_saksi2;
          $scope.ktp_saksi2 = berkas.berkas_ktp_saksi2;
        }

        if (berkas.berkas_surat_ket_kelahiran == null)
        {
          $scope.surat_ket_kelahiran = "Belum upload";
        }
        else
        {
          $scope.surat_ket_kelahiran = berkas.berkas_surat_ket_kelahiran;
          $scope.surat_ket_kelahiran_link = linkFile + berkas.berkas_surat_ket_kelahiran;
        }

        if (berkas.berkas_surat_pernyataan_belum_catat_kawin_ibu == null)
        {
          $scope.surat_pernyataan_belum_nikah = "Belum upload";
        }
        else
        {
          $scope.surat_pernyataan_belum_nikah_link = linkFile + berkas.berkas_surat_pernyataan_belum_catat_kawin_ibu;
          $scope.surat_pernyataan_belum_nikah = berkas.berkas_surat_pernyataan_belum_catat_kawin_ibu;
        }
      }
    });

    $('.modal').modalPopup('show', {
      titleBackground : "#14569a",
      titleFontColor : "white",
      key : 27
    });

    $('a.ng-binding').click(function(){
      var src = $(this).attr('href');
      $('.img-modal').imgModal(src);
    });
  }

  $scope.getDaftar();
})

dash.controller('blm_verif', function($scope, $http){

  $('.sidebar-menu li a').removeClass('active');
  $('.sidebar-menu ul.submenu li a').removeClass('submenu-active');
  $('#blm_verif').addClass('submenu-active');

  $scope.batas = "5";
  $scope.sort = "asc";
  $scope.order = "no_kk"
  $scope.tgl = moment().startOf('month').format('YYYY-MM-DD');
  $scope.tgl2 = moment().endOf('month').format('YYYY-MM-DD');
  $scope.currentpage = 1;

  $('tr th').click(function(){
    var data = $(this).data('order');
    if (!data)
    {
      return false;
    }
    else if ($scope.totalData == 0)
    {
      return false;
    }
    else
    {
      $scope.order= data;
      if ($scope.sort == "asc")
      {
        $scope.sort = "desc";
      }
      else
      {
        $scope.sort = "asc";
      }

      $scope.getDaftar();
    }
  });

  $scope.updateKeterangan = function(id)
  {
    var data = {
      id_bayi : id,
      approving_note : $scope.keterangan
    }
    $('.loading').loadingMsg('show', 'Mengirim');
    $http.post(backendUrl + "/update_approving_note", data).then(function(resp){
      var status = resp.data.status;
      var pesan = resp.data.data;
      $('.loading').loadingMsg('hide', 'Mengirim');
      $('.notifikasi').notifikasi(pesan, 3000);
    });
  }

  $scope.offset = ($scope.currentpage - 1) * (parseInt($scope.batas));

  $scope.getDaftar = function() {
    $('.loading').loadingMsg('show', 'Loading...');
    var data = {
      order_by : $scope.order,
      sort_type : $scope.sort,
      date_start : $scope.tgl,
      date_end : $scope.tgl2,
      no_kk : $scope.cari,
      approved : 0
    }
    // var offset = (1 - 1) * (parseInt($scope.batas))
    $http({
      url : backendUrl + "/ambil_pendaftaran/" + $scope.batas + "/" + $scope.offset,
      params : data,
      method : "GET"
    }).then(function(resp){
      $('.loading').loadingMsg('hide', 'Loading...');
      moment.locale('id')
      angular.forEach(resp.data.data.list, function(val, key){
        val.tanggal_lahir = moment(val.tanggal_lahir).format('DD MMMM YYYY');
        val.tanggal_pendaftaran = moment(val.tanggal_pendaftaran).format('DD MMMM YYYY');
      })
      $scope.daftar = resp.data.data.list;
      $scope.totalData = resp.data.data.total;
      $scope.totalHalaman = Math.ceil($scope.totalData/parseInt($scope.batas))
    });
  }

  $scope.verifikasi = function(id)
  {
    var data = {
      id_bayi : id
    }
    $http.post(backendUrl + "/approve_pendaftaran", data).then(function(resp){
      $scope.getDaftar()
    });
  }

  $scope.prev = function()
  {
    if ($scope.currentpage <= 0)
    {
      $scope.currentpage = 1;
      $scope.offset = ($scope.currentpage - 1) * (parseInt($scope.batas));
      $scope.getDaftar()
    }
    else
    {
      $scope.currentpage--;
      $scope.offset = ($scope.currentpage - 1) * (parseInt($scope.batas));
      $scope.getDaftar()
    }
  }

  $scope.pindahHalaman = function()
  {
    if ($scope.currentpage == $scope.totalHalaman)
    {
      $scope.currentpage = $scope.totalHalaman;
      $scope.offset = ($scope.currentpage - 1) * (parseInt($scope.batas));
      $scope.getDaftar()
    }
    else
    {
      $scope.currentpage++;
      $scope.offset = ($scope.currentpage - 1) * (parseInt($scope.batas));
      $scope.getDaftar()
    }
  }

  $('a.ng-binding').click(function(){
    var url = $(this).attr('href');
    $('.img-modal').imgModal(url);
    return false;
  })

  // console.log($scope.totalData);

  $('#tgl').flatpickr({
    locale : "id"
  });

  $('#order').change(function(){
    var order = $('#order').val();
    $scope.order = order;
    $scope.offset = ($scope.currentpage - 1) * (parseInt($scope.batas));
    $scope.getDaftar();
  });

  $('#sort').change(function(){
    var sort = $('#sort').val();
    $scope.sort = sort;
    $scope.offset = ($scope.currentpage - 1) * (parseInt($scope.batas));
    $scope.getDaftar();
  });

  $('#tgl').change(function(){
    var tgl = $('#tgl').val();
    $scope.tgl = tgl;
    var tgl2 = $('#tgl2').val(moment().endOf('month').format('YYYY-MM-DD'));
    $('#tgl2').flatpickr({
      locale : "id",
      minDate : $(this).val()
    });
    $('#tgl2').focus();
  });

  $('#tgl2').change(function(){
    var tgl2 = $('#tgl2').val();
    $scope.tgl2 = tgl2;
    $scope.offset = ($scope.currentpage - 1) * (parseInt($scope.batas));
    $scope.getDaftar();
  });

  $('#cari').keyup(function(){
    var order = $('#order').val();
    var sort = $('#sort').val();
    var tgl = $('#tgl').val();
    var tgl2 = $('#tgl2').val();
    var cari = $('#cari').val();
    var limit = $('#batas').val();
    $scope.currentpage = 1;
    $scope.offset = ($scope.currentpage - 1) * (parseInt($scope.batas));
    $scope.getDaftar();
  })

  $('#batas').change(function(){
    var limit = $(this).val();
    $scope.batas = limit;
    $scope.currentpage = 1;
    $scope.offset = ($scope.currentpage - 1) * (parseInt($scope.batas));
    $scope.getDaftar()
  });

  $('.head').on('click', function(){
    $(this).children('span.collapse-icon').children('i.fa').toggleClass('icon-up');
    $(this).siblings('div.collapse-body').slideToggle();
    $(this).siblings('div.containers').slideToggle();
  });

  $scope.detail = function(id_bayi) {
    moment.locale('id');
    $http.get(backendUrl + "/ambil_detail_pendaftaran/" + id_bayi).then(function(resp){
      $scope.id_bayi = id_bayi;
      var hasil = resp.data.data;

      if (hasil.nik == '' || hasil.nik == null || hasil.nik == "0")
      {
        $scope.keterangan_pendaftaran = "Pembuatan Kartu Keluarga & Akte Kelahiran";
      }
      else
      {
        $scope.keterangan_pendaftaran = "Pembuatan Akte Kelahiran"
      }

      $scope.nomor_kk = hasil.no_kk;
      $scope.nama_kepala_keluarga = hasil.nama_kepala_keluarga;
      $scope.nama_bayi = hasil.nama;
      $scope.berat = hasil.berat + " Kg";
      $scope.panjang = hasil.panjang + " Cm";
      $scope.waktu_lahir = hasil.waktu_lahir;
      $scope.penolong_kelahiran = hasil.penolong_kelahiran;
      $scope.tempat_dilahirkan = hasil.tempat_dilahirkan;
      $scope.tempat_kelahiran = hasil.tempat_kelahiran;
      $scope.jenis_kelamin = hasil.jenis_kelamin;
      $scope.jenis_kelahiran = hasil.jenis_kelahiran;
      $scope.kelahiran_ke = hasil.kelahiran_ke;
      $scope.tanggal_lahir = moment(hasil.tanggal_lahir).format('DD MMMM YYYY');
      $scope.nama_ibu = hasil.nama_ibu;
      $scope.nik_ibu = hasil.nik_ibu;
      $scope.nik_ayah = hasil.nik_ayah;
      $scope.nama_ayah = hasil.nama_ayah;
      $scope.pelapor = hasil.pelapor;
      $scope.saksi = hasil.saksi;
      $scope.data_keluarga = hasil;
      $scope.keterangan = hasil.approving_note;

      var berkas = resp.data.data;
      var status = resp.data.status;
      if (status)
      {
        if (berkas.berkas_akta_perkawinan == null)
        {
          $scope.akte_perkawinan = "Belum upload";
        }
        else
        {
          $scope.akte_perkawinan_link = linkFile + berkas.berkas_akta_perkawinan;
          $scope.akte_perkawinan = berkas.berkas_akta_perkawinan;
        }

        if (berkas.berkas_akte_kelahiran_ibu == null)
        {
          $scope.akte_kelahiran_ibu = "Belum upload";
        }
        else
        {
          $scope.akte_kelahiran_ibu = berkas.berkas_akte_kelahiran_ibu;
          $scope.akte_kelahiran_ibu_link = linkFile + berkas.berkas_akte_kelahiran_ibu;
        }

        if (berkas.berkas_berita_acara_kepolisian == null)
        {
          $scope.berita_acara = "Belum upload";
        }
        else
        {
          $scope.berita_acara = berkas.berkas_berita_acara_kepolisian;
          $scope.berita_acara_link = linkFile + berkas.berkas_berita_acara_kepolisian;
        }

        if (berkas.berkas_kk == null)
        {
          $scope.kk = "Belum upload";
        }
        else
        {
          $scope.kk = berkas.berkas_kk;
          $scope.kk_link = linkFile + berkas.berkas_kk;
        }

        if (berkas.berkas_ktp_ayah == null )
        {
          $scope.ktp_ayah = "Belum upload";
        }
        else
        {
          $scope.ktp_ayah_link = linkFile + berkas.berkas_ktp_ayah;
          $scope.ktp_ayah = berkas.berkas_ktp_ayah;
        }

        if (berkas.berkas_ktp_ibu == null )
        {
          $scope.ktp_ibu = "Belum upload";
        }
        else
        {
          $scope.ktp_ibu_link = linkFile + berkas.berkas_ktp_ayah;
          $scope.ktp_ibu =  berkas.berkas_ktp_ayah;
        }

        if (berkas.berkas_ktp_saksi1 == null)
        {
          $scope.ktp_saksi1 = "Belum upload";
        }
        else
        {
          $scope.ktp_saksi1 = berkas.berkas_ktp_saksi1;
          $scope.ktp_saksi1_link = linkFile + berkas.berkas_ktp_saksi1;
        }

        if (berkas.berkas_ktp_saksi2 == null)
        {
          $scope.ktp_saksi2 = "Belum upload";
        }
        else
        {
          $scope.ktp_saksi2_link = linkFile + berkas.berkas_ktp_saksi2;
          $scope.ktp_saksi2 = berkas.berkas_ktp_saksi2;
        }

        if (berkas.berkas_surat_ket_kelahiran == null)
        {
          $scope.surat_ket_kelahiran = "Belum upload";
        }
        else
        {
          $scope.surat_ket_kelahiran = berkas.berkas_surat_ket_kelahiran;
          $scope.surat_ket_kelahiran_link = linkFile + berkas.berkas_surat_ket_kelahiran;
        }

        if (berkas.berkas_surat_pernyataan_belum_catat_kawin_ibu == null)
        {
          $scope.surat_pernyataan_belum_nikah = "Belum upload";
        }
        else
        {
          $scope.surat_pernyataan_belum_nikah_link = linkFile + berkas.berkas_surat_pernyataan_belum_catat_kawin_ibu;
          $scope.surat_pernyataan_belum_nikah = berkas.berkas_surat_pernyataan_belum_catat_kawin_ibu;
        }
      }
    });

    $('.modal').modalPopup('show', {
      titleBackground : "#14569a",
      titleFontColor : "white",
      key : 27
    });

    $('a.ng-binding').click(function(){
      var src = $(this).attr('href');
      $('.img-modal').imgModal(src);
    });
  }

  $scope.getDaftar();
})

dash.controller('listPendaftaran', function($scope, $http, data){

  $('.sidebar-menu li a').removeClass('active');
  $('.sidebar-menu ul.submenu li a').removeClass('submenu-active');
  $('#semua').addClass('submenu-active');

  $('#jam').DateTimePicker(data.datepickerSetting());

  $scope.batas = "5";
  $scope.sort = "desc";
  $scope.order = "tanggal_pendaftaran"
  $scope.tgl = moment().startOf('month').format('YYYY-MM-DD');
  $scope.tgl2 = moment().endOf('month').format('YYYY-MM-DD');
  $scope.currentpage = 1;
  $scope.offset = ($scope.currentpage - 1) * (parseInt($scope.batas));

  $(document).ready(function(){
    $('.head').on('click',function(){
      $(this).children('span.collapse-icon').children('i.fa').toggleClass('icon-up');
      $(this).siblings('div.collapse-body').slideToggle();
      $(this).siblings('div.containers').slideToggle();
    });
  });

  $scope.cekKK = function()
  {
    $http.get(backendUrl + '/ambil_keluarga/' + $scope.nomor_kk).then(function(resp){
      var val = resp.data.data.kepala_keluarga;
      if (val != null)
      {
        $scope.data.nama_kepala_keluarga = val.NAMA_LGKP;
      }
      else
      {
        $('.notifikasi').notifikasi('Nomor KK Tidak Valid');
      }
    })
  }

  $scope.cekIbu = function(nik)
  {
    // var nik = $(this).val();
    $http.get(backendUrl + "/ambil_penduduk/" + nik).then(function(resp){
      var val = resp.data.data;
      var status = resp.data.status;

      if (val.JENIS_KLMIN != "2")
      {
        $('.notifikasi').notifikasi('Pemilik NIK bukan perempuan');
      }
      else if (val != null)
      {
        $scope.data.nama_ibu = val.NAMA_LGKP;
      }
      else
      {
        $('#nik').addClass('input-error');
        $('.notifikasi').notifikasi('NIK tidak valid', 3000);
      }
    })
  }

  $scope.cekAyah = function(nik)
  {
    // var nik = $(this).val();
    $http.get(backendUrl + "/ambil_penduduk/" + nik).then(function(resp){
      var val = resp.data.data;
      var status = resp.data.status;
      if (val.JENIS_KLMIN != "1")
      {
        $('.notifikasi').notifikasi('Pemilik NIK bukan laki-laki')
      }
      else if (val != null)
      {
        $scope.data.nama_ayah = val.NAMA_LGKP;
      }
      else
      {
        $('#nik').addClass('input-error');
        $('.notifikasi').notifikasi('NIK tidak valid', 3000);
      }
    })
  }

  $scope.cekAnak = function(nik)
  {
    // var nik = $(this).val();
    $http.get(backendUrl + "/ambil_penduduk/" + nik).then(function(resp){
      var val = resp.data.data;
      var status = resp.data.status;
      if (val != null)
      {
        $scope.data.nama = val.NAMA_LGKP;
      }
      else
      {
        $('#nik').addClass('input-error');
        $('.notifikasi').notifikasi('NIK tidak valid', 3000);
      }
    })
  }

  $scope.getProvinsi = function()
  {
    $http.get(backendUrl + "/ambil_provinsi").then(function(resp){
      var provinsi = resp.data.data;
      $scope.list = provinsi;
    })
  }

  $scope.getKabKota = function(prov)
  {
    $http.get(backendUrl + "/ambil_kotakab/" + prov).then(function(resp){
      $scope.listkab = resp.data.data;
    });
  }

  $scope.updateKeterangan = function(id)
  {
    var data = {
      id_bayi : id,
      approving_note : $scope.keterangan
    }
    $('.loading').loadingMsg('show', 'Mengirim');
    $http.post(backendUrl + "/update_approving_note", data).then(function(resp){
      var status = resp.data.status;
      var pesan = resp.data.data;
      $('.loading').loadingMsg('hide', 'Mengirim');
      $('.notifikasi').notifikasi(pesan, 3000);
    });
  }

  $('#prov').change(function(){
    var prov = $(this).find(':selected').data('prov');
    $scope.getKabKota(prov);
  })

  $scope.getData = function(id)
  {
    $scope.getProvinsi();
    $http.get(backendUrl + "/ambil_detail_pendaftaran/" + id).then(function(resp){
      var hasil = resp.data.data;
      $scope.data = hasil;
      // $scope.getKabKota()
      $('#editModal').modalPopup('show', {
        titleBackground : "#303030",
        titleFontColor : "#ffffff",
        keyboardDetect : false,
        backgroundClick : false
      });

      $('#tanggal').flatpickr({
        locale : "id",
        maxDate : moment().add(1, 'days').format('YYYY-MM-DD')
      });

      // $('#jam').DateTimePicker(data.datepickerSetting());
      setTimeout(function(){
        var prov = $('#prov').find(':selected').data('prov');
        $scope.getKabKota(prov);
      },200);
    });
  }

  $scope.editData = function()
  {
    $http.post(backendUrl + "/edit_pendaftaran", $scope.data).then(function(resp){
      // console.log(resp.data);
      if (resp.data.status)
      {
        $('.notifikasi').notifikasi(resp.data.data, 3000);
        $('#editModal').modalPopup('hide');
      }
      else
      {
        $('.notifikasi').notifikasi(resp.data.data, 3000);
      }
    })
  }

  $scope.hapus = function(id_bayi)
  {
    $http.get(backendUrl + "/hapus_pendaftaran/" + id_bayi).then(function(resp){
      var status = resp.data.status;
      var data = resp.data.data;
      if (status)
      {
        $('.notifikasi').notifikasi(data, 3500);
        $scope.getDaftar();
      }
    })
  }

  $('tr th').click(function(){
    var data = $(this).data('order');
    $scope.order= data;
    if ($scope.sort == "asc")
    {
      $scope.sort = "desc";
    }
    else
    {
      $scope.sort = "asc";
    }

    $scope.getDaftar();
  });

  $scope.getDaftar = function() {
    $('.loading').loadingMsg('show', 'Loading...');
    var data = {
      order_by : $scope.order,
      sort_type : $scope.sort,
      date_start : $scope.tgl,
      date_end : $scope.tgl2,
      no_kk : $scope.cari
    }
    // var offset = (1 - 1) * (parseInt($scope.batas))
    $http({
      url : backendUrl + "/ambil_pendaftaran/" + $scope.batas + "/" + $scope.offset,
      params : data,
      method : "GET"
    }).then(function(resp){
      $('.loading').loadingMsg('hide', 'Loading...');
      moment.locale('id')
      angular.forEach(resp.data.data.list, function(val, key){
        val.tanggal_lahir = moment(val.tanggal_lahir).format('DD MMMM YYYY');
        val.tanggal_pendaftaran = moment(val.tanggal_pendaftaran).format('DD MMMM YYYY');
      })
      $scope.daftar = resp.data.data.list;
      $scope.totalData = resp.data.data.total;
      $scope.totalHalaman = Math.ceil($scope.totalData/parseInt($scope.batas))
    });
  }

  $scope.verifikasi = function(id)
  {
    var data = {
      id_bayi : id
    }
    $('.loading').loadingMsg('show', 'Memverifikasi');
    $http.post(backendUrl + "/approve_pendaftaran", data).then(function(resp){
      $('.loading').loadingMsg('hide', 'Memverifikasi');
      var status = resp.data.status;
      if (status)
      {
        $('.notifikasi').notifikasi('Verifikasi berhasil', 3500);
        setTimeout(function(){
          $scope.getDaftar();
        }, 1500);
      }
      else
      {
        $('.notifikasi').notifikasi('Verifikasi gagal! File yang diupload belum lengkap', 3500);
        setTimeout(function(){
          $scope.getDaftar();
        }, 1500);
      }
    });
  }

  $scope.prev = function()
  {
    if ($scope.currentpage <= 0)
    {
      $scope.currentpage = 1;
      $scope.offset = ($scope.currentpage - 1) * (parseInt($scope.batas));
      $scope.getDaftar()
    }
    else
    {
      $scope.currentpage--;
      $scope.offset = ($scope.currentpage - 1) * (parseInt($scope.batas));
      $scope.getDaftar()
    }
  }

  $scope.pindahHalaman = function()
  {
    if ($scope.currentpage == $scope.totalHalaman)
    {
      $scope.currentpage = $scope.totalHalaman;
      $scope.offset = ($scope.currentpage - 1) * (parseInt($scope.batas));
      $scope.getDaftar()
    }
    else
    {
      $scope.currentpage++;
      $scope.offset = ($scope.currentpage - 1) * (parseInt($scope.batas));
      $scope.getDaftar()
    }
  }

  // console.log($scope.totalData);

  $('#tgl').flatpickr({
    locale : "id"
  });

  $('#order').change(function(){
    var order = $('#order').val();
    $scope.order = order;
    $scope.offset = ($scope.currentpage - 1) * (parseInt($scope.batas));
    $scope.getDaftar();
  });

  $('#sort').change(function(){
    var sort = $('#sort').val();
    $scope.sort = sort;
    $scope.offset = ($scope.currentpage - 1) * (parseInt($scope.batas));
    $scope.getDaftar();
  });

  $('#tgl').change(function(){
    var tgl = $('#tgl').val();
    $scope.tgl = tgl;
    var tgl2 = $('#tgl2').val(moment().endOf('month').format('YYYY-MM-DD'));
    $('#tgl2').flatpickr({
      locale : "id",
      minDate : $(this).val()
    });
    $('#tgl2').focus();
  });

  $('#tgl2').change(function(){
    var tgl2 = $('#tgl2').val();
    $scope.tgl2 = tgl2;
    $scope.offset = ($scope.currentpage - 1) * (parseInt($scope.batas));
    $scope.getDaftar();
  });

  $('#tgl2').flatpickr({
    locale : "id"
  });

  $('#cari').keyup(function(){
    var order = $('#order').val();
    var sort = $('#sort').val();
    var tgl = $('#tgl').val();
    var tgl2 = $('#tgl2').val();
    var cari = $('#cari').val();
    var limit = $('#batas').val();
    $scope.currentpage = 1;
    $scope.offset = ($scope.currentpage - 1) * (parseInt($scope.batas));
    $scope.getDaftar();
  })

  $('#batas').change(function(){
    var limit = $(this).val();
    $scope.batas = limit;
    $scope.currentpage = 1;
    $scope.offset = ($scope.currentpage - 1) * (parseInt($scope.batas));
    $scope.getDaftar()
  });

  $scope.detail = function(id_bayi) {
    moment.locale('id');
    $http.get(backendUrl + "/ambil_detail_pendaftaran/" + id_bayi).then(function(resp){
      var hasil = resp.data.data;
      if (hasil.nik == '' || hasil.nik == null || hasil.nik == "0")
      {
        $scope.keterangan_pendaftaran = "Pembuatan Kartu Keluarga & Akte Kelahiran";
      }
      else
      {
        $scope.keterangan_pendaftaran = "Pembuatan Akte Kelahiran"
      }

      $scope.id_bayi = id_bayi;
      $scope.nomor_kk = hasil.no_kk;
      $scope.nama_kepala_keluarga = hasil.nama_kepala_keluarga;
      $scope.nama_bayi = hasil.nama;
      $scope.berat = hasil.berat + " Kg";
      $scope.panjang = hasil.panjang + " Cm";
      $scope.waktu_lahir = hasil.waktu_lahir;
      $scope.penolong_kelahiran = hasil.penolong_kelahiran;
      $scope.tempat_dilahirkan = hasil.tempat_dilahirkan;
      $scope.tempat_kelahiran = hasil.tempat_kelahiran;
      $scope.jenis_kelamin = hasil.jenis_kelamin;
      $scope.jenis_kelahiran = hasil.jenis_kelahiran;
      $scope.kelahiran_ke = hasil.kelahiran_ke;
      $scope.tanggal_lahir = moment(hasil.tanggal_lahir).format('DD MMMM YYYY');
      $scope.nama_ibu = hasil.nama_ibu;
      $scope.nik_ibu = hasil.nik_ibu;
      $scope.nik_ayah = hasil.nik_ayah;
      $scope.nama_ayah = hasil.nama_ayah;
      $scope.pelapor = hasil.pelapor;
      $scope.saksi = hasil.saksi;
      $scope.data_keluarga = hasil;
      $scope.keterangan = hasil.approving_note;

      var berkas = resp.data.data;
      var status = resp.data.status;
      if (status)
      {
        if (berkas.berkas_akta_perkawinan == null)
        {
          $scope.akte_perkawinan = "Belum upload";
        }
        else
        {
          $scope.akte_perkawinan_link = linkFile + berkas.berkas_akta_perkawinan;
          $scope.akte_perkawinan = berkas.berkas_akta_perkawinan;
        }

        if (berkas.berkas_akte_kelahiran_ibu == null)
        {
          $scope.akte_kelahiran_ibu = "Belum upload";
        }
        else
        {
          $scope.akte_kelahiran_ibu = berkas.berkas_akte_kelahiran_ibu;
          $scope.akte_kelahiran_ibu_link = linkFile + berkas.berkas_akte_kelahiran_ibu;
        }

        if (berkas.berkas_berita_acara_kepolisian == null)
        {
          $scope.berita_acara = "Belum upload";
        }
        else
        {
          $scope.berita_acara = berkas.berkas_berita_acara_kepolisian;
          $scope.berita_acara_link = linkFile + berkas.berkas_berita_acara_kepolisian;
        }

        if (berkas.berkas_kk == null)
        {
          $scope.kk = "Belum upload";
        }
        else
        {
          $scope.kk = berkas.berkas_kk;
          $scope.kk_link = linkFile + berkas.berkas_kk;
        }

        if (berkas.berkas_ktp_ayah == null )
        {
          $scope.ktp_ayah = "Belum upload";
        }
        else
        {
          $scope.ktp_ayah_link = linkFile + berkas.berkas_ktp_ayah;
          $scope.ktp_ayah = berkas.berkas_ktp_ayah;
        }

        if (berkas.berkas_ktp_ibu == null )
        {
          $scope.ktp_ibu = "Belum upload";
        }
        else
        {
          $scope.ktp_ibu_link = linkFile + berkas.berkas_ktp_ayah;
          $scope.ktp_ibu =  berkas.berkas_ktp_ayah;
        }

        if (berkas.berkas_ktp_saksi1 == null)
        {
          $scope.ktp_saksi1 = "Belum upload";
        }
        else
        {
          $scope.ktp_saksi1 = berkas.berkas_ktp_saksi1;
          $scope.ktp_saksi1_link = linkFile + berkas.berkas_ktp_saksi1;
        }

        if (berkas.berkas_ktp_saksi2 == null)
        {
          $scope.ktp_saksi2 = "Belum upload";
        }
        else
        {
          $scope.ktp_saksi2_link = linkFile + berkas.berkas_ktp_saksi2;
          $scope.ktp_saksi2 = berkas.berkas_ktp_saksi2;
        }

        if (berkas.berkas_surat_ket_kelahiran == null)
        {
          $scope.surat_ket_kelahiran = "Belum upload";
        }
        else
        {
          $scope.surat_ket_kelahiran = berkas.berkas_surat_ket_kelahiran;
          $scope.surat_ket_kelahiran_link = linkFile + berkas.berkas_surat_ket_kelahiran;
        }

        if (berkas.berkas_surat_pernyataan_belum_catat_kawin_ibu == null)
        {
          $scope.surat_pernyataan_belum_nikah = "Belum upload";
        }
        else
        {
          $scope.surat_pernyataan_belum_nikah_link = linkFile + berkas.berkas_surat_pernyataan_belum_catat_kawin_ibu;
          $scope.surat_pernyataan_belum_nikah = berkas.berkas_surat_pernyataan_belum_catat_kawin_ibu;
        }
      }
    });

    $('#modal').modalPopup('show', {
      titleBackground : "#14569a",
      titleFontColor : "white",
      key : 27
    });

    $('a.ng-binding').click(function(){
      var src = $(this).attr('href');
      $('.img-modal').imgModal(src);
    });
  }

  $scope.getDaftar();
});

dash.controller('verifikasi', function($scope, $http, $cookies){
  $('#tgl').val(moment().startOf('month').format("YYYY-MM-DD"));
  $('#tgl2').val(moment().endOf('month').format("YYYY-MM-DD"));

  $('#tgl').flatpickr({
    "locale" : "id"
  });

  var tgl = $('#tgl').val()
  $('#tgl2').flatpickr({
    "locale" : "id",
    minDate : tgl
  });

  $('#tgl').change(function(){
    var tgl = $('#tgl').val();

    $('#tgl2').flatpickr({
      "locale" : "id",
      minDate : tgl
    });
  });

});

dash.controller('username', function($scope, $http){
  $http.get(backendUrl + "/cek").then(function(resp){
    var user = resp.data.data;
    var status = resp.data.status;

    if (status == false)
    {
      window.location.replace('login.html');
    }
    else
    {
      $scope.username = user.username;
    }
  });

  $scope.logout = function()
  {
    $http.get(backendUrl + "/logout").then(function(){
      window.location.replace('login.html');
    });
  }
});

//
app.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl : "form1.html",
    controller: "no_kk"
  })
  .when('/halaman2', {
    templateUrl : "form2.html",
    controller : "bayi"
  })
  .when('/halaman3', {
    templateUrl : "form3.html",
    controller : "ibu"
  })
  .when('/halaman4', {
    templateUrl : "form4.html",
    controller : "ayah"
  })
  .when('/halaman5', {
    templateUrl : "form5.html",
    controller : "pelapor"
  })
  .when('/halaman6', {
    templateUrl : "form6.html",
    controller : "saksi1"
  })
  .when('/halaman7', {
    templateUrl : "form7.html",
    controller : "saksi2"
  })
  .when('/persetujuan', {
    templateUrl : "persetujuan.html",
    controller : "persetujuan"
  })
});

app.controller('cek_status', function($scope, $cookies, $http){
  $scope.cek = function()
  {
    $http.get(backendUrl + "/cek_status/" + $scope.nomor).then(function(resp){
      $scope.status = resp.data.status;
      if (!$scope.status)
      {
        $('.notifikasi').notifikasi(resp.data.message);
      }
      else
      {
        $scope.data = resp.data.data;
        if ($scope.data.approved == 1)
        {
          $scope.data.approved = "Terverifikasi";
        }
        else
        {
          $scope.data.approved = "Belum terverifikasi";
        }

        if ($scope.data.status == 1)
        {
          $scope.data.status = "Selesai";
        }
        else
        {
          $scope.data.status = "Belum selesai";
        }
      }
    })
  }

  $scope.pdf = function()
  {
    var doc = new jsPDF({
      orientaion : 'landscape',
      unit : 'in',
      format : [4, 4]
    });
    doc.setFontSize(9);
    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.text(2, 0.25, "Dinas Kependudukan dan Pencatatan Sipil", null, null, 'center');
    doc.setFontSize(8);
    doc.text(2, 0.40, "Pemerintah Kota Manado", null, null, 'center');
    doc.addImage(img, 0.19, 0.191, 0.2, 0.24);
    doc.setFontType("normal");
    doc.setFontSize(8)
    doc.text(0.2, 8/10, "Nomor KK");
    doc.text(0.2, 9.5/10, "Nama Kepala Keluarga");
    doc.text(0.2, 11/10, "Nama lengkap bayi");
    doc.text(0.2, 12.5/10, "Verifikasi");
    doc.text(0.2, 14/10, "Status");
    doc.text(0.2, 15.5/10, "Keterangan operator");
    //
    doc.text(1.8, 8/10, ":");
    doc.text(1.8, 9.5/10, ":");
    doc.text(1.8, 11/10, ":");
    doc.text(1.8, 12.5/10, ":");
    doc.text(1.8, 14/10, ":");
    doc.text(1.8, 15.5/10, ":");
    //
    doc.text(2, 8/10, $scope.data.no_kk);
    doc.text(2, 9.5/10, $scope.data.nama_kepala_keluarga);
    doc.text(2, 11/10, $scope.data.nama);
    doc.text(2, 12.5/10, $scope.data.approved);
    doc.text(2, 14/10, $scope.data.status);
    doc.text(2, 15.5/10, $scope.data.approving_note);
    //
    doc.setFontSize(8);
    doc.setFontType('courier');
    doc.text(0.2, 3, "Cek status di : http://");
    doc.text(0.2, 3.15, "Pendaftaran antrian di : http://");
    // doc.addImage(img,10, 10, 18, 20);
    // doc.setFontSize(20);
    // doc.setFont("helvetica");
    // doc.setFontType("bold");
    // doc.text(105, 15, "Dinas Kependudukan dan Pencatatan Sipil", null, null, 'center');
    // doc.setFontSize(16);
    // doc.text(105, 20, "Pemerintah Kota Manado", null, null, 'center');
    // doc.setFontSize(14);
    // doc.text(105, 30, "Pendaftaran Akte Kelahiran Online", null, null, 'center')
    // doc.setFontSize(10);
    // doc.setFontType("normal");
    // doc.fromHTML($('#data').get(0), 25, 40, {
    //   width : 250,
    //   elementHandlers : data
    // })
    // doc.setFontSize(10);
    // doc.setFontType('courier');
    // doc.text(10, 275, "Cek status berita di : http://");
    // doc.text(10, 280, "Pendaftaran antrian di : http://");
    doc.save(parseInt(Math.random() * 39) + $scope.data.no_kk + $scope.data.nama + '_cek_status.pdf');
  }
});

app.controller('upload', function($scope, data, $cookieStore, $http, Upload){
  $scope.cekNomor = function() {
    $http.get(backendUrl + "/ambil_berkas/" + $scope.nomor_pendaftaran).then(function(resp){
      var hasil = resp.data.data;
      var status = resp.data.status;
      if (status)
      {
        window.location.replace('list_file.html');
        $cookieStore.put('nomor_pendaftaran', $scope.nomor_pendaftaran);
      }
      else
      {
        var msg = resp.data.message;
        $('.notifikasi').notifikasi(msg, 5000);
      }
    });
  }

  $scope.upload = function(file, nama_field, file_el, button, progress)
  {
    var nomor = $cookieStore.get('nomor_pendaftaran')
    Upload.upload({
      url : backendUrl + "/upload_berkas",
      data : { no_antrian : nomor, file : file, nama_field_berkas : nama_field}
    }).then(function(resp){
      var status = resp.data.status;
      if (status)
      {
        $scope.getList();
      }
    }, null, function(evt){
      var persen = parseInt(100.0 * evt.loaded / evt.total);
      $('#' + progress).val(persen)
      $('#' + file_el).hide();
      $('#' + button).hide();
      if (persen == 100)
      {
        $('#' + file_el).show();
        $('#' + button).show();
        $('#' + progress).val(0)
      }
    })
  }

  $scope.onFileSelect = function(file)
  {
    if (!file) return;
    Upload.upload({
      url : backendUrl + "/upload_berkas",
      data : { file: file}
    }).then(function(resp){
      $scope.getList();
    })
  }

  $('a.ng-binding').click(function(){
    var src = $(this).attr('href');
    console.log(src);
    $('.img-modal').imgModal(src);
    return false;
  })

  $scope.getList = function()
  {
    var nomor = $cookieStore.get('nomor_pendaftaran');
    $http.get(backendUrl + "/ambil_berkas/" + nomor).then(function(resp){
      var berkas = resp.data.data;
      var status = resp.data.status;
      // console.log(nomor);
      if (status)
      {
        if (berkas.berkas_akta_perkawinan == null)
        {
          $scope.akte_perkawinan = "Belum upload";
        }
        else
        {
          $scope.akte_perkawinan_link = linkFile + berkas.berkas_akta_perkawinan;
          $scope.akte_perkawinan = berkas.berkas_akta_perkawinan;
        }

        if (berkas.berkas_akte_kelahiran_ibu == null)
        {
          $scope.akte_kelahiran_ibu = "Belum upload";
        }
        else
        {
          $scope.akte_kelahiran_ibu = berkas.berkas_akte_kelahiran_ibu;
          $scope.akte_kelahiran_ibu_link = linkFile + berkas.berkas_akte_kelahiran_ibu;
        }

        if (berkas.berkas_berita_acara_kepolisian == null)
        {
          $scope.berita_acara = "Belum upload";
        }
        else
        {
          $scope.berita_acara = berkas.berkas_berita_acara_kepolisian;
          $scope.berita_acara_link = linkFile + berkas.berkas_berita_acara_kepolisian;
        }

        if (berkas.berkas_kk == null)
        {
          $scope.kk = "Belum upload";
        }
        else
        {
          $scope.kk = berkas.berkas_kk;
          $scope.kk_link = linkFile + berkas.berkas_kk;
        }

        if (berkas.berkas_ktp_ayah == null )
        {
          $scope.ktp_ayah = "Belum upload";
        }
        else
        {
          $scope.ktp_ayah_link = linkFile + berkas.berkas_ktp_ayah;
          $scope.ktp_ayah = berkas.berkas_ktp_ayah;
        }

        if (berkas.berkas_ktp_ibu == null )
        {
          $scope.ktp_ibu = "Belum upload";
        }
        else
        {
          $scope.ktp_ibu_link = linkFile + berkas.berkas_ktp_ayah;
          $scope.ktp_ibu =  berkas.berkas_ktp_ayah;
        }

        if (berkas.berkas_ktp_saksi1 == null)
        {
          $scope.ktp_saksi1 = "Belum upload";
        }
        else
        {
          $scope.ktp_saksi1 = berkas.berkas_ktp_saksi1;
          $scope.ktp_saksi1_link = linkFile + berkas.berkas_ktp_saksi1;
        }

        if (berkas.berkas_ktp_saksi2 == null)
        {
          $scope.ktp_saksi2 = "Belum upload";
        }
        else
        {
          $scope.ktp_saksi2_link = linkFile + berkas.berkas_ktp_saksi2;
          $scope.ktp_saksi2 = berkas.berkas_ktp_saksi2;
        }

        if (berkas.berkas_surat_ket_kelahiran == null)
        {
          $scope.surat_ket_kelahiran = "Belum upload";
        }
        else
        {
          $scope.surat_ket_kelahiran = berkas.berkas_surat_ket_kelahiran;
          $scope.surat_ket_kelahiran_link = linkFile + berkas.berkas_surat_ket_kelahiran;
        }

        if (berkas.berkas_surat_pernyataan_belum_catat_kawin_ibu == null)
        {
          $scope.surat_pernyataan_belum_nikah = "Belum upload";
        }
        else
        {
          $scope.surat_pernyataan_belum_nikah_link = linkFile + berkas.berkas_surat_pernyataan_belum_catat_kawin_ibu;
          $scope.surat_pernyataan_belum_nikah = berkas.berkas_surat_pernyataan_belum_catat_kawin_ibu;
        }
      }
    })
  }

  $scope.getList();
});

app.controller('persetujuan', function($scope, data, $cookies, $http, Upload){
  var current = $cookies.getObject('pernyataan');
  var prevPage = $cookies.getObject('sk1');
  if (!prevPage)
  {
    window.location.replace('#!/halaman7')
  }

  $('.home-btn').click(function(){
    $cookies.remove('no_kk');
    $cookies.remove('bayi');
    $cookies.remove('ibu');
    $cookies.remove('ayah');
    $cookies.remove('plr');
    $cookies.remove('sk1');
    $cookies.remove('sk2');
    $cookies.remove('id_provinsi');
    $cookies.remove('pernyataan');
    // return false
  });

  $scope.pdf = function()
  {
    var doc = new jsPDF({
      orientaion : 'landscape',
      unit : 'in',
      format : [4, 4]
    });
    doc.setFontSize(9);
    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.text(2, 0.25, "Dinas Kependudukan dan Pencatatan Sipil", null, null, 'center');
    doc.setFontSize(8);
    doc.text(2, 0.40, "Pemerintah Kota Manado", null, null, 'center');
    doc.addImage(img, 0.19, 0.191, 0.2, 0.24);
    doc.setFontType("normal");
    doc.setFontSize(8)
    doc.text(0.2, 8/10, "Nomor Pendaftaran");
    doc.text(0.2, 9.5/10, "Nomor KK");
    doc.text(0.2, 11/10, "Nama kepala keluarga");
    doc.text(0.2, 12.5/10, "Nama Lengkap bayi");
    doc.text(0.2, 14/10, "Alamat");
    // doc.text(0.2, 15.5/10, "Keterangan operator");
    //
    doc.text(1.8, 8/10, ":");
    doc.text(1.8, 9.5/10, ":");
    doc.text(1.8, 11/10, ":");
    doc.text(1.8, 12.5/10, ":");
    doc.text(1.8, 14/10, ":");
    // doc.text(1.8, 15.5/10, ":");
    //
    doc.text(2, 8/10, $scope.nomor_daftar + "");
    doc.text(2, 9.5/10, $scope.data.no_kk);
    doc.text(2, 11/10, $scope.data.nama_kepala_keluarga);
    doc.text(2, 12.5/10, $scope.data.nama);
    doc.text(2, 14/10, $scope.data.p_alamat);
    // doc.text(2, 15.5/10, $scope.data.approving_note);
    //
    doc.setFontSize(8);
    doc.setFontType('courier');
    doc.text(0.2, 3, "Cek status di : http://");
    doc.text(0.2, 3.15, "Pendaftaran antrian di : http://");
    doc.save(parseInt(Math.random() * 39) + $scope.data.no_kk + $scope.data.nama + '_cek_status.pdf');
  }

  if (!current)
  {
    $scope.pernyataan = '';
    $scope.alamat = '';
    $scope.nomor_telp = '';
  }
  else
  {
    $scope.nomor_telp = current.p_no_telfon;
    $scope.alamat = current.p_alamat;
    $scope.pernyataan = current.p_pernyataan;
  }

  $('#nomor_telp').on('keyup', function(){
    var no_telp = $(this).val()
    if (no_telp == "" || no_telp == null)
    {
      $(this).removeClass('input-success');
      $(this).addClass('input-error');
    }
    else if (no_telp != '' || no_telp != null)
    {
      $(this).removeClass('input-error');
      $(this).addClass('input-success');
    }
  });
  $scope.setuju = false;

  $('#alamat').on('keyup', function(){
    var no_telp = $(this).val()
    if (no_telp == "" || no_telp == null)
    {
      $(this).removeClass('input-success');
      $(this).addClass('input-error');
    }
    else if (no_telp != '' || no_telp != null)
    {
      $(this).removeClass('input-error');
      $(this).addClass('input-success');
    }
  });

  $scope.upload = function(file, nama_field)
  {
    var nomor = $cookies.get('nomor_pendaftaran')
    Upload.upload({
      url : backendUrl + "/upload_berkas",
      data : { no_antrian : nomor, file : file, nama_field_berkas : nama_field}
    }).then(function(resp){
      var status = resp.data.status;
      if (status)
      {
        $scope.getList();
      }
    });
  }

  $('#nomor_telp').blur(function(){
    var data = {
      p_no_telfon : $scope.nomor_telp,
      p_alamat : $scope.alamat,
      p_pernyataan : $scope.pernyataan
    }

    $cookies.putObject('pernyataan', data);
  });

  $('#alamat').blur(function(){
    var data = {
      p_no_telfon : $scope.nomor_telp,
      p_alamat : $scope.alamat,
      p_pernyataan : $scope.pernyataan
    }

    $cookies.putObject('pernyataan', data);
  });

  $('#pernyataan').blur(function(){
    var data = {
      p_no_telfon : $scope.nomor_telp,
      p_alamat : $scope.alamat,
      p_pernyataan : $scope.pernyataan
    }

    $cookies.putObject('pernyataan', data);
  });

  $('a.ng-binding').click(function(){
    var src = $(this).attr('href');
    $('.img-modal').imgModal(src);
    return false;
  })

  $scope.getList = function()
  {
    var nomor = $cookies.get('nomor_pendaftaran');
    $http.get(backendUrl + "/ambil_berkas/" + nomor).then(function(resp){
      var berkas = resp.data.data;
      var status = resp.data.status;
      // console.log(nomor);
      if (status)
      {
        if (berkas.berkas_akta_perkawinan == null)
        {
          $scope.akte_perkawinan = "Belum upload";
        }
        else
        {
          $scope.akte_perkawinan_link = linkFile + berkas.berkas_akta_perkawinan;
          $scope.akte_perkawinan = berkas.berkas_akta_perkawinan;
        }

        if (berkas.berkas_akte_kelahiran_ibu == null)
        {
          $scope.akte_kelahiran_ibu = "Belum upload";
        }
        else
        {
          $scope.akte_kelahiran_ibu = berkas.berkas_akte_kelahiran_ibu;
          $scope.akte_kelahiran_ibu_link = linkFile + berkas.berkas_akte_kelahiran_ibu;
        }

        if (berkas.berkas_berita_acara_kepolisian == null)
        {
          $scope.berita_acara = "Belum upload";
        }
        else
        {
          $scope.berita_acara = berkas.berkas_berita_acara_kepolisian;
          $scope.berita_acara_link = linkFile + berkas.berkas_berita_acara_kepolisian;
        }

        if (berkas.berkas_kk == null)
        {
          $scope.kk = "Belum upload";
        }
        else
        {
          $scope.kk = berkas.berkas_kk;
          $scope.kk_link = linkFile + berkas.berkas_kk;
        }

        if (berkas.berkas_ktp_ayah == null )
        {
          $scope.ktp_ayah = "Belum upload";
        }
        else
        {
          $scope.ktp_ayah_link = linkFile + berkas.berkas_ktp_ayah;
          $scope.ktp_ayah = berkas.berkas_ktp_ayah;
        }

        if (berkas.berkas_ktp_ibu == null )
        {
          $scope.ktp_ibu = "Belum upload";
        }
        else
        {
          $scope.ktp_ibu_link = linkFile + berkas.berkas_ktp_ayah;
          $scope.ktp_ibu =  berkas.berkas_ktp_ayah;
        }

        if (berkas.berkas_ktp_saksi1 == null)
        {
          $scope.ktp_saksi1 = "Belum upload";
        }
        else
        {
          $scope.ktp_saksi1 = berkas.berkas_ktp_saksi1;
          $scope.ktp_saksi1_link = linkFile + berkas.berkas_ktp_saksi1;
        }

        if (berkas.berkas_ktp_saksi2 == null)
        {
          $scope.ktp_saksi2 = "Belum upload";
        }
        else
        {
          $scope.ktp_saksi2_link = linkFile + berkas.berkas_ktp_saksi2;
          $scope.ktp_saksi2 = berkas.berkas_ktp_saksi2;
        }

        if (berkas.berkas_surat_ket_kelahiran == null)
        {
          $scope.surat_ket_kelahiran = "Belum upload";
        }
        else
        {
          $scope.surat_ket_kelahiran = berkas.berkas_surat_ket_kelahiran;
          $scope.surat_ket_kelahiran_link = linkFile + berkas.berkas_surat_ket_kelahiran;
        }

        if (berkas.berkas_surat_pernyataan_belum_catat_kawin_ibu == null)
        {
          $scope.surat_pernyataan_belum_nikah = "Belum upload";
        }
        else
        {
          $scope.surat_pernyataan_belum_nikah_link = linkFile + berkas.surat_pernyataan_belum_nikah;
          $scope.surat_pernyataan_belum_nikah = berkas.surat_pernyataan_belum_nikah;
        }
      }
    })
  }

  $('.btn-next').click(function(){
    // if ()
    var no_telp = $('#nomor_telp').val();
    var alt = $('#alamat').val();
    var pernyataan = $('#pernyataan').val();

    $scope.pernyataan = '';
    var pernyataan = {
      p_no_telfon : $scope.nomor_telp,
      p_alamat : $scope.alamat,
      p_pernyataan : $scope.pernyataan
    }

    // var data1 = $cookies.getObject('no_kk');
    // var data2 = $cookies.getObject('bayi');
    // var data3 = $cookies.getObject('pernyataan');
    //
    // $scope.data = Object.assign(data1, data2, data3);

    var no_kk = $cookies.getObject('no_kk');
    var bayi = $cookies.getObject('bayi');
    var ibu = $cookies.getObject('ibu');
    var ayah = $cookies.getObject('ayah');
    var plr = $cookies.getObject('plr');
    var sk1 = $cookies.getObject('sk1');
    var sk2 = $cookies.getObject('sk2');
    if (!ayah)
    {
      var data = Object.assign(no_kk, bayi, ibu, plr, sk1, sk2, pernyataan);
    }
    else
    {
      var data = Object.assign(no_kk, bayi, ibu, ayah, plr, sk1, sk2, pernyataan);
    }
    $scope.data = data;
    var req = {
      method: "POST",
      url: backendUrl + "/simpan_data_awal",
      data: data
    }
    $http(req).then(function(resp){
      var nomor_daftar = resp.data.data;
      var status = resp.data.status;
      if (status == "PHPERROR")
      {
        var error = resp.data.errors;
        $('.errors').pesanError(status, error);
      }
      else if (status == "PHPDBERROR")
      {
        var error = resp.data.errors;
        $('.errors').pesanError(status, error);
      }
      else if (status)
      {
        $scope.nomor_daftar = nomor_daftar;
        $cookies.put('nomor_pendaftaran', nomor_daftar);
        $scope.getList();
        $('#modal').modalPopup('show', {
          keyboardDetect : false,
          backgroundClick : false
        });
        $scope.nomor_telp = '';
        $scope.alamat = '';
        $scope.pernyataan = '';

        $('#nomor_telp').removeClass('input-success');
        $('#nomor_telp').removeClass('input-error');
        $('#alamat').removeClass('input-success');
        $('#alamat').removeClass('input-error');
      }
      else
      {
        alert(resp.data.message);
      }
    });
  });
});

app.controller('saksi2', function($scope, data, $cookies, $http){

  $('#nik').on('keyup', function(){
    var val = $(this).val();
    if (val.length == 0)
    {
      $(this).removeClass('input-error');
      $(this).removeClass('input-success');
      $('#nama').val('');
      $('#nama').removeClass('input-success');
    }
  });

  var datas = $cookies.getObject('sk2');
  var prevPage = $cookies.getObject('sk1');
  if (!datas)
  {
    $scope.nama = '';
    $scope.nik = '';
  }
  else if (!prevPage)
  {
    window.location.replace('#!/halaman6')
  }
  else
  {
    if (datas.sk_org_manado2 == 0)
    {
      $('#luarManado').addClass('click');
      $('#dlmManado').removeClass('click');
      $('#manado').hide();
      $('#luar_manado').show();
      $scope.nik_luar = datas.sk_nik2;
      $scope.nama_lengkap = datas.sk_nama2;
      $scope.tglLahir = datas.sk_nama2;
      $('#tglLahir').val($scope.tglLahir);
      $scope.jen_kelamin = datas.sk_jenis_kelamin2;
      $scope.pekerjaan = datas.sk_pekerjaan2;
      $('#pekerjaan').val($scope.pekerjaan);
      $scope.alamat = datas.sk_alamat2;
      $('#alamat').val($scope.alamat);
    }
    else
    {
      $scope.nik = datas.sk_nik2;
      $scope.nama = datas.sk_nama2;
    }
  }

  $scope.jen_kelamin = "Laki-laki"

  $scope.back = function()
  {
    window.location.replace('#!/halaman4');
  }

  // var setting = data.datepickerSetting();
  $('#nik').on('blur', function(){
    var nik = $(this).val();
    $http.get(backendUrl + "/ambil_penduduk/" + nik).then(function(resp){
      var val = resp.data.data;
      var status = resp.data.status;
      if (val != null)
      {
        $('#nik').removeClass('input-error');
        $('#nik').addClass('input-success');
        $('#nama').addClass('input-success');
        $scope.nama = val.NAMA_LGKP;
        $('#nama').val($scope.nama);
      }
      else
      {
        $('#nik').addClass('input-error');
      }
    });
  });

  $scope.cek = function()
  {
    // var nik = $(this).val();
    $http.get(backendUrl + "/ambil_penduduk/" + $scope.nik).then(function(resp){
      var val = resp.data.data;
      var status = resp.data.status;
      if (val != null)
      {
        $('#nik').removeClass('input-error');
        $('#nik').addClass('input-success');
        $('#nama').addClass('input-success');
        $scope.nama = val.NAMA_LGKP;
      }
      else
      {
        $('#nik').addClass('input-error');
      }
    });
  }

  $('#nik').on('keyup', function(){
    var nik = $(this).val();

    if (nik == "" || nik == null)
    {
      $(this).removeClass('input-success');
      $(this).addClass('input-error');
      $('#nik_alert').show();
    }
    else if (nik != "" || nik != null )
    {
      $(this).removeClass('input-error');
      $(this).addClass('input-success');
      $('#nik_alert').hide();
    }
  });

  $('#nik_luar').on('keyup', function(){
    var ini = $(this).val();
    if (ini == '' || ini == null)
    {
      $(this).removeClass('input-success');
      $(this).addClass('input-error');
    }
    else if (ini != '' || nik != null)
    {
      $(this).removeClass('input-error');
      $(this).addClass('input-success');
    }
  });

  $('#nama_lengkap').on('keyup', function(){
    var ini = $(this).val();
    if (ini == '' || ini == null)
    {
      $(this).removeClass('input-success');
      $(this).addClass('input-error');
    }
    else if (ini != '' || nik != null)
    {
      $(this).removeClass('input-error');
      $(this).addClass('input-success');
    }
  });

  $('#alamat').on('keyup', function(){
    var ini = $(this).val();
    if (ini == '' || ini == null)
    {
      $(this).removeClass('input-success');
      $(this).addClass('input-error');
    }
    else if (ini != '' || nik != null)
    {
      $(this).removeClass('input-error');
      $(this).addClass('input-success');
    }
  });

  $('#tanggal').DateTimePicker();

  $('#tglLahir').on('keyup', function(){
    var ini = $(this).val();
    if (ini == '' || ini == null)
    {
      $(this).removeClass('input-success');
      $(this).addClass('input-error');
    }
    else if (ini != '' || nik != null)
    {
      $(this).removeClass('input-error');
      $(this).addClass('input-success');
    }
  });

  $('#pekerjaan').on('keyup', function(){
    var ini = $(this).val();
    if (ini == '' || ini == null)
    {
      $(this).removeClass('input-success');
      $(this).addClass('input-error');
    }
    else if (ini != '' || nik != null)
    {
      $(this).removeClass('input-error');
      $(this).addClass('input-success');
    }
  });

  $('.btn-next').click(function(){
    var tab = $('#manado').css('display');
    if (tab == 'block')
    {
      var nik = $("#nik").val();
      var nama = $('#nama').val();
      if (nik == "" || nik == null)
      {
        $('#nik').addClass('input-error');
        $('#nik_alert').show();
        $('#nik').focus();
      }
      else if (nama == '' || nama == null)
      {
        $('#nik').removeClass('input-success')
        $('#nik').addClass('input-error');
        $('.notifikasi').notifikasi('NIK tidak valid', 3500);
        $('#nik').focus();
      }
      else
      {
        var data = {
          sk_nik2 : $scope.nik,
          sk_nama2 : $scope.nama,
          sk_org_manado2 : 1
        }
        $cookies.putObject('sk2', data);
        window.location.replace('pendaftaran.html#!/persetujuan');
      }
    }
    else
    {
      var nik = $('#nik_luar').val();
      var nama = $('#nama_lengkap').val();
      var tanggal_lahir = $('#tglLahir').val();
      var jenis_kelamin = $('#jen_kelamin').val();
      var pekerjaan = $('#pekerjaan').val();
      var alamat = $('#alamat').val();

      if (nik == "" || nik == null)
      {
        $('#nik_luar').addClass('input-error');
        $('#nik_luar').focus();
        $('.notifikasi').notifikasi('Masukkan NIK', 3500);
      }
      else if (nama == "" || nama == null)
      {
        $('#nama_lengkap').addClass('input-error');
        $('#nama_lengkap').focus();
        $('.notifikasi').notifikasi('Masukkan nama lengkap', 3500);
      }
      else if (tanggal_lahir == '' || tanggal_lahir == null)
      {
        $('#tglLahir').addClass('input-error');
        $('#tglLahir').focus();
        $('.notifikasi').notifikasi('Pilih tanggal lahir', 3500);
      }
      else
      {
        var data = {
          sk_nik2 : $scope.nik_luar,
          sk_nama2 : $scope.nama_lengkap,
          sk_jenis_kelamin2 : $scope.jen_kelamin,
          sk_tanggal_lahir2 : $('#tglLahir').val(),
          sk_pekerjaan2 : $('#pekerjaan').val(),
          sk_alamat2 : $('#alamat').val(),
          sk_org_manado2 : 0
        }
        $cookies.putObject('sk2', data);
        window.location.replace('pendaftaran.html#!/persetujuan');
      }
    }
  });

  $('#tglLahir').flatpickr({
    locale : "id",
    maxDate : moment().format('YYYY-MM-DD')
  });
  // console.log(data.datepickerSetting());
  $('#tanggal').DateTimePicker();
});

app.controller('saksi1', function($scope, data, $cookies, $http){

  $('#nik').on('keyup', function(){
    var val = $(this).val();
    if (val.length == 0)
    {
      $(this).removeClass('input-error');
      $(this).removeClass('input-success');
      $('#nama').val('');
      $('#nama').removeClass('input-success');
    }
  });

  $('form').submit(function(e){
    e.preventDefault();
  });

  $('#tglLahir').flatpickr({
    locale : "id",
    maxDate : moment().format('YYYY-MM-DD')
  });

  var datas = $cookies.getObject('sk1');
  var prevPage = $cookies.getObject('plr');
  if (!datas)
  {
    $scope.nama = '';
    $scope.nik = '';
  }
  else if (!prevPage)
  {
    window.location.replace('#!/halaman5')
  }
  else
  {
    if (datas.sk_org_manado1 == 0)
    {
      $('#luarManado').addClass('click');
      $('#dlmManado').removeClass('click');
      $('#manado').hide();
      $('#luar_manado').show();
      $scope.nik_luar = datas.sk_nik1;
      $scope.nama_lengkap = datas.sk_nama1;
      $scope.tglLahir = datas.sk_nama1;
      $scope.jen_kelamin = datas.sk_jenis_kelamin1;
      $scope.pekerjaan = datas.sk_pekerjaan1;
      $scope.alamat = datas.sk_alamat1;
      $('#tglLahir').val($scope.tglLahir);
      $('#pekerjaan').val($scope.pekerjaan);
      $('#alamat').val($scope.alamat);
    }
    else
    {
      $scope.nik = datas.sk_nik1;
      $scope.nama = datas.sk_nama1;
    }
  }
  $('#nik').on('blur', function(){
    var nik = $(this).val();
    $http.get(backendUrl + "/ambil_penduduk/" + nik).then(function(resp){
      var val = resp.data.data;
      var status = resp.data.status;
      if (val != null)
      {
        $('#nik').removeClass('input-error');
        $('#nik').addClass('input-success');
        $('#nama').addClass('input-success');
        $scope.nama = val.NAMA_LGKP;
        $('#nama').val($scope.nama);
      }
      else
      {
        $('#nik').addClass('input-error');
      }
    });
  });

  $scope.cek = function()
  {
    var nik = $('#nik').val();
    $http.get(backendUrl + "/ambil_penduduk/" + nik).then(function(resp){
      var val = resp.data.data;
      var status = resp.data.status;
      if (val != null)
      {
        $('#nik').removeClass('input-error');
        $('#nik').addClass('input-success');
        $('#nama').addClass('input-success');
        $scope.nama = val.NAMA_LGKP;
      }
      else
      {
        $('#nik').addClass('input-error');
      }
    });
  }

  $('#nik').on('keyup', function(){
    var nik = $("#nik").val();
    if (nik == "" || nik == null)
    {
      $('#nik').removeClass('input-success');
      $('#nik').addClass('input-error');
      $('#nik_alert').show();
    }
    else if (nik != ''|| nik != null)
    {
      $(this).removeClass('input-error');
      $('#nik').addClass('input-success');
      $('#nik_alert').hide();
    }
  })

  $('.btn-next').click(function(){
    var tab = $('#manado').css('display');
    if (tab == 'block')
    {
      var nik = $("#nik").val();
      var nama = $('#nama').val();
      if (nik == "" || nik == null)
      {
        $('#nik').addClass('input-error');
        $('#nik_alert').show();
        $('#nik').focus();
      }
      else if (nama == '' || nama == null)
      {
        $('#nik').removeClass('input-success')
        $('#nik').addClass('input-error');
        $('.notifikasi').notifikasi('NIK tidak valid', 3500);
        $('#nik').focus();
      }
      else
      {
        var data = {
          sk_nik1 : $scope.nik,
          sk_nama1 : $scope.nama,
          sk_org_manado1 : 1
        }
        $cookies.putObject('sk1', data);
        window.location.replace('pendaftaran.html#!/halaman7');
      }
    }
    else
    {
      if ($scope.nik_luar == '')
      {
        $('notifikasi').notifikasi('Masukkan NIK', 3500);
      }
      else if ($scope.nama_lengkap == '')
      {
        $('.notifikasi').notifikasi('Masukkan nama lengkap', 3500);
      }
      else if ($scope.tglLahir == '')
      {
        $('.notifikasi').notifikasi('Masukkan tanggal lahir', 3500);
      }
      else if ($scope.alamat == '')
      {
        $('.notifikasi').notifikasi('Masukkan alamat lengkap', 3500);
      }
      else
      {
        var data = {
          sk_nik1 : $scope.nik_luar,
          sk_nama1 : $scope.nama_lengkap,
          sk_tanggal_lahir1 : $('#tglLahir').val(),
          sk_pekerjaan1 : $('#pekerjaan').val(),
          sk_jenis_kelamin1 : $scope.jen_kelamin,
          sk_alamat1 : $('#alamat').val(),
          sk_org_manado1 : 0
        }
        $cookies.putObject('sk1', data);
        window.location.replace('pendaftaran.html#!/halaman7');
      }
    }
  })
  $scope.jen_kelamin = 'Laki-laki'
});

app.controller('pelapor', function($scope,data, $cookies, $http){

  $('#nik').on('keyup', function(){
    var val = $(this).val();
    if (val.length == 0)
    {
      $('#nama').val("");
      $(this).removeClass('input-error');
      $(this).removeClass('input-success');
      $('#nama').removeClass('input-success');
    }
  });

  $('#tanggal_lahir').flatpickr({
    locale : "id",
    maxDate : moment().format('YYYY-MM-DD')
  });

  $('form').submit(function(e){
    e.preventDefault();
  })

  var datas = $cookies.getObject('plr');
  var prevPage = $cookies.getObject('ayah');
  if (!datas)
  {
    $scope.nama_pelapor = '';
    $scope.nik = '';
  }
  else
  {
    if (datas.plr_org_manado == 0)
    {
      $('#luarManado').addClass('click');
      $('#dlmManado').removeClass('click');
      $('#manado').hide();
      $('#luar_manado').show();
      $scope.nik_pelapor = datas.plr_nik;
      $scope.nama = datas.plr_nama;
      $scope.tanggal_lahir = datas.plr_tanggal_lahir;
      $scope.jen_kelamin = datas.plr_jenis_kelamin;
      $scope.pekerjaan = datas.plr_pekerjaan;
      $scope.alamat = datas.plr_alamat;
      $('#tanggal_lahir').val($scope.tanggal_lahir);
      $('#pekerjaan').val($scope.pekerjaan);
      $('#alamat').val($scope.alamat);
    }
    else
    {
      $scope.nik = datas.plr_nik;
      $scope.nama_pelapor = datas.plr_nama;
    }
  }

  $scope.back = function()
  {
    window.location.replace('#!/halaman4');
  }

  $scope.jen_kelamin = 'Laki-laki';
  $('#nik').on('blur', function(){
    var nik = $(this).val();
    $http.get(backendUrl + "/ambil_penduduk/" + nik).then(function(resp){
      var val = resp.data.data;
      var status = resp.data.status;
      if (val != null)
      {
        $('#nik').removeClass('input-error');
        $('#nik').addClass('input-success');
        $('#nama').addClass('input-success');
        $scope.nama_pelapor = val.NAMA_LGKP;
        $('#nama').val($scope.nama_pelapor);
      }
      else
      {
        $('#nik').addClass('input-error');
      }
    });
  });

  $scope.cek = function()
  {
    var nik = $('#nik').val();
    $http.get(backendUrl + "/ambil_penduduk/" + nik).then(function(resp){
      var val = resp.data.data;
      var status = resp.data.status;
      if (val != null)
      {
        $('#nik').removeClass('input-error');
        $('#nik').addClass('input-success');
        $('#nama').addClass('input-success');
        $scope.nama_pelapor = val.NAMA_LGKP;
      }
      else
      {
        $('#nik').addClass('input-error');
      }
    });
  }

  $('#nik_luar').on('keyup', function(){
    var isi = $(this).val()
    if (isi == '' || isi == null)
    {
      $('#nik_luar').removeClass('input-success')
      $('#nik_luar').addClass('input-error');
    }
    else if (isi != '' || isi != null)
    {
      $('#nik_luar').removeClass('input-error')
      $('#nik_luar').addClass('input-success');
    }
  })

  $('#nama_pelapor').on('keyup', function(){
    var isi = $(this).val()
    if (isi == '' || isi == null)
    {
      $(this).removeClass('input-success')
      $(this).addClass('input-error');
    }
    else if (isi != '' || isi != null)
    {
      $(this).removeClass('input-error')
      $(this).addClass('input-success');
    }
  });

  $('#tanggal_lahir').on('change', function(){
    var isi = $(this).val()
    if (isi == '' || isi == null)
    {
      $(this).removeClass('input-success')
      $(this).addClass('input-error');
    }
    else if (isi != '' || isi != null)
    {
      $(this).removeClass('input-error')
      $(this).addClass('input-success');
    }
  });

  $('#pekerjaan').on('keyup', function(){
    var isi = $(this).val()
    if (isi == '' || isi == null)
    {
      $(this).removeClass('input-success')
      $(this).addClass('input-error');
    }
    else if (isi != '' || isi != null)
    {
      $(this).removeClass('input-error')
      $(this).addClass('input-success');
    }
  });

  $('#alamat').on('keyup', function(){
    var isi = $(this).val()
    if (isi == '' || isi == null)
    {
      $(this).removeClass('input-success')
      $(this).addClass('input-error');
    }
    else if (isi != '' || isi != null)
    {
      $(this).removeClass('input-error')
      $(this).addClass('input-success');
    }
  });

  $('.btn-next').click(function(){
    var nik = $('#nik').val();
    var nama = $('#nama').val();
    var tab = $('#manado').css('display');
    // console.log(tab)
    if (tab == 'block')
    {
      if (nik == '' || nik == null)
       {
         $('.notifikasi').notifikasi('Masukkan NIK', 5000);
         $('#nik').addClass('input-error');
         $('#nik').focus();
       }
       else if (nama == '' || nama == null)
       {
         $('.notifikasi').notifikasi('NIK tidak valid', 5000);
         $('#nik').addClass('input-error');
         $('#nik').focus();
       }
       else
       {
         var data = {
           plr_nik : $scope.nik,
           plr_nama : $scope.nama_pelapor,
           plr_org_manado : 1
         }
         $cookies.putObject('plr', data);
         window.location.replace("pendaftaran.html#!/halaman6")
       }
    }
    else
    {
      var nik_luar = $('#nik_luar').val();
      var nama_pelapor = $('#nama_pelapor').val();
      var tanggal = $('#tanggal_lahir').val();
      var pekerjaan = $('#pekerjaan').val();
      var alamat = $('#alamat').val();

      if (nik_luar == '' || nik_luar == null)
      {
        $('.notifikasi').notifikasi('Masukkan NIK', 4500);
        $('#nik_luar').addClass('input-error');
        $('#nik_luar').focus();
      }
      else if (nama_pelapor == '' || nama_pelapor == null)
      {
        $('.notifikasi').notifikasi('Nama tidak boleh kosong', 4000);
        $('#nama_pelapor').addClass('input-error');
        $('#nama_pelapor').focus();
      }
      else if (pekerjaan == '' || pekerjaan == null)
      {
        $('.notifikasi').notifikasi('Masukkan pekerjaan', 3000);
        $('#pekerjaan').addClass('input-error');
      }
      else if (tanggal == '' || tanggal == null)
      {
        $('.notifikasi').notifikasi('Pilih tanggal lahir', 4500);
        $('#tanggal_lahir').addClass('input-error');
      }
      else if (alamat == '' || alamat == null)
      {
        $('.notifikasi').notifikasi('Masukkan alamat');
        $('#tanggal_lahir').addClass('input-error');
      }
      else
      {
        var data = {
          plr_nik : $scope.nik_pelapor,
          plr_nama : $scope.nama,
          plr_tanggal_lahir : $('#tanggal_lahir').val(),
          plr_pekerjaan : $('#pekerjaan').val(),
          plr_jenis_kelamin : $scope.jen_kelamin,
          plr_alamat : $('#alamat').val(),
          plr_org_manado : 0
        }
        $cookies.putObject('plr', data);
        window.location.replace("pendaftaran.html#!/halaman6");
      }
    }
  })
});

app.controller('ayah', function($scope, data, $cookies, $http){

  $('#nik').on('keyup', function(){
    var val = $(this).val();
    if (val.length == 0)
    {
      $(this).removeClass('input-error');
      $(this).removeClass('input-success');
      $('#nama_ayah').val('');
      $('#nama_ayah').removeClass('input-success');
    }
  });

  var datas = $cookies.getObject('ayah');
  if (!datas)
  {
    $scope.nama_ayah = '';
    $scope.nik = '';
  }
  else
  {
    $scope.nama_ayah = datas.nama_ayah;
    $scope.nik_ayah = datas.nik_ayah
  }
  $scope.orgManado = $cookies.getObject('ibu');
  if (!$scope.orgManado.ibu_org_manado)
  {
    $('#luarManado').hide();
  }
  // $('#nik').on('blur', function(){
  //   var nik = $(this).val();
  //   $http.get(backendUrl + '/ambil_penduduk/' + $scope.nik_ayah).then(function(resp){
  //     var val = resp.data.data;
  //     if (val.JENIS_KLMIN == '2')
  //     {
  //       $('.notifikasi-body').notifikasi('Pemilik NIK bukan laki-laki', 5000);
  //     }
  //     else if (val != null)
  //     {
  //       $('#nik').removeClass('input-error');
  //       $('#nik').addClass('input-success');
  //       $('#nama_ibu').addClass('input-success');
  //       $scope.nama_ayah = val.NAMA_LGKP;
  //     }
  //     else
  //     {
  //       $('#nik').addClass('input-error');
  //       $scope.nama_ayah = '';
  //     }
  //   });
  // });

  $scope.cek = function()
  {
    $http.get(backendUrl + '/ambil_penduduk/' + $scope.nik_ayah).then(function(resp){
      var val = resp.data.data;
      if (val.JENIS_KLMIN == '2')
      {
        $('.notifikasi').notifikasi('Pemilik NIK bukan laki-laki', 5000);
      }
      else if (val != null)
      {
        $('#nik').removeClass('input-error');
        $('#nik').addClass('input-success');
        $('#nama_ibu').addClass('input-success');
        $scope.nama_ayah = val.NAMA_LGKP;
      }
      else
      {
        $('#nik').addClass('input-error');
        $scope.nama_ayah = '';
      }
    });
  }

  $scope.lewati = function() {
    window.location.replace('pendaftaran.html#!/halaman5');
  }

  $('#nik_ayah').on('keyup', function(){
    var ini = $(this).val();
    if (ini.length < 1)
    {
      $(this).removeClass('input-success');
      $(this).addClass('input-error');
    }
    else if (ini.length > 1)
    {
      $(this).removeClass('input-error');
      $(this).addClass('input-success')
    }
  })

  $('#nama_lengkap').on('keyup', function(){
    var ini = $(this).val();
    if (ini.length < 1)
    {
      $(this).removeClass('input-success');
      $(this).addClass('input-error');
    }
    else if (ini.length > 1)
    {
      $(this).removeClass('input-error');
      $(this).addClass('input-success')
    }
  })

  $('.btn-next').click(function(){
    var nik = $('#nik').val();
    var nama = $('#nama_ayah').val();
    var tab = $('#manado').css('display');
    if (tab == 'block')
    {
      if (nik == '' || nik == null )
      {
        $('.notifikasi').notifikasi('Masukkan NIK', 5000);
        $('#nik').addClass('input-error');
        $('#nik').focus();
      }
      else if (nama == '' || nama == null)
      {
        $('#nik').addClass('input-error');
        $('#nik').focus();
        $('.notifikasi').notifikasi('NIK tidak valid', 5000);
      }
      else
      {
        var data = {
          nik_ayah : $scope.nik_ayah,
          nama_ayah : $scope.nama_ayah
        }
        $cookies.putObject('ayah', data);
        window.location.replace("pendaftaran.html#!/halaman5")
      }
    }
    else
    {
      var nik = $('#nik_ayah').val();
      var nama = $('#nama_lengkap').val();
      if (nik == '' || nik == null)
      {
        $('#nik_ayah').addClass('input-error');
        $('#nik_ayah').focus();
        $('.notifikasi').notifikasi('Masukkan NIK', 3000);
      }
      else if (nama == '' || nama == null)
      {
        $('#nama_lengkap').addClass('input-error');
        $('#nama_lengkap').focus();
        $('.notifikasi').notifikasi('Masukkan nama lengkap', 5000);
      }
      else
      {
        var data = {
          nik_ayah : $scope.nik_luar,
          nama_ayah : $scope.nama_lengkap
        }
        $cookies.putObject('ayah', data);
        window.location.replace("pendaftaran.html#!/halaman5")
      }
    }
  });
});

app.controller('ibu', function($scope, data, $cookies, $http){
  var datas = $cookies.getObject('ibu');
  var prevPage = $cookies.getObject('bayi');
  if (!datas)
  {
    $scope.nama_ibu = '';
    $scope.nik = '';
  }
  else if (!prevPage)
  {
    window.location.replace('#!/halaman2')
  }
  else
  {
    if (!datas.ibu_org_manado)
    {
      $('#manado').hide();
      $('#luar_manado').show();
      $('.tab').removeClass('click');
      $('#luarManado').addClass('click');
      $scope.nama_lengkap = datas.nama_ibu;
      $scope.nik_luar = datas.nik_ibu;
    }
    else
    {
      $scope.nama_ibu = datas.nama_ibu;
      $scope.nik = datas.nik_ibu
    }
  }

  $('#tanggal').DateTimePicker(data.datepickerSetting());
  $('#nik').on('blur', function(){
    var nik = $(this).val();
    var no_kk = $cookies.getObject('no_kk');
    $http.get(backendUrl + '/ambil_penduduk/' + nik).then(function(resp){
      var val = resp.data.data;
      var status = resp.data.status;
      if (status)
      {
        if (val.JENIS_KLMIN == '1')
        {
          $('.notifikasi').notifikasi('Pemilik NIK bukan perempuan', 3000);
        }
        else if (val != null)
        {
          $('#nik').removeClass('input-error');
          $('#nik').addClass('input-success');
          $('#nama_ibu').addClass('input-success');
          $scope.nama_ibu = val.NAMA_LGKP;
        }
        else
        {
          $('#nik').addClass('input-error');
          $('#nama_ibu').empty();
        }
      }
    });
  });

  $('#nik').on('keyup', function(){
    var val = $(this).val();
    if (val.length == 0)
    {
      $(this).removeClass('input-error');
      $(this).removeClass('input-success');
      $('#nama_ibu').val('');
      $('#nama_ibu').removeClass('input-success');
    }
  });

  $scope.cek = function()
  {
    // var nik = $(this).val();
    $http.get(backendUrl + '/ambil_penduduk/' + $scope.nik).then(function(resp){
      var val = resp.data.data;
      var status = resp.data.status;
      if (status)
      {
        if (val.JENIS_KLMIN == '1')
        {
          $('.notifikasi').notifikasi('Pemilik NIK bukan perempuan', 3000);
        }
        else if (val != null)
        {
          $('#nik').removeClass('input-error');
          $('#nik').addClass('input-success');
          $('#nama_ibu').addClass('input-success');
          $scope.nama_ibu = val.NAMA_LGKP;
        }
        else
        {
          $('#nik').addClass('input-error');
          $scope.nama_ibu = '';
        }
      }
    });
  }

  $('#nik_luar').on('keyup', function(){
    var ini = $(this).val();
    if (ini == '' || ini == null)
    {
      $(this).removeClass('input-success');
      $(this).addClass('input-error');
    }
    else
    {
      $(this).removeClass('input-error');
      $(this).addClass('input-success');
    }
  });

  $('#nama_lengkap').on('keyup', function(){
    var ini = $(this).val();
    if (ini == '' || ini == null)
    {
      $(this).removeClass('input-success');
      $(this).addClass('input-error');
    }
    else
    {
      $(this).removeClass('input-error');
      $(this).addClass('input-success');
    }
  });

  $('.btn-next').click(function(){
    var nik = $('#nik').val();
    var nama = $('#nama_ibu').val();
    var tab = $('#manado').css('display');
    if (tab == 'block')
    {
      if (nik == '' || nik == null && nama != '')
      {
        var data = {
          nik_ibu : '',
          nama_ibu : $scope.nama_ibu,
          ibu_org_manado : 1
        }
        $cookies.putObject('ibu', data);
        window.location.replace("pendaftaran.html#!/halaman4");
      }
      else if (nik == '' || nik == null && nama == '' || nama == null)
      {
        $('#nik').addClass('input-error');
        $('.notifikasi').notifikasi('Masukkan NIK!', 3000);
      }
      else if (nama == '' || nama == null && nik != '')
      {
        $('#nama_ibu').addClass('input-error');
        $('#nik').focus();
        $('.notifikasi').notifikasi('NIK tidak valid', 3000);
      }
      else
      {
        var data = {
          nik_ibu : $scope.nik,
          nama_ibu : $scope.nama_ibu,
          ibu_org_manado : 1
        }
        $cookies.putObject('ibu', data);
        window.location.replace("pendaftaran.html#!/halaman4");
      }
    }
    else
    {
      var nik = $('#nik_luar').val();
      var nama = $('#nama_lengkap').val();
      if (nik == '' || nik == null)
      {
        $('#nik_luar').addClass('input-error');
        $('#nik_luar').focus();
        $('.notifikasi').notifikasi('Masukkan NIK');
      }
      else if (nama == '' || nama == null)
      {
        $('#nama_lengkap').addClass('input-error');
        $('#nama_lengkap').focus();
        $('.notifikasi').notifikasi('Masukkan nama lengkap',3000);
      }
      else
      {
        var data = {
          nik_ibu : $scope.nik_luar,
          nama_ibu : $scope.nama_lengkap,
          ibu_org_manado : 0
        }
        $cookies.putObject('ibu', data);
        window.location.replace("pendaftaran.html#!/halaman4");
      }
    }
  })

});

app.controller('no_kk', function($scope, data, $cookies, $http){
  var datas = $cookies.getObject('no_kk');
  if (!datas)
  {
    $scope.nomor_kk = null;
    $scope.nama_kk = '';
  }
  else
  {
    $scope.nomor_kk = parseInt(datas.no_kk);
    $scope.nama_kk = datas.nama_kepala_keluarga;
  }
  // var orang = data.getOrang();
  $('#no_kk').on('blur', function(){
    $http.get(backendUrl + '/ambil_keluarga/' + $scope.nomor_kk).then(function(resp){
      var val = resp.data.data.kepala_keluarga;
      if (val != null)
      {
        $scope.nama_kk = val.NAMA_LGKP;
        $('#no_kk').removeClass('input-error');
        $('#no_kk').addClass('input-success');
        $('#nama_kk').addClass('input-success');
      }
      else
      {
        $('#no_kk').addClass('input-error');
      }
    })
  })

  $scope.cek = function()
  {
    $http.get(backendUrl + '/ambil_keluarga/' + $scope.nomor_kk).then(function(resp){
      var val = resp.data.data.kepala_keluarga;
      if (val != null)
      {
        $scope.nama_kk = val.NAMA_LGKP;
        $('#no_kk').removeClass('input-error');
        $('#no_kk').addClass('input-success');
        $('#nama_kk').addClass('input-success');
      }
      else
      {
        $('#no_kk').addClass('input-error');
      }
    })
  }

  $('#btn').click(function(){
    var nomor = $('#no_kk').val();
    var nama = $('#nama_kk').val();
    if (nomor == '' || nomor == null)
    {
      $('.notifikasi').notifikasi('Masukkan nomor Kartu Keluarga', 3000);
    }
    else if (nama == '' || nama == '')
    {
      $('.notifikasi').notifikasi('Nomor Kartu Keluarga tidak valid', 3000);
    }
    else
    {
      var data = {
        no_kk : nomor,
        nama_kepala_keluarga : $scope.nama_kk
      }
      $cookies.putObject('no_kk', data);
      window.location.replace(baseUrl + '#!/halaman2')
    }
  });
});

app.controller('bayi', function($scope, data, $cookies, $http){
  $scope.tempat = 'RS/RB';
  $scope.jen_kelahiran = "Tunggal";
  $scope.kelahiran_ke = "Pertama";
  $scope.penolong_kelahiran = "Dokter";
  $scope.pukul = "00:00";
  $scope.berat = 0;
  $scope.panjang = 0;

  // nama : $scope.nama,
  // jenis_kelamin : $scope.jen_kel,
  // tempat_dilahirkan : $scope.tempat,
  // tempat_kelahiran : $scope.tempatkel,
  // tanggal_lahir : $scope.tglLahir,
  // jenis_kelahiran : $scope.jen_kelahiran,
  // kelahiran_ke : $scope.kelahiran_ke,
  // penolong_kelahiran : $scope.penolong_kelahiran,
  // berat : $scope.berat_bayi,
  // panjang : $scope.panjang_bayi,
  // waktu_lahir : $scope.jam
  $scope.tempatkel = '';

  $scope.getProvinsi = function()
  {
    $http.get(backendUrl + "/ambil_provinsi").then(function(resp){
      var provinsi = resp.data.data;
      $scope.list = provinsi;
    })
  }

  $scope.jen_kel = 'Laki-laki';

  $('#tempat').change(function(){
    if ($(this).val() == 'Lainnya')
    {
      $('#tempat_lain').attr('type', 'text');
    }
    else
    {
      $('#tempat_lain').attr('type', 'hidden');
    }
  });

  $('#jenis_kelahiran').change(function(){
    if ($(this).val() == 'Lainnya')
    {
      $('#jen_kelahiran').attr('type', 'text');
    }
    else
    {
      $('#jen_kelahiran').attr('type', 'hidden');
    }
  });

  $('#kelahiran_ke').change(function(){
    if ($(this).val() == 'Lainnya')
    {
      $('#kel_ke').attr('type', 'text');
    }
    else
    {
      $('#kel_ke').attr('type', 'hidden');
    }
  });

  $('#penolong_kelahiran').change(function(){
    if ($(this).val() == 'Lainnya')
    {
      $('#penolong_kelahiran_input').attr('type', 'text');
    }
    else
    {
      $('#penolong_kelahiran_input').attr('type', 'hidden');
    }
  });

  $scope.cek = function(nik)
  {
    $('.loading').loadingMsg('show', 'Loading');
    $http.get(backendUrl + "/ambil_penduduk/" + nik).then(function(resp){
      var data = resp.data.data;
      var status = resp.data.status;

      if (prevPage.no_kk != data.NO_KK)
      {
        $('.loading').loadingMsg('hide', 'Loading');
        $('.notifikasi').notifikasi('NIK tidak ada dalam KK yang disertakan');
      }
      else if (status)
      {
        $('.loading').loadingMsg('hide', 'Loading');
        $scope.nama = data.NAMA_LGKP;
        if (data.JENIS_KLMIN == '1')
        {
          $scope.jen_kel = 'Laki-laki';
        }
        else
        {
          $scope.jen_kel = 'Perempuan';
        }
        date = Date(data.TGL_LHR);
        console.log(date);
        $scope.tglLahir = moment(date).format("YYYY-MM-DD");
      }
      else
      {
        $('.loading').loadingMsg('hide', 'Loading');
        $('.notifikasi').notifikasi('NIK Tidak valid');
      }
    });
  }

  $('#prov').change(function(e){
    var prov = $(this).find(':selected').data('prov');
    $scope.getKabKota(prov);
    $cookies.put('id_provinsi', prov);
  });

  $scope.getProvinsi();

  $scope.getKabKota = function(prov)
  {
    $http.get(backendUrl + "/ambil_kotakab/" + prov).then(function(resp){
      $scope.listkab = resp.data.data;
    });
  }

  var datas = $cookies.getObject('bayi');
  var prevPage = $cookies.getObject('no_kk');
  if (!datas)
  {
    $scope.nama = '';
    $scope.provinsi = '';
    $scope.kabupatenkota = '';
  }
  else if (!prevPage)
  {
    window.location.replace('#!/halaman2')
  }
  else
  {
    $scope.nik_bayi = datas.nik;
    $scope.nama = datas.nama;
    $scope.jen_kel = datas.jenis_kelamin;
    $scope.tempat = datas.tempat_dilahirkan;
    $scope.tempatkel = datas.tempat_kelahiran;
    $scope.tglLahir = datas.tanggal_lahir;
    $scope.provinsi = datas.prov_kelahiran;
    var prov = $cookies.get('id_provinsi');
    $scope.getKabKota(prov);
    $scope.kabupatenkota = datas.kotakab_kelahiran;
    $scope.jen_kelahiran = datas.jenis_kelahiran;
    $scope.penolong_kelahiran = datas.penolong_kelahiran;
    $scope.berat = datas.berat;
    $scope.panjang = datas.berat;
    $scope.pukul = datas.waktu_lahir;
    $('#berat').val(datas.berat);
    $('#panjang').val(datas.panjang);
    $('#jam').val(datas.waktu_lahir);
  }
  // $scope.jam = ''
  $('#tanggal').DateTimePicker(data.datepickerSetting());

  $('#nama_bayi').on('keyup', function(){
    var ini = $(this).val();
    if (ini == '' || ini == null)
    {
      $(this).removeClass('input-success');
      $(this).addClass('input-error');
      $('#nama_alert').show();
    }
    else if (ini != "" || ini != null)
    {
      $(this).removeClass('input-error');
      $(this).addClass('input-success');
      $('#nama_alert').hide();
    }
  });

  // $('#tempatkel').on('keyup', function(){
  //   var ini = $(this).val();
  //   if (ini == '' || ini == null)
  //   {
  //     $(this).removeClass('input-success');
  //     $(this).addClass('input-error');
  //     $('#tmpt_alert').show();
  //   }
  //   else if (ini != "" || ini != null)
  //   {
  //     $(this).removeClass('input-error');
  //     $(this).addClass('input-success');
  //     $('#tmpt_alert').hide();
  //   }
  // });

  $('#tglLahir').on('change', function(){
    var ini = $(this).val();
    if (ini == '' || ini == null)
    {
      $(this).removeClass('input-success');
      $(this).addClass('input-error');
      $('#tgl_alert').show();
    }
    else if (ini != "" || ini != null)
    {
      $(this).removeClass('input-error');
      $(this).addClass('input-success');
      $('#tgl_alert').hide();
    }
  });

  $('#tglLahir').flatpickr({
    locale : "id"
  });

  $('#berat').on('keyup', function(){
    var ini = $(this).val();
    if (ini == '' || ini == null)
    {
      $(this).removeClass('input-success');
      $(this).addClass('input-error');
    }
    else if (ini != "" || ini != null)
    {
      $(this).removeClass('input-error');
      $(this).addClass('input-success');
    }
  });

  $('#panjang').on('keyup', function(){
    var ini = $(this).val();
    if (ini == '' || ini == null)
    {
      $(this).removeClass('input-success');
      $(this).addClass('input-error');
    }
    else if (ini != "" || ini != null)
    {
      $(this).removeClass('input-error');
      $(this).addClass('input-success');
    }
  });

  $('#jam').on('change', function(){
    var ini = $(this).val();
    if (ini == '' || ini == null)
    {
      $(this).removeClass('input-success');
      $(this).addClass('input-error');
      $('#jam_alert').show();
    }
    else if (ini != "" || ini != null)
    {
      $(this).removeClass('input-error');
      $(this).addClass('input-success');
      $('#jam_alert').hide();
    }
  });

  $('#btn').click(function(){
    var nama = $('#nama_bayi').val();
    var tempat = $('#tempatkel').val();
    var tgl = $('#tglLahir').val();
    var jam = $('#jam').val();
    var panjang = $('#panjang').val();
    var berat = $('#berat').val();
    if (nama == "" || nama == null)
    {
      $('.notifikasi-body').notifikasi('Nama Bayi Kosong');
      $('#nama_bayi').addClass('input-error');
      $('#nama_bayi').focus();
      $('#nama_alert').show();
    }// Tanggal lahir
    else if (tgl == "" || tgl == null)
    {
      $('.notifikasi').notifikasi('Pilih tanggal', 5000);
      $('#tglLahir').addClass('input-error');
      $('#tgl_alert').show();
    }
    else if (jam == '' || jam == null)
    {
      $('.notifikasi').notifikasi('Pilih jam lahir bayi', 5000);
      $('#jam').addClass('input-error');
      $('#jam').focus();
      $('#jam_alert').show();
    }
    else if (berat == '' || berat == null)
    {
      $('.notifikasi').notifikasi('Masukkan berat bayi', 5000);
      $('#berat').addClass('input-error');
      $('#berat').focus();
    }
    else if (panjang == '' || panjang == null)
    {
      $('.notifikasi').notifikasi('Masukkan panjang bayi', 5000)
      $('#panjang').addClass('input-error');
      $('#panjang').focus();
    }
    else
    {
      var lainnya = {
        tempat : $('#tempat_lain').attr('type'),
        jenis_kelahiran : $('#jen_kelahiran').attr('type'),
        kelahiran_ke : $('#kel_ke').attr('type'),
        penolong_kelahiran : $('#penolong_kelahiran_input').attr('type')
      }

      if (lainnya.penolong_kelahiran == 'text')
      {
        var data = {
          nik : $scope.nik_bayi,
          nama : $scope.nama,
          jenis_kelamin : $scope.jen_kel,
          tempat_dilahirkan : $scope.tempat_input,
          tempat_kelahiran : $scope.tempatkel,
          prov_kelahiran : $scope.provinsi,
          kotakab_kelahiran : $scope.kabupatenkota,
          tanggal_lahir : $scope.tglLahir,
          jenis_kelahiran : $scope.jen_kelahiran,
          kelahiran_ke : $scope.kelahiran_ke,
          penolong_kelahiran : $scope.penolong_kelahiran,
          berat : $('#berat').val(),
          panjang : $('#panjang').val(),
          waktu_lahir : $('#jam').val()
        }
      }
      else
      {
        var data = {
          nik : $scope.nik_bayi,
          nama : $scope.nama,
          jenis_kelamin : $scope.jen_kel,
          tempat_dilahirkan : $scope.tempat,
          tempat_kelahiran : $scope.tempatkel,
          prov_kelahiran : $scope.provinsi,
          kotakab_kelahiran : $scope.kabupatenkota,
          tanggal_lahir : $scope.tglLahir,
          jenis_kelahiran : $scope.jen_kelahiran,
          kelahiran_ke : $scope.kelahiran_ke,
          penolong_kelahiran : $scope.penolong_kelahiran,
          berat : $('#berat').val(),
          panjang : $('#panjang').val(),
          waktu_lahir : $('#jam').val()
        }
      }

      if (lainnya.tempat == 'text')
      {
        var data = {
          nik : $scope.nik_bayi,
          nama : $scope.nama,
          jenis_kelamin : $scope.jen_kel,
          tempat_dilahirkan : $scope.tempat_input,
          tempat_kelahiran : $scope.tempatkel,
          prov_kelahiran : $scope.provinsi,
          kotakab_kelahiran : $scope.kabupatenkota,
          tanggal_lahir : $scope.tglLahir,
          jenis_kelahiran : $scope.jen_kelahiran,
          kelahiran_ke : $scope.kelahiran_ke,
          penolong_kelahiran : $scope.penolong_kelahiran,
          berat : $('#berat').val(),
          panjang : $('#panjang').val(),
          waktu_lahir : $('#jam').val()
        }
      }
      else
      {
        var data = {
          nik : $scope.nik_bayi,
          nama : $scope.nama,
          jenis_kelamin : $scope.jen_kel,
          tempat_dilahirkan : $scope.tempat,
          tempat_kelahiran : $scope.tempatkel,
          prov_kelahiran : $scope.provinsi,
          kotakab_kelahiran : $scope.kabupatenkota,
          tanggal_lahir : $scope.tglLahir,
          jenis_kelahiran : $scope.jen_kelahiran,
          kelahiran_ke : $scope.kelahiran_ke,
          penolong_kelahiran : $scope.penolong_kelahiran,
          berat : $('#berat').val(),
          panjang : $('#panjang').val(),
          waktu_lahir : $('#jam').val()
        }
      }

      if (lainnya.kelahiran_ke == 'text')
      {
        var data = {
          nik : $scope.nik_bayi,
          nama : $scope.nama,
          jenis_kelamin : $scope.jen_kel,
          tempat_dilahirkan : $scope.tempat,
          tempat_kelahiran : $scope.tempatkel,
          prov_kelahiran : $scope.provinsi,
          kotakab_kelahiran : $scope.kabupatenkota,
          tanggal_lahir : $scope.tglLahir,
          jenis_kelahiran : $scope.jen_kelahiran,
          kelahiran_ke : $scope.kelahiran_ke_input,
          penolong_kelahiran : $scope.penolong_kelahiran,
          berat : $('#berat').val(),
          panjang : $('#panjang').val(),
          waktu_lahir : $('#jam').val()
        }
      }
      else
      {
        var data = {
          nik : $scope.nik_bayi,
          nama : $scope.nama,
          jenis_kelamin : $scope.jen_kel,
          tempat_dilahirkan : $scope.tempat,
          tempat_kelahiran : $scope.tempatkel,
          prov_kelahiran : $scope.provinsi,
          kotakab_kelahiran : $scope.kabupatenkota,
          tanggal_lahir : $scope.tglLahir,
          jenis_kelahiran : $scope.jen_kelahiran,
          kelahiran_ke : $scope.kelahiran_ke,
          penolong_kelahiran : $scope.penolong_kelahiran,
          berat : $('#berat').val(),
          panjang : $('#panjang').val(),
          waktu_lahir : $('#jam').val()
        }
      }

      if (lainnya.jenis_kelahiran == 'text')
      {
        var data = {
          nik : $scope.nik_bayi,
          nama : $scope.nama,
          jenis_kelamin : $scope.jen_kel,
          tempat_dilahirkan : $scope.tempat,
          tempat_kelahiran : $scope.tempatkel,
          prov_kelahiran : $scope.provinsi,
          kotakab_kelahiran : $scope.kabupatenkota,
          tanggal_lahir : $scope.tglLahir,
          jenis_kelahiran : $scope.jen_kelahiran,
          kelahiran_ke : $scope.kelahiran_ke_input,
          penolong_kelahiran : $scope.penolong_kelahiran,
          berat : $('#berat').val(),
          panjang : $('#panjang').val(),
          waktu_lahir : $('#jam').val()
        }
      }
      else
      {
        var data = {
          nik : $scope.nik_bayi,
          nama : $scope.nama,
          jenis_kelamin : $scope.jen_kel,
          tempat_dilahirkan : $scope.tempat,
          tempat_kelahiran : $scope.tempatkel,
          prov_kelahiran : $scope.provinsi,
          kotakab_kelahiran : $scope.kabupatenkota,
          tanggal_lahir : $scope.tglLahir,
          jenis_kelahiran : $scope.jen_kelahiran,
          kelahiran_ke : $scope.kelahiran_ke,
          penolong_kelahiran : $scope.penolong_kelahiran,
          berat : $('#berat').val(),
          panjang : $('#panjang').val(),
          waktu_lahir : $('#jam').val()
        }
      }

      $cookies.putObject('bayi', data);
      window.location.replace(baseUrl + "#!/halaman3");
    }
  });
})

app.controller('login', function($scope, $http){

  $scope.login = function(username, password)
  {
    var auth = {
      username : username,
      password : password
    }
    $http.post(backendUrl + '/login', auth).then(function(resp){
      var status = resp.data.status;
      var hasil = resp.data.data;
      if (status == "PHPERROR")
      {
        var error = resp.data.errors[0];
        $('.error').show();
        $scope.type = error.type;
        $scope.message = error.message;
        $scope.file = error.file;
        $scope.line = error.line;
        $scope.code = error.code;
      }

      if (!status)
      {
        var pesan = resp.data.message;
        $('.notifikasi').notifikasi(pesan, 5000);
      }
      else
      {
        window.location.replace('dashboard.html');
      }
    });
  }
})

app.controller('form-title', function($scope, $location){
  $scope.next = function(halamanBerikut)
  {
    window.location.replace(baseUrl + "#!/"+ halamanBerikut);
  }
});

app.service('data', function(){
  this.datepickerSetting = function()
  {
    var setting = {
      shortDayNames : ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
      fullDayNames : ["Minggu", "Senin", "Selasa", "Rabu", "Jumat", "Sabtu"],
      shortMonthNames : ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ag", "Sep", "Okt", "Nov", "Des"],
      fullMonthNames : ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
      titleContentDate : "Pilih tanggal",
      titleContentTime : "Pilih jam",
      setButtonContent : "Pilih",
      clearButtonContent : "Reset",
      dateFormat : "yyyy-MM-dd"
    }
    return setting;
  }
});

dash.service('data', function(){
  this.datepickerSetting = function()
  {
    var setting = {
      shortDayNames : ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
      fullDayNames : ["Minggu", "Senin", "Selasa", "Rabu", "Jumat", "Sabtu"],
      shortMonthNames : ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ag", "Sep", "Okt", "Nov", "Des"],
      fullMonthNames : ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
      titleContentDate : "Pilih tanggal",
      titleContentTime : "Pilih jam",
      setButtonContent : "Pilih",
      clearButtonContent : "Reset",
      dateFormat : "yyyy-MM-dd"
    }
    return setting;
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
    title : "Kelengkapan",
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
    $('.modal').modalPopup('show');
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

  // $(document).on('click', '.head',function(){
  //   $(this).children('span.collapse-icon').children('i.fa').toggleClass('icon-up');
  //   $(this).siblings('div.collapse-body').slideToggle();
  //   $(this).siblings('div.containers').slideToggle();
  // });

  // $('.head').click(function(){
  //   $(this).children('span.collapse-icon').children('i.fa').toggleClass('icon-up');
  //   $(this).siblings('.collapse-body').slideToggle();
  //   $(this).siblings('.containers').slideToggle();
  // });

  $('#cek_status').click(function(){
    window.location.replace('cek_status.html');
  });

  $('#upload_file').click(function(){
    window.location.replace('upload_file.html');
  });

  $('#daftar').click(function(){
    window.location.replace('pendaftaran.html');
  });

  $('#file').click(function(){
    window.location.replace('berkas.html');
  });

  $('form').on('submit', function(e){
    return false;
  });

  $('#bantuan').click(function(){
    $('#divBantuan').show();
    $('#divAlur').hide();
    $('.tab').removeClass('click');
    $(this).addClass('click')
  });

  $('#alur').click(function(){
    $('#divBantuan').hide();
    $('#divAlur').show();
    $('.tab').removeClass('click');
    $(this).addClass('click')
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

  $(document).on('submit', 'form', function(e){
    e.preventDefault();
  })

  $('.btn-collapse').click(function(){
    $('.menu li').not('.menu li:first-child').slideToggle();
  });
});
