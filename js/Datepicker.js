var app = angular.module('FcamaraPicker', []);
 
app.directive('datePicker', function() {
  return {
      	restrict: 		'AE',
      	replace: 		'true',
      	templateUrl:  	'datePicker.html',
      	scope: {
          startDate:"@",
          allowPast: "=",
          callBackMethod:'&dateClicked'
    	   },
      	link: 			function(scope, elem, attrs){
          scope.months          = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];       
          scope.monthPicker     = parseInt(new Date().getMonth(),10);
          
          scope.SetDate         = function(monthToAdd){
            scope.monthPicker   = scope.monthPicker+monthToAdd;
            var actualDate      = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
            var date            = new Date(new Date().getFullYear(), scope.monthPicker, 1), y = date.getFullYear(), m = date.getMonth();
            if (actualDate > date && !scope.allowPast) {
              scope.monthPicker = scope.monthPicker-monthToAdd; 
              return false;
            };
            scope.m             = m;
            scope.y             = y;
            var firstDay        = new Date(y, m, 1);
            var lastDay         = new Date(y, m + 1, 0);
            scope.weeks         = [];
            var weekDays        = [];
            var currentDate     = new Date(y ,m , 2);
            for (var i = 0; i <= 6; i++){
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
          };

          scope.clicked     = function(day){
      			if (day.status == "windows") {
              day.status = "daySelected";
            }else if(day.status == "daySelected") {
              day.status = "windows";
            }
            console.log(scope.callBackMethod(
              {
                day:{
                  day:    day.day,
                  month:  day.month,
                  year:   day.year,
                  status: day.status
                }
              }
            )); 
      		}
          scope.SetDate(0);
    	}
  };
});