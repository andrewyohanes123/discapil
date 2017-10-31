var app = angular.module('capil', ['ngRoute', 'ngCookies', 'ngFileUpload']);
var dash = angular.module('dash', ['ngRoute', 'ngCookies']);
var baseUrl = window.location.origin + "/form_capil/pendaftaran.html";
var backendUrl = window.location.origin + "/capil_dev/akte_lahir/api"
var linkFile = window.location.origin + "/capil_dev/akte_lahir/assets/berkas/";

// Dashboard
dash.config(function($routeProvider){
  // $locationProvider.html5Mode(true);
  // $locationProvider.hashPrefix('');
  $routeProvider
  .when('/', {
    templateUrl : "dashboard/main.html",
    controller : "listPendaftaran"
  })
  .when('/tidak_diverifikasi', {
    templateUrl : "dashboard/akte_verifikasi.html",
    controller : "blm_verif"
  })
  .when('/diverifikasi', {
    templateUrl : "dashboard/verifikasi.html",
    controller : "verif"
  })
  .when('/user', {
    templateUrl : "dashboard/user.html",
    controller : 'user'
  })
  .otherwise({
    redirectTo : "/"
  })
});

dash.controller('user', function($scope, $http){
  $scope.get = function(limit, offset, cari = '')
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

  $scope.blokir = "0";

  $scope.tambah_user = function(id = '', nama = '', username = '', aktif = '0', mode = 'Tambah user', btn = 'next')
  {
    $scope.id = id;
    aktif = aktif + "";
    // console.log(aktif);
    $scope.aktif = aktif;
    $scope.nama_lengkap = nama;
    $scope.username = username;
    // $scope.blokir = false;
    $scope.mode = mode;
    $scope.btn = btn;
    $('.modal').modalPopup('show');
  }

  $scope.exec = function(mode = 'tambah')
  {
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

  $('')

  // console.log($scope.blokir);

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

dash.controller('verif', function($scope, $http){
  var order = $('#order').val();
  var sort = $('#sort').val();
  var tgl = $('#tgl').val();
  var tgl2 = $('#tgl2').val();
  var cari = $('#cari').val();
  var limit = $('#batas').val()

  // $scope.getDaftar($scope.order, $scope.sort, $scope.tgl, $scope.tgl2, '', limit);

  $scope.batas = "5";
  $scope.sort = "asc";
  $scope.order = "no_kk"
  $scope.tgl = moment().startOf('month').format('YYYY-MM-DD');
  $scope.tgl2 = moment().endOf('month').format('YYYY-MM-DD');
  $scope.currentpage = 1;

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
      var offset = ($scope.currentpage - 1) * (parseInt(limit));
      $scope.getDaftar(order, sort, tgl, tgl2, cari, limit, offset)
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
      var offset = ($scope.currentpage - 1) * (parseInt(limit));
      $scope.getDaftar(order, sort, tgl, tgl2, cari, limit, offset)
    }
    else
    {
      $scope.currentpage++;
      var offset = ($scope.currentpage - 1) * (parseInt(limit));
      $scope.getDaftar(order, sort, tgl, tgl2, cari, limit, offset)
    }
  }

  $scope.getDaftar = function(order, sort, tgl, tgl2, no_kk, limit, offset) {
    var data = {
      order_by : order,
      sort_type : sort,
      date_start : tgl,
      date_end : tgl2,
      no_kk : no_kk,
      approved : 1
    }
    // var offset = (1 - 1) * (parseInt($scope.batas))
    $http({
      url : backendUrl + "/ambil_pendaftaran/" + limit + "/" + offset,
      params : data,
      method : "GET"
    }).then(function(resp){
      moment.locale('id')
      angular.forEach(resp.data.data.list, function(val, key){
        val.tanggal_lahir = moment(val.tanggal_lahir).format('DD MMMM YYYY');
        val.tanggal_pendaftaran = moment(val.tanggal_pendaftaran).format('DD MMMM YYYY');
      })
      $scope.daftar = resp.data.data.list;
      $scope.totalData = resp.data.data.total;
      $scope.totalHalaman = Math.ceil($scope.totalData/parseInt(limit))
    });
  }

  // console.log($scope.totalData);

  $('#tgl').flatpickr({
    locale : "id"
  });

  $('#order').change(function(){
    var order = $('#order').val();
    var sort = $('#sort').val();
    var tgl = $('#tgl').val();
    var tgl2 = $('#tgl2').val();
    var cari = $('#cari').val();
    var limit = $('#batas').val();
    $scope.offset = ($scope.currentpage - 1) * (parseInt(limit));
    $scope.getDaftar(order, sort, tgl, tgl2, cari, limit, $scope.offset);
  });

  $('#sort').change(function(){
    var order = $('#order').val();
    var sort = $('#sort').val();
    var tgl = $('#tgl').val();
    var tgl2 = $('#tgl2').val();
    var cari = $('#cari').val();
    var limit = $('#batas').val();
    $scope.offset = ($scope.currentpage - 1) * (parseInt(limit));
    $scope.getDaftar(order, sort, tgl, tgl2, cari, limit, $scope.offset);
  });

  $('#tgl').change(function(){
    var order = $('#order').val();
    var sort = $('#sort').val();
    var tgl = $('#tgl').val();
    var tgl2 = $('#tgl2').val(moment().endOf('month').format('YYYY-MM-DD'));
    var cari = $('#cari').val();
    $scope.getDaftar(order, sort, tgl, tgl2, cari)
    $('#tgl2').flatpickr({
      locale : "id",
      minDate : $(this).val()
    })
  });

  $('#tgl2').change(function(){
    var order = $('#order').val();
    var sort = $('#sort').val();
    var tgl = $('#tgl').val();
    var tgl2 = $('#tgl2').val();
    var cari = $('#cari').val();
    var limit = $(this).val();
    $scope.offset = ($scope.currentpage - 1) * (parseInt(limit));
    $scope.getDaftar(order, sort, tgl, tgl2, cari, limit, $scope.offset);
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
    $scope.offset = ($scope.currentpage - 1) * (parseInt(limit));
    $scope.getDaftar(order, sort, tgl, tgl2, cari, limit, $scope.offset);
  })

  $('#batas').change(function(){
    var order = $('#order').val();
    var sort = $('#sort').val();
    var tgl = $('#tgl').val();
    var tgl2 = $('#tgl2').val();
    var cari = $('#cari').val();
    var limit = $(this).val();
    $scope.offset = ($scope.currentpage - 1) * (parseInt(limit));
    $scope.getDaftar(order, sort, tgl, tgl2, cari, limit, $scope.offset);
  });

  $scope.detail = function(id_bayi) {
    moment.locale('id');
    $http.get(backendUrl + "/ambil_detail_pendaftaran/" + id_bayi).then(function(resp){
      var hasil = resp.data.data;
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
          $scope.surat_pernyataan_belum_nikah_link = linkFile + berkas.surat_pernyataan_belum_nikah;
          $scope.surat_pernyataan_belum_nikah = berkas.surat_pernyataan_belum_nikah;
        }
      }
    });

    $('.modal').modalPopup('show', {
      titleBackground : "#14569a",
      titleFontColor : "white",
      key : 8
    });

    $('a.ng-binding').click(function(){
      var src = $(this).attr('href');
      $('.img-modal').imgModal(src);
    });
  }

  $scope.getDaftar($scope.order, $scope.sort, $scope.tgl, $scope.tgl2, $scope.cari, $scope.batas, $scope.offset);
});

