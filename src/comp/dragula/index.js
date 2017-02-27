/**
 * Created by xiyuyizhi on 17-2-24.
 */

import angularDragula from "dragula"
import "dragular.css"
import ctrl from "./ctrl"
import temp from "./dragula.html"
import './dragula.less'

export default angular.module('dragu',[angularDragula(angular)])
.config( $stateProvider=>{

	$stateProvider.state('dragula',{
		parent:'app',
		url:'/dragula',
		views:{
			default:{
				template:'dragula 使用 demo'
			},
			content:{
				template:temp,
				controller:ctrl,
				controllerAs:'vm'
			}
		}
	})

})
.name