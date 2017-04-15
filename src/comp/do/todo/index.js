/**
 * Created by xiyuyizhi on 17-1-4.
 */

import todoForm from "../todo-form/todoForm"
import todoList from "../todo-list/todo-list"
import radio from "../radio/radio"
import temp from "./todo.html"
import "./todo.less"
import service from "./service"
import ctrl from "./ctrl"
const instruct=`TODO小功能，主要练习component方法,将功能按组件划分,父子组件之间的数据交流。`

export default angular.module('TODO', [todoForm, todoList, radio])
	.component('todo',{
		template: temp,
		controller: ctrl
	})
	.service('service', service)
	.config($stateProvider => {

		$stateProvider.state('todo',{
			parent:'app',
			url:'/todo',
			views:{
				'default@app':{
					template:instruct
				},
				'content@app':{
					//component:'todo'
					template:'<todo></todo>'
				}
			}
		})
	})
	.name