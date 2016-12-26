(function () {
    'use strict';

    angular.module('ViberClone')
        .controller('HomeCtrl', HomeCtrl);
    HomeCtrl.$inject = ['$scope', '$ionicModal', '$ionicBackdrop', '$timeout', '$ionicScrollDelegate', '$ionicSlideBoxDelegate', 'chats', 'calls', 'contacts'];

    function HomeCtrl($scope, $ionicModal, $ionicBackdrop, $timeout, $ionicScrollDelegate, $ionicSlideBoxDelegate, chats, calls, contacts) {

        $scope.menu = [
            {
                name: 'CHATS',
                data: []
            },
            {
                name: 'CONTACTS',
                data: []
            },
            {
                name: 'CALLS',
                data: []
            }
        ];

        $scope.ready = [];
        $scope.floatingIcon="ion-plus";
        $timeout(function () 
        {
            //make sure to let the first slide be loaded by giving 'true' to his corresponding key in ready array
            
            $scope.ready[0] = true;
            $scope.menu[0].data = chats.all();
        }, 4000);
  
      

        $scope.$on("$ionicView.afterEnter", function (event, data) {
            //initialisation of ready array to false
            angular.forEach($scope.menu, function (value, key) {
                //To stop loading other slides (pages) make sure to give 'false' to ther corresponding key in ready array
                $scope.ready.push(false);
            });
        });
  
        $scope.onScroll = function () {
            $ionicSlideBoxDelegate.enableSlide(false);
            $timeout(function () {
                $ionicSlideBoxDelegate.enableSlide(true);
            }, 400);
        }

        $scope.changeSlide = function (index) 
        {
            
            
            
                //make sure to let the first slide be loaded by giving 'true' to his corresponding key in ready array
                 switch (index) 
                    {
                    case 0:
                       
                        $scope.floatingIcon="ion-plus";
                        if($scope.menu[0].data.length===0)
                            $timeout(function () 
                            {
                                //simulate API_CALLS requestDelay
                                $scope.menu[0].data = chats.all();
                            }, 1000);
                        break;
                    case 1:
                      
                        $scope.floatingIcon="ion-android-person-add";
                        if($scope.menu[1].data.length===0)
                            $timeout(function () 
                                {
                                    //simulate API_CALLS requestDelay
                                     $scope.menu[1].data = contacts.all();
                                }, 1000);
                        break;
                    case 2:

                        $scope.floatingIcon="ion-grid";                        
                        if($scope.menu[2].data.length===0)
                            $timeout(function () 
                                {
                                    //simulate API_CALLS requestDelay
                                    $scope.menu[2].data = calls.all();
                                }, 1000);
                             $scope.menu[2].data = calls.all();
                        break;
                    }
                //when slide is active : let angular to load it's content 
                $scope.ready[index] = true;
            

        };


        $scope.add = function () 
        {
            $ionicModal.fromTemplateUrl('app/home/ManagePictureModel.html', {
                scope: $scope,
                animation: 'animated pulse'
            }).then(function (modal) 
            {
                $scope.modal = modal;
                $scope.modal.show();
                $scope.hideModal = function (request)
                 {

                    $scope.modal.hide();
                    $scope.modal.remove();
                    
                    //Wait intel the modal close properly
                    $timeout(function () 
                    {
                        if (request === 'editName') 
                        {
                            $scope.showPopup();
                        }

                    }, 1100);

                }

            })
        };


    }

})();