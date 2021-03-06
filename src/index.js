/**
 * Created by xiyuyizhi on 17-1-3.
 */

import "angular"
import "angular-ui-router"
import "angular-ui-bootstrap"
// import "angular-ui-bootstrap/dist/ui-bootstrap-csp.css"

import './style.less'
import todo from "./comp/do/todo"
import model from "./comp/ng_model"
import cusEditor from "./comp/editableArea"
import drag from "./comp/dragable"
import dragula from "./comp/dragula"
import paginationTest from "./comp/ui.bootstrap"

angular.module('TEST', ['ui.router','ui.bootstrap',todo,model,cusEditor,drag,dragula,paginationTest])
    .config(($stateProvider, $urlRouterProvider) => {
        'ngInject'
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