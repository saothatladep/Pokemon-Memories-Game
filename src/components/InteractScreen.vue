<template lang="">
	<div class="screen">
		<div
			class="screen__inner"
			:style="{
				width: `${
					((((920 - 16 * 4) / Math.sqrt(cardsContext.length) - 16) * 3) / 4 + 16) * Math.sqrt(cardsContext.length)
				}px`,
			}"
		>
			<card-game
				v-for="(card, index) in cardsContext"
				:key="index"
				:imgBackFaceUrl="`images/${card}.png`"
				:card="{ index: index, value: card }"
				@onFlip="checkRule($event)"
				:ref="
					(el) => {
						divs[index] = el;
					}
				"
				:cardsContext="cardsContext"
				:isFlipping="isFlipping"
			/>
		</div>
	</div>
</template>
<script>
import { reactive, ref } from "@vue/reactivity";
import CardGame from "./CardGame.vue";

export default {
	props: {
		cardsContext: {
			type: Array,
			default: function () {
				return [];
			},
		},
	},
	components: {
		CardGame,
	},
	setup(props, { emit }) {
		let rules = reactive([]);
		const divs = ref([]);
		const isFlipping = ref(false);

		const checkRule = (card) => {
			if (rules.length === 2) {
				return false;
			}
			rules.push(card);
			if (rules.length === 2 && rules[0].value === rules[1].value) {
				isFlipping.value = true;

				divs.value[rules[0].index].onEnabledDisableMode();
				divs.value[rules[1].index].onEnabledDisableMode();
				rules = [];
				isFlipping.value = false;

				const disabledEles = document.querySelectorAll(".screen .card.disabled");

				if (disabledEles && disabledEles.length === props.cardsContext.length - 2) {
					setTimeout(() => {
						emit("onFinish");
					}, 1000);
				}
			} else if (rules.length === 2 && rules[0].value !== rules[1].value) {
				isFlipping.value = true;

				setTimeout(() => {
					divs.value[rules[0].index].onFlipBackCard();
					divs.value[rules[1].index].onFlipBackCard();
					rules = [];
					isFlipping.value = false;
				}, [800]);
			} else {
				return false;
			}
		};
		return { checkRule, rules, divs, isFlipping };
	},
};
</script>
<style lang="css" scoped>
.screen {
	width: 100%;
	height: 100vh;
	position: absolute;
	top: 0;
	left: 0;
	background: var(--dark);
	color: var(--light);
}

.screen__inner {
	display: flex;
	flex-wrap: wrap;
	margin: 2rem auto;
	align-items: center;
}
</style>
