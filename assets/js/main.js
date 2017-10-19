var app = angular.module('capil', ['ngRoute', 'ngCookies', 'ngFileUpload']);
var dash = angular.module('dash', ['ngRoute', 'ngCookies']);
var baseUrl = window.location.origin + "/form_capil/pendaftaran.html";
var backendUrl = window.location.origin + "/capil_dev/akte_lahir/api"

// Dashboard
dash.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl : "dashboard/main.html",
    controller : "listPendaftaran"
  })
});

dash.controller('listPendaftaran', function($scope, $http){
  $scope.getDaftar = function() {
    $http.get(backendUrl + "/ambil_pendaftaran").then(function(resp){
      $scope.daftar = resp.data.data;
    });
  }

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
      var linkFile = window.location.origin + "/capil_dev/akte_lahir/assets/berkas/";
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

    $('.modal').show();
    $('body').css('overflow-y', 'hidden');
  }

  $scope.getDaftar();
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
        $cookieStore.put('nomor_pendaftaran', $scope.nomor_pendaftaran);
      }
      else
      {
        var msg = resp.data.message;
        $('.notifikasi').css('display', 'flex');
        $('.notifikasi-body').empty();
        $('.notifikasi-body').text(msg);
        setTimeout(function(){
          $('.notifikasi').hide();
        },3000);
      }
    });
  }

  $scope.upload = function(file, nama_field)
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
    })
  }

  $scope.onFileSelect = function(file)
  {
    if (!file) return;
    Upload.upload({
      url : backendUrl + "/upload_berkas",
      data : { file: file}
    }).then(function(resp){
      console.log(resp);
    })
  }

  $scope.getList = function()
  {
    var nomor = $cookieStore.get('nomor_pendaftaran');
    $http.get(backendUrl + "/ambil_berkas/" + nomor).then(function(resp){
      var berkas = resp.data.data;
      var status = resp.data.status;
      var linkFile = window.location.origin + "/capil_dev/akte_lahir/assets/berkas/";
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

  $scope.getList();
});

app.controller('persetujuan', function($scope, data, $cookieStore, $http){
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

  $('.btn-next').click(function(){
    // if ()
    var no_telp = $('#nomor_telp').val();
    var alt = $('#alamat').val();
    var pernyataan = $('#pernyataan').val();

    $scope.pernyataan = '';

    $cookieStore.put('p_no_telfon', $scope.nomor_telp);
    $cookieStore.put('p_alamat', $scope.alamat);
    $cookieStore.put('p_pernyataan', $scope.pernyataan);
    var nomor_kk = $cookieStore.get('no_kk');
    var nama_kepala_keluarga = $cookieStore.get('nama_kepala_keluarga');
    var nama = $cookieStore.get('nama');
    var jenis_kelamin = $cookieStore.get('jenis_kelamin');
    var tempat_kelahiran = $cookieStore.get('tempat_kelahiran');
    var tempat_dilahirkan = $cookieStore.get('tempat_dilahirkan');
    var tanggal_lahir = $cookieStore.get('tanggal_lahir');
    var waktu_lahir = $cookieStore.get('waktu_lahir');
    var jenis_kelahiran = $cookieStore.get('jenis_kelahiran');
    var penolong_kelahiran = $cookieStore.get('penolong_kelahiran');
    var kelahiran_ke = $cookieStore.get('kelahiran_ke');
    var berat = $cookieStore.get('berat_bayi');
    var panjang = $cookieStore.get('panjang_bayi');
    var nik_ayah  = $cookieStore.get('nik_ayah');
    var nama_ayah = $cookieStore.get('nama_ayah');
    var nik_ibu = $cookieStore.get('nik_ibu');
    var nama_ibu = $cookieStore.get('nama_ibu');
    var sk_nik1 = $cookieStore.get('sk_nik1');
    var sk_nama1 = $cookieStore.get('sk_nama1');
    var sk_jenis_kelamin1 = $cookieStore.get('sk_jenis_kelamin1');
    var sk_pekerjaan1 = $cookieStore.get('sk_pekerjaan1');
    var sk_alamat1 = $cookieStore.get('sk_alamat1');
    var sk_org_manado1 = $cookieStore.get('sk_org_manado1');
    var sk_nik2 = $cookieStore.get('sk_nik2');
    var sk_nama2 = $cookieStore.get('sk_nama2');
    var sk_jenis_kelamin2 = $cookieStore.get('sk_jenis_kelamin2');
    var sk_pekerjaan2 = $cookieStore.get('sk_pekerjaan2');
    var sk_alamat2 = $cookieStore.get('sk_alamat2');
    var sk_org_manado2 = $cookieStore.get('sk_org_manado2');
    var plr_nik = $cookieStore.get('plr_nik');
    var plr_nama = $cookieStore.get('plr_nama');
    var plr_jenis_kelamin = $cookieStore.get('plr_jenis_kelamin');
    var plr_tanggal_lahir = $cookieStore.get('plr_tanggal_lahir');
    var plr_pekerjaan = $cookieStore.get('plr_pekerjaan');
    var plr_alamat = $cookieStore.get('plr_alamat');
    var plr_org_manado = $cookieStore.get('plr_org_manado');
    var p_no_telfon = $cookieStore.get('p_no_telfon');
    var p_alamat = $cookieStore.get('p_alamat');
    var p_pernyataan = $cookieStore.get('p_pernyataan');

    var data = {
      no_kk : nomor_kk,
      nama_kepala_keluarga : nama_kepala_keluarga,
      nama : nama,
      jenis_kelamin : jenis_kelamin,
      tempat_dilahirkan : tempat_dilahirkan,
      tempat_kelahiran : tempat_kelahiran,
      kelahiran_ke : kelahiran_ke,
      tanggal_lahir : tanggal_lahir,
      waktu_lahir : waktu_lahir,
      jenis_kelahiran : jenis_kelahiran,
      penolong_kelahiran : penolong_kelahiran,
      berat : berat,
      panjang : panjang,
      nik_ayah : nik_ayah,
      nama_ayah : nama_ayah,
      nik_ibu : nik_ibu,
      nama_ibu : nama_ibu,
      sk_nik1 : sk_nik1,
      sk_nama1 : sk_nama1,
      sk_alamat1 : sk_alamat1,
      sk_org_manado1 : sk_org_manado1,
      sk_nik2 : sk_nik2,
      sk_nama2 : sk_nama2,
      sk_alamat2 : sk_alamat2,
      sk_org_manado2 : sk_org_manado2,
      plr_nik : plr_nik,
      plr_nama : plr_nama,
      plr_jenis_kelamin : plr_jenis_kelamin,
      plr_tanggal_lahir : plr_tanggal_lahir,
      plr_pekerjaan : plr_pekerjaan,
      plr_alamat : plr_alamat,
      plr_org_manado : plr_org_manado,
      p_no_telfon : p_no_telfon,
      p_alamat : p_alamat,
      p_pernyataan : p_pernyataan
    }
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
      $scope.nomor_daftar = nomor_daftar;
      $('#modal').show();
      $('body').css('overflow-y', 'hidden');
      $scope.nomor_telp = '';
      $scope.alamat = '';
      $scope.pernyataan = '';

      console.log(resp);

      // $('#nomor_telp').removeClass('input-success');
      // $('#nomor_telp').removeClass('input-error');
      // $('#alamat').removeClass('input-success');
      // $('#alamat').removeClass('input-error');
    });
  });

  $('.btn-modal').click(function(){
    $('.modal-window').css('animation', 'modal-out 750ms forwards');
    $('body').css('overflow', 'auto');
    $('#modal').fadeOut();
    setTimeout(function(){
      $('.modal-window').css('animation', 'modal-in 750ms forwards');
    }, 500);
    // window.location.replace(window.location.origin + "/form_capil/")
  });
});

