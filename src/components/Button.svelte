<script>
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()
</script>

<style>
  button {
    position: relative;
    text-align: center;
    user-select: none;
    outline: none;
    cursor: pointer;
    border: 0.1rem solid transparent;
    padding: 0.9rem 2.4rem;
    color: var(--c-white);
    background-color: var(--c-black);
    border-color: var(--c-black);
    transition: all 0.1s ease 0s;
  }

  button:hover {
    background-color: var(--c-white);
    color: var(--c-black);
  }
</style>

<button on:click={(e) => dispatch('click', e)}>
  <slot />
</button>
