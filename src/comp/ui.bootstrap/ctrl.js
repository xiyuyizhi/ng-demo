/**
 * Created by evannayf on 17-3-12.
 */
export default class Ctrl{

    constructor($rootScope){
        'ngInject'

            this.totalItems=10
            this.currentPage=1
        console.log($rootScope)
        $rootScope.totalItems=10
        $rootScope.currentPage=1
    }
    test(){

        $rootScope.apply(function(){

        })
            }

}