webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	__webpack_require__(1);

	__webpack_require__(3);

	__webpack_require__(4);

	var _todo = __webpack_require__(8);

	var _todo2 = _interopRequireDefault(_todo);

	var _ng_model = __webpack_require__(25);

	var _ng_model2 = _interopRequireDefault(_ng_model);

	var _editableArea = __webpack_require__(26);

	var _editableArea2 = _interopRequireDefault(_editableArea);

	var _dragable = __webpack_require__(32);

	var _dragable2 = _interopRequireDefault(_dragable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	angular.module('TEST', ['ui.router', _todo2.default, _ng_model2.default, _editableArea2.default, _dragable2.default]).config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
	    'ngInject';

	    console.log('in config');
	    $stateProvider.state('root', {
	        url: '/root',
	        views: {
	            'root': {
	                template: __webpack_require__(38)
	            }
	        }
	    }).state('app', {
	        abstract: true,
	        url: '/app',
	        views: {
	            'root': {
	                template: __webpack_require__(39)
	            }
	        }
	    });
	    $urlRouterProvider.otherwise('/root');
	}]);

	/**
	 * 顺序
	 * config
	 * run
	 * directive compile
	 * controller 由外到内
	 * directive controller
	 * directive pre
	 * directive post
	 *
	 */
	/**
	 * Created by xiyuyizhi on 17-1-3.
	 */

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _todoForm = __webpack_require__(9);

	var _todoForm2 = _interopRequireDefault(_todoForm);

	var _todoList = __webpack_require__(13);

	var _todoList2 = _interopRequireDefault(_todoList);

	var _radio = __webpack_require__(17);

	var _radio2 = _interopRequireDefault(_radio);

	var _todo = __webpack_require__(21);

	var _todo2 = _interopRequireDefault(_todo);

	__webpack_require__(22);

	var _service = __webpack_require__(24);

	var _service2 = _interopRequireDefault(_service);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by xiyuyizhi on 17-1-4.
	 */

	var instruct = "TODO\u5C0F\u529F\u80FD\uFF0C\u4E3B\u8981\u7EC3\u4E60component\u65B9\u6CD5,\u5C06\u529F\u80FD\u6309\u7EC4\u4EF6\u5212\u5206,\u7236\u5B50\u7EC4\u4EF6\u4E4B\u95F4\u7684\u6570\u636E\u4EA4\u6D41\u3002";

	exports.default = angular.module('TODO', [_todoForm2.default, _todoList2.default, _radio2.default]).component('todo', {
		template: _todo2.default,
		controller: ["$scope", "service", function controller($scope, service) {
			'ngInject';

			var _this = this;

			var ctrl = this;
			this.$onInit = function () {
				this.todoList = [];
				service.getList().then(function (data) {
					ctrl.todoList = data || [];
				});
			};

			this.handler = {
				addNew: function addNew(_ref) {
					var newTodo = _ref.newTodo;

					_this.todoList.unshift(newTodo);
					_this.todoList = angular.copy(_this.todoList);
					service.update(_this.todoList);
				},
				dele: function dele(_ref2) {
					var index = _ref2.index;


					_this.todoList[index].todo = false;
					_this.todoList = _this.todoList.concat(_this.todoList.splice(index, 1));
					service.update(_this.todoList);
				},
				reset: function reset() {
					_this.todoList = [];
					service.update(null);
					$scope.$broadcast('reset', true);
				}
			};
		}]
	}).service('service', _service2.default).config(["$stateProvider", function ($stateProvider) {

		$stateProvider.state('todo', {
			parent: 'app',
			url: '/todo',
			views: {
				'default@app': {
					template: instruct
				},
				'content@app': {
					//component:'todo'
					template: '<todo></todo>'
				}
			}
		});
	}]).name;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _todoform = __webpack_require__(10);

	var _todoform2 = _interopRequireDefault(_todoform);

	__webpack_require__(11);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by xiyuyizhi on 17-1-3.
	 */

	exports.default = angular.module('todoForm', []).directive('todoForm', function () {
		return {

			scope: {
				nCallback: '&'
			},
			template: _todoform2.default,
			bindToController: true,
			controllerAs: '$ctrl',
			controller: ["$scope", function controller($scope) {
				var _this = this;

				var ctrl = this;

				this.$onInit = function () {
					this.todo = {
						content: ''
					};
				};

				this.handler = {
					enter: function enter(e) {
						if (e.keyCode == 13) {
							_this.todo['todo'] = true;
							_this.todo['id'] = new Date().getTime();
							_this.nCallback({
								$event: {
									newTodo: angular.copy(_this.todo)
								}
							});
							_this.todo.content = '';
						}
					}
				};

				$scope.$on('reset', function (data, data1) {
					_this.todo.content = '';
				});
			}]
		};
	}).name;

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"todo-form\">\n    <label>todo:</label>\n    <input type=\"text\" ng-model=\"$ctrl.todo.content\" ng-keypress=\"$ctrl.handler.enter($event)\">\n</div>\n";

/***/ },
/* 11 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 12 */,
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _todolist = __webpack_require__(14);

	var _todolist2 = _interopRequireDefault(_todolist);

	__webpack_require__(15);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by xiyuyizhi on 17-1-4.
	 */

	exports.default = angular.module('todoList', []).component('todoList', {

		template: _todolist2.default,
		bindings: {
			nList: '<',
			onHandleDele: '&'
		},
		controller: ["$scope", function controller($scope) {
			var ctrl = this;

			this.$onInit = function () {
				console.log('init....');
				console.log(this.nList);
			};

			this.$onChanges = function (changes) {
				console.log('change......');
				if (changes.nList) {
					this.theList = angular.copy(this.nList);
				}
			};

			this.dele = function (_ref) {
				var index = _ref.index;

				this.onHandleDele({
					$event: {
						index: index
					}
				});
			};
		}]

	}).name;

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = "\n<ul class=\"todo-list\">\n    <li ng-repeat=\"item in $ctrl.theList track by item.id\">\n        <div ng-if=\"item.todo\">\n            <radio n-index=\"{{$index}}\" n-callback=\"$ctrl.dele($event)\"></radio>\n            <span>{{item.content}}</span>\n        </div>\n        <div ng-if=\"!item.todo\">\n            <span class=\"del\">{{item.content}}</span>\n        </div>\n    </li>\n</ul>";

/***/ },
/* 15 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 16 */,
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _radio = __webpack_require__(18);

	var _radio2 = _interopRequireDefault(_radio);

	__webpack_require__(19);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by xiyuyizhi on 17-1-4.
	 */

	exports.default = angular.module('radioModule', []).directive('radio', function () {

		return {

			template: _radio2.default,
			controllerAs: '$ctrl',
			bindToController: true,
			scope: {
				nIndex: '@',
				nCallback: '&'
			},
			controller: ["$scope", "$element", "$attrs", function controller($scope, $element, $attrs) {
				var ctrl = this;
				ctrl.switch = {
					on: false
				};
				this.handler = {
					click: function click() {
						ctrl.switch['on'] = !ctrl.switch['on'];
						if (ctrl.switch['on']) {
							ctrl.nCallback({
								$event: {
									index: Number(ctrl.nIndex)
								}
							});
						}
					}
				};
			}]
		};
	}).name;

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = "\n<span class=\"radio-circle\">\n    <span class=\"radio-inner-circle\"\n          ng-class=\"{active:$ctrl.switch.on}\"\n          ng-click=\"$ctrl.handler.click()\"></span>\n</span>";