dash.controller('blm_verif', function($scope, $http){
  var order = $('#order').val();
  var sort = $('#sort').val();
  var tgl = $('#tgl').val();
  var tgl2 = $('#tgl2').val();
  var cari = $('#cari').val();
  var limit = $('#batas').val()

  // $scope.getDaftar($scope.order, $scope.sort, $scope.tgl, $scope.tgl2, '', limit);

  $scope.batas = "5";
  $scope.sort = "asc";
  $scope.order = "no_kk"
  $scope.tgl = moment().startOf('month').format('YYYY-MM-DD');
  $scope.tgl2 = moment().endOf('month').format('YYYY-MM-DD');
  $scope.currentpage = 1;

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
      var offset = ($scope.currentpage - 1) * (parseInt(limit));
      $scope.getDaftar(order, sort, tgl, tgl2, cari, limit, offset)
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
      var offset = ($scope.currentpage - 1) * (parseInt(limit));
      $scope.getDaftar(order, sort, tgl, tgl2, cari, limit, offset)
    }
    else
    {
      $scope.currentpage++;
      var offset = ($scope.currentpage - 1) * (parseInt(limit));
      $scope.getDaftar(order, sort, tgl, tgl2, cari, limit, offset)
    }
  }

  $scope.getDaftar = function(order, sort, tgl, tgl2, no_kk, limit, offset) {
    var data = {
      order_by : order,
      sort_type : sort,
      date_start : tgl,
      date_end : tgl2,
      no_kk : no_kk,
      approved : 0
    }
    // var offset = (1 - 1) * (parseInt($scope.batas))
    $http({
      url : backendUrl + "/ambil_pendaftaran/" + limit + "/" + offset,
      params : data,
      method : "GET"
    }).then(function(resp){
      moment.locale('id')
      angular.forEach(resp.data.data.list, function(val, key){
        val.tanggal_lahir = moment(val.tanggal_lahir).format('DD MMMM YYYY');
        val.tanggal_pendaftaran = moment(val.tanggal_pendaftaran).format('DD MMMM YYYY');
      })
      $scope.daftar = resp.data.data.list;
      $scope.totalData = resp.data.data.total;
      $scope.totalHalaman = Math.ceil($scope.totalData/parseInt(limit))
    });
  }

  // console.log($scope.totalData);

  $('#tgl').flatpickr({
    locale : "id"
  });

  $('#order').change(function(){
    var order = $('#order').val();
    var sort = $('#sort').val();
    var tgl = $('#tgl').val();
    var tgl2 = $('#tgl2').val();
    var cari = $('#cari').val();
    var limit = $('#batas').val();
    $scope.offset = ($scope.currentpage - 1) * (parseInt(limit));
    $scope.getDaftar(order, sort, tgl, tgl2, cari, limit, $scope.offset);
  });

  $('#sort').change(function(){
    var order = $('#order').val();
    var sort = $('#sort').val();
    var tgl = $('#tgl').val();
    var tgl2 = $('#tgl2').val();
    var cari = $('#cari').val();
    var limit = $('#batas').val();
    $scope.offset = ($scope.currentpage - 1) * (parseInt(limit));
    $scope.getDaftar(order, sort, tgl, tgl2, cari, limit, $scope.offset);
  });

  $('#tgl').change(function(){
    var order = $('#order').val();
    var sort = $('#sort').val();
    var tgl = $('#tgl').val();
    var tgl2 = $('#tgl2').val(moment().endOf('month').format('YYYY-MM-DD'));
    var cari = $('#cari').val();
    $scope.getDaftar(order, sort, tgl, tgl2, cari)
    $('#tgl2').flatpickr({
      locale : "id",
      minDate : $(this).val()
    })
  });

  $('#tgl2').change(function(){
    var order = $('#order').val();
    var sort = $('#sort').val();
    var tgl = $('#tgl').val();
    var tgl2 = $('#tgl2').val();
    var cari = $('#cari').val();
    var limit = $(this).val();
    $scope.offset = ($scope.currentpage - 1) * (parseInt(limit));
    $scope.getDaftar(order, sort, tgl, tgl2, cari, limit, $scope.offset);
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
    $scope.offset = ($scope.currentpage - 1) * (parseInt(limit));
    $scope.getDaftar(order, sort, tgl, tgl2, cari, limit, $scope.offset);
  })

  $('#batas').change(function(){
    var order = $('#order').val();
    var sort = $('#sort').val();
    var tgl = $('#tgl').val();
    var tgl2 = $('#tgl2').val();
    var cari = $('#cari').val();
    var limit = $(this).val();
    $scope.offset = ($scope.currentpage - 1) * (parseInt(limit));
    $scope.getDaftar(order, sort, tgl, tgl2, cari, limit, $scope.offset);
  });

  $scope.detail = function(id_bayi) {
    moment.locale('id');
    $http.get(backendUrl + "/ambil_detail_pendaftaran/" + id_bayi).then(function(resp){
      var hasil = resp.data.data;
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
          $scope.surat_pernyataan_belum_nikah_link = linkFile + berkas.surat_pernyataan_belum_nikah;
          $scope.surat_pernyataan_belum_nikah = berkas.surat_pernyataan_belum_nikah;
        }
      }
    });

    $('.modal').modalPopup('show', {
      titleBackground : "#14569a",
      titleFontColor : "white",
      key : 8
    });

    $('a.ng-binding').click(function(){
      var src = $(this).attr('href');
      $('.img-modal').imgModal(src);
    });
  }

  $scope.getDaftar($scope.order, $scope.sort, $scope.tgl, $scope.tgl2, $scope.cari, $scope.batas, $scope.offset);
});

