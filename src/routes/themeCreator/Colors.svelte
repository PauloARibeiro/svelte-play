<script>
  import SimpleBar from '@woden/svelte-simplebar'

  // ANIMATIONS
  import { fly, fade } from 'svelte/transition'
  import { flip } from 'svelte/animate'

  // COMPOENTS
  import ColorPicker from '../../components/ColorPicker.svelte'

  import Icon from '../../components/Icon.svelte'
  import Header from './Header.svelte'

  // UTILS
  import preventWhiteSpace from '../../utils/preventWhiteSpace'

  // STORES
  import { themesStore, selectedIndexStore, shouldAnimateStore } from './store'

  let themes = []
  let selectedIndex = 0
  let shouldAnimate = false
  let showPicker = false
  let isCreateDisabled = false

  const handleThemeStore = (store) => {
    themes = store

    if (themes.length > 0) return (isCreateDisabled = false)

    isCreateDisabled = true
  }

  const onChangeName = (event, index) => {
    themes[selectedIndex].colors[index].name = event.target.value

    themesStore.set(themes)
  }

  const onDelete = (index) => {
    if (!shouldAnimate) shouldAnimateStore.set(true)

    setTimeout(() => {
      themes.forEach((theme) => theme.colors.splice(index, 1))

      themesStore.set(themes)
    }, 0)
  }

  const onAddColor = () => {
    // themes.forEach((theme) => {
    //   theme.colors = theme.colors.concat({
    //     value: '#ffffff',
    //     name: `new-color`,
    //   })
    // })
    if (!shouldAnimate) shouldAnimateStore.set(true)

    themes[selectedIndex].colors.push({
      value: '#ffffff',
      name: `new-color`,
    })

    themesStore.set(themes)
  }

  const onColorChange = (e, index) => {
    themes[selectedIndex].colors[index].value = e.detail

    themesStore.set(themes)
  }

  selectedIndexStore.subscribe((store) => (selectedIndex = store))
  themesStore.subscribe((store) => handleThemeStore(store))
  shouldAnimateStore.subscribe((store) => (shouldAnimate = store))
</script>

<style>
  .colors-wrapper {
    height: 100%;
    max-height: 100vh;
    background-color: #f2f2f2;
  }

  /********** item **********/
  .color {
    padding-left: 1.6rem;
    margin: 1.6rem 3rem;
    height: 8rem;
    background: #e0e0e0;
    border-radius: 1.2rem;
  }

  .color-picker :global(.color-picker__box) {
    width: 4.4rem !important;
    height: 4.4rem !important;
    border: 0.1rem solid #828282 !important;
    border-radius: 50%;
  }

  .info {
    width: 85%;
    margin-left: 1.6rem;
  }

  .input,
  .value {
    color: #757575;
  }

  .input {
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 2rem;
    font-weight: 500;
    cursor: auto;
  }

  .value {
    margin-top: 0.6rem;
    font-size: 1.4rem;
  }

  /********** ACTION **********/
  .action {
    padding-right: 1.6rem;
    height: 100%;
  }
</style>

<div class="colors-wrapper">
  <Header
    title="Colors"
    description="Edit your theme's colors"
    on:onClick={onAddColor}
    bind:disabled={isCreateDisabled} />
  {#if themes.length > 0 && themes[selectedIndex]}
    <SimpleBar style="height: calc(100vh - 13%);">
      <div class="colors">
        {#each themes[selectedIndex].colors as color, i (color)}
          <div
            class="color fx fx-content-space-between fx-align-center"
            animate:flip={{ delay: shouldAnimate ? 400 : 0, duration: shouldAnimate ? 200 : 0 }}
            in:fade={{ duration: shouldAnimate ? 130 : 0 }}
            out:fly={{ x: shouldAnimate ? 130 : 0, duration: shouldAnimate ? 600 : 0 }}>
            <div class="fx fx-align-center w-100">
              <div class="color-picker pointer">
                <ColorPicker
                  on:onColorChange={(event) => onColorChange(event, i)}
                  bind:show={showPicker}
                  bind:color={color.value} />
              </div>

              <div class="info">
                <input
                  class="input  w-100"
                  type="text"
                  id={`color-${i}`}
                  value={color.name}
                  on:keyup={(event) => onChangeName(event, i)}
                  on:keypress={preventWhiteSpace} />
                <div on:click={() => (showPicker = true)} class="value">{color.value}</div>
              </div>
            </div>

            <div class="action pointer">
              <Icon
                name="delete"
                width="20px"
                height="20px"
                color="#0000008A"
                hoverColor="#EB5757"
                on:click={() => onDelete(i)} />
            </div>
          </div>
        {/each}
      </div>
    </SimpleBar>
  {/if}
</div>
