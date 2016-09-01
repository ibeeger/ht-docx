ht-docx

基于 pandoc  把 html 或者 htmlstring  用模板转换成 docx 文档

> var Docx = require("ht-docx");		
> var Item = new Docx(filepath || string,{   
	pandoc:"/usr/local/bin/pandoc",   
	cols:"2",   
	format:"A4",   
	// orientation: "portrait",    
});
> Item.toFile("bcdef.docx",function(){	  
	console.log(arguments)     
   });
   
   
node test/demo.js ~/Documents/FE/esources/test/pandoc/a.html


后面持续更新




