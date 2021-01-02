<script>
  import { createEventDispatcher } from 'svelte'
  import { fade } from 'svelte/transition'
  import { HsvPicker } from 'svelte-color-picker/src/index'
  import { clickOutside } from '../utils/clickOutside'

  export let show = false
  export let color = '#000000'

  const dispatch = createEventDispatcher()

  const handleOut = () => (show = false)

  const onToggle = () => (show = !show)

  const onColorChange = (event) => {
    const { r, g, b, a } = event.detail

    color = RGBAToHexA(r, g, b)

    dispatch('onColorChange', color)
  }

  const RGBAToHexA = (r, g, b, a) => {
    r = r.toString(16)
    g = g.toString(16)
    b = b.toString(16)

    if (r.length == 1) r = '0' + r
    if (g.length == 1) g = '0' + g
    if (b.length == 1) b = '0' + b

    return '#' + r + g + b
  }
</script>

<style>
  :global(.color-info-box),
  :global(.alpha-selector) {
    display: none;
  }

  :global(.main-container) {
    height: 201pxb !important;
    /* border-radius: 10px !important; */
  }

  /* :global(.alpha-selector ) {
  } */

  .color-picker {
    position: relative;
  }

  .color-picker__box {
    width: 30px;
    height: 15px;
    border: 1px solid var(--c-black);
  }

  .color-picker__picker {
    position: absolute;
    top: 4.8rem;
    left: 0;
    opacity: 1;
    transition: 0.13s ease-in-out opacity;
    z-index: 3;
  }
</style>

<div class="color-picker" use:clickOutside on:click_outside={handleOut}>
  <div on:click={onToggle} class="color-picker__box" style="background-color: {color}" />

  {#if show}
    <div transition:fade={{ duration: 130 }} class="color-picker__picker">
      <HsvPicker on:colorChange={onColorChange} startColor={color} />
    </div>
  {/if}
</div>
