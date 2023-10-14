<script>
	import { Router, Link, Route } from 'svelte-routing';
	import Home from './Home.svelte';
	import Login from './Login.svelte';
</script>

<Router>
	<nav>
		<Link to="/">Home</Link>
		<Link to="/login">Login</Link>
	</nav>
	<div>
		<Route path="/"><Home /></Route>
		<Route path="/login"><Login /></Route>
	</div>
</Router>
