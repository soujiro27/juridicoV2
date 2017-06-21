require('babelify-es6-polyfill');
const page=require('page');
const $=require('jquery')
const table=require('./table');
const menu=require('./menu');


let tabla=new table();
menu()
tabla.drawTable(ruta);
require('./rutas/insert');
require('./rutas/update');



page();