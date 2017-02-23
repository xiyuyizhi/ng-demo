/**
 * Created by xiyuyizhi on 17-2-23.
 */


export default class Drag {

	constructor() {
		console.log('drag')

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

		this.rowAllows=[]
		this.cellAllows=[]
		this.used=[]
		this.fromSource=true
		this.sources.forEach( item =>{
			this.rowAllows.push(item.id)
			this.cellAllows.push(item.id)
		})

		/**
		 * 已经复制的元素不允许再次复制
		 * @param index
		 */
		this.copiedCallback=function(index,item){
			console.log('copyed')
			this.used.push(item)
		}

		this.startCallback1=function(){
			this.fromSource=true
		}
		this.startCallback2=function(){
			this.fromSource=false
		}
		this.dropCallback=function(index,item){
			console.log(index)
			console.log(item)
			console.log(this.used)
			if(this.fromSource){
				for(const val of this.used){
					if(val.id==item.id){
						return false
					}
				}
			}
			return item

		}

		/**
		 * row 中 元素移动时绑定的完成事件
		 * @param index
		 * @param current
		 */
	  this.rowCallback=function(index,current){
			this.dist.row.splice(index,1)
		  this.cellAllows.splice(this.cellAllows.indexOf(current.id),1)
			if(this.rowAllows.indexOf(current.id)==-1){
				this.rowAllows.unshift(current.id)
			}
	  }

		/**
		 * cell 中 元素移动时绑定的完成事件
		 * @param index
		 * @param current
		 */
	  this.cellCallback=function(index,current){
		  this.dist.cell.splice(index,1)
		  this.rowAllows.splice(this.rowAllows.indexOf(current.id),1)
		  if(this.cellAllows.indexOf(current.id)==-1){
			  this.cellAllows.unshift(current.id)
		  }
	  }

	  this.delete=function(index,item,type){
		  this.dist[type].splice(index,1)
		  console.log(this.used.indexOf(item))
		  let indx
		  this.used.forEach( (val,ind)=>{
			  if(val.id==item.id){
				  indx=ind
			  }
		  })
		  this.used.splice(indx,1)
	  }

	}

}