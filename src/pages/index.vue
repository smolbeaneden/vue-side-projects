<template>
<!--	<HomeButton buttonColor="#646cff"/>-->
  <HomePage heading="my tiny projects :)" />
	<button @click="postData()">Post</button>
</template>
<script setup lang="ts">
import HomePage from '@/components/HomePage.vue'
// import HomeButton from '@/components/general components/HomeButton.vue'

async function postData(): Promise<boolean> {
	console.log("hey")
	try {
		await fetch('http://localhost:3000/', {
			method: 'POST',
			body: JSON.stringify({
				x: 12,
				y:3
			})
		})


	} catch (error) {
		console.log('error posting data', error)
	}
	return true;
}






// import rp from 'express';
// import request from 'express'

//
// async function postData(): Promise<boolean>{
// 	try {
// 		await fetch('http://localhost:3000/', {
// 			method: 'POST',
// 			body: JSON.stringify({
// 				x: 12,
// 				y:3
// 			})
// 		})
//
//
// 	} catch (error) {
// 		console.log('error posting data', error)
// 	}
// 	return true;
// }
//
// // await postData()
// await fetch('http://localhost:3000/', {
// 	method: 'POST',
// 	body: JSON.stringify({
// 		x: "12",
// 		y: "3"
// 	})
// })
//
// rp({
// 	method: 'POST',
// 	uri: 'http://localhost:3000/',
// 	body: ({
// 		x: "12",
// 		y: "3"
// 	}),
// 	json: true // Automatically stringifies the body to JSON
// }).then(function (parsedBody) {
// 	console.dir(parsedBody);
// 	return parsedBody;
// 	// POST succeeded...
// })
// 	.catch(function (err) {
// 		console.log(err+'failed to post data.');
// 		return err+'failed to post data.';
// 		// POST failed...
// 	});

</script>
