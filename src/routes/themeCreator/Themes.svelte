<script>
  import preventWhiteSpace from '../../utils/preventWhiteSpace'
  import { themesStore, selectedIndexStore } from './store'

  let themes = []
  let selectedIndex = 0

  selectedIndexStore.subscribe((store) => (selectedIndex = store))
  themesStore.subscribe((store) => (themes = store))

  const onToggle = (index) => selectedIndexStore.set(index)

  const onToggleToEdit = (index) => {
    themes[index].edit = !themes[index].edit

    themesStore.set(themes)
  }

  const onEditName = (event, index) => {
    themes[index].name = event.target.value

    themesStore.set(themes)
  }

  const onNewTheme = () => {
    const colors = []

    themes[0].colors.map((item) => colors.push({ ...item }))

    themes = themes.concat({
      id: themes.length - 1,
      name: 'theme',
      selected: true,
      colors,
    })

    themesStore.set(themes)
  }
</script>

<style>
</style>

<div style="display: flex;">
  {#each themes as theme, i}
    <div style="display: flex; flex-direction: column;">
      <button on:click={() => onToggle(i)}>{theme.name}</button>

      {#if i !== 0}<button on:click={() => onToggleToEdit(i)}>edit</button>{/if}

      {#if theme.edit}
        <input
          type="text"
          id="color"
          disabled={i === 0}
          value={theme.name}
          on:keyup={(event) => onEditName(event, i)}
          on:keypress={preventWhiteSpace} />
      {/if}
    </div>
  {/each}

  <button on:click={() => onNewTheme()}>new theme</button>
</div>
