<script>
  import Nav from '../components/Nav.svelte'

  // export let segment
</script>

<style>
  .app-container {
  }

  main {
    height: 100vh;
  }
</style>

<!-- <Nav {segment} /> -->

<div class="app-container">
  <main>
    <slot />
  </main>
</div>
