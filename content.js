window.addEventListener("load",function(eve){
	chrome.storage.local.get("delayTime",(value)=>{
		//options.htmlで設定した値をAmazonのローカルストレージに移す
		localStorage["delayTime"]=value.delayTime||500;
		//前のセッションが残っていた場合を考慮し最初のロード時に消す
		sessionStorage.clear();
		wishpoints();
	})
},false);

//DOMの変更を監視する
const obtarget = document.getElementById("g-items");
const observer = new MutationObserver(records =>{
	wishpoints();
});
observer.observe(obtarget,{childList:true});

function wishpoints(){
	const dom_parser = new DOMParser();
	//wishlist内のアイテムのリスト
	const itemList = document.getElementsByClassName("price-section");
	//どこまで読み込んだのかsessionStorageに記録
	const olditemnum = sessionStorage.getItem("storageItemNum")||0;
	//以前に調べてないアイテムに対しfetchを行う
	for(let item of Array.from(itemList).slice(olditemnum)){
		const asin = JSON.parse(item.attributes["data-item-prime-info"].value).asin;
		fetch('https://www.amazon.co.jp/dp/'+asin)
		.then(res=>res.text())
		.then(text=>{
		const lopoints = dom_parser.parseFromString(text, "text/html").getElementsByClassName("loyalty-points");
		//loyalty-pointsがない場合にはエラーが出るため存在判定
		let points = "";
		if(lopoints.length!=0){
			points = lopoints[0].innerText.trim().replace(/\s+/g, "").replace(/獲得ポイント:/g,"");
			item.firstElementChild.insertAdjacentHTML("beforeend", " " + "<span style='color: #B12704;font-size:0.8em'>" + points+ "</span>");
		}

	}).catch(err=>console.error(err));
	}
	//セッションストレージに現在の読み込み数を記録
	sessionStorage.setItem("storageItemNum", itemList.length);
}
