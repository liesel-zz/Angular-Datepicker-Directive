var app = angular.module('myapp', []);
 
app.directive('datePicker', function() {
  return {
      	restrict: 		'AE',
      	replace: 		'true',
      	templateUrl:  	'datePicker.html',
      	scope: {
      		mes: '='
    	},
      	link: 			function(scope, elem, attrs){
      		scope.rua           = "Nabuco de Araújo";
          scope.months        = ["Janeiro", "Fevereiro", "Março", "Abril", "Mario", "Junho", "Julho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro" ];       
          var date            = new Date(), y = date.getFullYear(), m = date.getMonth();
          scope.m             = (m+1);
          var firstDay        = new Date(y, m, 1);
          var lastDay         = new Date(y, m + 1, 0);
          scope.weeks         = [];
          var weekDays        = [];
          var currentDate     = new Date(y ,m , 2);
          for (var i = 0; i <= 6; i++) {
            var day = {};
            if (firstDay.getDay() == i){
              day = {
                day:      firstDay.getUTCDate(),
                month:    firstDay.getMonth(),
                year:     firstDay.getFullYear(),
                status:   "noWindows" 
              };
            }else if(firstDay.getDay() < i){
              day = {
                day:      currentDate.getUTCDate(),
                month:    currentDate.getMonth(),
                year:     currentDate.getFullYear(),
                status:   "windows" 
              };
              currentDate = new Date(y ,m , currentDate.getUTCDate()+1);
            }else{
              day = {
                day:      "",
                month:    "",
                year:     "",
                status:   "noData"
              };
            }
            weekDays[i] = day;
          };
          scope.weeks[0] = weekDays;
          for (var i = currentDate.getUTCDate(); i <= lastDay.getUTCDate(); i++) {
            weekDays = [];
            for (var j = 0; j <= 6; j++) {
              if (currentDate.getMonth() == lastDay.getMonth()) {
                day = {
                  day:      currentDate.getUTCDate(),
                  month:    currentDate.getMonth(),
                  year:     currentDate.getFullYear(),
                  status:   "windows"
                  
                };  
              }else{
                day = {
                  day:    "",
                  month:  "",
                  year:   "",
                  status: "noData"
                };
              }
              weekDays[j]     = day;
              if (currentDate.getUTCDate() < lastDay.getUTCDate() && currentDate.getMonth() == lastDay.getMonth()) {
                i               = currentDate.getUTCDate();
              }else{
                i = 34;
              }  
              if (currentDate.getUTCDate() == lastDay.getUTCDate() || currentDate.getMonth() != lastDay.getMonth()) {
                 currentDate     = new Date(y ,m+1 , currentDate.getUTCDate()+1);
              }else{
                currentDate     = new Date(y ,m , currentDate.getUTCDate()+1);
              }
              
            };    
            scope.weeks[scope.weeks.length] = weekDays;

          };
          scope.clicado     = function(dia){
      			
      		}
//      		elem.bind('click', function() {
  //      		elem.css('background-color', 'white');
    //    		scope.$apply(function() {
      //    			scope.color = "white";
        //		});
      	//	});
      	//	elem.bind('mouseover', function() {
        //		elem.css('cursor', 'pointer');
      	//	});
    	}
  };
});