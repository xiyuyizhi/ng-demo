/**
 * Created by xiyuyizhi on 17-1-17.
 */

import "angular-sanitize"
import "./style.less"
const img=require('./customEditor.png')
console.log(img)

const html=`<img src="${img}">`

export default  angular.module('CustomEditable',['ngSanitize'])
	.directive('customEditor',function($sce){
		'ngInject'
		return {
				restrict:'A',
				require:'ngModel',
				link:function(scope, element, attrs, ngModel){
					console.log(ngModel)
					if (!ngModel) return;

					ngModel.$render = function() {
						console.log(ngModel.$viewValue)
						element.html($sce.getTrustedHtml(ngModel.$viewValue));
					};

					element.on('blur keyup change', function() {
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
		}
	})
	.config($stateProvider => {
		$stateProvider.state('editable',{
			parent:'app',
			url:'/editable',
			views:{
				'default':{
					template:html
				},
				'content':{
					template:`<div class="custom-editor" contenteditable="true" custom-editor ng-model="form.text">
								</div>
								<p>双向绑定的内容:{{form.text}}</p>
							`,
					controller:function($scope){
						'ngInject'

						$scope.form={
							text:'请输入内容~'
						}

					}
				}
			}
		})

	})
	.name