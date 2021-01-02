<script>
  import Themes from './Themes.svelte'
  import Colors from './Colors.svelte'
  import Code from './Code.svelte'
</script>

<style>
  .container {
    display: flex;
    height: 100%;
    width: 100%;
    max-height: 100vh;
    overflow: hidden;
  }

  .section {
    height: 100%;
    flex: 1 1 33.33%;
    max-width: 33.33%;
  }
</style>

<div class="container">
  <div class="section">
    <Themes />
  </div>
  <div class="section">
    <Colors />
  </div>
  <div class="section">
    <Code />
  </div>
</div>
