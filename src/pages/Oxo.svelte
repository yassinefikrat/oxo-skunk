<script>

	import Cell from '../components/Cell.svelte'
	import EmptyCell from '../components/EmptyCell.svelte'

	export let room = 'default'
	export let location = {}

	const EMPTY_SYMBOL = "."

	let state = [
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        ".",
        "."
    ]

    $: cells = state.map((e, i) => ({ index: i, value: e }))

    let oPlaying = true
    let hoveringCell = null

    let source

    const joinGame = () => {
    	if (source) source.removeEventListener('message', moveListener)
    	source = new EventSource('http://10.2.22.47:5001/listen/' + room)
    	source.addEventListener('message', moveListener)
    }

    const moveListener = messageEvent => {
    	const message = JSON.parse(messageEvent.data)

    	if (message.action === 'restart') {
	    	state = [
		        ".",
		        ".",
		        ".",
		        ".",
		        ".",
		        ".",
		        ".",
		        ".",
		        "."
		    ]
    	} else if (message.action === 'move') {
			// change game state
	    	state[message.cell] = message.player
	    	// check if the game is won
	    	var x = [1, 2, 3]
	    	x.forEach(i => {
	    		const row = i * 3 - 2
	    		if (state[row-1] != '.' && 
	    			state[row-1] == state[row+1-1] && 
	    			state[row-1] == state[row+2-1]) {
	    			win(state[row-1])
	    		}
	    		const col = i
	    		if (state[row-1] != '.' && 
	    			state[row-1] == state[row+3-1] && 
	    			state[row-1] == state[row+6-1]) {
	    			win(state[row-1])
	    		}
	    	})
			//diag 1
			if(	state[0] != '.' && 
				state[0] == state[4] && 
				state[0] == state[8]) {
				win(state[0])
			}
			//diag 2
			if(	state[2] != '.' && 
				state[2] == state[4] && 
				state[2] == state[6]) {
				win(state[2])
			}
    	}
    	
    }

    const post = async (url, body) => {
    	await (await fetch(url, { method: 'POST', body: body })).json()
    }

    function click(index) {
    	console.log('writing to room ' + room)
    	post(
    		'http://10.2.22.47:5001/write/' + room,
    		JSON.stringify({
    			action: 'move',
    			player: oPlaying ? 'o' : 'x',
    			cell: index,
    		})
		)
    }

    const win = winner => {
    	alert(winner + ' won !')
    	restart()
    }

    const restart = () => {
    	post(
    		'http://10.2.22.47:5001/write/' + room,
    		JSON.stringify({ action: 'restart' })
		)
    }

    const changePlayer = symbol => {
    	oPlaying = (symbol === 'o')
    }

    joinGame()


</script>

<main>

	<div class="menu">
		<button on:click="{() => changePlayer('o')}">o</button>
		<button on:click="{() => changePlayer('x')}">x</button>
		<button on:click="{restart}">restart</button>
	</div>

	<div class="grid">
		{#each cells as cell (cell.index)}
			{#if cell.value == EMPTY_SYMBOL}
				<EmptyCell	emptyChar="-" 
							activePlayerSymbol="{oPlaying ? 'o' : 'x'}"
							on:click="{() => click(cell.index)}"/>
			{:else}
				<Cell content="{cell.value}"/>
			{/if}
		{/each}
	</div>

</main>

<style>

	main {
		display: flex;
		flex-direction: column;
	}

	button {
		font-size: 24px;
		font-family: 'Lato bold', sans-serif;
		color: white;
		background-color: transparent;
		border: solid 1px white;
		cursor: pointer;
	}

	button:focus {outline:0;}

	button:hover {
		background-color: #ffc3a0;
	}

	button:active {
		background-color: white;
	}
	
	.grid {
		height: 50vh;
		width: 50vh;
		display: flex;                       /* establish flex container */
		flex-wrap: wrap;                     /* enable flex items to wrap */
		justify-content: space-around;
		font-size: 80px;
	}

	.hidden {
		display: none;
	}

</style>