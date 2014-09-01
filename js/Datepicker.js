var app = angular.module('FcamaraPicker', []);
 
app.directive('datePicker', function() {
  return {
      	restrict: 		      'AE',
      	replace: 		        'true',
      	templateUrl:  	    'datePicker.html',
      	scope: {
          rangeEnd:          "=",
          startRange:        "=",
          allowPast:         "=",
          daysWithWindows:   "=",
          dateClicked:       '&dateClicked',
          dateChanged:       '&dateChanged'
    	   },
      	link: 			function(scope, elem, attrs){

          scope.update          = true;
          scope.months          = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];       
          scope.monthPicker     = parseInt(new Date().getMonth(),10);
          scope.addMonth        = function(add){
            scope.dateChanged({date:new Date(new Date().getFullYear(), scope.monthPicker+1, 1)});
            scope.SetDate(add);
          };
          scope.removeMonth     = function(remove){
            scope.dateChanged({date:new Date(new Date().getFullYear(), scope.monthPicker-1, 1)});
            scope.SetDate(remove);
          };
          scope.$watch("startRange",function(newValue,oldValue) {
            scope.SetDate(0);
          });
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
                  status:   "" 
                };
              }else if(firstDay.getDay() < i){
                day = {
                  day:      currentDate.getUTCDate(),
                  month:    currentDate.getMonth(),
                  year:     currentDate.getFullYear(),
                  status:   "" 
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
                    status:   "noWindows"
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
            if (scope.daysWithWindows != undefined) {
              for (var i = scope.daysWithWindows.length - 1; i >= 0; i--) {
                var day = scope.daysWithWindows[i];
                for (var j = scope.weeks.length - 1; j >= 0; j--) {
                  var week = scope.weeks[j];
                  for (var l = week.length - 1; l >= 0; l--){
                    var dayVerify   =  week[l];
                    var dateVerify  = new Date(dayVerify.year, dayVerify.month, dayVerify.day);
                    if (day.getFullYear() == dayVerify.year && 
                        day.getMonth()    == dayVerify.month && 
                        day.getUTCDate()  == dayVerify.day) {
                      dayVerify.status = "windows";
                    }else if (dateVerify >= scope.startRange && dateVerify <= scope.rangeEnd && dayVerify.status != "windows") {
                      dayVerify.status = "noWindows";
                    }else if (dateVerify < scope.startRange || dateVerify > scope.rangeEnd) {
                      dayVerify.status = "noData";
                    }
                  };
                };
              };
            }
          };

          scope.clicked     = function(day){
      			if (day.status == "windows") {
              day.status = "daySelected";
            }else if(day.status == "daySelected") {
              day.status = "windows";
            }
            console.log(scope.dateClicked(
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