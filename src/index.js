/**
 * Created by xiyuyizhi on 17-1-3.
 */

import "angular"
import "angular-ui-router"

import './style.less'
import todo from "./comp/do/todo"
import model from "./comp/ng_model"
import cusEditor from "./comp/editableArea"
import drag from "./comp/dragable"

angular.module('TEST', ['ui.router',todo,model,cusEditor,drag])
    .config(($stateProvider, $urlRouterProvider) => {
        'ngInject'
        console.log('in config')
        $stateProvider.state('root', {
                url: '/root',
                views:{
                    'root':{
                        template: require('./list.html')
                    }
                }
            })
            .state('app',{
                abstract:true,
                url:'/app',
                views:{
                    'root':{
                        template:require('./app.html')
                    }
                }
            })
        $urlRouterProvider.otherwise('/root')
    })



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