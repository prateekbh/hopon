function delay(){
	return new Promise(res=>{
		setTimeout(function(){
			res();
		},200)
	})
}


async function doSome(){
	await delay();
	console.log('hi');
}