/**
 * Created by xiyuyizhi on 17-2-24.
 */

import angularDragula from "dragula"
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
				template:'dragula'
			}
		}
	})

})
.name