<script>
  import Themes from './Themes.svelte'
  import Colors from './Colors.svelte'
  import Code from './Code.svelte'
</script>

<style>
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    height: 100%;
    max-height: 100vh;
    overflow: hidden;
  }
</style>

<div class="container">
  <Themes />
  <Colors />
  <Code />
</div>