dash.controller('listPendaftaran', function($scope, $http){

  var order = $('#order').val();
  var sort = $('#sort').val();
  var tgl = $('#tgl').val();
  var tgl2 = $('#tgl2').val();
  var cari = $('#cari').val();
  var limit = $('#batas').val()
  $scope.getDaftar = function(order, sort, tgl, tgl2, no_kk, limit, offset) {
    var data = {
      order_by : order,
      sort_type : sort,
      date_start : tgl,
      date_end : tgl2,
      no_kk : no_kk
    }
    // var offset = (1 - 1) * (parseInt($scope.batas))
    $http({
      url : backendUrl + "/ambil_pendaftaran/" + limit + "/" + offset,
      params : data,
      method : "GET"
    }).then(function(resp){
      moment.locale('id')
      angular.forEach(resp.data.data.list, function(val, key){
        val.tanggal_lahir = moment(val.tanggal_lahir).format('DD MMMM YYYY');
        val.tanggal_pendaftaran = moment(val.tanggal_pendaftaran).format('DD MMMM YYYY');
      })
      $scope.daftar = resp.data.data.list;
      $scope.totalData = resp.data.data.total;
      $scope.totalHalaman = Math.ceil($scope.totalData/parseInt(limit))
    });
  }

  $scope.verifikasi = function(id)
  {
    var data = {
      id_bayi : id
    }
    $http.post(backendUrl + "/approve_pendaftaran", data).then(function(resp){
      console.log(resp);
      $scope.getDaftar($scope.order, $scope.sort, $scope.tgl, $scope.tgl2, $scope.cari, $scope.batas, $scope.offset);
    });
  }

  $scope.batas = "5";
  $scope.sort = "asc";
  $scope.order = "no_kk"
  $scope.tgl = moment().startOf('month').format('YYYY-MM-DD');
  $scope.tgl2 = moment().endOf('month').format('YYYY-MM-DD');
  $scope.currentpage = 1;

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
      var offset = ($scope.currentpage - 1) * (parseInt(limit));
      $scope.getDaftar(order, sort, tgl, tgl2, cari, limit, offset)
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
      var offset = ($scope.currentpage - 1) * (parseInt(limit));
      $scope.getDaftar(order, sort, tgl, tgl2, cari, limit, offset)
    }
    else
    {
      $scope.currentpage++;
      var offset = ($scope.currentpage - 1) * (parseInt(limit));
      $scope.getDaftar(order, sort, tgl, tgl2, cari, limit, offset)
    }
  }

  // console.log($scope.totalData);

  $('#tgl').flatpickr({
    locale : "id"
  });

  $('#order').change(function(){
    var order = $('#order').val();
    var sort = $('#sort').val();
    var tgl = $('#tgl').val();
    var tgl2 = $('#tgl2').val();
    var cari = $('#cari').val();
    var limit = $('#batas').val();
    $scope.offset = ($scope.currentpage - 1) * (parseInt(limit));
    $scope.getDaftar(order, sort, tgl, tgl2, cari, limit, $scope.offset);
  });

  $('#sort').change(function(){
    var order = $('#order').val();
    var sort = $('#sort').val();
    var tgl = $('#tgl').val();
    var tgl2 = $('#tgl2').val();
    var cari = $('#cari').val();
    var limit = $('#batas').val();
    $scope.offset = ($scope.currentpage - 1) * (parseInt(limit));
    $scope.getDaftar(order, sort, tgl, tgl2, cari, limit, $scope.offset);
  });

  $('#tgl').change(function(){
    var order = $('#order').val();
    var sort = $('#sort').val();
    var tgl = $('#tgl').val();
    var tgl2 = $('#tgl2').val(moment().endOf('month').format('YYYY-MM-DD'));
    var cari = $('#cari').val();
    $scope.getDaftar(order, sort, tgl, tgl2, cari)
    $('#tgl2').flatpickr({
      locale : "id",
      minDate : $(this).val()
    })
  });

  $('#tgl2').change(function(){
    var order = $('#order').val();
    var sort = $('#sort').val();
    var tgl = $('#tgl').val();
    var tgl2 = $('#tgl2').val();
    var cari = $('#cari').val();
    var limit = $(this).val();
    $scope.offset = ($scope.currentpage - 1) * (parseInt(limit));
    $scope.getDaftar(order, sort, tgl, tgl2, cari, limit, $scope.offset);
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
    $scope.offset = ($scope.currentpage - 1) * (parseInt(limit));
    $scope.getDaftar(order, sort, tgl, tgl2, cari, limit, $scope.offset);
  })

  $('#batas').change(function(){
    var order = $('#order').val();
    var sort = $('#sort').val();
    var tgl = $('#tgl').val();
    var tgl2 = $('#tgl2').val();
    var cari = $('#cari').val();
    var limit = $(this).val();
    $scope.offset = ($scope.currentpage - 1) * (parseInt(limit));
    $scope.getDaftar(order, sort, tgl, tgl2, cari, limit, $scope.offset);
  });

  $('.head').on('click', function(){
    $(this).children('span.collapse-icon').children('i.fa').toggleClass('icon-up');
    $(this).siblings('div.collapse-body').slideToggle();
    $(this).siblings('div.containers').slideToggle();
  });

  $scope.detail = function(id_bayi) {
    moment.locale('id');
    $http.get(backendUrl + "/ambil_detail_pendaftaran/" + id_bayi).then(function(resp){
      var hasil = resp.data.data;
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
          $scope.surat_pernyataan_belum_nikah_link = linkFile + berkas.surat_pernyataan_belum_nikah;
          $scope.surat_pernyataan_belum_nikah = berkas.surat_pernyataan_belum_nikah;
        }
      }
    });

    $('.modal').modalPopup('show', {
      titleBackground : "#14569a",
      titleFontColor : "white",
      key : 8
    });

    $('a.ng-binding').click(function(){
      var src = $(this).attr('href');
      $('.img-modal').imgModal(src);
    });
  }

  $scope.getDaftar($scope.order, $scope.sort, $scope.tgl, $scope.tgl2, $scope.cari, $scope.batas, $scope.offset);
})

