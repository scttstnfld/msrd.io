var app = angular.module('myApp', [])

  app.factory('RdList', ['$http', function ($http) {
        return{
            get: function(callback){
                $http.get('rdlist.json').success(function(item){
                    item.forEach(function (data){
                        data.FullName = data.First + ' ' + data.Last;
                        if(data.GravatarHash){
                          data.Avatar = 'http://www.gravatar.com/avatar/' + data.GravatarHash;
                        }
                        else{
                          data.Avatar = 'http://placekitten.com/g/100/100';
                        }
                    });
                    callback(item);
                });
            }
        };
    }]);


    app.controller('DataCtrl', function($scope, RdList, $filter) {

        RdList.get(function(data){

            $scope.items = data;

            $scope.$watch('searchText', function(query){
                $scope.displayedItems = $filter('filter')($scope.items, query);

                if($scope.displayedItems.length >= 76){
                    $scope.displayView = 'one';
                }
                if($scope.displayedItems.length <= 75 && $scope.displayedItems.length >= 21){
                    $scope.displayView = 'two';
                }
                if($scope.displayedItems.length <= 20){
                    $scope.displayView = 'three';
                }
            });

        });
    });
