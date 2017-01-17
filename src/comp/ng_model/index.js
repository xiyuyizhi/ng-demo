/**
 * Created by xiyuyizhi on 17-1-17.
 */

const html=`
		NgModelController provides API for the ngModel directive. The controller contains services for data-binding, validation, CSS updates, and value formatting and parsing. It purposefully does not contain any logic which deals with DOM rendering or listening to DOM events. Such DOM related logic should be provided by other directives which make use of NgModelController for data-binding to control elements. Angular provides this DOM logic for most input elements. At the end of this page you can find a custom control example that uses ngModelController to bind to contenteditable elements.
		<hr/>
		<ul>
			<li>$render</li>
			<li>$rollbackViewValue()</li>
			<li>$setViewValue(value, trigger)</li>
			<li>$parsers ngModelController.$parsers(function(value){ })</li>
			<li>$formatters ngModelController.formatters(function(value){ })</li>	
		</ul>
	`

export default  angular.module('NGMODEL',[])
	.directive('customModel',function(){
		return{
			restrict:'A',
			require:'ngModel',
			link:function(scope,element,attr,modelCtrl){
				modelCtrl.$parsers.push(function(value){
					if(value.length>5){
						value=value.slice(0,5)
						modelCtrl.$setViewValue(value);
					}
					element.val(value)
					return value
				})
			}
		}
	})
	.config($stateProvider => {

		$stateProvider.state('model',{
			parent:'app',
			url:'/model',
			views:{
				'default':{
					template:html
				},
				'content':{
					template:`<input custom-model="" ng-model="form.username">
 								<span>测试最多输入5个字符</span><br>
								username: {{form.username}}`,
					controller:function($scope){
						'ngInject'

						$scope.form={
							username:''
						}

					}
				}
			}
		})

	})
	.name