<script>
  import Nav from '../components/Nav.svelte'

  // export let segment
</script>

<style>
  .app-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
  }

  main {
    width: 100%;
    max-width: 1500px;
    height: 800px;
    border: 1px solid black;
  }
</style>

<!-- <Nav {segment} /> -->

<div class="app-container">
  <main>
    <slot />
  </main>
</div>
