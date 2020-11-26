<script>
  import { themesStore } from './store'

  let themes = []

  themesStore.subscribe((store) => (themes = store))
</script>

<style>
  .code-css {
    background: #1e1e1e;
    color: #b4b8b3;
    padding: 1.6rem;
    height: 768px;
    overflow: auto;
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
  }

  .code-css__code--prop {
    color: #6abfea;
  }

  .code-css__code--value {
    color: #b36b43;
  }
</style>

<div class="code-css">
  {#each themes as theme}
    <span class="code-css__head">
      html{theme.name === 'default' ? '' : '.' + theme.name}
      <span class="code-css__head--bracket">{'{'}</span>
    </span>

    {#each theme.colors as color}
      <span class="code-css__code">
        <span class="code-css__code--prop">--{color.name}</span>:
        <span class="code-css__code--value">{color.value}</span>;
      </span>
    {/each}

    <span>{'}'}</span>
  {/each}
</div>
