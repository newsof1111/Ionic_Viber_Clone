(function () {
    'use strict';

    angular.module('ViberClone')
        .controller('MenuCtrl', MenuCtrl);
    MenuCtrl.$inject = ['$scope', '$ionicPlatform', '$ionicModal', '$ionicPopup', '$timeout'];

    function MenuCtrl($scope, $ionicPlatform, $ionicModal, $ionicPopup, $timeout) {

        $scope.user =
            {
                fullName: "Soufien Karray"
            };
        //***************PROFIL_PICTURE EDITOR*************
        $scope.showModal = function () {

            $ionicModal.fromTemplateUrl('app/home/ManagePictureModel.html', {
                scope: $scope,
                animation: 'animated pulse',
                hideDelay: 1020
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();
                $scope.hideModal = function (request) {

                    $scope.modal.hide();
                    $scope.modal.remove();
                    //Wait intel the modal close properly
                    $timeout(function () {
                        if (request === 'editName') {
                            $scope.showPopup();
                        }

                    }, 1100);

                }

            })
        };

        //***************PROFIL_PICTURE EDITOR/EDIT_NAME*************

        $scope.showPopup = function () {
            $scope.data = {};
            //  
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<form ng-submit ="keyPressed($event)" style="    display: flex;"><input type="text" ng-model="user.fullName"></form>',
                title: 'Viber name',
                cssClass: 'editNamePopup',
                scope: $scope,
                buttons: [
                    {
                        text: 'SAVE',
                        type: 'button button-clear button-royal',
                        onTap: function (e) {

                            return $scope.user.fullName;

                        }
                    }
                    ,
                    {
                        text: 'CANCEL',
                        type: 'button button-clear button-royal editNamePopupCancel'
                    }
                ]
            });

            myPopup.then(function (res) {
                console.log('Tapped!', res);
            });





        };


        //*****LETS FORCE ANGULAR TO CLOSE KEYBOARD ON 'GO' button******
        $scope.keyPressed = function ($event) {
            $timeout(function () {
                angular.element($event.target).find('input')[0].blur();

            });
        };


    }

})();