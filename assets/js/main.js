var app = angular.module('capil', ['ngRoute']);
var baseUrl = window.location.origin + "/form_capil";

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
    window.location.replace(baseUrl + "/#!/"+ halamanBerikut);
  }

  $scope.submit = function()
  {
    var data = {};
  }
})
