/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var middle = __webpack_require__(1);
	var chatApp = __webpack_require__(2);

	var userAvatarComponent = __webpack_require__(4);
	middle.userAvatarComponent = userAvatarComponent;
	var my_connect = __webpack_require__(5);
	middle.my_connect = my_connect;

	$(function() {

	    $("#init").modal('show');

	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	//  持有 后端 和前台渲染的公共变量
	//  解决互相依赖导致某些前端渲染被超前执行


	var middle = {};

	middle.my_connect = null;
	module.exports = middle;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var middle = __webpack_require__(1);
	var chat = __webpack_require__(3);

	var chatApp = angular.module('chatApp', []);
	console.log(237894897234234);
	chatApp.controller('sign', function($scope, $http) {



	    $scope.signUser = function() {

	        if (undefined === $scope.username || $scope.username.trim() === '') {
	            alert('请输入用户名');
	        } else {
	            $("#init").modal('hide');
	            chat.signinuser.username = $scope.username;
	            middle.my_connect.sign_in($scope.username);
	        }

	    };

	});

	module.exports = chatApp;


/***/ },
/* 3 */
/***/ function(module, exports) {

	// 没有<> 就变成选取元素了
	var templateDiv = $("<div>");

	// 自己的聊天消息
	var chatMsgRight;
	// 他人的聊天消息
	var chatMsgLeft;
	// 聊天窗口
	var chatWindow;

	// TODO 防止缓存的问题
	templateDiv.load('/public/app/template/template.html', function() {

	    chatMsgRight = templateDiv.find("#msg-right>div");
	    chatMsgLeft = templateDiv.find("#msg-left>div");
	    chatWindow = templateDiv.find("#chatWindow>div");

	});

	var msg_input = $("#msg-input");

	$("#msg-input").on('keydown', function(event) {
	    if (event.keyCode === 13) {
	        // 回车
	        say();
	    }
	});

	$("#say").click(function() {
	    say();
	});

	function say() {
	    var msg = msg_input.val();
	    if (msg !== '') {
	        msg_input.val(null);
	        insertChatMsgRight(msg);
	        msgScrollEnd();

	        var letter = {
	            directive: {
	                send: {
	                    message: null
	                }
	            },
	            message: {
	                sendUser: chat.signinuser.username,
	                content: msg
	            }
	        };
	        if (chat.currentChat.username !== null) {
	            // 单聊
	            letter.message.receiveUser = chat.currentChat.username;
	            letter.message.type = 'one';
	        } else {
	            // 群聊
	            letter.message.receiveUser = chat.currentChat.chatname;
	            letter.message.type = 'some';
	        }

	        // 发送到服务器
	        my_connect.sendToUser(letter);
	    }
	}

	var msg_end = $("#msg_end");

	// 聊天框显示出最新的
	function msgScrollEnd() {
	    msg_end[0].scrollIntoView();
	}

	/**
	 * 自己的消息
	 * 一条消息需要名字,时间,头像,内容
	 * @return {[type]} [description]
	 */
	function insertChatMsgRight(content) {
	    var date = new Date();
	    var clone = chatMsgRight.clone();
	    clone.find(".direct-chat-timestamp").html((new Date()).toLocaleTimeString());
	    clone.find(".direct-chat-text").html(content);
	    msg_end.before(clone);

	}

	/**
	 * 对方的消息
	 * @return {[type]} [description]
	 */
	function insertChatMsgLeft(content) {
	    var date = new Date();
	    var clone = chatMsgLeft.clone();
	    clone.find(".direct-chat-timestamp").html((new Date()).toLocaleTimeString());
	    clone.find(".direct-chat-text").html(content);
	    msg_end.before(clone);
	}

	var chat = {};
	chat.users = [];
	chat.currentChat = {
	    username: null,
	    chatname: null
	};

	chat.chatWindow = chatWindow;

	chat.signinuser = {
	    username: null
	};
	// key username value chat window  dom
	chat.chatWindowDom = new Map();

	chat.toggleChatView = function(user) {

	    console.log(chat.chatWindow);

	    var userDom = chat.chatWindowDom.get(user.username);

	    if (userDom === undefined || userDom === null) {
	        userDom = chat.chatWindow.clone();
	        chat.chatWindowDom.set(user.username, userDom);
	        userDom.find('#chatWindow-username').html(user.username);
	    } else {
	        console.log('userdom is not null');
	    }

	    $('#chatWindowDiv').replaceWith(userDom);
	};

	module.exports = chat;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var chat = __webpack_require__(3);
	var userAvatarComponent = {
	    userListScope: null
	};


	angular.module('chatApp').component('userList', {
	    template: `<div>
	                  <div ng-click='toggleChat(user)' ng-repeat='user in users'>
	                      <img class="user-avatar" ng-src='{{user.avatar}}' alt="" />
	                      <span>{{user.username}}</span>
	                  </div>
	                </div>`,
	    controller: function UserListController($scope) {

	        // 使用scope 是因为 在外界改变了 users 的值 为了使用 $scope.$apply方法
	        $scope.users = chat.users;
	        userAvatarComponent.userListScope = $scope;
	        $scope.toggleChat = function(user) {
	            chat.currentChat.username = user.username;

	            chat.toggleChatView(user);

	        };
	    }
	});

	module.exports = userAvatarComponent;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var my_config = __webpack_require__(6);
	var chat = __webpack_require__(3);
	var middle = __webpack_require__(1);

	function Pubsub() {
	    this.handlers = {};
	}

	Pubsub.prototype = {
	    on: function(eventType, handler) {
	        var self = this;
	        if (!(eventType in self.handlers)) {
	            self.handlers[eventType] = [];
	        }
	        self.handlers[eventType].push(handler);
	        return this;
	    },
	    emit: function(eventType) {
	        var self = this;
	        if (self.handlers[eventType] !== undefined) {
	            var handlerArgs = arguments.slice(1);
	            for (var i = 0; i < self.handlers[eventType].length; i++) {
	                // 调用方法传递参数
	                // 参数都来自于发出事件时的参数
	                self.handlers[eventType][i].apply(self, handlerArgs);
	            }
	        } else {
	            // 没有此事件的监听者
	        }
	        return this;
	    },
	    addEvent: function(eventType) {
	        if (!(eventType in this.handlers)) {
	            this.handlers[eventType] = [];
	        }
	        return this;
	    }
	};

	var pubsub = new Pubsub();
	// 初始化事件
	pubsub.addEvent("signinBack");
	pubsub.addEvent("signoutBack");
	pubsub.addEvent("msgfromUser");
	pubsub.addEvent('chat');

	// 连接到指定主机
	var socket = io(my_config.communication_server_host);

	// 以下是socketio 的内部事件
	socket.on('connect', function() {
	    console.log("已连接到服务器");

	});

	socket.on('event', function(data) {

	});

	socket.on('disconnect', function() {

	});

	socket.on('error', function(obj) {
	    console.log(obj);
	});

	socket.on('reconnect', function(number) {
	    console.log(number);
	});

	socket.on('reconnecting', function(number) {
	    console.log(number);
	});

	socket.on('reconnet_error', function(obj) {
	    console.log(obj);
	});

	/**
	 * letter 是自定义的消息事件
	 */
	socket.on('letter', function(letter) {
	    console.log(letter);
	    // letter = JSON.parse(letter);

	    var key = Object.keys(letter.directive)[0];

	    if (directive[key] === undefined) {
	        console.log('directive ' + key + ' 未实现');
	    } else {
	        directive[key](letter);

	    }

	});

	/**
	 * 聊天消息回调
	 * @param content
	 */
	function chatBack(content) {
	    pubsub.emit('chat', content);
	}

	/**
	 * 登录事件回调
	 * @param content
	 */
	function signInBack(content) {
	    console.log("sign in success!");
	    pubsub.emit("signinBack", content);
	}

	/**
	 * 登出事件回调
	 * @param content
	 */
	function signOutBack(content) {
	    pubsub.emit("signoutBack", content);
	}

	var my_connect = {};

	/**
	 * content 是json 对象
	 * @param optype
	 * @param content
	 */
	my_connect.deliver = function(letter) {
	    socket.emit("letter", JSON.stringify(letter));

	    console.log("deliver = " + JSON.stringify(letter));
	};

	my_connect.sendToUser = function(letter) {
	    my_connect.deliver(letter);
	};

	my_connect.sign_in = function(username) {
	    var letter = {
	        directive: {
	            client: {
	                sign_in: null
	            }
	        },
	        user: {
	            username: username
	        }
	    };
	    my_connect.deliver(letter);
	};

	my_connect.user_presence = function(letter) {

	};

	/**
	 * 通知服务器 本人用户名字
	 * @param  {[type]} username [description]
	 * @return {[type]}          [description]
	 */
	my_connect.setUsername = function(username) {
	    // letter 如果不指定收件人,则 postoffice 处理
	    // var letter = {};
	    var letter = {
	        directive: {
	            set: {
	                username: username
	            }
	        }
	    };
	    my_connect.deliver(letter);

	};

	function Directive() {

	}

	Directive.prototype.client = function(letter) {
	    var client = {};
	    // 有其他用户上线时会调用
	    client.user_presence = function(letter) {
	        var user = letter.user;
	        user.avatar = genereateAvatarImg();
	        chat.users.push(user);
	        middle.userAvatarComponent.userListScope.$apply();
	    };
	    // 登陆后加载当前已经登录的用户
	    client.init_userList = function(letter) {

	        // 这样使用  第二个参数是参数数组, 而其正好就是一个数组
	        Array.prototype.push.apply(chat.users, letter.directive.client.init_userList);

	        chat.users.forEach(function(user) {
	            user.avatar = genereateAvatarImg();
	        });

	        console.log(chat.users);
	        middle.userAvatarComponent.userListScope.$apply();

	    };
	    var key = Object.keys(letter.directive.client);
	    client[key](letter);

	};

	// 随机生成一个用户的头像
	function genereateAvatarImg() {
	    return '/public/app/img/avatar/avatar' + (Math.floor(Math.random() * 5) + 1) + '.png';
	}

	Directive.prototype.receive = function(letter) {
	    var message = letter.message;
	};

	var directive = new Directive();

	module.exports = my_connect;


/***/ },
/* 6 */
/***/ function(module, exports) {

	var my_config = {
	    // 通讯服务器地址
	    communication_server_host: 'http://localhost:23234'
	        // communication_server_host : 'http://127.0.0.1:3000'
	};

	module.exports = my_config;


/***/ }
/******/ ]);