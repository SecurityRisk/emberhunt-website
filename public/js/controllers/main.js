angular.module('gameController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Game', function($scope, $http, Game) {
		$scope.formData = {};
		$scope.loading = true;
		$scope.allData = '';

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Game.getFPS()
			.success(function(data) {
				$scope.fps = data;
				$scope.loading = false;
			});

		$scope.getFPS = () => {
			Game.getFPS().success((data) => {
				$scope.loading = false;
				$scope.fps = data;
			});
		};

		$scope.getHelp = () => {
			Game.getHelp().success((data) => {
				$scope.loading = false;
				$scope.help = data;
			});
		};

		$scope.sendCommand = () => {
			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				Game.sendCommand($scope.formData).success((data) => {
					$scope.loading = false;
					$scope.allData += data;
					document.getElementById('send-command').value = '';
					window.setTimeout(() => {
						var elem = document.getElementById('command-window');
						elem.scrollTop = elem.scrollHeight;
					}, 1);
				});
			}
		};
	}]);