<script>
  import { fly, fade } from 'svelte/transition'
  import { flip } from 'svelte/animate'
  import preventWhiteSpace from '../../utils/preventWhiteSpace'
  import { themesStore, selectedIndexStore } from './store'
  import Icon from '../../components/Icon.svelte'
  import Button from '../../components/Button.svelte'

  let themes = []
  let selectedIndex = 0

  let inputEl

  let iconColor = 'c-grayscale-300'

  selectedIndexStore.subscribe((store) => (selectedIndex = store))
  themesStore.subscribe((store) => (themes = store))

  const onToggle = (index) => {
    themes.forEach((theme) => (theme.edit = false))

    selectedIndexStore.set(index)

    themesStore.set(themes)
  }

  const onToggleToEdit = (index) => {
    themes[selectedIndex].edit = false

    themes[index].edit = !themes[index].edit

    themesStore.set(themes)

    selectedIndexStore.set(index)

    setTimeout(() => {
      if (inputEl) inputEl.focus()
    }, 0)
  }

  const onEditName = (event, index) => {
    themes[index].name = event.target.value

    themesStore.set(themes)
  }

  const onNewTheme = () => {
    const colors = []

    themes[0].colors.map((item) => colors.push({ ...item }))

    const newTheme = {
      id: themes.length - 1,
      name: 'theme',
      edit: false,
      colors,
    }

    themesStore.set([...themes, ...[newTheme]])
  }

  const onDelete = (index) => {
    if (selectedIndex === themes.length - 1) selectedIndexStore.set(index - 1)

    themes.splice(index, 1)

    themesStore.set(themes)
  }
</script>

<style>
  :focus {
    /* outline: 1px solid red; */
  }

  .themes {
    border-right: 1px solid var(--c-grayscale-300);
  }

  .theme {
    background: var(--white);
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid var(--c-grayscale-300);
    transition: 0.1s ease-in-out all;
  }

  .theme::before {
    content: '';
    position: absolute;
    width: 3px;
    height: 99%;
    background: var(--c-brand);
    top: 0;
    left: 0;
    transform: translateX(-3px);
    transition: 0.1s ease-in-out transform;
  }

  .theme:active::before {
    width: 4px;
    transform: translateX(0px);
  }

  .theme.active::before {
    transform: translateX(0);
  }

  .theme.active {
    background: var(--c-grayscale-300);
  }

  .theme.active .name-label,
  .theme:hover .name-label {
    color: var(--c-black);
  }

  .name-label,
  .name-input {
    padding: var(--space-s);
  }

  .name-label {
    color: var(--c-grayscale-800);
    transition: 0.1s ease-in-out all;
  }

  .name-input {
    border: none;
    background: var(--c-grayscale-300);
    /* border-bottom: 1px solid var(--c-grayscale-800); */
  }

  .name-input:focus {
    outline: none;
  }

  .action {
    border: none;
    height: 100%;
    padding-right: var(--space-xs);
    background: transparent;
  }
</style>

<ul class="themes fx fx-direction-column">
  <Button on:click={() => onNewTheme()}>new theme</Button>

  {#each themes as theme, i (theme)}
    <li
      animate:flip={{ delay: 300, duration: 200 }}
      in:fade={{ duration: 100 }}
      out:fly={{ x: 150, duration: 300 }}
      class="theme fx fx-content-space-between pointer"
      class:active={selectedIndex === i}>
      <div class="name fx w-100">
        {#if !theme.edit}
          <label
            class="name-label w-100 pointer"
            for={`theme-${i}`}
            on:click={() => onToggle(i)}>{theme.name}</label>
        {:else}
          <input
            type="text"
            id={`theme-${i}`}
            class="name-input w-100"
            disabled={i === 0}
            value={theme.name}
            on:keyup={(event) => onEditName(event, i)}
            on:keypress={preventWhiteSpace}
            bind:this={inputEl} />
        {/if}
      </div>

      {#if i !== 0}
        <div class="actions fx fx-align-center ">
          <div class="action">
            <Icon
              class="action pointer"
              name="edit"
              width="20px"
              height="20px"
              color={selectedIndex === i ? 'grayscale-800' : 'grayscale-300'}
              on:click={() => onToggleToEdit(i)} />
          </div>

          <div class="action pointer">
            <Icon
              name="delete"
              width="20px"
              height="20px"
              color={selectedIndex === i ? 'grayscale-800' : 'grayscale-300'}
              hoverColor="error"
              on:click={() => onDelete(i)} />
          </div>
        </div>
      {/if}
    </li>
  {/each}
</ul>
