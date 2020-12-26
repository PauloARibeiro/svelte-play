<script>
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let color = 'primary'
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
    color: var(--basic-100);
    font-size: var(--f-size-s);
    transition: all 0.15s ease-in;
    border: 0.1rem solid transparent;
    box-shadow: 0 0 0 0 rgba(143, 155, 179, 0);
    border-radius: 2rem;
  }

  /* PRIMARY */

  button.primary {
    background-color: var(--primary-500);
  }

  button.primary:hover {
    background-color: var(--primary-400);
  }

  button.primary:active {
    background-color: var(--primary-600);
  }

  button.primary:focus {
    border-color: var(--primary-800);
  }

  /* SUCCESS */

  button.success {
    background-color: var(--success-500);
  }

  button.success:hover {
    background-color: var(--success-400);
  }

  button.success:active {
    background-color: var(--success-600);
  }

  button.success:focus {
    border-color: var(--success-800);
  }
</style>

<button class={color} on:click={(e) => dispatch('click', e)}>
  <slot />
</button>
