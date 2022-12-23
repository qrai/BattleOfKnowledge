<template>
	<div :class="`slot type-${item?.type}`" :data-title="item?.title ?? ''">
		<img v-if="item?.icon" class="slot-icon" :src="require(`@/assets/sprite/${item?.icon}`)">
		<p class="slot-amount">
			{{ amount ?? 0 }}
		</p>
	</div>
</template>
  
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Item from '@/core/inventory/Item'
  
export default defineComponent({
	name: 'TheSlot',
	props: {
		item: {
			type: Object as PropType<Item>,
			default: null
		},
		amount: {
			type: Number,
		}
	}
})
</script>
  
<style scoped lang="scss">
.slot {
	width: 75px;
	height: 75px;

	position: relative;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	background: radial-gradient(62% 62% at 50% 50%, #705942 0%, #31200e 94.27%);
	
	border: 2px solid #E4CEB3;

	margin-bottom: 0.6rem;
	margin-right: 0.6rem;
	&:last-child, &:nth-child(8n) {
		margin-right: 0;
	}

	.slot-icon {
		width: 55px;
		height: 55px;

		filter: drop-shadow(0 5px 20px rgba(243, 211, 183, 0.35));
	}
	.slot-amount {
		position: absolute;
		right: 8px;
		bottom: 4px;

		color: white;

		text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;

		font-family: Arial;
		font-size: 16px;
	}
	
	&:hover::after {
		content: attr(data-title);

		width: max-content;

		position: absolute;
		top: -25px;
		left: auto;
		right: auto;

		color: white;
		text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;

		font-family: Arial;
		font-size: 16px;
	}

	&.type-tile {
		img {
			position: absolute;
			top: -15px;
		}
	}
}
</style>