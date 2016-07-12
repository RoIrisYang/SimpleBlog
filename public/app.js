//ArticlePaging
(function(angular){
    angular .module('app',['ngComponentRouter'])
        .config(function($locationProvider){
            $locationProvider.html5Mode(true);
        })
        .value('$routerRootComponent', 'app')
        .component('app', {
            template: 
                '<a ng-link="[\'Articles\']"></a>\n' +
                '<ng-outlet></ng-outlet>\n',
            $routeConfig: [
                {path: '/articles/:id', name: 'Articles', component: 'articles'},
            ]
        })
        .component('articles',{
            template:
                '<div ng-repeat="">'
        })
        .component('post',{
            template:

        })
        .component('Edit',{
            template:
        });
    })(window.angular);