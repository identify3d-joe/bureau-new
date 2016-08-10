/*global define*/
'use strict';

define([], function () {

  function ValidatorModalController($q, $scope, $rootScope, $stateParams, $state, $modal, $aside, $modalInstance, Identify3D, serverResponse, confirmationDialogService){

    var self = this;

    self.isObject = angular.isObject;
    self.isArray = angular.isArray;

    self.isWorking = true;

    self.status = true;
    self.certificate = true;
    self.device = true;
    self.expiration = true;
    self.quantity = true;

    self.success = false;


    setTimeout(function(){

      serverResponse.serverResponse.then(function(fileData){

        console.log("succ", fileData);

        self.success = true;
        self.isWorking = false;

        self.status = true;
        self.certificate = true;
        self.device = true;
        self.expiration = true;
        self.quantity = true;



      },function(meta){

        console.log("erro::", meta);

        self.success = false;
        self.isWorking = false;

        self.status = false;
        self.certificate = false;

        self.device = meta.httpStatus === 445 ? false : undefined;
        self.expiration = meta.httpStatus === 451 ? false : undefined;
        self.quantity = meta.httpStatus === 452 ? false : undefined;
        self.parameterMismatch = meta.parameterMismatch === 454 ? false : undefined;

      });


    }, 1400);



    self.ok = function(e) {
      $modalInstance.close();
      // e.stopPropagation();
    };

    self.cancel = function(e) {
      $modalInstance.dismiss();
      // e.stopPropagation();
    };


  }

  return {'ValidatorModalController': ['$q','$scope', '$rootScope', '$stateParams', '$state', '$modal', '$aside', '$modalInstance', 'Identify3DObject', 'serverResponse', 'confirmationDialogService', ValidatorModalController]};
});
