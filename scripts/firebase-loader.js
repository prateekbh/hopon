const firebasePromise = new Promise((resolve,reject)=>{
	if(typeof document!== "undefined"){
		document.onreadystatechange = function () {
			if (document.readyState === "interactive" || document.readyState === "complete") {
				require.ensure(['firebase/app.js','firebase/auth.js'], (require) => {
					const initFirebase = function() {
						window.firebase = require('firebase/app.js');
						firebase.auth = require('firebase/auth.js');
						firebase.initializeApp({
							apiKey: "AIzaSyCOZUPKoSmUsnG_UedgqDXZr8YnBa-xcdQ",
							authDomain: "hopon-a72e9.firebaseapp.com",
							projectId: "hopon-a72e9",
						});
					};

					resolve(initFirebase);
				}, 'firebase');
			}
		}
	}
});

export default firebasePromise;