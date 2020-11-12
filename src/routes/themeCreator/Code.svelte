<script>
  import { themesStore } from './store'

  let themes = []

  themesStore.subscribe((store) => (themes = store))
</script>

<style>
</style>

<div>
  {#each themes as theme}
    <span style="display: block">html{theme.name === 'default' ? '' : '.' + theme.name} {'{'}</span>

    {#each theme.colors as color}
      <span style="display: block">--{color.name}: {color.value};</span>
    {/each}

    <span>{'}'}</span>
  {/each}
</div>