app.controller('saksi2', function($scope, data, $cookieStore, $http){
  $scope.jen_kelamin = "Laki - laki"
  var data = data.getOrang();
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
        $('.notifikasi-body').empty();
        $('.notifikasi').css('display', 'flex');
        $('.notifikasi-body').text('NIK tidak valid');
        setTimeout(function(){
          $('.notifikasi').hide();
        },3000);
        $('#nik').focus();
      }
      else
      {
        window.location.replace('pendaftaran.html#!/persetujuan');
        $cookieStore.put('sk_nik2', $scope.nik);
        $cookieStore.put('sk_nama2', $scope.nama);
        $cookieStore.put('sk_org_manado2', 1);
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
        $('.notifikasi-body').empty();
        $('.notifikasi').css('display', 'flex');
        $('.notifikasi-body').text('Masukkan NIK');
        setTimeout(function(){
          $('.notifikasi').hide();
        },3000);
      }
      else if (nama == "" || nama == null)
      {
        $('#nama_lengkap').addClass('input-error');
        $('#nama_lengkap').focus();
        $('.notifikasi-body').empty();
        $('.notifikasi').css('display', 'flex');
        $('.notifikasi-body').text('Masukkan nama lengkap');
        setTimeout(function(){
          $('.notifikasi').hide();
        },3000);
      }
      else if (tanggal_lahir == '' || tanggal_lahir == null)
      {
        $('#tglLahir').addClass('input-error');
        $('#tglLahir').focus();
        $('.notifikasi-body').empty();
        $('.notifikasi').css('display', 'flex');
        $('.notifikasi-body').text('Pilih tanggal lahir');
        setTimeout(function(){
          $('.notifikasi').hide();
        },3000);
      }
      else
      {
        window.location.replace('pendaftaran.html#!/persetujuan');
        $cookieStore.put('sk_nik2', $scope.nik_luar);
        $cookieStore.put('sk_nama2', $scope.nama_lengkap);
        $cookieStore.put('sk_jenis_kelamin2', $scope.jen_kelamin);
        $cookieStore.put('sk_tanggal_lahir2', $scope.tglLahir);
        $cookieStore.put('sk_pekerjaan2', $scope.pekerjaan);
        $cookieStore.put('sk_alamat2', $scope.alamat);
        $cookieStore.put('sk_org_manado2', 0);
      }
    }
  });
  // console.log(data.datepickerSetting());
  $('#tanggal').DateTimePicker();
});

