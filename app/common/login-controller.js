/*global define*/
'use strict';

define([], function () {

  function LoginController($scope, $stateParams, $state, $modal, $aside, $q, $http, Identify3D){

    var self = this;

    self.dummyPromise = null;

    self.loginForm = {};

    self.loginError = null;

    self.login = function (form){

      self.loginError = null;

      if(!form.$invalid) {

        Identify3D.doBureauLogin(self.loginForm).then(function (m) {

          $state.go("identify3D.statistics", {}, { reload:true, location:'replace' });

        }, function (m) {
 					 //  self.loginError = m.error;
            self.loginError = "Incorrect username or password.";
 			  });

      } else {
        self.loginError = "Incorrect username or password.";

      }

    }

  }

  return {'LoginController': ['$scope', '$stateParams', '$state', '$modal', '$aside', '$q', '$http', 'Identify3DObject', LoginController]};
});
