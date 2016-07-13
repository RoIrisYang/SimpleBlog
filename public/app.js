//ArticlePaging
(function(angular){
    angular.module('app',['ngComponentRouter'])
        .config(function($locationProvider){
            $locationProvider.html5Mode(true);
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
            ]
        })
        .component('articles',{//home
            template:
                '<a ng-link="[\'Post\']"><button type="button" class="btn btn-primary">POST<span class="glyphicon glyphicon-hand-up"></span></button></a>\n' +
                '<div id="t"><table class="table-hover" id="table">'+
                    '<thead><tr>'+
                        '<th width="33%">Date</th>' +
                        '<th width="60%">Title</th>' +
                        '<th width="25%">Author</th>' +
                    '</tr></thead>' +
                    '<tbody id="tb" ng-repeat="data in alldata"><tr>' +
                        '<td>{{data.Create.substring(0, 10)}}</td>' +
                        '<td><a ng-link="[\'Detail\',{id: data.id}]">{{data.Title}}</a></td>'+
                        '<td>{{data.Author}}</td></tr>' +
                    '</tbody>' +
                '</table></div>',
            controller: listing               
        })
        .component('post',{ //posting page
            template:
                '<h1>Posting Page</h1>\n' +
                '<form role="form" id="t form" method="POST">' +
                    '<div class="form-group">' +
                        '<label for="Title">Title</label>' +
                        '<input type="text" class="form-control" name="title">' +
                    '</div>'+
                    '<div class="form-group">'+
                        '<label for="author">Author</label>'+
                        '<input type="author" class="form-control" name="author">'+
                    '</div>'+
                    '<div class="form-group">' +
                        '<label for="article">Article</label>' +
                        '<textarea class="form-control" rows="5" name="article"></textarea>' +
                    '</div>' +
                '</form>' +
                '<a ng-link="[\'Articles\']"><button id="post" class="btn btn-success">Post</button></a>\n'+
                '<a ng-link="[\'Articles\']"><button id="cancel" class="btn btn-default">Cancel</button></a>\n',
            controller: posting                
        })
        .component('detail', {
            template:
                '<h3>{{data.Title}}</h3>' +
                '<a ng-link="[\'Articles\']"><button id="cancel" class="btn btn-default">Back</button></a>'+
                '<button id="edit" class="btn btn-warning pull-right">Edit</button>'+
                '<button id="delete" class="btn btn-danger pull-right">Delete</button>',                
            controller: selecting
        });
    })(window.angular);

function listing($scope, $http){
    $http({method: 'GET', url: '/articles'}).then(
        function successCallback(response) {
            $scope.alldata = response.data;
        }, function errorCallback(response) {
            alert("Error");
        });
}

function selecting($scope){
    
}

function posting(){
     $('#post').click(function(){
        $.ajax({
            type: "POST",
            url: "/posting",
            data: $('form').serialize(),
            success: function(data)
            {
               // alert("data in\n" + data);
            }
        })
    });
}