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
    	var d = date.getMonth();
    	var y = date.getFullYear();
    		var d1 				= new Date(y,d,11);
			var d2 				= new Date(y,d,12);
			var d3 				= new Date(y,d,17);
			$scope.startRange 	= new Date(y,d,11);
			$scope.rangeEnd 	= new Date(y,d,19);
			$scope.windows 		= [d1,d2, d3];
    		console.log(date);
    }
}