dash.controller('verifikasi', function($scope, $http, $cookies){
  // const flatpickr = require('flatpickr');
  $('#tgl').val(moment().startOf('month').format("YYYY-MM-DD"))
  $('#tgl2').val(moment().endOf('month').format("YYYY-MM-DD"))
  $('#tgl').flatpickr({
    "locale" : "id"
  });
  var tgl = $('#tgl').val()
  $('#tgl2').flatpickr({
    "locale" : "id",
    minDate : tgl
  });
  $('#tgl').change(function(){
    console.log('ada');
    var tgl = $('#tgl').val();

    console.log(tgl);
    $('#tgl2').flatpickr({
      "locale" : "id",
      minDate : tgl
    });
  })
})

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
    })
  }
})
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
  var prevPage = $cookies.getObject('sk1');
  if (!prevPage)
  {
    window.location.replace('#!/halaman7')
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
    var no_kk = $cookies.getObject('no_kk');
    var bayi = $cookies.getObject('bayi');
    var ibu = $cookies.getObject('ibu');
    var ayah = $cookies.getObject('ayah');
    var plr = $cookies.getObject('plr');
    var sk1 = $cookies.getObject('sk1');
    var sk2 = $cookies.getObject('sk2');
    var data = Object.assign(no_kk, bayi, ibu, ayah, plr, sk1, sk2, pernyataan);
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
        $('.error').show();
        var error = resp.data.errors[0];
        $scope.type = error.type;
        $scope.msg = error.message;
        $scope.file = error.file;
        $scope.line = error.line;
        $scope.code = error.code;
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
        alert('Pendaftaran gagal');
      }
    });
  });
});

