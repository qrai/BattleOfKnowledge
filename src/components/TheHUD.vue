<template>
	<div class="hud">
		<div class="buttons bottom-center">
			<TheSlot :item="item" :amount="1000" />
			<TheSlot />
			<TheSlot />
			<TheSlot />
			<TheSlot />
		</div>

		<!-- Bottom-left buttons -->
		<!--div class="buttons bottom-right">
			<button @click="$emit('click:inventory')" title="Инвентарь" class="button icon-bag"></button>
			<button @click="$emit('click:quests')" title="Квесты" class="button icon-scroll"></button>
			<button @click="$emit('click:treasure')" title="Сокровища" class="button icon-treasure">
				<span class="button-badge">1</span>
			</button>
		</div-->
	</div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue'

import { ItemType } from '@/core/inventory/Item'

import TheSlot from './inventory/TheSlot.vue'
  
export default defineComponent({
	name: 'TheHUD',
	components: { TheSlot },
	data() {
		return {
			item: {
				id: "planks",
				title: "Дерево",
				description: "",
				type: ItemType.Tile,
				icon: "tile/ground/planks_N.png"
			}
		}
	}
})
</script>
  
<style scoped lang="scss">
$padding: 2rem;
$spacing: 0rem;

.hud {
	.buttons {
		position: absolute;

		z-index: 200;

		display: flex;
		flex-direction: row;

		.button {
			margin-right: $spacing;
		}

		&.bottom-left {
			bottom: $padding;
			left: $padding;
		}
		&.bottom-right {
			bottom: $padding;
			right: $padding;
		}
		&.bottom-center {
			bottom: $padding;
			right: 50%;
			transform: translateX(50%);
		}
	}
	.slot {
		cursor: pointer;
	}
	.button {
		width: 150px;
		height: 150px;

		border: none;
		outline: none;

		position: relative;

		cursor: pointer;

		background-color: transparent;
		background-position: center;
		background-repeat: no-repeat;
		background-size: contain;

		image-rendering: pixelated;
  		-ms-interpolation-mode: nearest-neighbor;

		&:hover {
			filter: brightness(1.15)
		}

		&.icon {
			&-bag {
				background-image: url('@/assets/ui/button/map_74.png');
			}
			&-treasure {
				background-image: url('@/assets/ui/button/map_75.png');
			}
			&-scroll {
				background-image: url('@/assets/ui/button/map_71.png');
			}
		}

		.button-badge {
			width: 35px;
			height: 35px;
			
			position: absolute;
			top: 5px;
			right: 5px;

			display: flex;
			align-items: center;
			justify-content: center;

			font-size: 22px;
			color: white;

			image-rendering: pixelated;
  			-ms-interpolation-mode: nearest-neighbor;

			background-color: #da4b4b;
			background-position: center;
			background-repeat: no-repeat;
			background-size: contain;

			border-radius: 4px;
			//background-image: url('@/assets/ui/button/map_65.png');
		}
	}
}
</style>