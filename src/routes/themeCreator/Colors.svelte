<script>
  import ColorPicker from '../../components/ColorPicker.svelte'
  import preventWhiteSpace from '../../utils/preventWhiteSpace'
  import { themesStore, selectedIndexStore } from './store'

  let themes = []
  let selectedIndex = 0

  selectedIndexStore.subscribe((store) => (selectedIndex = store))
  themesStore.subscribe((store) => (themes = store))

  const onChangeName = (event, index) => {
    themes[selectedIndex].colors[index].name = event.target.value
  }

  const onDelete = (index) => {
    themes.forEach((theme) => {
      theme.colors = theme.colors.filter((color, i) => i !== index)
    })

    themesStore.set(themes)
  }

  const onAddColor = () => {
    themes.forEach((theme) => {
      theme.colors = theme.colors.concat({
        value: '#ffffff',
        name: `new-color`,
      })
    })

    themesStore.set(themes)
  }

  const onColorChange = (e, index) => {
    themes[selectedIndex].colors[index].value = e.detail

    themesStore.set(themes)
  }
</script>

<style>
</style>

<div>
  {#each themes[selectedIndex].colors as color, i}
    <div style="display: flex;">
      <input
        type="text"
        id="color"
        disabled={selectedIndex !== 0}
        value={color.name}
        on:keyup={(event) => onChangeName(event, i)}
        on:keypress={preventWhiteSpace} />

      <ColorPicker on:onColorChange={(event) => onColorChange(event, i)} bind:color={color.value} />

      {color.value}

      <button on:click={() => onDelete(i)}>delete</button>
    </div>
  {/each}

  <button on:click={onAddColor}>Add</button>
</div>