app.controller('saksi1', function($scope, data, $cookieStore, $http){
  var data = data.getOrang();
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
        $('.notifikasi-body').empty();
        $('.notifikasi').css('display', 'flex');
        $('.notifikasi-body').text('NIK tidak valid');
        setTimeout(function(){
          $('.notifikasi').hide();
        },3000);
        $('#nik').focus();
      }
      else
      {
        window.location.replace('pendaftaran.html#!/halaman7');
        $cookieStore.put('sk_nik1', $scope.nik);
        $cookieStore.put('sk_nama1', $scope.nama);
        $cookieStore.put('sk_org_manado1', 1);
      }
    }
    else
    {
      window.location.replace('pendaftaran.html#!/halaman7');
      $cookieStore.put('sk_nik1', $scope.nik_luar);
      $cookieStore.put('sk_nama1', $scope.nama_lengkap);
      $cookieStore.put('sk_tanggal_lahir1', $scope.tglLahir);
      $cookieStore.put('sk_jenis_kelamin1', $scope.jen_kelamin);
      $cookieStore.put('sk_pekerjaan1', $scope.pekerjaan);
      $cookieStore.put('sk_alamat1', $scope.alamat);
      $cookieStore.put('sk_org_manado1', 0);
    }
  })
  $scope.jen_kelamin = 'Laki - laki'
});

