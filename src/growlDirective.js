angular.module("angular-growl").directive(["$rootScope", function ($rootScope) {

	return {
		restrict: 'A',
		template:   '<div class="growl" ng-show="showMessages()" style="position: fixed; top: 10px; right: 10px; float: right; width: 250px;">' +
					'	<div class="alert" ng-repeat="message in messages" ng-class="computeClasses(message)">' +
					'		<button type="button" class="close" ng-click="deleteMessage(message)">&times;</button>' +
					'		<h4 ng-if="message.heading">{{ message.heading |translate}}</h4>' +
		            '            {{ message.text | translate}}' +
					'	</div>' +
					'</div>',
		replace: false,
		scope: true,
		controller: function ($scope) {
			$scope.messages = [];

			$scope.showMessages = function () {
				return $scope.messages.length > 0;
			};

			$rootScope.$on("growlMessage", function (event, message) {
				$scope.messages.push(message);
			});

			$rootScope.$on("growlMessages", function (event, messages) {
				$scope.messages = $scope.messages.concat(messages);
			});

			$scope.deleteMessage = function (message) {
				var index = $scope.messages.indexOf(message);
				if (index > -1) {
					$scope.messages.splice(index, 1);
				}

			};

			$scope.computeClasses = function (message) {
				return {
					'alert-success': message.isSuccess,
					'alert-error': message.isError,
					'alert-info': message.isInfo
				};
			}
		}
	};
}]);
