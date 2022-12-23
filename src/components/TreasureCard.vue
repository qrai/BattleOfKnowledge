<template>
	<div class="treasure-card">
		<TheSlot :item="item" :amount="amount" />
		
		<p class="title">
			{{ day }} день
		</p>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Item from '@/core/inventory/Item'

import TheSlot from './inventory/TheSlot.vue'
  
export default defineComponent({
	name: 'TreasureCard',
	components: { TheSlot },
	props: {
		day: {
			type: Number,
			required: true
		},
		amount: {
			type: Number,
			required: true
		},
		item: {
			type: Object as PropType<Item>,
			required: true
		}
	}
})
</script>

<style lang="scss" scoped>
.treasure-card {
	width: 9rem;
	height: 9rem;

	padding: 0.85rem;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	cursor: pointer;

	background: var(--color-base-secondary);

	border-radius: 6px;

	margin-top: 1rem;
	margin-right: 1rem;
	&:last-child {
		margin-right: 0;
	}
	&[disabled] {
		opacity: 0.65;
	}

	.slot {
		margin: 0 !important;
	}

	.title {
		font-size: 24px;

		margin-top: auto;
		margin-bottom: 0;
	}
}
</style>