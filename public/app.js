//ArticlePaging
(function(angular){
    angular.module('app',['ngComponentRouter'])
        .config(function($locationProvider){
            $locationProvider.html5Mode(false);
        })
        .value('$routerRootComponent', 'app')
        .component('app', {
            template: 
                '<a ng-link="[\'Articles\']"></a>\n' +
                '<ng-outlet></ng-outlet>\n',
            $routeConfig: [
                {path: '/', name: 'Articles', component: 'articles', useAsDefault: true},//home
                {path: '/articles/:id', name: 'Detail', component: 'detail'},//each articles
                {path: '/post', name: 'Post', component: 'post'},//posting page
                {path: '/articles/:id/edit', name: 'Edit', component: 'edit'},//editing page
            ]
        })
        .component('articles',{//home
            template:
                '<a ng-link="[\'Post\']"><button type="button" class="btn btn-primary">POST<span class="glyphicon glyphicon-hand-up"></span></button></a>\n' +
                '<div id="t"><table class="table-hover" id="table">'+
                    '<thead><tr>'+
                        '<th width="33%">Date</th>' +
                        '<th width="57%">Title</th>' +
                        '<th width="25%">Author</th>' +
                    '</tr></thead>' +
                    '<tbody id="tb" ng-repeat="data in $ctrl.alldata"><tr>' +
                        '<td>{{data.Create.substring(0, 10)}}</td>' +
                        '<td><a ng-link="[\'Detail\',{id: data._id}]">{{data.Title}}</a></td>'+
                        '<td>{{data.Author}}</td></tr>' +
                    '</tbody>' +
                '</table></div>',
            controller: listing               
        })
        .component('post',{ //posting page
            template:
               '<form role="form" id="t form">' +
                    '<div class="form-group">' +
                        '<label for="Title">Title</label>' +
                        '<input type="text" class="form-control" name="title" ng-model="$ctrl.data.Title">' +
                    '</div>'+
                    '<div class="form-group">'+
                        '<label for="author">Author</label>'+
                        '<input type="author" class="form-control" name="author" ng-model="$ctrl.data.Author">'+
                    '</div>'+
                    '<div class="form-group">' +
                        '<label for="article">Article</label>' +
                        '<textarea class="form-control" rows="5" name="article" ng-model="$ctrl.data.Content"></textarea>' +
                    '</div>' +
                '</form>' +
                '<a ng-link="[\'Articles\']"><button id="post" class="btn btn-success" ng-click="$ctrl.post()">Post</button></a>\n'+
                '<a ng-link="[\'Articles\']"><button id="cancel" class="btn btn-default">Cancel</button></a>\n',
            controller: posting                
        })
        .component('detail', {
            template:
                '<div class="panel"><h2>{{$ctrl.data.Title}}</h2>\n' +
                '<h5>{{$ctrl.data.Create|date}}</h5>\n' +
                '<br>'+
                '<p style="font-size:16px">{{$ctrl.data.Content}}</p>' +
                '<p class="pull-right">Post by {{$ctrl.data.Author}}, {{$ctrl.data.UpDate|date}} {{$ctrl.data.UpDate| date:"shortTime"}}</p></div>'+

                '<div class="panel-footer"><a ng-link="[\'Articles\']"><button id="cancel" class="btn btn-default">Back</button></a>'+
                '<a ng-link="[\'Articles\']"><button id="delete" class="btn btn-danger pull-right" ng-click="$ctrl.dele()">Delete</button></a>'+
                '<a ng-link="[\'Edit\',{id: $ctrl.data._id}]"><button class="btn btn-warning pull-right">Edit</button></a></div>',                
            controller: selecting
        })
        .component('edit',{
            template:
                '<form role="form" id="t form">' +
                    '<div class="form-group">' +
                        '<label for="Title">Title</label>' +
                        '<input type="text" class="form-control" name="title" ng-model="$ctrl.data.Title">' +
                    '</div>'+
                    '<div class="form-group">'+
                        '<label for="author">Author</label>'+
                        '<input type="author" class="form-control" name="author" ng-model="$ctrl.data.Author">'+
                    '</div>'+
                    '<div class="form-group">' +
                        '<label for="article">Article</label>' +
                        '<textarea class="form-control" rows="5" name="article" ng-model="$ctrl.data.Content"></textarea>' +
                    '</div>' +
                '</form>' +
                '<div class="panel-footer"><a ng-link="[\'Articles\']"><button id="edit" class="btn btn-warning pull-right" ng-click="$ctrl.edit()">Edit</button></a>'+
                '<a ng-link="[\'Articles\']"><button id="cancel" class="btn btn-default pull-right">Cancel</button></a><div><br>',
            controller: editing
        });
    })(window.angular);

function listing($http){
    var $ctrl = this;
    $http({method: 'GET', url: '/api/articles'}).then(
        function successCallback(response) {
            $ctrl.alldata = response.data;
        }, function errorCallback(response) {
            alert("Error");
        });
}

function selecting($http){
    var $ctrl = this;
    var id;
    this.$routerOnActivate = function(next) {
        id = next.params.id;
        $http({method: 'GET', url: '/api/articles/' + id }).then(
        function successCallback(response){
            $ctrl.data = response.data;
        },function errorCallback(response){
            alert("id error!");
        });
    };

   this.dele = function(){
        $http({method: 'DELETE', url: '/api/articles/'+ id}).then(
            function success(response){
                //alert("Delete success.");
            },function error(response){
                alert("Fail to Delete.");
            });
   };
}

function editing($http){
    var $ctrl = this;
    var id;
    this.$routerOnActivate = function(next) {
        id = next.params.id;
        $http({method: 'GET', url: '/api/articles/' + id }).then(
        function successCallback(response){
            $ctrl.data = response.data;
        },function errorCallback(response){
            alert("id error!");
        });
    };
    this.edit = function(){
        //alert("do put");
        $http({method: 'PUT', url: '/api/articles/' + id, data: this.data}).then(
            function success(response){
               // alert("Edit success.");
            },function error(response){
                alert("Fail to Edit.");
            });
    };
}

function posting($http){
    this.post = function(){
        $http({method: 'POST', url: '/posting', data: this.data}).then(
             function success(response){
                 //alert("Post success.");
             },function error(response){
                 alert("Post Error.");
             });
    };
}