var yo=require('yo-yo');
let header=require('./header')
let body=require('./body')

module.exports=function(data){
  var th=$.parseHTML(header(data[0]));
var el =yo`<table class="table table-striped table-bordered table-hover principal">
	<thead>
		<tr>
			${th}
		</tr>
	</thead>
	<tbody>
		${data.map(function(json){
			return body(json);
		})}
	</tbody>
	</table>`;
return el;

}
