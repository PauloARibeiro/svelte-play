<script>
  import Icons from '../utils/icons'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let name = ''
  export let width = '100%;'
  export let height = '100%'
  export let color = 'grayscale-300'
  export let hoverColor = 'grayscale-600'
</script>

<style>
  .icon {
    transition: 0.13s ease-in-out all;
  }

  .black {
    fill: var(--c-black);
  }
  .white {
    fill: var(--c-white);
  }
  .brand {
    fill: var(--c-brand);
  }
  .cta {
    fill: var(--c-cta);
  }
  .link {
    fill: var(--c-link);
  }
  .error {
    fill: var(--c-error);
  }
  .success {
    fill: var(--c-success);
  }
  .grayscale-300 {
    fill: var(--c-grayscale-300);
  }
  .grayscale-400 {
    fill: var(--c-grayscale-400);
  }
  .grayscale-600 {
    fill: var(--c-grayscale-600);
  }
  .grayscale-800 {
    fill: var(--c-grayscale-800);
  }
  .hover-black:hover .icon {
    fill: var(--c-black);
  }
  .hover-white:hover .icon {
    fill: var(--c-white);
  }
  .hover-brand:hover .icon {
    fill: var(--c-brand);
  }
  .hover-cta:hover .icon {
    fill: var(--c-cta);
  }
  .hover-link:hover .icon {
    fill: var(--c-link);
  }
  .hover-error:hover .icon {
    fill: var(--c-error);
  }
  .hover-success:hover .icon {
    fill: var(--c-success);
  }
  .hover-grayscale-300:hover .icon {
    fill: var(--c-grayscale-300);
  }
  .hover-grayscale-400:hover .icon {
    fill: var(--c-grayscale-400);
  }
  .hover-grayscale-600:hover .icon {
    fill: var(--c-grayscale-600);
  }
  .hover-grayscale-800:hover .icon {
    fill: var(--c-grayscale-800);
  }
</style>

<div
  style="width: 100%; height: 100%"
  class={`hover-${hoverColor} fx fx-align-center`}
  on:click={(e) => dispatch('click', e)}>
  <div style={`width: ${width}; height:${height}`} class={`icon ${color}`}>
    {@html Icons[name]}
  </div>
</div>
