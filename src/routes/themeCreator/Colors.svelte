<script>
  import ColorPicker from '../../components/ColorPicker.svelte'
  import Button from '../../components/Button.svelte'
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
    themes.forEach((theme) => theme.colors.splice(index, 1))

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
  <Button on:click={onAddColor}>Add</Button>

  {#each themes[selectedIndex].colors as color, i}
    <div style="display: flex;">
      <div class="fx fx-direction-column pointer">
        <label for={`color-${i}`}>{color.value}</label>
        <input
          type="text"
          id={`color-${i}`}
          disabled={selectedIndex !== 0}
          value={color.name}
          on:keyup={(event) => onChangeName(event, i)}
          on:keypress={preventWhiteSpace} />
      </div>

      <ColorPicker on:onColorChange={(event) => onColorChange(event, i)} bind:color={color.value} />

      <button on:click={() => onDelete(i)}>d</button>
    </div>
  {/each}
</div>
