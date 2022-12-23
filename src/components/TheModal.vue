<template>
	<div @click.self="hide" :class="{ 'modal-container': true, 'visible': visible }">
		<div class="modal">
			<slot />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
  
export default defineComponent({
	name: 'TheModal',
	data() {
		return {
			visible: false
		}
	},
	mounted() {
		this.$el.querySelectorAll('button[role]').forEach((node: any) => { 
			if(node.getAttribute('role') === 'close') {
				node.onclick = () => this.hide()
			}
		})
	},
	methods: {
		show() {
			this.visible = true
		},
		hide() {
			this.visible = false
		}
	}
})
</script>

<style lang="scss" scoped>
.modal-container {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;

	padding: 0.8rem;

	z-index: 1000;

	display: flex;
	align-items: center;
	justify-content: center;

	transform: scale(0);

	background: rgba(0, 0, 0, .0);

    animation: fadeIn .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;

	&.visible {
		transform: scale(1);

		.modal {
			transform: scale(1);
			opacity: 1;
		}
	}

	&.size-lg {
		.modal {
			max-width: 50rem;
			height: 30rem;
		}
	}
}

@keyframes fadeIn {
  0% {
    background:rgba(0,0,0,.0);
  }
  100% {
    background:rgba(0,0,0,.45);
  }
}

.modal {
	width: 100%;
	max-width: 28rem;
	height: max-content;
	min-height: 8rem;

	padding: 1.4rem 2rem;

	display: flex;
	flex-direction: column;
	align-items: center;

	background: var(--color-base);
	border: 2px solid var(--color-base-border);

	color: white;

	border-radius: 6px;

	opacity: 0;
    transform: scale(0);
    animation: scaleUp .5s cubic-bezier(0.165, 0.840, 0.440, 1.000) forwards;

	:deep(.title) {
		font-size: 32px;

		margin-bottom: 2rem;
	}
	:deep(p) {
		font-size: 20px;

		text-align: center;
	}
	:deep(button) {
		margin-top: 1.4rem;
	}
}

@keyframes scaleUp {
	0% {
		transform: scale(.8) translateY(1000px);
		opacity: 0;
	}
	100% {
		transform: scale(1) translateY(0px);
		opacity: 1;
	}
}
</style>