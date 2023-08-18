<template>
	<canvas ref="canvas" class="game"></canvas>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue'

import MapGenerator from '@/core/engine/type/MapGenerator'
import { DesertBiome } from '@/core/engine/type/MapBiome'

import Engine from '@/core/engine/Engine'
import Camera from '@/core/engine/component/Camera'
import Player from '@/core/engine/component/Player'
import BuildMode from '@/core/engine/component/BuildMode'
  
export default defineComponent({
	name: 'TheGame',
	mounted() {
		// Components
		Engine.addComponent(new Camera())
		Engine.addComponent(new Player())
		
		// Create map
		const map = MapGenerator.generate(150, 150, DesertBiome)
		
		// Load game
		Engine.load(this.$refs.canvas as HTMLCanvasElement, map)
		// Engine.building = new BuildMode()
		// Engine.building.tile = 'stoneWall'
		// Engine.building.layer = 2
	}
})
</script>
  
<style scoped lang="scss">
.game {
	overflow: scroll;

	cursor: url('@/assets/cursor/idle.png'), auto;
}
</style>