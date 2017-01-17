/**
 * Created by xiyuyizhi on 17-1-5.
 */

export default class TodoService{


   constructor($q){
   	 'ngInject'
	   this.$q=$q
   }

   getList(){

   	const defer=this.$q.defer()
   	let list=[];
	   if(localStorage.getItem('todo')!='null')
	   {
	   	 setTimeout(function(){
		     list=JSON.parse(localStorage.getItem('todo'))
		     defer.resolve(list)
	     },0)
	   }else{
		   defer.resolve(list)
	   }

	   return defer.promise

   }

   update(item){

   	localStorage.setItem('todo',JSON.stringify(item))

   }


}