app.controller('pelapor', function($scope, dataPenduduk,data, $cookieStore, $http){
  $('#tanggal').DateTimePicker(data.datepickerSetting());
  $scope.jen_kelamin = '1';
  var data = data.getOrang();
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
         $('.notifikasi-body').empty();
         $('.notifikasi').css('display', 'flex');
         $('.notifikasi-body').text('Masukkan NIK');
         setTimeout(function(){
           $('.notifikasi').css('display', 'none');
         }, 3000);
         $('#nik').addClass('input-error');
         $('#nik').focus();
       }
       else if (nama == '' || nama == null)
       {
         $('.notifikasi-body').empty();
         $('.notifikasi').css('display', 'flex');
         $('.notifikasi-body').text('NIK tidak valid');
         setTimeout(function(){
           $('.notifikasi').css('display', 'none');
         }, 3000);
         $('#nik').addClass('input-error');
         $('#nik').focus();
       }
       else
       {
         $cookieStore.put('plr_nik', $scope.nik);
         $cookieStore.put('plr_nama', $scope.nama_pelapor);
         $cookieStore.put('plr_org_manado', 1);
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
        $('.notifikasi-body').empty();
        $('.notifikasi').css('display', 'flex');
        $('.notifikasi-body').text('Masukkan NIK');
        setTimeout(function(){
          $('.notifikasi').css('display', 'none');
        }, 3000);
        $('#nik_luar').addClass('input-error');
        $('#nik_luar').focus();
      }
      else if (nama_pelapor == '' || nama_pelapor == null)
      {
        $('.notifikasi-body').empty();
        $('.notifikasi').css('display', 'flex');
        $('.notifikasi-body').text('Nama tidak boleh kosong');
        setTimeout(function(){
          $('.notifikasi').css('display', 'none');
        }, 3000);
        $('#nama_pelapor').addClass('input-error');
        $('#nama_pelapor').focus();
      }
      else if (tanggal == '' || tanggal == null)
      {
        $('.notifikasi-body').empty();
        $('.notifikasi').css('display', 'flex');
        $('.notifikasi-body').text('Pilih tanggal lahir');
        setTimeout(function(){
          $('.notifikasi').css('display', 'none');
        }, 3000);
        $('#tanggal_lahir').addClass('input-error');
      }
      else if (pekerjaan == '' || pekerjaan == null)
      {
        $('.notifikasi-body').empty();
        $('.notifikasi').css('display', 'flex');
        $('.notifikasi-body').text('Masukkan pekerjaan');
        setTimeout(function(){
          $('.notifikasi').css('display', 'none');
        }, 3000);
        $('#pekerjaan').addClass('input-error');
      }
      else if (alamat == '' || alamat == null)
      {
        $('.notifikasi-body').empty();
        $('.notifikasi').css('display', 'flex');
        $('.notifikasi-body').text('');
        setTimeout(function(){
          $('.notifikasi').css('display', 'none');
        }, 3000);
        $('#tanggal_lahir').addClass('input-error');
      }
      else
      {
        $cookieStore.put('plr_nik', $scope.nik_pelapor);
        $cookieStore.put('plr_nama', $scope.nama);
        $cookieStore.put('plr_tanggal_lahir', moment($scope.tanggal_lahir).format('YYYY-MM-DD'));
        $cookieStore.put('plr_jenis_kelamin', $scope.jen_kelamin);
        $cookieStore.put('plr_pekerjaan', $scope.pekerjaan);
        $cookieStore.put('plr_alamat', $scope.alamat);
        $cookieStore.put('plr_org_manado', 0);
        window.location.replace("pendaftaran.html#!/halaman6")
      }
    }
  })
});

app.controller('ayah', function($scope, data, $cookieStore, $http){
  var data = data.getOrang();
  $scope.orgManado = $cookieStore.get('ibu_org_manado');
  $('#nik').on('blur', function(){
    var nik = $(this).val();
    $http.get(backendUrl + '/ambil_penduduk/' + nik).then(function(resp){
      var val = resp.data.data;
      if (val.jenis_kelamin == '2')
      {
        $('.notifikasi').css('display', 'flex');
        $('.notifikasi-body').empty();
        $('.notifikasi-body').text('NIK atas nama ' +  val.nama +' bukan laki - laki');
        setTimeout(function(){
          $('.notifikasi').css('display', 'none');
        }, 3000)
      }
      else if (val != null)
      {
        $('#nik').removeClass('input-error');
        $('#nik').addClass('input-success');
        $('#nama_ibu').addClass('input-success');
        $scope.nama_ayah = val.nama;
      }
      else
      {
        $('#nik').addClass('input-error');
        $scope.nama_ibu = '';
      }
    });
  });

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
        $('.notifikasi-body').empty();
        $('.notifikasi').css('display', 'flex');
        $('.notifikasi-body').text('Masukkan NIK');
        setTimeout(function(){
          $('.notifikasi').css('display', 'none');
        }, 3000);
        $('#nik').addClass('input-error');
        $('#nik').focus();
      }
      else if (nama == '' || nama == null)
      {
        $('#nik').addClass('input-error');
        $('#nik').focus();
        $('.notifikasi-body').empty();
        $('.notifikasi').css('display', 'flex');
        $('.notifikasi-body').text('NIK tidak valid');
        setTimeout(function(){
          $('.notifikasi').css('display', 'none');
        }, 3000);
      }
      else
      {
        $cookieStore.put('nik_ayah', $scope.nik_ayah);
        $cookieStore.put('nama_ayah', $scope.nama_ayah);
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
        $('.notifikasi-body').empty();
        $('.notifikasi').css('display', 'flex');
        $('.notifikasi-body').text('Masukkan NIK');
        setTimeout(function(){
          $('.notifikasi').css('display', 'none');
        }, 3000);
      }
      else if (nama == '' || nama == null)
      {
        $('#nama_lengkap').addClass('input-error');
        $('#nama_lengkap').focus();
        $('.notifikasi-body').empty();
        $('.notifikasi').css('display', 'flex');
        $('.notifikasi-body').text('Masukkan nama lengkap');
        setTimeout(function(){
          $('.notifikasi').css('display', 'none');
        }, 3000);
      }
      else
      {
        $cookieStore.put('nik_ayah', $scope.nik_luar);
        $cookieStore.put('nama_ayah', $scope.nama_lengkap);
        window.location.replace("pendaftaran.html#!/halaman5")
      }
    }
  });
});

