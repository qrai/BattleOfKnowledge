<template>
	<div class="view">
		<!-- Game-->
		<TheGame />

		<!-- Background-->
		<div class="background"></div>

		<!-- Legend Modal -->
		<TheModal ref="legend">
			<img src="@/assets/sprite/portrait/2.png" class="story_portrait">

			<p>
				Давно, давно...
				Где-то в далекой галактике...
				Появился великий герой
			</p>

			<button role="close" class="game-button">
				Далее
			</button>
		</TheModal>

		<!-- HUD -->
		<TheHUD
			@click:inventory="($refs.inventory).show()"
			@click:quests="($refs.quests).show()"
			@click:treasure="($refs.treasure).show()"
		/>
		<!-- HUD Modals -->
		<TheModal class="size-lg" ref="inventory">
			<p class="title">
				Инвентарь
			</p>
			
			<div class="row centered">
				
			</div>
		</TheModal>
		<TheModal class="size-lg" ref="quests">
			<p class="title">
				Задания
			</p>

		</TheModal>
		<TheModal class="size-lg" ref="treasure">
			<p class="title">
				Сокровища
			</p>

			<div class="row centered">
				<TreasureCard v-for="treasure of treasures" :key="treasure.day" :day="treasure.day" :item="treasure.item" :amount="treasure.amount ?? 1" />
			</div>
		</TheModal>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import TheGame from '@/components/TheGame.vue'
import TheHUD from '@/components/TheHUD.vue'
import TheModal from '@/components/TheModal.vue'
import TheSlot from '@/components/inventory/TheSlot.vue'

import TreasureCard from '@/components/TreasureCard.vue'
import Item, { ItemType } from '@/core/inventory/Item'

const Treasures = [
	{
		day: 1,
		item: {
			id: 'bone_15',
			type: ItemType.Material,
			icon: 'item/bones/15.png',
			title: 'Кость верхонога',
			description: '',
		}
	},
	{
		day: 2,
		item: {
			id: 'mushroom_39',
			type: ItemType.Material,
			icon: 'item/mushrooms/39.png',
			title: 'Лисоед',
			description: '',
		}
	},
	{
		day: 3,
		amount: 5,
		item: {
			id: 'mushroom_17',
			type: ItemType.Material,
			icon: 'item/mushrooms/17.png',
			title: 'Огненная листвинка',
			description: '',
		}
	},
	{
		day: 4,
		amount: 10,
		item: {
			id: 'alchemy_17',
			type: ItemType.Material,
			icon: 'item/alchemy/32.png',
			title: 'Огнецвет',
			description: '',
		}
	},
	{
		day: 5,
		item: {
			id: 'boots_13',
			type: ItemType.Material,
			icon: 'item/boots/13.png',
			title: 'Золотые сандали',
			description: '',
		}
	},
	{
		day: 6,
		amount: 5,
		item: {
			id: 'books_22',
			type: ItemType.Material,
			icon: 'item/books/22.png',
			title: 'Книга солнца',
			description: '',
		}
	},
	{
		day: 7,
		item: {
			id: 'bones_44',
			type: ItemType.Material,
			icon: 'item/bones/44.png',
			title: 'Череп черепоида',
			description: '',
		}
	}
]

export default defineComponent({
	name: 'HomeView',
	components: {
		TheGame, TheHUD, TheModal, TheSlot, TreasureCard
	},
	data() {
		return {
			treasures: Treasures
		}
	},
	mounted() {
		(this.$refs.legend as any).show()
	}
});
</script>

<style lang="scss" scoped>
.background {
	width: 100%;
	height: 100%;

	position: absolute;
	overflow: visible;

	background-color: #84c9f1;

	.layer {
		width: 300vw;
		height: 100vh;

		position: absolute;
		top: 0;
		left: 0;

		background-repeat: repeat-x;
		background-position: center;
		background-size: auto 100%;

		image-rendering: pixelated;
  		-ms-interpolation-mode: nearest-neighbor;

		&-space {
			z-index: 0;
			background-image: url('@/assets/bg/space.png');
		}
		&-plains {
			&-0 {
				z-index: 0;
				background-image: url('@/assets/bg/plains_0.png');
			}
			&-1 {
				z-index: 1;
				background-image: url('@/assets/bg/plains_1.png');
			}
			&-2 {
				z-index: 2;
				background-image: url('@/assets/bg/plains_2.png');
			}
			&-3 {
				z-index: 3;
				background-image: url('@/assets/bg/plains_3.png');
			}
			&-4 {
				z-index: 4;
				background-image: url('@/assets/bg/plains_4.png');
			}
		}
	}
}
</style>
