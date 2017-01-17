/**
 * Created by xiyuyizhi on 17-1-4.
 */

import temp from "./todolist.html"
import './todolist.less'

export default angular.module('todoList', [])
	.component('todoList', {

		template: temp,
		bindings: {
			nList: '<',
			onHandleDele: '&'
		},
		controller: function ($scope) {
			const ctrl = this

			this.$onInit = function () {
				console.log('init....')
				console.log(this.nList)
			}

			this.$onChanges = function (changes) {
				console.log('change......')
				if (changes.nList) {
					this.theList = angular.copy(this.nList)
				}
			}


			this.dele = function ({index}) {
				this.onHandleDele({
					$event: {
						index: index
					}
				})
			}

		}

	})

	.name