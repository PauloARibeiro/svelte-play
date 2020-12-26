<script>
  import { createEventDispatcher } from 'svelte'

  export let title = 'Title'
  export let description = 'Description'
  export let disabled = false

  const dispatch = createEventDispatcher()

  const onClick = (event) => {
    dispatch('onClick', { event })
  }
</script>

<style>
  .header {
    padding: 3rem;
  }

  .title {
    color: #4f4f4f;
    font-size: 3.6rem;
    font-weight: 600;
  }

  .description {
    margin-top: 0.8rem;
    font-size: 1.4rem;
    font-weight: 400;
    color: #828282;
  }

  .add {
    position: relative;
    width: 5.6rem;
    height: 5.6rem;
    background-color: #2d9cdb;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    outline: none;
    transition: 0.23s cubic-bezier(0.77, 0, 0.175, 1) opacity;
  }

  .line {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 0.4rem;
  }

  .line.horizontal {
    width: 0.3rem;
    height: 2.6rem;
  }

  .line.vertical {
    width: 2.6rem;
    height: 0.3rem;
  }
</style>

<section class="header fx fx-content-space-between">
  <div class="left">
    <h2 class="title">{title}</h2>
    <span class="description">{description}</span>
  </div>
  <button {disabled} class="add" on:click={onClick}>
    <div class="line horizontal" />
    <div class="line vertical" />
  </button>
</section>
