//esse é o seu controller
function DatePickerController($scope){
	$scope.mes = [{nome:"Fevereiro"},{nome:"Março"}];
	$scope.getDisplayName = function(day) {        
        return day.day;
    };
}