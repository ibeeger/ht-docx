/*
* @Author: willclass
* @Date:   2016-08-31 10:21:57
* @Last Modified by:   ibeeger
* @Last Modified time: 2016-09-19 14:47:41
*/

'use strict';


var Docx = require("../");


var file = process.argv[2];

var Item = new Docx(file,{
	pandoc:"/usr/local/bin/pandoc",
	cols:"3",
	format:"A3",
	// orientation: "portrait",
});

Item.toFile("ddd.docx",function(){
	console.log(arguments);
});


 