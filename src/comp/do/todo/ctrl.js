

export default class TodoCtrl {

    constructor($scope, service) {
        'ngInject'
        Object.assign(this, { $scope, service })
        this.todoList = []
    }

    $onInit() {

        this.service.getList().then( data=> {
            this.todoList = data || []
        })
    }

    addNew({ newTodo }) {
        this.todoList.unshift(newTodo)
        this.todoList = angular.copy(this.todoList)
        this.service.update(this.todoList)
    }
    dele({ index }) {
        console.log(this)
        this.todoList[index].todo = false
        this.todoList = this.todoList.concat(this.todoList.splice(index, 1))
        this.service.update(this.todoList)

    }

    reset() {
        this.todoList = []
        this.service.update(null)
        this.$scope.$broadcast('reset', true)
    }

}