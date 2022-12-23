<template>
	<router-view/>
</template>

<style lang="scss">
html, body, #app, .view {
	width: 100%;
	height: 100%;

	overflow: hidden;

	font-family: 'Anticva';
}

*, *::before, *::after {
	margin: 0;
	padding: 0;

	font-family: inherit;

	box-sizing: border-box;
}

::-moz-selection {
  background: yellow;
}
::selection {
  color: #d1d3f8;
  background: rgba(33, 43, 229, 0.25);
}
</style>