/***/ },
/* 19 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 20 */,
/* 21 */
/***/ function(module, exports) {

	module.exports = "<div class=\"todo\">\n    <todo-form n-callback=\"$ctrl.handler.addNew($event)\"></todo-form>\n    <todo-list  n-list=\"$ctrl.todoList\" on-handle-dele=\"$ctrl.handler.dele($event)\"></todo-list>\n    <div class=\"reset\">\n        <button class=\"btn\" ng-click=\"$ctrl.handler.reset()\">清空</button>\n    </div>\n</div>\n\n";

/***/ },
/* 22 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 23 */,
/* 24 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Created by xiyuyizhi on 17-1-5.
	 */

	var TodoService = function () {
	  TodoService.$inject = ["$q"];
	  function TodoService($q) {
	    'ngInject';

	    _classCallCheck(this, TodoService);

	    this.$q = $q;
	  }

	  _createClass(TodoService, [{
	    key: 'getList',
	    value: function getList() {

	      var defer = this.$q.defer();
	      var list = [];
	      if (localStorage.getItem('todo') != 'null') {
	        setTimeout(function () {
	          list = JSON.parse(localStorage.getItem('todo'));
	          defer.resolve(list);
	        }, 0);
	      } else {
	        defer.resolve(list);
	      }

	      return defer.promise;
	    }
	  }, {
	    key: 'update',
	    value: function update(item) {

	      localStorage.setItem('todo', JSON.stringify(item));
	    }
	  }]);

	  return TodoService;
	}();

	exports.default = TodoService;

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/**
	 * Created by xiyuyizhi on 17-1-17.
	 */

	var html = '\n\t\tNgModelController provides API for the ngModel directive. The controller contains services for data-binding, validation, CSS updates, and value formatting and parsing. It purposefully does not contain any logic which deals with DOM rendering or listening to DOM events. Such DOM related logic should be provided by other directives which make use of NgModelController for data-binding to control elements. Angular provides this DOM logic for most input elements. At the end of this page you can find a custom control example that uses ngModelController to bind to contenteditable elements.\n\t\t<hr/>\n\t\t<ul>\n\t\t\t<li>$render</li>\n\t\t\t<li>$rollbackViewValue()</li>\n\t\t\t<li>$setViewValue(value, trigger)</li>\n\t\t\t<li>$parsers ngModelController.$parsers(function(value){ })</li>\n\t\t\t<li>$formatters ngModelController.formatters(function(value){ })</li>\t\n\t\t</ul>\n\t';

	exports.default = angular.module('NGMODEL', []).directive('customModel', function () {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function link(scope, element, attr, modelCtrl) {
				modelCtrl.$parsers.push(function (value) {
					if (value.length > 5) {
						value = value.slice(0, 5);
						modelCtrl.$setViewValue(value);
					}
					element.val(value);
					return value;
				});
			}
		};
	}).config(["$stateProvider", function ($stateProvider) {

		$stateProvider.state('model', {
			parent: 'app',
			url: '/model',
			views: {
				'default': {
					template: html
				},
				'content': {
					template: '<input custom-model="" ng-model="form.username">\n \t\t\t\t\t\t\t\t<span>\u6D4B\u8BD5\u6700\u591A\u8F93\u51655\u4E2A\u5B57\u7B26</span><br>\n\t\t\t\t\t\t\t\tusername: {{form.username}}',
					controller: ["$scope", function controller($scope) {
						'ngInject';

						$scope.form = {
							username: ''
						};
					}]
				}
			}
		});
	}]).name;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	__webpack_require__(27);

	__webpack_require__(29);

	/**
	 * Created by xiyuyizhi on 17-1-17.
	 */

	var img = __webpack_require__(31);
	console.log(img);

	var html = "<img src=\"" + img + "\">";

	exports.default = angular.module('CustomEditable', ['ngSanitize']).directive('customEditor', ["$sce", function ($sce) {
		'ngInject';

		return {
			restrict: 'A',
			require: 'ngModel',
			link: function link(scope, element, attrs, ngModel) {
				console.log(ngModel);
				if (!ngModel) return;

				ngModel.$render = function () {
					console.log(ngModel.$viewValue);
					element.html($sce.getTrustedHtml(ngModel.$viewValue));
				};

				element.on('blur keyup change', function () {
					scope.$evalAsync(read);
				});

				function read() {
					var html = element.html();
					if (attrs.stripBr && html === '<br>') {
						html = '';
					}
					ngModel.$setViewValue(html);
				}
			}
		};
	}]).config(["$stateProvider", function ($stateProvider) {
		$stateProvider.state('editable', {
			parent: 'app',
			url: '/editable',
			views: {
				'default': {
					template: html
				},
				'content': {
					template: "<div class=\"custom-editor\" contenteditable=\"true\" custom-editor ng-model=\"form.text\">\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<p>\u53CC\u5411\u7ED1\u5B9A\u7684\u5185\u5BB9:{{form.text}}</p>\n\t\t\t\t\t\t\t",
					controller: ["$scope", function controller($scope) {
						'ngInject';

						$scope.form = {
							text: '请输入内容~'
						};
					}]
				}
			}
		});
	}]).name;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(28);
	module.exports = 'ngSanitize';


