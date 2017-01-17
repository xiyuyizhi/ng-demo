/**
 * Created by xiyuyizhi on 17-1-4.
 */


import temp from './radio.html'
import "./radio.less"

export default angular.module('radioModule', [])
	.directive('radio', function () {

		return {

			template: temp,
			controllerAs: '$ctrl',
			bindToController: true,
			scope: {
				nIndex:'@',
				nCallback: '&'
			},
			controller: function ($scope,$element, $attrs) {
				const ctrl = this
				ctrl.switch = {
					on: false
				}
				this.handler = {
					click: function () {
						ctrl.switch['on'] = !ctrl.switch['on']
						if (ctrl.switch['on']) {
							ctrl.nCallback({
								$event:{
									index:Number(ctrl.nIndex)
								}
							})
						}
					}
				}

			}
		}

	})
	.name