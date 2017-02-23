/**
 * Created by xiyuyizhi on 17-2-23.
 */

import "angular-drag-and-drop-lists"
import temp from './drag.html'
import ctrl from "./ctrl"

import "./drag.less"

export default angular.module('dragable',['dndLists'])
.config( $stateProvider =>{

	$stateProvider.state('dragable',{
		parent:'app',
		url:'/dragable',
		views:{
			'default':{
			   template:'angular-drag-and-drop-lists 使用 demo'
			},
			'content':{
				template:temp,
				controller:ctrl,
				controllerAs:'vm'
			}
		}
	})

})
.name

/***
 *
 *
 */

