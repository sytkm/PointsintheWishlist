window.addEventListener("load",function(eve){
	let button = document.getElementById("save");
	button.addEventListener("click",function(){
		let delayTime = document.getElementById("delaytime");
		chrome.storage.local.set(
			{
				"delayTime":delayTime.value
			})
			.then(()=>{
			console.log("Value is set");
			window.close();
			})
		//localStorage["fetchType"] = fetchId.options[fetchId.selectedIndex].value;
		//localStorage["loadType"] = loadId.options[loadId.selectedIndex].value;
		//localStorage["delayTime"] = delayTime.value;
	},false);
},false);

