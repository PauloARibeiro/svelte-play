<script>
  import { themesStore, selectedIndexStore } from './store'

  let themes = []
  let selectedIndex = 0

  themesStore.subscribe((store) => (themes = store))
  selectedIndexStore.subscribe((store) => (selectedIndex = store))
</script>

<style>
  .code-css {
    background: #1e1e1e;
    color: #b4b8b3;
    padding: 1.6rem;
    overflow: auto;
    font-size: 2rem;
  }

  .code-css__head,
  .code-css__code {
    display: block;
  }

  .code-css__head {
    color: #d1ae5d;
  }

  .code-css__head:not(:first-child) {
    margin-top: 1.6rem;
  }

  .code-css__head--bracket {
    color: #b4b8b3;
  }

  .code-css__code {
    transform: translateX(1.6rem);
    margin: 0.5rem 0;
  }

  .code-css__code--prop {
    color: #6abfea;
  }

  .code-css__code--value {
    color: #b36b43;
  }
</style>

<div class="code-css">
  {#if themes.length > 0 && themes[selectedIndex]}
    <span class="code-css__head">
      html{themes[selectedIndex].name === 'default' ? '' : '.' + themes[selectedIndex].name}
      <span class="code-css__head--bracket">{'{'}</span>
    </span>

    {#each themes[selectedIndex].colors as color}
      <span class="code-css__code">
        <span class="code-css__code--prop">--{color.name}</span>:
        <span class="code-css__code--value">{color.value}</span>;
      </span>
    {/each}

    <span>{'}'}</span>
  {/if}
</div>
