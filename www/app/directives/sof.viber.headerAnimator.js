angular.module('sof.viber.headerAnimator', [])

  .directive('viberHeaderAnimator', function ($document, $ionicGesture,$timeout) {


    return {
      restrict: 'A',
      link: function ($scope, $element, $attr) {
        var is_down = false;
        var is_up = false;
        var is_Left_OR_Right = false;
        var distance = 0;


        var header = $document[0].body.querySelectorAll('.bar-royal.viber-bar.bar.bar-header');
        var headerHeight = header[0].offsetHeight;

        function Action()
         {
              var slidingTabs = $document[0].body.querySelector('.slidingTabs');
              var slider = $document[0].body.querySelector('.slider');
              var floating_button = $document[0].body.querySelector('#floating-button');

              ionic.requestAnimationFrame(function () 
                {
                   slidingTabs.style[ionic.CSS.TRANSFORM] = 'translate3d(0, ' + distance + 'px, 0)';
                      header[0].style[ionic.CSS.TRANSFORM] = 'translate3d(0, ' + (distance+1) + 'px, 0)';
                      header[1].style[ionic.CSS.TRANSFORM] = 'translate3d(0, ' + distance*2 + 'px, 0)';
                      
                      slider.style[ionic.CSS.TRANSFORM] = 'translate3d(0, ' + distance + 'px, 0)';
                      floating_button.style[ionic.CSS.TRANSFORM] = 'translate3d(0, ' + -(distance*2-5) + 'px, 0)';

                    //  for (var i = 0, j = header[1].children.length; i < j; i++)
                      //  {
                             // header[1].children[i].style.opacity = 1 - (-distance / (headerHeight / 2));
							 // header[1].children[i].style[ionic.CSS.TRANSFORM] = 'translate3d(0, ' + distance + 'px, 0)';
                     //   }
                     
                        
                });
        }

        var dragupfunction = function (e) 
        {
         
          if (distance > -40 && !is_Left_OR_Right) 
          {
            distance = distance - 5;
             if (distance < -40 ) 
                {
                  distance=-40;
                }
            Action();
            is_down = false;
            is_up = true;
          }
        }
        var dragdownFunction = function (e) {
        
          if (distance < -2  && !is_Left_OR_Right) 
          {
            distance = distance + 5;
             if (distance > -2 ) 
                {
                  distance=-2;
                }

            Action();
            is_down = true;
            is_up = false;
          }

        }
        var dragendFunction = function (e) 
        {
              
              if (is_up && !is_Left_OR_Right) 
              {

                for (var j = distance; j > -40; j--) 
                {
                  distance = j;
                   $timeout(function() {
                      Action();
                    }, 100);
                }

              }
              if (is_down && !is_Left_OR_Right) 
              {
                for (var j = distance; j < 0; j++) 
                {
                  distance = j;
                   $timeout(function() {
                      Action();
                   }, 100);
                }
              }
          is_Left_OR_Right = false;
        }

        var dragLeftRightFunction = function (e) 
        {
           // console.log(e.gesture.distance);
         if(e.gesture.distance>50)
            is_Left_OR_Right = true;

        }
        
var events = [{
        event: 'dragup'
        },{
        event: 'dragdown'
        },{
        event: 'dragleft'
        },{
        event: 'dragend'
        },{
        event: 'dragright'
        }];
angular.forEach(events, function(obj){
var dragGesture = $ionicGesture.on(obj.event, function (event)
   {
      if (obj.event === 'dragdown')
      { dragdownFunction(event); }
      if (obj.event === 'dragup')
      { dragupfunction(event); }
      if (obj.event === 'dragend')
      { dragendFunction(event); }
      if (obj.event === 'dragright'||obj.event === 'dragleft')
      { dragLeftRightFunction(event); }

    }, $element);
}); 

      }
    }
  })

