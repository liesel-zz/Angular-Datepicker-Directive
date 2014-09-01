//esse é o seu controller
function DatePickerController($scope){
	var d1 				= new Date(2014,08,01);
	var d2 				= new Date(2014,08,02);
	var d3 				= new Date(2014,08,20);
	$scope.startRange 	= new Date(2014,08,01);
	$scope.rangeEnd 	= new Date(2014,08,29);
	
	$scope.windows 		= [d1,d2, d3];
	$scope.dateSelected = function(day) {        
        return day;
    };
    $scope.dateChanged = function(date){
    	if (date.getMonth() == 9) {
    		var d1 				= new Date(2014,09,11);
			var d2 				= new Date(2014,09,12);
			var d3 				= new Date(2014,09,17);
			$scope.startRange 	= new Date(2014,09,11);
			$scope.rangeEnd 	= new Date(2014,09,19);
			$scope.windows 		= [d1,d2, d3];
    		console.log(date);
    	};
    }
}