app.controller('saksi2', function($scope, data, $cookies, $http){
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
      $scope.jen_kelamin = datas.sk_jenis_kelamin2;
      $scope.pekerjaan = datas.sk_pekerjaan2;
      $scope.alamat = datas.sk_alamat2;
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
          sk_tanggal_lahir2 : $scope.tglLahir,
          sk_pekerjaan2 : $scope.pekerjaan,
          sk_alamat2 : $scope.alamat,
          sk_org_manado2 : 0
        }
        $cookies.putObject('sk2', data);
        window.location.replace('pendaftaran.html#!/persetujuan');
      }
    }
  });
  // console.log(data.datepickerSetting());
  $('#tanggal').DateTimePicker();
});

app.controller('saksi1', function($scope, data, $cookies, $http){
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
          sk_tanggal_lahir1 : $scope.tglLahir,
          sk_pekerjaan1 : $scope.pekerjaan,
          sk_jenis_kelamin1 : $scope.jen_kelamin,
          sk_alamat1 : $scope.alamat,
          sk_org_manado1 : 0
        }
        $cookies.putObject('sk1', data);
        window.location.replace('pendaftaran.html#!/halaman7');
      }
    }
  })
  $scope.jen_kelamin = 'Laki-laki'
});

app.controller('pelapor', function($scope, dataPenduduk,data, $cookies, $http){
  var datas = $cookies.getObject('plr');
  var prevPage = $cookies.getObject('ayah');
  if (!datas)
  {
    $scope.nama_pelapor = '';
    $scope.nik = '';
  }
  else if (!prevPage)
  {
    window.location.replace('#!/halaman4')
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
  $('#tanggal').DateTimePicker(data.datepickerSetting());
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
      else if (tanggal == '' || tanggal == null)
      {
        $('.notifikasi').notifikasi('Pilih tanggal lahir', 4500);
        $('#tanggal_lahir').addClass('input-error');
      }
      else if (pekerjaan == '' || pekerjaan == null)
      {
        $('.notifikasi').notifikasi('Masukkan pekerjaan', 3000);
        $('#pekerjaan').addClass('input-error');
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
          plr_tanggal_lahir : $scope.tanggal_lahir,
          plr_pekerjaan : $scope.pekerjaan,
          plr_jenis_kelamin : $scope.jen_kelamin,
          plr_alamat : $scope.alamat,
          plr_org_manado : 0
        }
        $cookies.getObject('plr', data);
        window.location.replace("pendaftaran.html#!/halaman6")
      }
    }
  })
});

