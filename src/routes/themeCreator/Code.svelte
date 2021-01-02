<script>
  // COMPONENTS
  import Icon from '../../components/Icon.svelte'

  // STORES
  import { themesStore, selectedIndexStore } from './store'

  let themes = []
  let selectedIndex = 0
  let code

  const copyToClipBoard = async () => {
    const code = `html.${themes[selectedIndex].name}{
${handleCopyColor()}
}`
    await navigator.clipboard.writeText(code)
  }

  const handleCopyColor = () => {
    const colors = themes[selectedIndex].colors
      .map((color, index) => {
        if (index === 0) {
          return ` --${color.name}:${color.value};`
        }

        return `\n --${color.name}:${color.value};`
      })
      .join(' ')

    return colors
  }

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
    height: 100%;
  }

  .code-css__head,
  .code-css__code {
    display: block;
    padding-right: 4rem;
    word-break: break-all;
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

  .copy-clipboard {
    background: none;
    outline: none;
    border: none;
    position: absolute;
    right: 1.6rem;
    top: 1.6rem;
  }
</style>

<div class="code-css">
  {#if themes.length > 0 && themes[selectedIndex]}
    <div class="code" bind:this={code}>
      <span class="code-css__head">
        html.{themes[selectedIndex].name}
        <span class="code-css__head--bracket">{'{'}</span>
      </span>

      {#each themes[selectedIndex].colors as color}
        <span class="code-css__code">
          <span class="code-css__code--prop">--{color.name}</span>:
          <span class="code-css__code--value">{color.value}</span>;
        </span>
      {/each}

      <span>{'}'}</span>
    </div>

    <button on:click={copyToClipBoard} class="copy-clipboard pointer">
      <Icon
        name="copy"
        width="2.4rem"
        height="2.4rem"
        color="#ffffffBF"
        hoverColor="#fff"
        toolTip="Copy code" />
    </button>
  {/if}
</div>
