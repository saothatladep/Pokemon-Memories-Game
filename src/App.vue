<template>
	<main-screen v-if="statusMatch === 'default'" @onStart="onHandleBeforeStart($event)" />
	<interact-screen v-if="statusMatch === 'match'" :cardsContext="setting.cardsContext" @onFinish="onGetResult" />
	<result-screen v-if="statusMatch === 'result'" :timer="timer" @onStartAgain="playAgain" />
</template>

<script>
import MainScreen from "./components/MainScreen.vue";
import InteractScreen from "./components/InteractScreen.vue";
import ResultScreen from "./components/ResultScreen.vue";
import { reactive, ref } from "vue";
import { shuffled } from "./utils/array";
// import CopyRightScreen from "./components/CopyRightScreen.vue";

export default {
	components: { MainScreen, InteractScreen, ResultScreen },
	name: "App",
	setup() {
		const statusMatch = ref("default");
		const timer = ref(0);
		const setting = reactive({ totalOfBlock: 0, cardsContext: [], startedAt: null });

		function onHandleBeforeStart(config) {
			setting.totalOfBlock = config.totalOfBlocks;

			const firstCards = Array.from({ length: setting.totalOfBlock / 2 }, (_, i) => i + 1);
			const secondCards = [...firstCards];

			const cards = [...firstCards, ...secondCards];

			setting.cardsContext = shuffled(shuffled(shuffled(shuffled(cards))));
			setting.startedAt = new Date().getTime();

			statusMatch.value = "match";
		}

		const onGetResult = () => {
			timer.value = new Date().getTime() - setting.startedAt;
			statusMatch.value = "result";
		};

		const playAgain = () => {
			statusMatch.value = "default";
		};

		return { statusMatch, onHandleBeforeStart, setting, onGetResult, timer, playAgain };
	},
};
</script>
