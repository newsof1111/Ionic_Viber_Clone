var slidingTabsDirective = angular.module("ionic").directive('ionSlideTabs', ['$timeout', '$compile', '$interval', '$ionicSlideBoxDelegate', '$ionicScrollDelegate', '$ionicGesture', '$ionicPopup', function ($timeout, $compile, $interval, $ionicSlideBoxDelegate, $ionicScrollDelegate, $ionicGesture, $ionicPopup) {
    return {
        require: "^ionSlideBox",
        restrict: 'A',
        link: function (scope, element, attrs, parent) {

            var ionicSlideBoxDelegate;
            var ionicScrollDelegate;
            var ionicScrollDelegateID;

            var slideTabs;
            var indicator;

            var slider;
            var tabsBar;

            var options = {
                "slideTabsScrollable": false
            }


            var init = function () {


                var tabItems = '<li ng-repeat="(key, value) in tabs" ng-click="onTabTabbed($event, {{key}})" class="slider-slide-tab" ng-bind-html="value"></li>';


                tabsBar = angular.element('<div class="slidingTabs"><ul>' + tabItems + '</ul> <div class="tab-indicator-wrapper"><div class="tab-indicator"></div></div> </div>');




                slider = angular.element(element);
                shrinkHelper = angular.element('<div style="height: 68px"></div>');
                var compiled = $compile(tabsBar);
                slider.parent().prepend(tabsBar);
                slider.parent().prepend(shrinkHelper);


                compiled(scope);



                indicator = angular.element(tabsBar[0].querySelector(".tab-indicator"));
                indicatorSelector = tabsBar[0].querySelector(".tab-indicator");

                //get the slideBoxHandle
                var slideHandle = slider.attr('delegate-handle');

                ionicSlideBoxDelegate = $ionicSlideBoxDelegate;
                if (slideHandle) {
                    ionicSlideBoxDelegate = ionicSlideBoxDelegate.$getByHandle(slideHandle);
                }


                if (options.slideTabsScrollable) {

                    ionicScrollDelegate = $ionicScrollDelegate;


                }


                addEvents();
                setTabBarWidth();
                slideToCurrentPosition();
            };

            var addEvents = function () {

                ionic.onGesture("dragleft", scope.onSlideMove, slider[0]);
                ionic.onGesture("dragright", scope.onSlideMove, slider[0]);
                ionic.onGesture("release", scope.onSlideChange, slider[0]);

            }

            var setTabBarWidth = function () {

                if (!angular.isDefined(slideTabs) || slideTabs.length == 0) {
                    return false;
                }

                tabsList = tabsBar.find("ul");






                slideTabs.css("width", "33.33%");

                slideToCurrentPosition();

            };



            var slideToCurrentPosition = function () {

                if (!angular.isDefined(slideTabs) || slideTabs.length == 0) {
                    return false;
                }

                var targetSlideIndex = ionicSlideBoxDelegate.currentIndex();

                var targetTab = angular.element(slideTabs[targetSlideIndex]);
                var targetLeftOffset = targetTab.prop("offsetLeft");


                ionic.requestAnimationFrame(function () {
                    indicatorSelector.style[ionic.CSS.TRANSFORM] = "translate(" + targetLeftOffset + "px,0px)";

                });



                slideTabs.removeClass("tab-active");
                targetTab.addClass("tab-active");

            }


            var setIndicatorPosition = function (currentSlideIndex, targetSlideIndex, position, slideDirection) {

                var targetTab = angular.element(slideTabs[targetSlideIndex]);

                var currentTab = angular.element(slideTabs[currentSlideIndex]);
                var targetLeftOffset = targetTab.prop("offsetLeft");

                var currentLeftOffset = currentTab.prop("offsetLeft");
                var offsetLeftDiff = Math.abs(targetLeftOffset - currentLeftOffset);


                if (currentSlideIndex == 0 && targetSlideIndex == ionicSlideBoxDelegate.slidesCount() - 1 && slideDirection == "right" ||
                    targetSlideIndex == 0 && currentSlideIndex == ionicSlideBoxDelegate.slidesCount() - 1 && slideDirection == "left") {
                    return;
                }

                var targetWidth = targetTab[0].offsetWidth;
                var currentWidth = currentTab[0].offsetWidth;
                var widthDiff = targetWidth - currentWidth;
                var indicatorPos = 0;

                if (currentSlideIndex > targetSlideIndex) 
                {

                    indicatorPos = targetLeftOffset - (offsetLeftDiff * (position - 1));

                }
                else if (targetSlideIndex > currentSlideIndex) 
                {

                    indicatorPos = targetLeftOffset + (offsetLeftDiff * (position - 1));

                }


                ionic.requestAnimationFrame(function ()
                {
                    indicatorSelector.style[ionic.CSS.TRANSFORM] = "translate(" + indicatorPos + "px,0px)";

                });




                if (options.slideTabsScrollable && ionicScrollDelegate) {
                    var scrollOffset = 40;
                    ionicScrollDelegate.scrollTo(indicatorPos - scrollOffset, 0, false);
                }

            }

            scope.onTabTabbed = function (event, index) {
                ionicSlideBoxDelegate.slide(index);
                slideToCurrentPosition();
            }

            scope.tabs = [];

            scope.addTabContent = function ($content) {

                scope.tabs.push($content);
                scope.$apply();

                $timeout(function () {
                    slideTabs = angular.element(tabsBar[0].querySelector("ul").querySelectorAll(".slider-slide-tab"));
                    slideToCurrentPosition();
                    setTabBarWidth()
                })

            }

            scope.onSlideChange = function (slideIndex) 
            {
                slideToCurrentPosition();
            };

            scope.onSlideMove = function ()
             {
                var scrollDiv = slider[0].getElementsByClassName("slider-slide");

                var currentSlideIndex = ionicSlideBoxDelegate.currentIndex();
                var currentSlide = angular.element(scrollDiv[currentSlideIndex]);
                var currentSlideLeftOffset = currentSlide.css('-webkit-transform').replace(/[^0-9\-.,]/g, '').split(',')[0];

                var targetSlideIndex = (currentSlideIndex + 1) % scrollDiv.length;
                if (currentSlideLeftOffset > slider.prop("offsetLeft")) {
                    targetSlideIndex = currentSlideIndex - 1;
                    if (targetSlideIndex < 0) {
                        targetSlideIndex = scrollDiv.length - 1;
                    }
                }
                var targetSlide = angular.element(scrollDiv[targetSlideIndex]);

                var position = currentSlideLeftOffset / slider[0].offsetWidth;
                var slideDirection = position > 0 ? "right" : "left";
                position = Math.abs(position);

                setIndicatorPosition(currentSlideIndex, targetSlideIndex, position, slideDirection);
            };

            init();
        },
        controller: ['$scope', function ($scope) {
            this.addTab = function ($content) {
                $timeout(function () {
                    if ($scope.addTabContent) 
                    {
                        $scope.addTabContent($content);
                    }
                });
            }
        }]
    };
}]);

slidingTabsDirective.directive('ionSlideTabLabel', ['$ionicPopup', '$timeout', function ($ionicPopup, $timeout) {
    return {
        require: "^ionSlideTabs",
        link: function ($scope, $element, $attrs, $parent) {

            $parent.addTab($attrs.ionSlideTabLabel);

        }
    }
}]);