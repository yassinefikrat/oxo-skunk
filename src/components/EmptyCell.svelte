<script>
	
	export let emptyChar
	export let activePlayerSymbol

	let content = emptyChar

	function enter(e) {
		content = activePlayerSymbol
	}

	function leave(e) {
		content = emptyChar
	}

</script>

<div 	class="cell" 
		on:mouseenter={enter}
		on:mouseleave={leave}
		on:click>
	{content}
</div>

<style>

	.cell {
		margin: 0;
		padding: 0;
		flex: 0 0 33%;  
		height: 10vh;
		width: 10vh;
		font-size: 60px;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}

</style>