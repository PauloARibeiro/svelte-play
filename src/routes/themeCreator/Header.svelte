<script>
  import { createEventDispatcher } from 'svelte'

  export let title = 'Title'
  export let description = 'Description'
  export let disabled = false
  export let toolTip = ''

  const dispatch = createEventDispatcher()

  const onClick = (event) => {
    dispatch('onClick', { event })
  }
</script>

<style>
  .header {
    padding: 3rem;
  }

  .left {
    /* width: 100%; */
    max-width: 87%;
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
    word-wrap: break-word;
    word-break: break-all;
    white-space: normal;
  }

  .add {
    position: relative;
    min-width: 5.6rem;
    height: 5.6rem;
    background-color: #2d9cdb;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    outline: none;
    transition: 0.13s ease-in-out all;
  }

  /* .add:hover {
    background-color: #2d9cdbcc;
  } */

  .add:active {
    background-color: #2d9cdbd9;
  }

  .add:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
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
  <button {disabled} class="add" on:click={onClick} title={toolTip}>
    <div class="line horizontal" />
    <div class="line vertical" />
  </button>
</section>
