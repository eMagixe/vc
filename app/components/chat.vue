<script setup lang="ts">
const { init, destroy, localVideo, remoteVideo } = useWebRTC('demo')

onMounted(async () => {
	await init()
})

onBeforeUnmount(() => {
	destroy()
})
</script>

<template>
	<div class="video-chat">
		<div class="video-card">
			<h3>Вы</h3>

			<video ref="localVideo" autoplay muted playsinline />
		</div>

		<div class="video-card">
			<h3>Собеседник</h3>

			<video ref="remoteVideo" autoplay playsinline />
		</div>
	</div>
</template>

<style scoped>
.video-chat {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 20px;
	padding: 20px;
}

.video-card {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

video {
	width: 100%;
	aspect-ratio: 16/9;
	background: #000;
	border-radius: 12px;
	object-fit: cover;
}

h3 {
	margin: 0;
	text-align: center;
	font-size: 16px;
}
</style>
