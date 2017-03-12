/**
 * Created by evannayf on 17-3-12.
 */

import temp from "./temp.html"
import ctrl from "./ctrl"

export default angular.module('pagination.test',[])
    .config( $stateProvider=>{

        $stateProvider.state('pagina',{
            parent:'app',
            url:'/pagina',
            views:{
                default:{
                    template:'ui-bootstrap 分页指令 使用'
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