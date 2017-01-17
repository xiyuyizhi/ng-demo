/**
 * Created by xiyuyizhi on 17-1-3.
 */

import temp from "./todoform.html"
import "./todoform.less"

export default angular.module('todoForm',[])
	.directive('todoForm',function(){
			return {

				scope:{
					nCallback:'&'
				},
				template:temp,
				bindToController:true,
				controllerAs:'$ctrl',
				controller:function($scope){
					const ctrl=this

					this.$onInit=function(){
						this.todo={
							content:''
						}
					}

					this.handler={
						enter: e =>{
							if(e.keyCode==13){
								this.todo['todo']=true
								this.todo['id']=new Date().getTime()
								this.nCallback({
									$event:{
										newTodo:angular.copy(this.todo)
									}
								})
								this.todo.content=''
							}
						}
					}

					$scope.$on('reset',(data,data1) => {
						this.todo.content=''
					})
				}
			}
	})
.name