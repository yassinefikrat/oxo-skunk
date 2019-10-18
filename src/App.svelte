<script>
  import { Router, Link, Route } from 'svelte-routing'
  import Oxo from './pages/Oxo.svelte'
</script>

<Router>
  <Route path="/oxo/:room" let:params>
  	<Oxo room="{params.room}" />
  </Route>
  <Route component={Oxo} />
</Router> 