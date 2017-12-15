/*
 * @Author: willclass
 * @Date:   2016-08-31 10:17:46
 * @Last Modified by:   ibeeger
 * @Last Modified time: 2017-12-15 17:06:09
 */

'use strict';
var path = require("path");
var assert = require("assert");
var fs = require("fs");
var filename = require("./lib/name.js");
var childprocess = require('child_process');

//options
var options = {
	pandoc: "pandoc/bin/路径",
	format: "A3",
	orientation: "portrait",
	cols: 1, //2,3,4
}

function Docx(arg, opts) {
	assert(arguments.length > 0, "参数缺失");
	let name = path.extname(arg) || path.extname(arg);
	if (name.indexOf("htm") != -1) {
		this.path = arg;
		this.file = path.basename(arg).replace(name, "");
	} else {
		this.html = arg;
	};
	assert(opts.hasOwnProperty("pandoc"), "没有配置pandoc路径");
	this.pandoc = opts.pandoc;
	this.format = opts.format || "A3";
	this.cols = opts.cols || 0;
	this.orientation = opts.orientation || "landscape";
};

Docx.prototype.toFile = function(name, callback) {
	let _callback = arguments.length > 1 ? callback : name;
	let tmpname = filename();
	this.toPath = arguments.length>1? __dirname+"/"+name : "/tmp/"+tmpname+".docx";
	 
	let _this = this;
	if (this.path) {
		_this.exec(tmpname,function(res) {
			_callback(res,_this.toPath);
		})
	} else {
		fs.writeFile("/tmp/" + tmpname + ".html", this.html, function(err) {
			assert(err == null, "写入失败");
			_this.exec(tmpname, function() {
				_callback(res,_this.toPath);
				fs.unlink("/tmp/" + tmpname + ".html", function() {
					console.log("删除html")
				})
			})
		});
	};
};

Docx.prototype.exec = function(filename, callback) {
	let outfile;
	
	if (this.path) {
		outfile = "/tmp/" + filename + ".docx"
		filename = this.path;
	}else{
		outfile = "/tmp/" + filename + ".docx";
		filename = "/tmp/"+filename+".html";
	}
	if (this.toPath) {
		outfile = this.toPath;
	}
	let tmpName = this.cols ==0 ? this.format+"_"+this.orientation+".docx" : this.format+"_"+this.cols+"_"+this.orientation+".docx";
	let hasFile = fs.existsSync(__dirname+"/template/" + tmpName);

	if (!hasFile) {
		console.warn("模板配置不正确，请重新配置");
		callback(new Error("模板配置不正确，请重新配置"))
		return;
	};
	
	let child = childprocess.spawn(this.pandoc, ["--reference-docx="+__dirname+"/template/" + tmpName, 
					"-s", filename, 
					"-o", outfile]);
	let str = [];
	child.stdout.on('data', (data) => {
		str.push(data);
		// console.log(`stdout: ${data}`);
	});

	child.stderr.on('data', (data) => {
		console.log(`stderr: ${data}`);
	});
	child.on("close",function(){
		
	})
	child.on('exit', function(code) {
		callback(str);
		child.stdin.end();
		child.kill();
	})
}


module.exports = Docx;