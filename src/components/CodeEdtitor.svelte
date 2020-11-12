<script>
  import { Highlight } from 'svelte-highlight'
  import { css } from 'svelte-highlight/languages'
  import { github } from 'svelte-highlight/styles'

  export let code = ''
</script>

<style>
</style>

<svelte:head>
  {@html github}
</svelte:head>

<Highlight language={css} {code} />
