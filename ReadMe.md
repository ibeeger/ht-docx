###ht-docx


基于 pandoc  把 html 或者 htmlstring  用模板转换成 docx 文档


> var Docx = require("ht-docx");		
> 
> var Item = new Docx(filepath || string,{   
>	pandoc:"/usr/local/bin/pandoc",   
>	cols:"2",   
>	format:"A3",   
>	//orientation: "portrait",    
>});			

> Item.toFile("bcdef.docx",function(){	  
	console.log(arguments)     
   });
   
   
> node test/demo.js ~/Documents/FE/esources/test/pandoc/a.html

目前只支持：

* A3 2cols  landscape 
* A3 3cols  landscape 
* A4 2cols  landscape 
* A4 landscape
* A4 portrait


后面持续更新


####注意事项
在settings.xml 增加 
\<w:evenAndOddHeaders w:val="1"/>


****

* 1.1.0 
  解决配置模板错误,返回错误信息，
  删除模板中冗余的代码