app.controller('ibu', function($scope, data, $cookieStore, $http){
  $('#tanggal').DateTimePicker(data.datepickerSetting());
  $('#nik').on('blur', function(){
    var nik = $(this).val();
    $http.get(backendUrl + '/ambil_penduduk/' + nik).then(function(resp){
      var val = resp.data.data;
      if (val.JENIS_KLMIN == '1')
      {
        $('.notifikasi').css('display', 'flex');
        $('.notifikasi-body').empty();
        $('.notifikasi-body').text('NIK atas nama ' +  val.nama +' bukan perempuan');
        setTimeout(function(){
          $('.notifikasi').css('display', 'none');
        }, 3000)
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
        $('.notifikasi-body').empty();
        $('.notifikasi').css('display', 'flex');
        $('.notifikasi-body').text('Masukkan NIK!');
        setTimeout(function(){
          $('.notifikasi').css('display', 'none');
        }, 3000);
      }
      else if (nama == '' || nama == null)
      {
        $('#nama_ibu').addClass('input-error');
        $('#nik').focus();
        $('.notifikasi-body').empty();
        $('.notifikasi').css('display', 'flex');
        $('.notifikasi-body').text('NIK tidak valid');
        setTimeout(function(){
          $('.notifikasi').css('display', 'none');
        }, 3000);
      }
      else
      {
        $cookieStore.put('nik_ibu', $scope.nik);
        $cookieStore.put('nama_ibu', $scope.nama_ibu);
        $cookieStore.put('ibu_org_manado', 1)
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
        $('.notifikasi-body').empty();
        $('.notifikasi').css('display', 'flex');
        $('.notifikasi-body').text('Masukkan NIK');
        setTimeout(function(){
          $('.notifikasi').css('display', 'none');
        }, 3000);
      }
      else if (nama == '' || nama == null)
      {
        $('#nama_lengkap').addClass('input-error');
        $('#nama_lengkap').focus();
        $('.notifikasi-body').empty();
        $('.notifikasi').css('display', 'flex');
        $('.notifikasi-body').text('Masukkan nama lengkap');
        setTimeout(function(){
          $('.notifikasi').css('display', 'none');
        }, 3000);
      }
      else
      {
        $cookieStore.put('nik_ibu', nik);
        $cookieStore.put('nama_ibu', nama);
        $cookieStore.put('ibu_org_manado', 0);
        window.location.replace("pendaftaran.html#!/halaman4");
      }
    }
  })

});

app.controller('no_kk', function($scope, data, $cookieStore, $http){
  var orang = data.getOrang();
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

  $('#btn').click(function(){
    var nomor = $('#no_kk').val();
    var nama = $('#nama_kk').val();
    if (nomor == '' || nomor == null)
    {
      $('.notifikasi-body').empty();
      $('.notifikasi').css('display', 'flex');
      $('.notifikasi-body').append('Masukkan nomor Kartu Keluarga');
      setTimeout(function(){
        $('.notifikasi').fadeOut();
      },3000);
    }
    else if (nama == '' || nama == '')
    {
      $('.notifikasi-body').empty();
      $('.notifikasi').css('display', 'flex');
      $('.notifikasi-body').append('Nomor Kartu Keluarga tidak valid');
      setTimeout(function(){
        $('.notifikasi').fadeOut();
      },3000);
    }
    else
    {
      $cookieStore.put('no_kk', nomor);
      $cookieStore.put('nama_kepala_keluarga', $scope.nama_kk);
      window.location.replace(baseUrl + '#!/halaman2')
    }
  });
});

app.controller('bayi', function($scope, data, $cookieStore){
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
      $('.notifikasi-body').empty();
      $('.notifikasi').css('display', 'flex');
      $('.notifikasi-body').append('Nama Bayi Kosong=');
      setTimeout(function(){
        $('.notifikasi').fadeOut();
      },2000);
      $('#nama_bayi').addClass('input-error');
      $('#nama_bayi').focus();
      $('#nama_alert').show();
    }// Tanggal lahir
    else if (tempat == "" || tempat == null)
    {
      $('.notifikasi-body').empty();
      $('.notifikasi').css('display', 'flex');
      $('.notifikasi-body').append('Masukkan tempat kelahiran');
      setTimeout(function(){
        $('.notifikasi').fadeOut();
      },2000);
      $('#tempatkel').focus();
      $('#tempatkel').addClass('input-error');
      $('#tmpt_alert').show();
    }
    else if (tgl == "" || tgl == null)
    {
      $('.notifikasi-body').empty();
      $('.notifikasi').css('display', 'flex');
      $('.notifikasi-body').append('Pilih tanggal');
      setTimeout(function(){
        $('.notifikasi').fadeOut();
      },2000);
      $('#tglLahir').addClass('input-error');
      $('#tgl_alert').show();
    }
    else if (jam == '' || jam == null)
    {
      $('.notifikasi-body').empty();
      $('.notifikasi').css('display', 'flex');
      $('.notifikasi-body').append('Pilih jam lahir');
      setTimeout(function(){
        $('.notifikasi').fadeOut();
      },2000);
      $('#jam').addClass('input-error');
      $('#jam').focus();
      $('#jam_alert').show();
    }
    else if (berat == '' || berat == null)
    {
      $('.notifikasi-body').empty();
      $('.notifikasi').css('display', 'flex');
      $('.notifikasi-body').append('Masukkan berat');
      setTimeout(function(){
        $('.notifikasi').fadeOut();
      },2000);
      $('#berat').addClass('input-error');
      $('#berat').focus();
    }
    else if (panjang == '' || panjang == null)
    {
      $('.notifikasi-body').empty();
      $('.notifikasi').css('display', 'flex');
      $('.notifikasi-body').append('Masukkan panjang');
      setTimeout(function(){
        $('.notifikasi').fadeOut();
      },2000);
      $('#panjang').addClass('input-error');
      $('#panjang').focus();
    }
    else
    {
      $cookieStore.put('nama', $scope.nama);
      $cookieStore.put('jenis_kelamin', $scope.jen_kel);
      $cookieStore.put('tempat_dilahirkan', $scope.tempat);
      $cookieStore.put('tempat_kelahiran', $scope.tempatkel);
      $cookieStore.put('tanggal_lahir', $scope.tglLahir);
      $cookieStore.put('jenis_kelahiran', $scope.jen_kelahiran);
      $cookieStore.put('kelahiran_ke', $scope.kelahiran_ke);
      $cookieStore.put('penolong_kelahiran', $scope.penolong_kelahiran);
      $cookieStore.put('berat_bayi', $scope.berat_bayi);
      $cookieStore.put('panjang_bayi', $scope.panjang_bayi);
      $cookieStore.put('waktu_lahir', $scope.jam);
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
  var user = {
    username : "admin",
    password : "admin"
  }

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
      if (hasil == null)
      {
        var pesan = resp.data.message;
        $('.notifikasi').css('display', 'flex');
        $('.notifikasi-body').empty();
        $('.notifikasi-body').text(pesan);
        setTimeout(function(){
          $('.notifikasi').hide();
        },3500);
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
  this.getOrang = function() {
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
      },
      {
        nik : 1234,
        nama : "Seseorang"
      },
      {
        nik : 4321,
        nama : "Alo"
      }
    ]
    return orang;
  }

  this.reqApi = function(url, obj)
  {
  }
})

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

  $(document).on('click', '.btn-modal',function(){
    $('.modal-window').css('animation', 'modal-out 750ms forwards');
    $('body').css('overflow', 'auto');
    $('#modal').fadeOut();
    setTimeout(function(){
      $('.modal-window').css('animation', 'modal-in 750ms forwards');
    }, 500);
  });

  $(document).on('click', '.close',function(){
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
  })
});
