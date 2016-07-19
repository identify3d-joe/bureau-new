/*global define*/
'use strict';

define([], function () {

  function AssignOrderController($window, $q, $scope, $rootScope, $stateParams, $state, $modal, $aside, $modalInstance, Identify3D, orderData, devicesData, confirmationDialogService, orderFormData){

    var self = this;

    $scope.isArray = angular.isArray;
    $scope.isObject = angular.isObject;
    $scope.extend = angular.extend;

    self.order = angular.extend({}, orderData);

    self.prescription = angular.extend({}, orderData);
    self.prescription.patient = angular.extend({}, orderData.patient);

    self.printers = devicesData;

    self.selectedPrinter = null;

    self.orderForm = angular.extend({}, orderFormData);

    delete self.orderForm.DesignRules.deviceDefinitions;

    self.isEditing = !!orderData;

    self.ok = function(e) {
      $modalInstance.close();
      e.stopPropagation();
    };

    self.cancel = function(e) {
    };

    self.printJob = function(Lform){

      if(Lform.$invalid) {

        confirmationDialogService('md', 'Marked (*) fields are required.', false, true)
        .result
        .then(function (userResponse) {
        }, function (userResponse) {
          //this should never happen i.e cancelButton=false
        });
        return;
      }

      var blockingUI = $q.defer();
      self.myPromise = blockingUI.promise;

      function unblockAndNavigateToParentWithReload(){
        blockingUI.resolve();
        $state.go("^", $stateParams, {reload: true});
      }

      Identify3D.doBureauSubmitJob(self.order.designId, self.selectedPrinter.deviceId, self.selectedPrinter.url, self.orderForm)
      .then(function(user){

        unblockAndNavigateToParentWithReload();

      },function(locationMeta){

        confirmationDialogService('md', locationMeta.error, false, true)
        .result
        .then(function (userResponse) {
          blockingUI.reject();
        }, function (userResponse) {
          //this should never happen i.e cancelButton=false
        });

      });

    }

    self.downloadJob = function(Lform){

      if(Lform.$invalid) {

        confirmationDialogService('md', 'Marked (*) fields are required.', false, true)
        .result
        .then(function (userResponse) {
        }, function (userResponse) {
          //this should never happen i.e cancelButton=false
        });
        return;
      }

      var blockingUI = $q.defer();
      self.myPromise = blockingUI.promise;

      function unblockAndNavigateToParentWithReload(fileData){
        blockingUI.resolve();
        $state.go("^", $stateParams, {reload: true});

        setTimeout(function() {
          var dlUri = Identify3D.getDownloadUri(fileData);
          $window.location.href = dlUri;
        }, 1000);


      }

      Identify3D.doBureauSaveJob(self.order.designId, self.selectedPrinter.deviceId, self.selectedPrinter.url, self.orderForm)
      .then(function(fileData){

        unblockAndNavigateToParentWithReload(fileData);

      },function(locationMeta){

        confirmationDialogService('md', locationMeta.error, false, true)
        .result
        .then(function (userResponse) {
          blockingUI.reject();
        }, function (userResponse) {
          //this should never happen i.e cancelButton=false
        });

      });

    }

    self.cancelJob = function() {
      confirmationDialogService('md', 'Are you sure you want to cancel?', true, false)
      .result
      .then(function (userResponse) {
        console.log("cancel job", self.order.designId);

        return cancelJob(self.order.designId);

      }, function (userResponse) {
        //this should never happen i.e cancelButton=false
      });
    }


    var cancelJob = function(designId){

      var blockingUI = $q.defer();
      self.myPromise = blockingUI.promise;

      function unblockAndNavigateToParentWithReload(){
        blockingUI.resolve();
        $state.go("^", $stateParams, {reload: true});
      }

      Identify3D.doBureauCancelJob(designId)
      .then(function(data){

        unblockAndNavigateToParentWithReload();

      },function(meta){

        confirmationDialogService('md', meta.error, false, true)
        .result
        .then(function (response) {
          blockingUI.reject();
        }, function (response) {
          //this should never happen i.e cancelButton=false
        });

      });

    }

    self.openDOBCal = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      self.isDOBCalOpen = true;
    };

    self.myButtonLabels = {
      rotateLeft: ' Rotate Left',
      rotateRight: 'Rotate Right',
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
      fit: 'Fit',
      crop: 'Crop'
    }
  }

  return {'AssignOrderController': ['$window', '$q','$scope', '$rootScope', '$stateParams', '$state', '$modal', '$aside', '$modalInstance', 'Identify3DObject', 'orderData', 'devicesData', 'confirmationDialogService', 'orderFormData', AssignOrderController]};
});
