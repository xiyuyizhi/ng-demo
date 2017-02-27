/**
 * Created by xiyuyizhi on 17-2-27.
 */

export default class Ctrl{

	constructor($scope,dragulaService){
		'ngInject'

		Object.assign(this,{$scope,dragulaService})
		const vm=this
		this.sources = [
			{
				id:'s1',
				name: 'source1'
			}, {
				id:'s2',
				name: 'source2'
			}, {
				id:'s3',
				name: 'source3'
			}, {
				id:'s4',
				name: 'source4'
			}, {
				id:'s5',
				name: 'source5'
			}, {
				id:'s6',
				name: 'source6'
			}, {
				id:'s7',
				name: 'source7'
			}, {
				id:'s8',
				name: 'source8'
			}
		]
		this.dist={
			row:[],
			cell:[]
		}
		this.used=new Set()

		this.dragulaService.options(this.$scope,'two',{
			copy: function (el, source) {
				return source===document.getElementById('u1')
			},
			accepts: function (el, target,source) {
				//源码有bug!!!
				const arr=Array.from(vm.used)
				for(const item of arr){
					if(item.id==el.className){
						return false
					}
				}
				return target!== document.getElementById('u1')
			}
		})

		this.$scope.$on('two.drop-model',(el, target, source)=>{
			this.dist.row.forEach( item =>{
				this.used.add(item)
			})
			this.dist.cell.forEach( item =>{
				this.used.add(item)
			})
		})

	}

}
