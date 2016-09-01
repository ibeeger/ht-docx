/*
* @Author: willclass
* @Date:   2016-08-31 10:21:57
* @Last Modified by:   willclass
* @Last Modified time: 2016-09-01 11:30:44
*/

'use strict';


var Docx = require("../");


var file = process.argv[2];

var Item = new Docx(file,{
	pandoc:"/usr/local/bin/pandoc",
	cols:"2",
	format:"A4",
	// orientation: "portrait",
});

Item.toFile(function(){
	console.log(arguments)
});


 