/***/ },
/* 28 */
/***/ function(module, exports) {

	/**
	 * @license AngularJS v1.6.1
	 * (c) 2010-2016 Google, Inc. http://angularjs.org
	 * License: MIT
	 */
	(function(window, angular) {'use strict';

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 *     Any commits to this file should be reviewed with security in mind.  *
	 *   Changes to this file can potentially create security vulnerabilities. *
	 *          An approval from 2 Core members with history of modifying      *
	 *                         this file is required.                          *
	 *                                                                         *
	 *  Does the change somehow allow for arbitrary javascript to be executed? *
	 *    Or allows for someone to change the prototype of built-in objects?   *
	 *     Or gives undesired access to variables likes document or window?    *
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

	var $sanitizeMinErr = angular.$$minErr('$sanitize');
	var bind;
	var extend;
	var forEach;
	var isDefined;
	var lowercase;
	var noop;
	var htmlParser;
	var htmlSanitizeWriter;

	/**
	 * @ngdoc module
	 * @name ngSanitize
	 * @description
	 *
	 * # ngSanitize
	 *
	 * The `ngSanitize` module provides functionality to sanitize HTML.
	 *
	 *
	 * <div doc-module-components="ngSanitize"></div>
	 *
	 * See {@link ngSanitize.$sanitize `$sanitize`} for usage.
	 */

	/**
	 * @ngdoc service
	 * @name $sanitize
	 * @kind function
	 *
	 * @description
	 *   Sanitizes an html string by stripping all potentially dangerous tokens.
	 *
	 *   The input is sanitized by parsing the HTML into tokens. All safe tokens (from a whitelist) are
	 *   then serialized back to properly escaped html string. This means that no unsafe input can make
	 *   it into the returned string.
	 *
	 *   The whitelist for URL sanitization of attribute values is configured using the functions
	 *   `aHrefSanitizationWhitelist` and `imgSrcSanitizationWhitelist` of {@link ng.$compileProvider
	 *   `$compileProvider`}.
	 *
	 *   The input may also contain SVG markup if this is enabled via {@link $sanitizeProvider}.
	 *
	 * @param {string} html HTML input.
	 * @returns {string} Sanitized HTML.
	 *
	 * @example
	   <example module="sanitizeExample" deps="angular-sanitize.js" name="sanitize-service">
	   <file name="index.html">
	     <script>
	         angular.module('sanitizeExample', ['ngSanitize'])
	           .controller('ExampleController', ['$scope', '$sce', function($scope, $sce) {
	             $scope.snippet =
	               '<p style="color:blue">an html\n' +
	               '<em onmouseover="this.textContent=\'PWN3D!\'">click here</em>\n' +
	               'snippet</p>';
	             $scope.deliberatelyTrustDangerousSnippet = function() {
	               return $sce.trustAsHtml($scope.snippet);
	             };
	           }]);
	     </script>
	     <div ng-controller="ExampleController">
	        Snippet: <textarea ng-model="snippet" cols="60" rows="3"></textarea>
	       <table>
	         <tr>
	           <td>Directive</td>
	           <td>How</td>
	           <td>Source</td>
	           <td>Rendered</td>
	         </tr>
	         <tr id="bind-html-with-sanitize">
	           <td>ng-bind-html</td>
	           <td>Automatically uses $sanitize</td>
	           <td><pre>&lt;div ng-bind-html="snippet"&gt;<br/>&lt;/div&gt;</pre></td>
	           <td><div ng-bind-html="snippet"></div></td>
	         </tr>
	         <tr id="bind-html-with-trust">
	           <td>ng-bind-html</td>
	           <td>Bypass $sanitize by explicitly trusting the dangerous value</td>
	           <td>
	           <pre>&lt;div ng-bind-html="deliberatelyTrustDangerousSnippet()"&gt;
	&lt;/div&gt;</pre>
	           </td>
	           <td><div ng-bind-html="deliberatelyTrustDangerousSnippet()"></div></td>
	         </tr>
	         <tr id="bind-default">
	           <td>ng-bind</td>
	           <td>Automatically escapes</td>
	           <td><pre>&lt;div ng-bind="snippet"&gt;<br/>&lt;/div&gt;</pre></td>
	           <td><div ng-bind="snippet"></div></td>
	         </tr>
	       </table>
	       </div>
	   </file>
	   <file name="protractor.js" type="protractor">
	     it('should sanitize the html snippet by default', function() {
	       expect(element(by.css('#bind-html-with-sanitize div')).getAttribute('innerHTML')).
	         toBe('<p>an html\n<em>click here</em>\nsnippet</p>');
	     });

	     it('should inline raw snippet if bound to a trusted value', function() {
	       expect(element(by.css('#bind-html-with-trust div')).getAttribute('innerHTML')).
	         toBe("<p style=\"color:blue\">an html\n" +
	              "<em onmouseover=\"this.textContent='PWN3D!'\">click here</em>\n" +
	              "snippet</p>");
	     });

	     it('should escape snippet without any filter', function() {
	       expect(element(by.css('#bind-default div')).getAttribute('innerHTML')).
	         toBe("&lt;p style=\"color:blue\"&gt;an html\n" +
	              "&lt;em onmouseover=\"this.textContent='PWN3D!'\"&gt;click here&lt;/em&gt;\n" +
	              "snippet&lt;/p&gt;");
	     });

	     it('should update', function() {
	       element(by.model('snippet')).clear();
	       element(by.model('snippet')).sendKeys('new <b onclick="alert(1)">text</b>');
	       expect(element(by.css('#bind-html-with-sanitize div')).getAttribute('innerHTML')).
	         toBe('new <b>text</b>');
	       expect(element(by.css('#bind-html-with-trust div')).getAttribute('innerHTML')).toBe(
	         'new <b onclick="alert(1)">text</b>');
	       expect(element(by.css('#bind-default div')).getAttribute('innerHTML')).toBe(
	         "new &lt;b onclick=\"alert(1)\"&gt;text&lt;/b&gt;");
	     });
	   </file>
	   </example>
	 */


	/**
	 * @ngdoc provider
	 * @name $sanitizeProvider
	 * @this
	 *
	 * @description
	 * Creates and configures {@link $sanitize} instance.
	 */
	function $SanitizeProvider() {
	  var svgEnabled = false;

	  this.$get = ['$$sanitizeUri', function($$sanitizeUri) {
	    if (svgEnabled) {
	      extend(validElements, svgElements);
	    }
	    return function(html) {
	      var buf = [];
	      htmlParser(html, htmlSanitizeWriter(buf, function(uri, isImage) {
	        return !/^unsafe:/.test($$sanitizeUri(uri, isImage));
	      }));
	      return buf.join('');
	    };
	  }];


	  /**
	   * @ngdoc method
	   * @name $sanitizeProvider#enableSvg
	   * @kind function
	   *
	   * @description
	   * Enables a subset of svg to be supported by the sanitizer.
	   *
	   * <div class="alert alert-warning">
	   *   <p>By enabling this setting without taking other precautions, you might expose your
	   *   application to click-hijacking attacks. In these attacks, sanitized svg elements could be positioned
	   *   outside of the containing element and be rendered over other elements on the page (e.g. a login
	   *   link). Such behavior can then result in phishing incidents.</p>
	   *
	   *   <p>To protect against these, explicitly setup `overflow: hidden` css rule for all potential svg
	   *   tags within the sanitized content:</p>
	   *
	   *   <br>
	   *
	   *   <pre><code>
	   *   .rootOfTheIncludedContent svg {
	   *     overflow: hidden !important;
	   *   }
	   *   </code></pre>
	   * </div>
	   *
	   * @param {boolean=} flag Enable or disable SVG support in the sanitizer.
	   * @returns {boolean|ng.$sanitizeProvider} Returns the currently configured value if called
	   *    without an argument or self for chaining otherwise.
	   */
	  this.enableSvg = function(enableSvg) {
	    if (isDefined(enableSvg)) {
	      svgEnabled = enableSvg;
	      return this;
	    } else {
	      return svgEnabled;
	    }
	  };

	  //////////////////////////////////////////////////////////////////////////////////////////////////
	  // Private stuff
	  //////////////////////////////////////////////////////////////////////////////////////////////////

	  bind = angular.bind;
	  extend = angular.extend;
	  forEach = angular.forEach;
	  isDefined = angular.isDefined;
	  lowercase = angular.lowercase;
	  noop = angular.noop;

	  htmlParser = htmlParserImpl;
	  htmlSanitizeWriter = htmlSanitizeWriterImpl;

	  // Regular Expressions for parsing tags and attributes
	  var SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
	    // Match everything outside of normal chars and " (quote character)
	    NON_ALPHANUMERIC_REGEXP = /([^#-~ |!])/g;


	  // Good source of info about elements and attributes
	  // http://dev.w3.org/html5/spec/Overview.html#semantics
	  // http://simon.html5.org/html-elements

	  // Safe Void Elements - HTML5
	  // http://dev.w3.org/html5/spec/Overview.html#void-elements
	  var voidElements = toMap('area,br,col,hr,img,wbr');

	  // Elements that you can, intentionally, leave open (and which close themselves)
	  // http://dev.w3.org/html5/spec/Overview.html#optional-tags
	  var optionalEndTagBlockElements = toMap('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr'),
	      optionalEndTagInlineElements = toMap('rp,rt'),
	      optionalEndTagElements = extend({},
	                                              optionalEndTagInlineElements,
	                                              optionalEndTagBlockElements);

	  // Safe Block Elements - HTML5
	  var blockElements = extend({}, optionalEndTagBlockElements, toMap('address,article,' +
	          'aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,' +
	          'h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,section,table,ul'));

	  // Inline Elements - HTML5
	  var inlineElements = extend({}, optionalEndTagInlineElements, toMap('a,abbr,acronym,b,' +
	          'bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,' +
	          'samp,small,span,strike,strong,sub,sup,time,tt,u,var'));

	  // SVG Elements
	  // https://wiki.whatwg.org/wiki/Sanitization_rules#svg_Elements
	  // Note: the elements animate,animateColor,animateMotion,animateTransform,set are intentionally omitted.
	  // They can potentially allow for arbitrary javascript to be executed. See #11290
	  var svgElements = toMap('circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,' +
	          'hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,' +
	          'radialGradient,rect,stop,svg,switch,text,title,tspan');

	  // Blocked Elements (will be stripped)
	  var blockedElements = toMap('script,style');

	  var validElements = extend({},
	                                     voidElements,
	                                     blockElements,
	                                     inlineElements,
	                                     optionalEndTagElements);

	  //Attributes that have href and hence need to be sanitized
	  var uriAttrs = toMap('background,cite,href,longdesc,src,xlink:href');

	  var htmlAttrs = toMap('abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,' +
	      'color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,' +
	      'ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,' +
	      'scope,scrolling,shape,size,span,start,summary,tabindex,target,title,type,' +
	      'valign,value,vspace,width');

	  // SVG attributes (without "id" and "name" attributes)
	  // https://wiki.whatwg.org/wiki/Sanitization_rules#svg_Attributes
	  var svgAttrs = toMap('accent-height,accumulate,additive,alphabetic,arabic-form,ascent,' +
	      'baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,' +
	      'cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,' +
	      'font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,' +
	      'height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,' +
	      'marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,' +
	      'max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,' +
	      'path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,' +
	      'requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,' +
	      'stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,' +
	      'stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,' +
	      'stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,' +
	      'underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,' +
	      'width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,' +
	      'xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan', true);

	  var validAttrs = extend({},
	                                  uriAttrs,
	                                  svgAttrs,
	                                  htmlAttrs);

	  function toMap(str, lowercaseKeys) {
	    var obj = {}, items = str.split(','), i;
	    for (i = 0; i < items.length; i++) {
	      obj[lowercaseKeys ? lowercase(items[i]) : items[i]] = true;
	    }
	    return obj;
	  }

	  var inertBodyElement;
	  (function(window) {
	    var doc;
	    if (window.document && window.document.implementation) {
	      doc = window.document.implementation.createHTMLDocument('inert');
	    } else {
	      throw $sanitizeMinErr('noinert', 'Can\'t create an inert html document');
	    }
	    var docElement = doc.documentElement || doc.getDocumentElement();
	    var bodyElements = docElement.getElementsByTagName('body');

	    // usually there should be only one body element in the document, but IE doesn't have any, so we need to create one
	    if (bodyElements.length === 1) {
	      inertBodyElement = bodyElements[0];
	    } else {
	      var html = doc.createElement('html');
	      inertBodyElement = doc.createElement('body');
	      html.appendChild(inertBodyElement);
	      doc.appendChild(html);
	    }
	  })(window);

	  /**
	   * @example
	   * htmlParser(htmlString, {
	   *     start: function(tag, attrs) {},
	   *     end: function(tag) {},
	   *     chars: function(text) {},
	   *     comment: function(text) {}
	   * });
	   *
	   * @param {string} html string
	   * @param {object} handler
	   */
	  function htmlParserImpl(html, handler) {
	    if (html === null || html === undefined) {
	      html = '';
	    } else if (typeof html !== 'string') {
	      html = '' + html;
	    }
	    inertBodyElement.innerHTML = html;

	    //mXSS protection
	    var mXSSAttempts = 5;
	    do {
	      if (mXSSAttempts === 0) {
	        throw $sanitizeMinErr('uinput', 'Failed to sanitize html because the input is unstable');
	      }
	      mXSSAttempts--;

	      // strip custom-namespaced attributes on IE<=11
	      if (window.document.documentMode) {
	        stripCustomNsAttrs(inertBodyElement);
	      }
	      html = inertBodyElement.innerHTML; //trigger mXSS
	      inertBodyElement.innerHTML = html;
	    } while (html !== inertBodyElement.innerHTML);

	    var node = inertBodyElement.firstChild;
	    while (node) {
	      switch (node.nodeType) {
	        case 1: // ELEMENT_NODE
	          handler.start(node.nodeName.toLowerCase(), attrToMap(node.attributes));
	          break;
	        case 3: // TEXT NODE
	          handler.chars(node.textContent);
	          break;
	      }

	      var nextNode;
	      if (!(nextNode = node.firstChild)) {
	        if (node.nodeType === 1) {
	          handler.end(node.nodeName.toLowerCase());
	        }
	        nextNode = node.nextSibling;
	        if (!nextNode) {
	          while (nextNode == null) {
	            node = node.parentNode;
	            if (node === inertBodyElement) break;
	            nextNode = node.nextSibling;
	            if (node.nodeType === 1) {
	              handler.end(node.nodeName.toLowerCase());
	            }
	          }
	        }
	      }
	      node = nextNode;
	    }

	    while ((node = inertBodyElement.firstChild)) {
	      inertBodyElement.removeChild(node);
	    }
	  }

	  function attrToMap(attrs) {
	    var map = {};
	    for (var i = 0, ii = attrs.length; i < ii; i++) {
	      var attr = attrs[i];
	      map[attr.name] = attr.value;
	    }
	    return map;
	  }


	  /**
	   * Escapes all potentially dangerous characters, so that the
	   * resulting string can be safely inserted into attribute or
	   * element text.
	   * @param value
	   * @returns {string} escaped text
	   */
	  function encodeEntities(value) {
	    return value.
	      replace(/&/g, '&amp;').
	      replace(SURROGATE_PAIR_REGEXP, function(value) {
	        var hi = value.charCodeAt(0);
	        var low = value.charCodeAt(1);
	        return '&#' + (((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000) + ';';
	      }).
	      replace(NON_ALPHANUMERIC_REGEXP, function(value) {
	        return '&#' + value.charCodeAt(0) + ';';
	      }).
	      replace(/</g, '&lt;').
	      replace(/>/g, '&gt;');
	  }

	  /**
	   * create an HTML/XML writer which writes to buffer
	   * @param {Array} buf use buf.join('') to get out sanitized html string
	   * @returns {object} in the form of {
	   *     start: function(tag, attrs) {},
	   *     end: function(tag) {},
	   *     chars: function(text) {},
	   *     comment: function(text) {}
	   * }
	   */
	  function htmlSanitizeWriterImpl(buf, uriValidator) {
	    var ignoreCurrentElement = false;
	    var out = bind(buf, buf.push);
	    return {
	      start: function(tag, attrs) {
	        tag = lowercase(tag);
	        if (!ignoreCurrentElement && blockedElements[tag]) {
	          ignoreCurrentElement = tag;
	        }
	        if (!ignoreCurrentElement && validElements[tag] === true) {
	          out('<');
	          out(tag);
	          forEach(attrs, function(value, key) {
	            var lkey = lowercase(key);
	            var isImage = (tag === 'img' && lkey === 'src') || (lkey === 'background');
	            if (validAttrs[lkey] === true &&
	              (uriAttrs[lkey] !== true || uriValidator(value, isImage))) {
	              out(' ');
	              out(key);
	              out('="');
	              out(encodeEntities(value));
	              out('"');
	            }
	          });
	          out('>');
	        }
	      },
	      end: function(tag) {
	        tag = lowercase(tag);
	        if (!ignoreCurrentElement && validElements[tag] === true && voidElements[tag] !== true) {
	          out('</');
	          out(tag);
	          out('>');
	        }
	        // eslint-disable-next-line eqeqeq
	        if (tag == ignoreCurrentElement) {
	          ignoreCurrentElement = false;
	        }
	      },
	      chars: function(chars) {
	        if (!ignoreCurrentElement) {
	          out(encodeEntities(chars));
	        }
	      }
	    };
	  }


	  /**
	   * When IE9-11 comes across an unknown namespaced attribute e.g. 'xlink:foo' it adds 'xmlns:ns1' attribute to declare
	   * ns1 namespace and prefixes the attribute with 'ns1' (e.g. 'ns1:xlink:foo'). This is undesirable since we don't want
	   * to allow any of these custom attributes. This method strips them all.
	   *
	   * @param node Root element to process
	   */
	  function stripCustomNsAttrs(node) {
	    while (node) {
	      if (node.nodeType === window.Node.ELEMENT_NODE) {
	        var attrs = node.attributes;
	        for (var i = 0, l = attrs.length; i < l; i++) {
	          var attrNode = attrs[i];
	          var attrName = attrNode.name.toLowerCase();
	          if (attrName === 'xmlns:ns1' || attrName.lastIndexOf('ns1:', 0) === 0) {
	            node.removeAttributeNode(attrNode);
	            i--;
	            l--;
	          }
	        }
	      }

	      var nextNode = node.firstChild;
	      if (nextNode) {
	        stripCustomNsAttrs(nextNode);
	      }

	      node = node.nextSibling;
	    }
	  }
	}

	function sanitizeText(chars) {
	  var buf = [];
	  var writer = htmlSanitizeWriter(buf, noop);
	  writer.chars(chars);
	  return buf.join('');
	}


	// define ngSanitize module and register $sanitize service
	angular.module('ngSanitize', []).provider('$sanitize', $SanitizeProvider);

	/**
	 * @ngdoc filter
	 * @name linky
	 * @kind function
	 *
	 * @description
	 * Finds links in text input and turns them into html links. Supports `http/https/ftp/mailto` and
	 * plain email address links.
	 *
	 * Requires the {@link ngSanitize `ngSanitize`} module to be installed.
	 *
	 * @param {string} text Input text.
	 * @param {string} target Window (`_blank|_self|_parent|_top`) or named frame to open links in.
	 * @param {object|function(url)} [attributes] Add custom attributes to the link element.
	 *
	 *    Can be one of:
	 *
	 *    - `object`: A map of attributes
	 *    - `function`: Takes the url as a parameter and returns a map of attributes
	 *
	 *    If the map of attributes contains a value for `target`, it overrides the value of
	 *    the target parameter.
	 *
	 *
	 * @returns {string} Html-linkified and {@link $sanitize sanitized} text.
	 *
	 * @usage
	   <span ng-bind-html="linky_expression | linky"></span>
	 *
	 * @example
	   <example module="linkyExample" deps="angular-sanitize.js" name="linky-filter">
	     <file name="index.html">
	       <div ng-controller="ExampleController">
	       Snippet: <textarea ng-model="snippet" cols="60" rows="3"></textarea>
	       <table>
	         <tr>
	           <th>Filter</th>
	           <th>Source</th>
	           <th>Rendered</th>
	         </tr>
	         <tr id="linky-filter">
	           <td>linky filter</td>
	           <td>
	             <pre>&lt;div ng-bind-html="snippet | linky"&gt;<br>&lt;/div&gt;</pre>
	           </td>
	           <td>
	             <div ng-bind-html="snippet | linky"></div>
	           </td>
	         </tr>
	         <tr id="linky-target">
	          <td>linky target</td>
	          <td>
	            <pre>&lt;div ng-bind-html="snippetWithSingleURL | linky:'_blank'"&gt;<br>&lt;/div&gt;</pre>
	          </td>
	          <td>
	            <div ng-bind-html="snippetWithSingleURL | linky:'_blank'"></div>
	          </td>
	         </tr>
	         <tr id="linky-custom-attributes">
	          <td>linky custom attributes</td>
	          <td>
	            <pre>&lt;div ng-bind-html="snippetWithSingleURL | linky:'_self':{rel: 'nofollow'}"&gt;<br>&lt;/div&gt;</pre>
	          </td>
	          <td>
	            <div ng-bind-html="snippetWithSingleURL | linky:'_self':{rel: 'nofollow'}"></div>
	          </td>
	         </tr>
	         <tr id="escaped-html">
	           <td>no filter</td>
	           <td><pre>&lt;div ng-bind="snippet"&gt;<br>&lt;/div&gt;</pre></td>
	           <td><div ng-bind="snippet"></div></td>
	         </tr>
	       </table>
	     </file>
	     <file name="script.js">
	       angular.module('linkyExample', ['ngSanitize'])
	         .controller('ExampleController', ['$scope', function($scope) {
	           $scope.snippet =
	             'Pretty text with some links:\n' +
	             'http://angularjs.org/,\n' +
	             'mailto:us@somewhere.org,\n' +
	             'another@somewhere.org,\n' +
	             'and one more: ftp://127.0.0.1/.';
	           $scope.snippetWithSingleURL = 'http://angularjs.org/';
	         }]);
	     </file>
	     <file name="protractor.js" type="protractor">
	       it('should linkify the snippet with urls', function() {
	         expect(element(by.id('linky-filter')).element(by.binding('snippet | linky')).getText()).
	             toBe('Pretty text with some links: http://angularjs.org/, us@somewhere.org, ' +
	                  'another@somewhere.org, and one more: ftp://127.0.0.1/.');
	         expect(element.all(by.css('#linky-filter a')).count()).toEqual(4);
	       });

	       it('should not linkify snippet without the linky filter', function() {
	         expect(element(by.id('escaped-html')).element(by.binding('snippet')).getText()).
	             toBe('Pretty text with some links: http://angularjs.org/, mailto:us@somewhere.org, ' +
	                  'another@somewhere.org, and one more: ftp://127.0.0.1/.');
	         expect(element.all(by.css('#escaped-html a')).count()).toEqual(0);
	       });

	       it('should update', function() {
	         element(by.model('snippet')).clear();
	         element(by.model('snippet')).sendKeys('new http://link.');
	         expect(element(by.id('linky-filter')).element(by.binding('snippet | linky')).getText()).
	             toBe('new http://link.');
	         expect(element.all(by.css('#linky-filter a')).count()).toEqual(1);
	         expect(element(by.id('escaped-html')).element(by.binding('snippet')).getText())
	             .toBe('new http://link.');
	       });

	       it('should work with the target property', function() {
	        expect(element(by.id('linky-target')).
	            element(by.binding("snippetWithSingleURL | linky:'_blank'")).getText()).
	            toBe('http://angularjs.org/');
	        expect(element(by.css('#linky-target a')).getAttribute('target')).toEqual('_blank');
	       });

	       it('should optionally add custom attributes', function() {
	        expect(element(by.id('linky-custom-attributes')).
	            element(by.binding("snippetWithSingleURL | linky:'_self':{rel: 'nofollow'}")).getText()).
	            toBe('http://angularjs.org/');
	        expect(element(by.css('#linky-custom-attributes a')).getAttribute('rel')).toEqual('nofollow');
	       });
	     </file>
	   </example>
	 */
	angular.module('ngSanitize').filter('linky', ['$sanitize', function($sanitize) {
	  var LINKY_URL_REGEXP =
	        /((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"\u201d\u2019]/i,
	      MAILTO_REGEXP = /^mailto:/i;

	  var linkyMinErr = angular.$$minErr('linky');
	  var isDefined = angular.isDefined;
	  var isFunction = angular.isFunction;
	  var isObject = angular.isObject;
	  var isString = angular.isString;

	  return function(text, target, attributes) {
	    if (text == null || text === '') return text;
	    if (!isString(text)) throw linkyMinErr('notstring', 'Expected string but received: {0}', text);

	    var attributesFn =
	      isFunction(attributes) ? attributes :
	      isObject(attributes) ? function getAttributesObject() {return attributes;} :
	      function getEmptyAttributesObject() {return {};};

	    var match;
	    var raw = text;
	    var html = [];
	    var url;
	    var i;
	    while ((match = raw.match(LINKY_URL_REGEXP))) {
	      // We can not end in these as they are sometimes found at the end of the sentence
	      url = match[0];
	      // if we did not match ftp/http/www/mailto then assume mailto
	      if (!match[2] && !match[4]) {
	        url = (match[3] ? 'http://' : 'mailto:') + url;
	      }
	      i = match.index;
	      addText(raw.substr(0, i));
	      addLink(url, match[0].replace(MAILTO_REGEXP, ''));
	      raw = raw.substring(i + match[0].length);
	    }
	    addText(raw);
	    return $sanitize(html.join(''));

	    function addText(text) {
	      if (!text) {
	        return;
	      }
	      html.push(sanitizeText(text));
	    }

	    function addLink(url, text) {
	      var key, linkAttributes = attributesFn(url);
	      html.push('<a ');

	      for (key in linkAttributes) {
	        html.push(key + '="' + linkAttributes[key] + '" ');
	      }

	      if (isDefined(target) && !('target' in linkAttributes)) {
	        html.push('target="',
	                  target,
	                  '" ');
	      }
	      html.push('href="',
	                url.replace(/"/g, '&quot;'),
	                '">');
	      addText(text);
	      html.push('</a>');
	    }
	  };
	}]);


	})(window, window.angular);


/***/ },
/* 29 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 30 */,
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "208649b7ebdb428142b0b933c26bb69a.png";

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	__webpack_require__(33);

	var _drag = __webpack_require__(34);

	var _drag2 = _interopRequireDefault(_drag);

	var _ctrl = __webpack_require__(35);

	var _ctrl2 = _interopRequireDefault(_ctrl);

	__webpack_require__(36);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by xiyuyizhi on 17-2-23.
	 */

	exports.default = angular.module('dragable', ['dndLists']).config(["$stateProvider", function ($stateProvider) {

		$stateProvider.state('dragable', {
			parent: 'app',
			url: '/dragable',
			views: {
				'default': {
					template: 'angular-drag-and-drop-lists 使用 demo'
				},
				'content': {
					template: _drag2.default,
					controller: _ctrl2.default,
					controllerAs: 'vm'
				}
			}
		});
	}]).name;

	/***
	 *
	 *
	 */

/***/ },
/* 33 */
/***/ function(module, exports) {

	/**
	 * angular-drag-and-drop-lists v2.1.0
	 *
	 * Copyright (c) 2014 Marcel Juenemann marcel@juenemann.cc
	 * Copyright (c) 2014-2017 Google Inc.
	 * https://github.com/marceljuenemann/angular-drag-and-drop-lists
	 *
	 * License: MIT
	 */
	(function(dndLists) {

	  // In standard-compliant browsers we use a custom mime type and also encode the dnd-type in it.
	  // However, IE and Edge only support a limited number of mime types. The workarounds are described
	  // in https://github.com/marceljuenemann/angular-drag-and-drop-lists/wiki/Data-Transfer-Design
	  var MIME_TYPE = 'application/x-dnd';
	  var EDGE_MIME_TYPE = 'application/json';
	  var MSIE_MIME_TYPE = 'Text';

	  // All valid HTML5 drop effects, in the order in which we prefer to use them.
	  var ALL_EFFECTS = ['move', 'copy', 'link'];

	  /**
	   * Use the dnd-draggable attribute to make your element draggable
	   *
	   * Attributes:
	   * - dnd-draggable      Required attribute. The value has to be an object that represents the data
	   *                      of the element. In case of a drag and drop operation the object will be
	   *                      serialized and unserialized on the receiving end.
	   * - dnd-effect-allowed Use this attribute to limit the operations that can be performed. Valid
	   *                      options are "move", "copy" and "link", as well as "all", "copyMove",
	   *                      "copyLink" and "linkMove". The semantics of these operations are up to you
	   *                      and have to be implemented using the callbacks described below. If you
	   *                      allow multiple options, the user can choose between them by using the
	   *                      modifier keys (OS specific). The cursor will be changed accordingly,
	   *                      expect for IE and Edge, where this is not supported.
	   * - dnd-type           Use this attribute if you have different kinds of items in your
	   *                      application and you want to limit which items can be dropped into which
	   *                      lists. Combine with dnd-allowed-types on the dnd-list(s). This attribute
	   *                      must be a lower case string. Upper case characters can be used, but will
	   *                      be converted to lower case automatically.
	   * - dnd-disable-if     You can use this attribute to dynamically disable the draggability of the
	   *                      element. This is useful if you have certain list items that you don't want
	   *                      to be draggable, or if you want to disable drag & drop completely without
	   *                      having two different code branches (e.g. only allow for admins).
	   *
	   * Callbacks:
	   * - dnd-dragstart      Callback that is invoked when the element was dragged. The original
	   *                      dragstart event will be provided in the local event variable.
	   * - dnd-moved          Callback that is invoked when the element was moved. Usually you will
	   *                      remove your element from the original list in this callback, since the
	   *                      directive is not doing that for you automatically. The original dragend
	   *                      event will be provided in the local event variable.
	   * - dnd-copied         Same as dnd-moved, just that it is called when the element was copied
	   *                      instead of moved, so you probably want to implement a different logic.
	   * - dnd-linked         Same as dnd-moved, just that it is called when the element was linked
	   *                      instead of moved, so you probably want to implement a different logic.
	   * - dnd-canceled       Callback that is invoked if the element was dragged, but the operation was
	   *                      canceled and the element was not dropped. The original dragend event will
	   *                      be provided in the local event variable.
	   * - dnd-dragend        Callback that is invoked when the drag operation ended. Available local
	   *                      variables are event and dropEffect.
	   * - dnd-selected       Callback that is invoked when the element was clicked but not dragged.
	   *                      The original click event will be provided in the local event variable.
	   * - dnd-callback       Custom callback that is passed to dropzone callbacks and can be used to
	   *                      communicate between source and target scopes. The dropzone can pass user
	   *                      defined variables to this callback.
	   *
	   * CSS classes:
	   * - dndDragging        This class will be added to the element while the element is being
	   *                      dragged. It will affect both the element you see while dragging and the
	   *                      source element that stays at it's position. Do not try to hide the source
	   *                      element with this class, because that will abort the drag operation.
	   * - dndDraggingSource  This class will be added to the element after the drag operation was
	   *                      started, meaning it only affects the original element that is still at
	   *                      it's source position, and not the "element" that the user is dragging with
	   *                      his mouse pointer.
	   */
	  dndLists.directive('dndDraggable', ['$parse', '$timeout', function($parse, $timeout) {
	    return function(scope, element, attr) {
	      // Set the HTML5 draggable attribute on the element.
	      element.attr("draggable", "true");

	      // If the dnd-disable-if attribute is set, we have to watch that.
	      if (attr.dndDisableIf) {
	        scope.$watch(attr.dndDisableIf, function(disabled) {
	          element.attr("draggable", !disabled);
	        });
	      }

	      /**
	       * When the drag operation is started we have to prepare the dataTransfer object,
	       * which is the primary way we communicate with the target element
	       */
	      element.on('dragstart', function(event) {
	        event = event.originalEvent || event;

	        // Check whether the element is draggable, since dragstart might be triggered on a child.
	        if (element.attr('draggable') == 'false') return true;

	        // Initialize global state.
	        dndState.isDragging = true;
	        dndState.itemType = attr.dndType && scope.$eval(attr.dndType).toLowerCase();

	        // Set the allowed drop effects. See below for special IE handling.
	        dndState.dropEffect = "none";
	        dndState.effectAllowed = attr.dndEffectAllowed || ALL_EFFECTS[0];
	        event.dataTransfer.effectAllowed = dndState.effectAllowed;

	        // Internet Explorer and Microsoft Edge don't support custom mime types, see design doc:
	        // https://github.com/marceljuenemann/angular-drag-and-drop-lists/wiki/Data-Transfer-Design
	        var item = scope.$eval(attr.dndDraggable);
	        var mimeType = MIME_TYPE + (dndState.itemType ? ('-' + dndState.itemType) : '');
	        try {
	          event.dataTransfer.setData(mimeType, angular.toJson(item));
	        } catch (e) {
	          // Setting a custom MIME type did not work, we are probably in IE or Edge.
	          var data = angular.toJson({item: item, type: dndState.itemType});
	          try {
	            event.dataTransfer.setData(EDGE_MIME_TYPE, data);
	          } catch (e) {
	            // We are in Internet Explorer and can only use the Text MIME type. Also note that IE
	            // does not allow changing the cursor in the dragover event, therefore we have to choose
	            // the one we want to display now by setting effectAllowed.
	            var effectsAllowed = filterEffects(ALL_EFFECTS, dndState.effectAllowed);
	            event.dataTransfer.effectAllowed = effectsAllowed[0];
	            event.dataTransfer.setData(MSIE_MIME_TYPE, data);
	          }
	        }

	        // Add CSS classes. See documentation above.
	        element.addClass("dndDragging");
	        $timeout(function() { element.addClass("dndDraggingSource"); }, 0);

	        // Try setting a proper drag image if triggered on a dnd-handle (won't work in IE).
	        if (event._dndHandle && event.dataTransfer.setDragImage) {
	          event.dataTransfer.setDragImage(element[0], 0, 0);
	        }

	        // Invoke dragstart callback and prepare extra callback for dropzone.
	        $parse(attr.dndDragstart)(scope, {event: event});
	        if (attr.dndCallback) {
	          var callback = $parse(attr.dndCallback);
	          dndState.callback = function(params) { return callback(scope, params || {}); };
	        }

	        event.stopPropagation();
	      });

	      /**
	       * The dragend event is triggered when the element was dropped or when the drag
	       * operation was aborted (e.g. hit escape button). Depending on the executed action
	       * we will invoke the callbacks specified with the dnd-moved or dnd-copied attribute.
	       */
	      element.on('dragend', function(event) {
	        event = event.originalEvent || event;

	        // Invoke callbacks. Usually we would use event.dataTransfer.dropEffect to determine
	        // the used effect, but Chrome has not implemented that field correctly. On Windows
	        // it always sets it to 'none', while Chrome on Linux sometimes sets it to something
	        // else when it's supposed to send 'none' (drag operation aborted).
	        scope.$apply(function() {
	          var dropEffect = dndState.dropEffect;
	          var cb = {copy: 'dndCopied', link: 'dndLinked', move: 'dndMoved', none: 'dndCanceled'};
	          $parse(attr[cb[dropEffect]])(scope, {event: event});
	          $parse(attr.dndDragend)(scope, {event: event, dropEffect: dropEffect});
	        });

	        // Clean up
	        dndState.isDragging = false;
	        dndState.callback = undefined;
	        element.removeClass("dndDragging");
	        element.removeClass("dndDraggingSource");
	        event.stopPropagation();

	        // In IE9 it is possible that the timeout from dragstart triggers after the dragend handler.
	        $timeout(function() { element.removeClass("dndDraggingSource"); }, 0);
	      });

	      /**
	       * When the element is clicked we invoke the callback function
	       * specified with the dnd-selected attribute.
	       */
	      element.on('click', function(event) {
	        if (!attr.dndSelected) return;

	        event = event.originalEvent || event;
	        scope.$apply(function() {
	          $parse(attr.dndSelected)(scope, {event: event});
	        });

	        // Prevent triggering dndSelected in parent elements.
	        event.stopPropagation();
	      });

	      /**
	       * Workaround to make element draggable in IE9
	       */
	      element.on('selectstart', function() {
	        if (this.dragDrop) this.dragDrop();
	      });
	    };
	  }]);

	  /**
	   * Use the dnd-list attribute to make your list element a dropzone. Usually you will add a single
	   * li element as child with the ng-repeat directive. If you don't do that, we will not be able to
	   * position the dropped element correctly. If you want your list to be sortable, also add the
	   * dnd-draggable directive to your li element(s).
	   *
	   * Attributes:
	   * - dnd-list             Required attribute. The value has to be the array in which the data of
	   *                        the dropped element should be inserted. The value can be blank if used
	   *                        with a custom dnd-drop handler that always returns true.
	   * - dnd-allowed-types    Optional array of allowed item types. When used, only items that had a
	   *                        matching dnd-type attribute will be dropable. Upper case characters will
	   *                        automatically be converted to lower case.
	   * - dnd-effect-allowed   Optional string expression that limits the drop effects that can be
	   *                        performed in the list. See dnd-effect-allowed on dnd-draggable for more
	   *                        details on allowed options. The default value is all.
	   * - dnd-disable-if       Optional boolean expresssion. When it evaluates to true, no dropping
	   *                        into the list is possible. Note that this also disables rearranging
	   *                        items inside the list.
	   * - dnd-horizontal-list  Optional boolean expresssion. When it evaluates to true, the positioning
	   *                        algorithm will use the left and right halfs of the list items instead of
	   *                        the upper and lower halfs.
	   * - dnd-external-sources Optional boolean expression. When it evaluates to true, the list accepts
	   *                        drops from sources outside of the current browser tab. This allows to
	   *                        drag and drop accross different browser tabs. The only major browser
	   *                        that does not support this is currently Microsoft Edge.
	   *
	   * Callbacks:
	   * - dnd-dragover         Optional expression that is invoked when an element is dragged over the
	   *                        list. If the expression is set, but does not return true, the element is
	   *                        not allowed to be dropped. The following variables will be available:
	   *                        - event: The original dragover event sent by the browser.
	   *                        - index: The position in the list at which the element would be dropped.
	   *                        - type: The dnd-type set on the dnd-draggable, or undefined if non was
	   *                          set. Will be null for drops from external sources in IE and Edge,
	   *                          since we don't know the type in those cases.
	   *                        - dropEffect: One of move, copy or link, see dnd-effect-allowed.
	   *                        - external: Whether the element was dragged from an external source.
	   *                        - callback: If dnd-callback was set on the source element, this is a
	   *                          function reference to the callback. The callback can be invoked with
	   *                          custom variables like this: callback({var1: value1, var2: value2}).
	   *                          The callback will be executed on the scope of the source element. If
	   *                          dnd-external-sources was set and external is true, this callback will
	   *                          not be available.
	   * - dnd-drop             Optional expression that is invoked when an element is dropped on the
	   *                        list. The same variables as for dnd-dragover will be available, with the
	   *                        exception that type is always known and therefore never null. There
	   *                        will also be an item variable, which is the transferred object. The
	   *                        return value determines the further handling of the drop:
	   *                        - falsy: The drop will be canceled and the element won't be inserted.
	   *                        - true: Signalises that the drop is allowed, but the dnd-drop
	   *                          callback already took care of inserting the element.
	   *                        - otherwise: All other return values will be treated as the object to
	   *                          insert into the array. In most cases you want to simply return the
	   *                          item parameter, but there are no restrictions on what you can return.
	   * - dnd-inserted         Optional expression that is invoked after a drop if the element was
	   *                        actually inserted into the list. The same local variables as for
	   *                        dnd-drop will be available. Note that for reorderings inside the same
	   *                        list the old element will still be in the list due to the fact that
	   *                        dnd-moved was not called yet.
	   *
	   * CSS classes:
	   * - dndPlaceholder       When an element is dragged over the list, a new placeholder child
	   *                        element will be added. This element is of type li and has the class
	   *                        dndPlaceholder set. Alternatively, you can define your own placeholder
	   *                        by creating a child element with dndPlaceholder class.
	   * - dndDragover          Will be added to the list while an element is dragged over the list.
	   */
	  dndLists.directive('dndList', ['$parse', function($parse) {
	    return function(scope, element, attr) {
	      // While an element is dragged over the list, this placeholder element is inserted
	      // at the location where the element would be inserted after dropping.
	      var placeholder = getPlaceholderElement();
	      placeholder.remove();

	      var placeholderNode = placeholder[0];
	      var listNode = element[0];
	      var listSettings = {};

	      /**
	       * The dragenter event is fired when a dragged element or text selection enters a valid drop
	       * target. According to the spec, we either need to have a dropzone attribute or listen on
	       * dragenter events and call preventDefault(). It should be noted though that no browser seems
	       * to enforce this behaviour.
	       */
	      element.on('dragenter', function (event) {
	        event = event.originalEvent || event;

	        // Calculate list properties, so that we don't have to repeat this on every dragover event.
	        var types = attr.dndAllowedTypes && scope.$eval(attr.dndAllowedTypes);
	        listSettings = {
	          allowedTypes: angular.isArray(types) && types.join('|').toLowerCase().split('|'),
	          disabled: attr.dndDisableIf && scope.$eval(attr.dndDisableIf),
	          externalSources: attr.dndExternalSources && scope.$eval(attr.dndExternalSources),
	          horizontal: attr.dndHorizontalList && scope.$eval(attr.dndHorizontalList)
	        };

	        var mimeType = getMimeType(event.dataTransfer.types);
	        if (!mimeType || !isDropAllowed(getItemType(mimeType))) return true;
	        event.preventDefault();
	      });

	      /**
	       * The dragover event is triggered "every few hundred milliseconds" while an element
	       * is being dragged over our list, or over an child element.
	       */
	      element.on('dragover', function(event) {
	        event = event.originalEvent || event;

	        // Check whether the drop is allowed and determine mime type.
	        var mimeType = getMimeType(event.dataTransfer.types);
	        var itemType = getItemType(mimeType);
	        if (!mimeType || !isDropAllowed(itemType)) return true;

	        // Make sure the placeholder is shown, which is especially important if the list is empty.
	        if (placeholderNode.parentNode != listNode) {
	          element.append(placeholder);
	        }

	        if (event.target != listNode) {
	          // Try to find the node direct directly below the list node.
	          var listItemNode = event.target;
	          while (listItemNode.parentNode != listNode && listItemNode.parentNode) {
	            listItemNode = listItemNode.parentNode;
	          }

	          if (listItemNode.parentNode == listNode && listItemNode != placeholderNode) {
	            // If the mouse pointer is in the upper half of the list item element,
	            // we position the placeholder before the list item, otherwise after it.
	            var rect = listItemNode.getBoundingClientRect();
	            if (listSettings.horizontal) {
	              var isFirstHalf = event.clientX < rect.left + rect.width / 2;
	            } else {
	              var isFirstHalf = event.clientY < rect.top + rect.height / 2;
	            }
	            listNode.insertBefore(placeholderNode,
	                isFirstHalf ? listItemNode : listItemNode.nextSibling);
	          }
	        }

	        // In IE we set a fake effectAllowed in dragstart to get the correct cursor, we therefore
	        // ignore the effectAllowed passed in dataTransfer. We must also not access dataTransfer for
	        // drops from external sources, as that throws an exception.
	        var ignoreDataTransfer = mimeType == MSIE_MIME_TYPE;
	        var dropEffect = getDropEffect(event, ignoreDataTransfer);
	        if (dropEffect == 'none') return stopDragover();

	        // At this point we invoke the callback, which still can disallow the drop.
	        // We can't do this earlier because we want to pass the index of the placeholder.
	        if (attr.dndDragover && !invokeCallback(attr.dndDragover, event, dropEffect, itemType)) {
	          return stopDragover();
	        }

	        // Set dropEffect to modify the cursor shown by the browser, unless we're in IE, where this
	        // is not supported. This must be done after preventDefault in Firefox.
	        event.preventDefault();
	        if (!ignoreDataTransfer) {
	          event.dataTransfer.dropEffect = dropEffect;
	        }

	        element.addClass("dndDragover");
	        event.stopPropagation();
	        return false;
	      });

	      /**
	       * When the element is dropped, we use the position of the placeholder element as the
	       * position where we insert the transferred data. This assumes that the list has exactly
	       * one child element per array element.
	       */
	      element.on('drop', function(event) {
	        event = event.originalEvent || event;

	        // Check whether the drop is allowed and determine mime type.
	        var mimeType = getMimeType(event.dataTransfer.types);
	        var itemType = getItemType(mimeType);
	        if (!mimeType || !isDropAllowed(itemType)) return true;

	        // The default behavior in Firefox is to interpret the dropped element as URL and
	        // forward to it. We want to prevent that even if our drop is aborted.
	        event.preventDefault();

	        // Unserialize the data that was serialized in dragstart.
	        try {
	          var data = JSON.parse(event.dataTransfer.getData(mimeType));
	        } catch(e) {
	          return stopDragover();
	        }

	        // Drops with invalid types from external sources might not have been filtered out yet.
	        if (mimeType == MSIE_MIME_TYPE || mimeType == EDGE_MIME_TYPE) {
	          itemType = data.type || undefined;
	          data = data.item;
	          if (!isDropAllowed(itemType)) return stopDragover();
	        }

	        // Special handling for internal IE drops, see dragover handler.
	        var ignoreDataTransfer = mimeType == MSIE_MIME_TYPE;
	        var dropEffect = getDropEffect(event, ignoreDataTransfer);
	        if (dropEffect == 'none') return stopDragover();

	        // Invoke the callback, which can transform the transferredObject and even abort the drop.
	        var index = getPlaceholderIndex();
	        if (attr.dndDrop) {
	          data = invokeCallback(attr.dndDrop, event, dropEffect, itemType, index, data);
	          if (!data) return stopDragover();
	        }

	        // The drop is definitely going to happen now, store the dropEffect.
	        dndState.dropEffect = dropEffect;
	        if (!ignoreDataTransfer) {
	          event.dataTransfer.dropEffect = dropEffect;
	        }

	        // Insert the object into the array, unless dnd-drop took care of that (returned true).
	        if (data !== true) {
	          scope.$apply(function() {
	            scope.$eval(attr.dndList).splice(index, 0, data);
	          });
	        }
	        invokeCallback(attr.dndInserted, event, dropEffect, itemType, index, data);

	        // Clean up
	        stopDragover();
	        event.stopPropagation();
	        return false;
	      });

	      /**
	       * We have to remove the placeholder when the element is no longer dragged over our list. The
	       * problem is that the dragleave event is not only fired when the element leaves our list,
	       * but also when it leaves a child element. Therefore, we determine whether the mouse cursor
	       * is still pointing to an element inside the list or not.
	       */
	      element.on('dragleave', function(event) {
	        event = event.originalEvent || event;

	        var newTarget = document.elementFromPoint(event.clientX, event.clientY);
	        if (listNode.contains(newTarget) && !event._dndPhShown) {
	          // Signalize to potential parent lists that a placeholder is already shown.
	          event._dndPhShown = true;
	        } else {
	          stopDragover();
	        }
	      });

	      /**
	       * Given the types array from the DataTransfer object, returns the first valid mime type.
	       * A type is valid if it starts with MIME_TYPE, or it equals MSIE_MIME_TYPE or EDGE_MIME_TYPE.
	       */
	      function getMimeType(types) {
	        if (!types) return MSIE_MIME_TYPE; // IE 9 workaround.
	        for (var i = 0; i < types.length; i++) {
	          if (types[i] == MSIE_MIME_TYPE || types[i] == EDGE_MIME_TYPE ||
	              types[i].substr(0, MIME_TYPE.length) == MIME_TYPE) {
	            return types[i];
	          }
	        }
	        return null;
	      }

	      /**
	       * Determines the type of the item from the dndState, or from the mime type for items from
	       * external sources. Returns undefined if no item type was set and null if the item type could
	       * not be determined.
	       */
	      function getItemType(mimeType) {
	        if (dndState.isDragging) return dndState.itemType || undefined;
	        if (mimeType == MSIE_MIME_TYPE || mimeType == EDGE_MIME_TYPE) return null;
	        return (mimeType && mimeType.substr(MIME_TYPE.length + 1)) || undefined;
	      }

	      /**
	       * Checks various conditions that must be fulfilled for a drop to be allowed, including the
	       * dnd-allowed-types attribute. If the item Type is unknown (null), the drop will be allowed.
	       */
	      function isDropAllowed(itemType) {
	        if (listSettings.disabled) return false;
	        if (!listSettings.externalSources && !dndState.isDragging) return false;
	        if (!listSettings.allowedTypes || itemType === null) return true;
	        return itemType && listSettings.allowedTypes.indexOf(itemType) != -1;
	      }

	      /**
	       * Determines which drop effect to use for the given event. In Internet Explorer we have to
	       * ignore the effectAllowed field on dataTransfer, since we set a fake value in dragstart.
	       * In those cases we rely on dndState to filter effects. Read the design doc for more details:
	       * https://github.com/marceljuenemann/angular-drag-and-drop-lists/wiki/Data-Transfer-Design
	       */
	      function getDropEffect(event, ignoreDataTransfer) {
	        var effects = ALL_EFFECTS;
	        if (!ignoreDataTransfer) {
	          effects = filterEffects(effects, event.dataTransfer.effectAllowed);
	        }
	        if (dndState.isDragging) {
	          effects = filterEffects(effects, dndState.effectAllowed);
	        }
	        if (attr.dndEffectAllowed) {
	          effects = filterEffects(effects, attr.dndEffectAllowed);
	        }
	        // MacOS automatically filters dataTransfer.effectAllowed depending on the modifier keys,
	        // therefore the following modifier keys will only affect other operating systems.
	        if (!effects.length) {
	          return 'none';
	        } else if (event.ctrlKey && effects.indexOf('copy') != -1) {
	          return 'copy';
	        } else if (event.altKey && effects.indexOf('link') != -1) {
	          return 'link';
	        } else {
	          return effects[0];
	        }
	      }

	      /**
	       * Small helper function that cleans up if we aborted a drop.
	       */
	      function stopDragover() {
	        placeholder.remove();
	        element.removeClass("dndDragover");
	        return true;
	      }

	      /**
	       * Invokes a callback with some interesting parameters and returns the callbacks return value.
	       */
	      function invokeCallback(expression, event, dropEffect, itemType, index, item) {
	        return $parse(expression)(scope, {
	          callback: dndState.callback,
	          dropEffect: dropEffect,
	          event: event,
	          external: !dndState.isDragging,
	          index: index !== undefined ? index : getPlaceholderIndex(),
	          item: item || undefined,
	          type: itemType
	        });
	      }

	      /**
	       * We use the position of the placeholder node to determine at which position of the array the
	       * object needs to be inserted
	       */
	      function getPlaceholderIndex() {
	        return Array.prototype.indexOf.call(listNode.children, placeholderNode);
	      }

	      /**
	       * Tries to find a child element that has the dndPlaceholder class set. If none was found, a
	       * new li element is created.
	       */
	      function getPlaceholderElement() {
	        var placeholder;
	        angular.forEach(element.children(), function(childNode) {
	          var child = angular.element(childNode);
	          if (child.hasClass('dndPlaceholder')) {
	            placeholder = child;
	          }
	        });
	        return placeholder || angular.element("<li class='dndPlaceholder'></li>");
	      }
	    };
	  }]);

	  /**
	   * Use the dnd-nodrag attribute inside of dnd-draggable elements to prevent them from starting
	   * drag operations. This is especially useful if you want to use input elements inside of
	   * dnd-draggable elements or create specific handle elements. Note: This directive does not work
	   * in Internet Explorer 9.
	   */
	  dndLists.directive('dndNodrag', function() {
	    return function(scope, element, attr) {
	      // Set as draggable so that we can cancel the events explicitly
	      element.attr("draggable", "true");

	      /**
	       * Since the element is draggable, the browser's default operation is to drag it on dragstart.
	       * We will prevent that and also stop the event from bubbling up.
	       */
	      element.on('dragstart', function(event) {
	        event = event.originalEvent || event;

	        if (!event._dndHandle) {
	          // If a child element already reacted to dragstart and set a dataTransfer object, we will
	          // allow that. For example, this is the case for user selections inside of input elements.
	          if (!(event.dataTransfer.types && event.dataTransfer.types.length)) {
	            event.preventDefault();
	          }
	          event.stopPropagation();
	        }
	      });

	      /**
	       * Stop propagation of dragend events, otherwise dnd-moved might be triggered and the element
	       * would be removed.
	       */
	      element.on('dragend', function(event) {
	        event = event.originalEvent || event;
	        if (!event._dndHandle) {
	          event.stopPropagation();
	        }
	      });
	    };
	  });

	  /**
	   * Use the dnd-handle directive within a dnd-nodrag element in order to allow dragging with that
	   * element after all. Therefore, by combining dnd-nodrag and dnd-handle you can allow
	   * dnd-draggable elements to only be dragged via specific "handle" elements. Note that Internet
	   * Explorer will show the handle element as drag image instead of the dnd-draggable element. You
	   * can work around this by styling the handle element differently when it is being dragged. Use
	   * the CSS selector .dndDragging:not(.dndDraggingSource) [dnd-handle] for that.
	   */
	  dndLists.directive('dndHandle', function() {
	    return function(scope, element, attr) {
	      element.attr("draggable", "true");

	      element.on('dragstart dragend', function(event) {
	        event = event.originalEvent || event;
	        event._dndHandle = true;
	      });
	    };
	  });

	  /**
	   * Filters an array of drop effects using a HTML5 effectAllowed string.
	   */
	  function filterEffects(effects, effectAllowed) {
	    if (effectAllowed == 'all') return effects;
	    return effects.filter(function(effect) {
	      return effectAllowed.toLowerCase().indexOf(effect) != -1;
	    });
	  }

	  /**
	   * For some features we need to maintain global state. This is done here, with these fields:
	   * - callback: A callback function set at dragstart that is passed to internal dropzone handlers.
	   * - dropEffect: Set in dragstart to "none" and to the actual value in the drop handler. We don't
	   *   rely on the dropEffect passed by the browser, since there are various bugs in Chrome and
	   *   Safari, and Internet Explorer defaults to copy if effectAllowed is copyMove.
	   * - effectAllowed: Set in dragstart based on dnd-effect-allowed. This is needed for IE because
	   *   setting effectAllowed on dataTransfer might result in an undesired cursor.
	   * - isDragging: True between dragstart and dragend. Falsy for drops from external sources.
	   * - itemType: The item type of the dragged element set via dnd-type. This is needed because IE
	   *   and Edge don't support custom mime types that we can use to transfer this information.
	   */
	  var dndState = {};

	})(angular.module('dndLists', []));


/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = "<div class=\"dragArea\">\n    <ul class=\"u1\"\n        dnd-allowed-types=\"[]\"\n        dnd-list=\"vm.sources\">\n        <li ng-repeat=\"item in vm.sources\"\n            dnd-type=\"item.id\"\n            dnd-draggable=\"item\"\n            dnd-effect-allowed=\"copy\"\n            dnd-dragstart=\"vm.startCallback1()\"\n            dnd-copied=\"vm.copiedCallback($index,item)\"\n        >\n            <span ng-bind=\"item.name\"></span>\n        </li>\n    </ul>\n\n    <div class=\"u2\">\n        <ul class=\"row\"\n            dnd-allowed-types=\"vm.rowAllows\"\n            dnd-drop=\"vm.dropCallback(index, item)\"\n            dnd-list=\"vm.dist.row\">\n            <li ng-repeat=\"item in vm.dist.row\"\n                dnd-type=\"item.id\"\n                dnd-draggable=\"item\"\n                dnd-effect-allowed=\"move\"\n                dnd-dragstart=\"vm.startCallback2()\"\n                dnd-moved=\"vm.rowCallback($index,item)\">\n                <div>\n                    <span>{{item.name}}</span>\n                <ul class=\"menu\" ng-class=\"{show:item.click}\">\n                    <li ng-click=\"item.click=!item.click\">:</li>\n                    <li ng-click=\"vm.delete($index,item,'row')\">删除</li>\n                </ul>\n                </div>\n\n            </li>\n        </ul>\n        <ul class=\"cell\"\n            dnd-allowed-types=\"vm.cellAllows\"\n            dnd-drop=\"vm.dropCallback(index, item)\"\n            dnd-list=\"vm.dist.cell\">\n            <li ng-repeat=\"item in vm.dist.cell\"\n                dnd-type=\"item.id\"\n                dnd-draggable=\"item\"\n                dnd-effect-allowed=\"move\"\n                dnd-dragstart=\"vm.startCallback2()\"\n                dnd-moved=\"vm.cellCallback($index,item)\">\n                <div>\n                    <span>{{item.name}}</span>\n                    <ul class=\"menu\" ng-class=\"{show:item.click}\">\n                        <li ng-click=\"item.click=!item.click\">:</li>\n                        <li ng-click=\"vm.delete($index,item,'cell')\">删除</li>\n                    </ul>\n            </li>\n        </ul>\n    </div>\n\n</div>";

/***/ },
/* 35 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Created by xiyuyizhi on 17-2-23.
	 */

	var Drag = function Drag() {
		var _this = this;

		_classCallCheck(this, Drag);

		console.log('drag');

		this.sources = [{
			id: 's1',
			name: 'source1'
		}, {
			id: 's2',
			name: 'source2'
		}, {
			id: 's3',
			name: 'source3'
		}, {
			id: 's4',
			name: 'source4'
		}, {
			id: 's5',
			name: 'source5'
		}, {
			id: 's6',
			name: 'source6'
		}, {
			id: 's7',
			name: 'source7'
		}, {
			id: 's8',
			name: 'source8'
		}];
		this.dist = {
			row: [],
			cell: []
		};

		this.rowAllows = [];
		this.cellAllows = [];
		this.used = [];
		this.fromSource = true;
		this.sources.forEach(function (item) {
			_this.rowAllows.push(item.id);
			_this.cellAllows.push(item.id);
		});

		/**
	  * 已经复制的元素不允许再次复制
	  * @param index
	  */
		this.copiedCallback = function (index, item) {
			console.log('copyed');
			this.used.push(item);
		};

		this.startCallback1 = function () {
			this.fromSource = true;
		};
		this.startCallback2 = function () {
			this.fromSource = false;
		};
		this.dropCallback = function (index, item) {
			console.log(index);
			console.log(item);
			console.log(this.used);
			if (this.fromSource) {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = this.used[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var val = _step.value;

						if (val.id == item.id) {
							return false;
						}
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}
			return item;
		};

		/**
	  * row 中 元素移动时绑定的完成事件
	  * @param index
	  * @param current
	  */
		this.rowCallback = function (index, current) {
			this.dist.row.splice(index, 1);
			this.cellAllows.splice(this.cellAllows.indexOf(current.id), 1);
			if (this.rowAllows.indexOf(current.id) == -1) {
				this.rowAllows.unshift(current.id);
			}
		};

		/**
	  * cell 中 元素移动时绑定的完成事件
	  * @param index
	  * @param current
	  */
		this.cellCallback = function (index, current) {
			this.dist.cell.splice(index, 1);
			this.rowAllows.splice(this.rowAllows.indexOf(current.id), 1);
			if (this.cellAllows.indexOf(current.id) == -1) {
				this.cellAllows.unshift(current.id);
			}
		};

		this.delete = function (index, item, type) {
			this.dist[type].splice(index, 1);
			console.log(this.used.indexOf(item));
			var indx = void 0;
			this.used.forEach(function (val, ind) {
				if (val.id == item.id) {
					indx = ind;
				}
			});
			this.used.splice(indx, 1);
		};
	};

	exports.default = Drag;

/***/ },
/* 36 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 37 */,
/* 38 */
/***/ function(module, exports) {

	module.exports = "<h2 class=\"app-title\">angular demo</h2>\n<ul class=\"app-list\">\n    <li><a ui-sref=\"todo\">todo</a></li>\n    <li><a ui-sref=\"model\">ngModel、ngModelController</a></li>\n    <li><a ui-sref=\"editable\">自定义双向绑定contenteditable区域</a></li>\n    <li><a ui-sref=\"dragable\">angular-drag-and-drop-lists</a></li>\n</ul>";

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = "\n\n<div class=\"app-instruction\">\n    <h1>介绍<a ui-sref=\"root\">返回</a></h1>\n    <blockquote>\n        <p ui-view=\"default\"></p>\n    </blockquote>\n</div>\n<div ui-view=\"content\" class=\"app-content\"></div>";

/***/ }
]);