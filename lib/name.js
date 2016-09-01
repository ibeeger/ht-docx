/*
* @Author: willclass
* @Date:   2016-08-31 11:02:34
* @Last Modified by:   willclass
* @Last Modified time: 2016-08-31 11:04:22
*/

'use strict';
module.exports = function(){
	let times = new Date();
	return times.getFullYear()+"-"+times.getMonth()+"-"+times.getDate()+"-"+times.getHours()+"_"+times.getMinutes()+"_"+times.getSeconds();
}