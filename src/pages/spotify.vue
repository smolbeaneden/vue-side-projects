<template>
<!--	<script src="https://sdk.scdn.co/spotify-player.js"></script>-->
	<div>{{
		topTracks?.map(
		({name, artists}) =>
			`${name} by ${artists.map(artist => artist.name).join(', ')}`
	)
		}}


	</div>
	<iframe style="border-radius:13px" src="https://open.spotify.com/embed/playlist/3L9mjEg3zSSK2u3TKcoQD8?utm_source=generator&theme=0" width="300%" height="800" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
</template>

<script setup>
// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
// import Spotify from '@/pages/spotify.vue'

const token = 'BQDBwShzySCCGxaR26F2W-54EExpD4g0qer982Aj_DJH-yVf4KZXlRTXI9SCgKR17OWbrxYybLegS0v1xhNhxJmgg0oG9Q9IyTwVmdNxPD4o0DC_niOdI86aOI5Nw5GNiS0KpY1gkXD2ecJnUihfTwNOOtAFS8sG0WIKeVkarmJ_c6CYfU0mol8e43hYLKv_Y3nn3_c2mrx8-DeWkxnvjY8bhJPb51COOmkp380CupZ6rO5Z_xeBpG_GLOyWFvGXpGW-rPIfOj_Ywl-PZvxu-j2ZcdZmziKLoXtcohAzHQbQiXus0WfN_K6qnlzH6f-h';
//
// window.onSpotifyWebPlaybackSDKReady = () => {
// 	const player = new Spotify.Player({
// 		name: 'Web Playback SDK Quick Start Player',
// 		getOAuthToken: cb => { cb(token); },
// 		volume: 0.5
// 	});
// }
//
// player.connect().then(success => {
// 	if (success) {
// 		console.log('The Web Playback SDK successfully connected to Spotify!');
// 	}
// })
async function fetchWebApi(endpoint, method, body){
	const res = await fetch(`https://api.spotify.com/${endpoint}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		method,
		body:JSON.stringify(body)
	});
	return await res.json();
}

async function getTopTracks(){
	// Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
	return (await fetchWebApi(
		'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
	)).items;

}

async function fetchPlay(endpoint, method){
	const res = await fetch(`https://api.spotify.com/${endpoint}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		method,
		body:{
			"context_uri": "spotify:album:712X8QUI6uWg1JxHmz0l4I",
			"offset": {
				"position": 5
			},
			"position_ms": 0
		}
	});
	return res;
}
async function play(){
	return (await fetchPlay( '/me/player/play', 'PUT'))
}

await play();

const topTracks = await getTopTracks();
console.log(
	topTracks?.map(
		({name, artists}) =>
			`${name} by ${artists.map(artist => artist.name).join(', ')}`
	)
);


</script>
