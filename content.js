var pointpages;
window.addEventListener("load",function(eve){
	//options.htmlで設定した値をAmazonのローカルストレージに移す	
	chrome.runtime.sendMessage({method: "getLocalStorage", key1: "fetchType",key2:"loadType",key3:"delayTime"}, function(response) {
		localStorage["fetchType"]=response.data1;
		localStorage["loadType"]=response.data2;
		localStorage["delayTime"]=response.data3;
	});
	//fetchAPIを用いるかjqueryのajaxを用いるか
	if(localStorage["fetchType"]=="fetchapi"){
		wishpoints(true);
	}else if(localStorage["fetchType"]=="jqueryajax"){
		wishpoints(false);
	}
	//wishlistのどのページのポイントを読み込んだか
	//pointpagesはfalseならばそのページを読み込んである
	pointpages=[];
	var pag = document.getElementsByClassName("a-");
	var selectp = document.getElementsByClassName("a-selected");
	for(let i=0;i<=pag.length;i++){
		pointpages.push(true);
	}
	//複数ページにまたがっている場合には現在表示しているページをチェック
	if(selectp.length>0){
		pointpages[Number(selectp[0].firstElementChild.innerText)-1]=false;
	}
},false);

window.addEventListener("click",function(eve){
	//debug
	//console.log(eve.path[0]);
	//console.log(pointpages);
	//そのページのポイントを読み込んでいないのならば読み込む
	//すぐ読み込むとDOMが生成されないままfetchし始めるので、一定時間待つ
	if(pointpages[Number(eve.path[0].innerText)-1]){
		pointpages[Number(eve.path[0].innerText)-1]=false;
		if(localStorage["fetchType"]=="fetchapi"){
			setTimeout('wishpoints(true)',localStorage["delayTime"]);
		}else if(localStorage["fetchType"]=="jqueryajax"){
			setTimeout('wishpoints(false)',localStorage["delayTime"]);
		}
		//debug
  		//console.log(pointpages);
  	}
},false);

function wishpoints(enablefetch){
	const dom_parser = new DOMParser();
	//wishlist内のアイテムのリスト
	let itemList = document.getElementsByClassName("price-section");
	//debug
	//console.log(itemList);
	//全てのアイテムに対しfetchを行う
	for(let item of itemList){
		let asin = JSON.parse(item.attributes["data-item-prime-info"].value).asin;

		if(enablefetch){
			console.log("fetch");
			fetch('https://www.amazon.co.jp/dp/'+asin)
			.then(res=>res.text())
			.then(text=>{
			const lopoints = dom_parser.parseFromString(text, "text/html").getElementsByClassName("loyalty-points");
			//debug
			//console.log(lopoints);
			const kindlepoints = lopoints[0].children[1].innerText.trim();
			//debug
			console.log(kindlepoints);
			item.firstElementChild.insertAdjacentHTML("beforeend", " " + kindlepoints);})
			.catch(err=>console.error(err));
		}else{
			//debug
			// console.log("jquery ajax");
			$.ajax({
				type:'GET',
				url:'https://www.amazon.co.jp/dp/'+asin,
				dataType:'html'
			}).done(function(data,status,xhr){
				const lopoints = dom_parser.parseFromString(data, "text/html").getElementsByClassName("loyalty-points");
				//kindle本でポイントがついている場合のみ計算
				if(lopoints.length){
					//trimをすることでスペースを削除
					var kindlepoints = lopoints[0].children[1].innerText.trim();
					//debug
					// console.log(kindlepoints);
					item.firstElementChild.insertAdjacentHTML("beforeend", " " + kindlepoints);
				}
			}).fail(function(xhr,status,error){
				console.error(error);
			});
		}
	}
}
