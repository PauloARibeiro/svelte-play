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

  const onDelete = (index) => {
    themes.splice(index, 1)

    themesStore.set(themes)
  }
</script>

<style>
  :focus {
    outline: 1px solid red;
  }

  .themes {
  }

  .themes__theme {
    background: var(--white);
  }

  .themes__theme--name {
    padding: var(--space-s);
  }

  .themes__theme--action {
    border: none;
    height: 100%;
  }

  input {
    border: none;
    border-bottom: 1px solid red;
  }

  input:focus {
    outline: none;
  }
</style>

<ul class="themes fx fx-direction-column">
  {#each themes as theme, i}
    <li class="themes__theme fx fx-content-space-between pointer" on:click={() => onToggle(i)}>
      <div class="themes__theme--name">
        {#if theme.edit}
          <label for={`theme-${i}`}>{theme.name}</label>
        {:else}
          <input
            type="text"
            id={`theme-${i}`}
            disabled={i === 0}
            value={theme.name}
            on:keyup={(event) => onEditName(event, i)}
            on:keypress={preventWhiteSpace} />
        {/if}
      </div>

      <!-- {#if i !== 0} -->
      <div class="fx">
        <button class="themes__theme--action pointer" on:click={() => onToggleToEdit(i)}>e</button>
        <button class="themes__theme--action pointer" on:click={() => onDelete(i)}>d</button>
      </div>
      <!-- {/if} -->
    </li>
  {/each}

  <button on:click={() => onNewTheme()}>new theme</button>
</ul>
