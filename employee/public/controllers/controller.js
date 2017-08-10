var empApp = angular.module('empApp', []);
empApp.controller('emp-app-controller', ['$scope', '$http', function($scope, $http) {    
    
  var updateView=function(){
         $http.get('/employee').success(function(response) {
		 console.log(response);
         $scope.employees = response; 
         $scope.employee="";
        });
  };

  updateView();
  
    $scope.addEmployee = function() {
      $http.post('/employee', $scope.employee).success(function(response) {
        updateView();
      })
	  .error(function(error){
          if(error.responseText == 'showAlert')
              alert("Please enter correct user name and password.")
	  });
    };
    
    $scope.removeEmployee = function(id) {
      $http.delete('/employee/' + id).success(function(response) {
          updateView();
      });
    };
    
    $scope.editEmployee = function(id) {
      $http.get('/employee/' + id).success(function(response) {
      $scope.employee = response;
     });
   };
    
    $scope.updateEmployee = function() {
     $http.put('/employee/' + $scope.employee._id, $scope.employee).success(function(response) {
       updateView();
     });
    };
    

}]);




