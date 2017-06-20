var $=require('jquery')
require("jquery-ui-browserify");
var query=require('jquery-confirm')


module.exports=class Noty{


	msgAlert(msg){
		$.alert({
			title:'Error',
			content:msg,
			theme: 'supervan'
		})
	}

	modernAlert(msg){
		$.alert({
			title:'Error',
			content:msg,
			theme: 'Modern'
		})
	}

	


}