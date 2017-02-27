window.addEventListener("load",function(eve){
	let button = document.getElementById("save");
	button.addEventListener("click",function(){
		let fetchId = document.getElementById("fetchid");
		let loadId = document.getElementById("loadid");
		let delayTime = document.getElementById("delaytime");
		localStorage["fetchType"] = fetchId.options[fetchId.selectedIndex].value;
		localStorage["loadType"] = loadId.options[loadId.selectedIndex].value;
		localStorage["delayTime"] = delayTime.value;
		window.close();
	},false);
},false);