app.controller('ayah', function($scope, data, $cookies, $http){
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
  $('#nik').on('blur', function(){
    var nik = $(this).val();
    $http.get(backendUrl + '/ambil_penduduk/' + $scope.nik_ayah).then(function(resp){
      var val = resp.data.data;
      if (val.JENIS_KLMIN == '2')
      {
        $('.notifikasi-body').notifikasi('Pemilik NIK bukan laki-laki', 5000);
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
  });

  $scope.cek = function()
  {
    $http.get(backendUrl + '/ambil_penduduk/' + $scope.nik_ayah).then(function(resp){
      var val = resp.data.data;
      if (val.JENIS_KLMIN == '2')
      {
        $('.notifikasi-body').notifikasi('Pemilik NIK bukan laki-laki', 5000);
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
      if (nik == '' || nik == null)
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
    $scope.nama_ibu = datas.nama_ibu;
    $scope.nik = datas.nik_ibu
  }

  $('#tanggal').DateTimePicker(data.datepickerSetting());
  $('#nik').on('blur', function(){
    var nik = $(this).val();
    var no_kk = $cookies.getObject('no_kk');
    $http.get(backendUrl + '/ambil_penduduk/' + nik).then(function(resp){
      var val = resp.data.data;
      if (val.JENIS_KLMIN == '1')
      {
        $('.notifikasi').notifikasi('Pemilik NIK bukan perempuan', 3000);
      }
      else if (val.NO_KK != no_kk.no_kk)
      {
        $('.notifikasi').notifikasi('NIK tidak terdaftar pada KK yang disertakan', 5000);
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
    });
  });

  $scope.cek = function()
  {
    // var nik = $(this).val();
    $http.get(backendUrl + '/ambil_penduduk/' + $scope.nik).then(function(resp){
      var val = resp.data.data;
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
      if (nik == '' || nik == null)
      {
        $('#nik').addClass('input-error');
        $('.notifikasi').notifikasi('Masukkan NIK!', 3000);
      }
      else if (nama == '' || nama == null)
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
          nik_ibu : nik,
          nama_ibu : nama,
          ibu_org_manado : 0
        }
        $cookies.putObject('ibu', data);
        window.location.replace("pendaftaran.html#!/halaman4");
      }
    }
  })

});

app.controller('no_kk', function($scope, data, $cookies, $http){
  var datas = $cookies.getObject('')
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

app.controller('bayi', function($scope, data, $cookies){
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

  var datas = $cookies.getObject('bayi');
  var prevPage = $cookies.getObject('no_kk');
  if (!datas)
  {
    $scope.nama = '';
  }
  else if (!prevPage)
  {
    window.location.replace('#!/halaman2')
  }
  else
  {
    $scope.nama = datas.nama;
    $scope.jen_kel = datas.jenis_kelamin;
    $scope.tempat = datas.tempat_dilahirkan;
    $scope.tempatkel = datas.tempat_kelahiran;
    $scope.tglLahir = datas.tanggal_lahir;
    $scope.jen_kelahiran = datas.jenis_kelahiran;
    $scope.penolong_kelahiran = datas.penolong_kelahiran;
    $scope.berat_bayi = datas.berat;
    $scope.panjang_bayi = datas.panjang;
    $scope.jam = datas.waktu_lahir;
  }
  $scope.jam = ''
  $('#tanggal').DateTimePicker(data.datepickerSetting());
  $('#tempat').on('change', function(){
    var angka = $(this).val();
    if (angka == "5")
    {
      $('#tempatLain').show();
    }
    else
    {
      $('#tempatLain').hide();
    }
  });

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

  $('#tempatkel').on('keyup', function(){
    var ini = $(this).val();
    if (ini == '' || ini == null)
    {
      $(this).removeClass('input-success');
      $(this).addClass('input-error');
      $('#tmpt_alert').show();
    }
    else if (ini != "" || ini != null)
    {
      $(this).removeClass('input-error');
      $(this).addClass('input-success');
      $('#tmpt_alert').hide();
    }
  });

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

  $('#berat').on('keyup', function(){
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

  $('#panjang').on('keyup', function(){
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
    else if (tempat == "" || tempat == null)
    {
      $('.notifikasi-body').notifikasi('Masukkan tempat kelahiran');
      $('#tempatkel').focus();
      $('#tempatkel').addClass('input-error');
      $('#tmpt_alert').show();
    }
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
      var data = {
        nama : $scope.nama,
        jenis_kelamin : $scope.jen_kel,
        tempat_dilahirkan : $scope.tempat,
        tempat_kelahiran : $scope.tempatkel,
        tanggal_lahir : $scope.tglLahir,
        jenis_kelahiran : $scope.jen_kelahiran,
        kelahiran_ke : $scope.kelahiran_ke,
        penolong_kelahiran : $scope.penolong_kelahiran,
        berat : $scope.berat_bayi,
        panjang : $scope.panjang_bayi,
        waktu_lahir : $scope.jam
      }
      $cookies.putObject('bayi', data);
      window.location.replace(baseUrl + "#!/halaman3");
    }
  });
  $scope.jen_kel = 'Laki-laki';
  $scope.tempat = 'RS/RB';
  $scope.jen_kelahiran = "Tunggal";
  $scope.kelahiran_ke = "Pertama";
  $scope.penolong_kelahiran = "Dokter";
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

app.factory('dataPenduduk', function($http){
  var dataPenduduk = {};

  dataPenduduk.getPendudukByNIK = function(url) {
    var hasil;
    return $http.get(url).then(function(resp){
       return hasil = resp.data;
    });

    return hasil;
  };

  dataPenduduk.postData = function(url, obj) {
    return $http.post(url, obj);
  };
  return dataPenduduk;
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

  $(document).on('click', '.head',function(){
    $(this).children('span.collapse-icon').children('i.fa').toggleClass('icon-up');
    $(this).siblings('div.collapse-body').slideToggle();
    $(this).siblings('div.containers').slideToggle();
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
