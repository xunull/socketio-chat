requirejs.config({
    // baseUrl 一般是针对自己写的js文件使用
    baseUrl: '/public/app/js',
    paths: {
        jquery: '../../libs/jquery/jquery-2.2.3',
        bootstrapjs: '../../libs/bootstrap/js/bootstrap',
        socketio: '../../libs/socket.io/socket.io',
        angular: '../../libs/angular/angular'
    },
    shim: {
        'bootstrapjs': {
            deps: ['jquery']
        },
        'angular': {
            exports: 'angular'
        }
    }
});

// requirejs 的一个问题是出错不好定位问题
requirejs(['jquery', 'bootstrapjs', 'socketio', 'connect', 'chat'], function($, socketio) {
    $("#init").modal('show');
});


requirejs.onError = function(err) {
    console.log('requirejs 加载出错');
    console.log(err.requireType);

    throw err;
};
