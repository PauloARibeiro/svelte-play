<script>
  // LIBRARIES
  import SimpleBar from '@woden/svelte-simplebar'

  // ANIMATIONS
  import { fly, fade } from 'svelte/transition'
  import { flip } from 'svelte/animate'

  // UTILS
  import preventWhiteSpace from '../../utils/preventWhiteSpace'
  import { ripple } from '../../utils/ripple'

  // STORE
  import { themesStore, selectedIndexStore, shouldAnimateStore } from './store'

  // COMPONENTS
  import Icon from '../../components/Icon.svelte'
  import Header from './Header.svelte'

  let themes = []
  let selectedIndex = 0
  let editNameTemp = ''
  let inputEl
  let isDelete = false

  const iconsColor = {
    base: '#0000008A',
    edit: '#2D9CDB',
    delete: '#EB5757',
    confirm: '#57EB66',
  }

  const onToggle = (index) => {
    isDelete = false

    shouldAnimateStore.set(false)

    setTimeout(() => {
      themes.forEach((theme) => (theme.edit = false))

      selectedIndexStore.set(index)

      themesStore.set(themes)
    }, 0)
  }

  const onToggleToEdit = (index) => {
    themes[selectedIndex].edit = false

    themes[index].edit = !themes[index].edit

    editNameTemp = themes[index].name

    themesStore.set(themes)

    selectedIndexStore.set(index)

    setTimeout(() => {
      if (inputEl) inputEl.focus()
    }, 0)
  }

  const onConfirm = (index) => {
    themes[index].name = editNameTemp
    themes[index].edit = false

    themesStore.set(themes)
  }

  const onCancel = (index) => {
    themes[index].edit = false
  }

  const onEditName = (event) => {
    editNameTemp = event.target.value
  }

  const onNewTheme = () => {
    const index = themes.length === 0 ? 0 : themes.length

    console.log(themes.length)
    if (themes.length === 0) {
    }

    const newTheme = {
      id: index,
      name: 'new theme',
      edit: false,
      colors: [
        {
          value: '#000',
          name: 'white',
        },
      ],
    }

    shouldAnimateStore.set(false)

    setTimeout(() => {
      selectedIndexStore.set(index)

      themesStore.set([...themes, ...[newTheme]])
    }, 0)
  }

  const onToggleDelete = (index, state) => {
    shouldAnimateStore.set(false)

    setTimeout(() => {
      selectedIndexStore.set(index)

      isDelete = state
    }, 0)
  }

  const onConfirmDelete = (index) => {
    isDelete = false

    setTimeout(() => {
      if (selectedIndex === themes.length - 1) selectedIndexStore.set(index - 1)

      themes.splice(index, 1)

      themesStore.set(themes)
    }, 100)
  }

  // const itemDeleteSlide = (node, { transition }) => {
  //   if (!transition) return

  //   return {
  //     duration: 1000,
  //     ease: 'ease',
  //     css: (t) => {
  //       if (1 - t === 0) {
  //         node.style.right = `-${(1 - t) * 96}px`
  //       }

  //       return `
  //       right: -${(1 - t) * 96}px
  // 			`
  //     },
  //   }
  // }

  selectedIndexStore.subscribe((store) => (selectedIndex = store))
  themesStore.subscribe((store) => (themes = store))
</script>

<style>
  .themes-wrapper {
    height: 100%;
    max-height: 100vh;
    background-color: #fff;
  }

  /* .themes {
    overflow: auto;
    height: 100%;
    max-height: calc(100vh - 12%);
  } */

  li {
    position: relative;
    overflow: hidden;
  }

  /********** item **********/
  .theme {
    position: relative;
    overflow: hidden;
    height: 9rem;
    background: #fff;
    transform: translate(0);
    transition: all 0.23s ease-in-out;
  }

  .theme.delete {
    transform: translate(-9.6rem);
  }

  .theme::before {
    position: absolute;
    content: '';
    left: 1.2rem;
    top: 50%;
    transform: translate(0, -50%);
    background: #2d9ddb;
    width: 0.6rem;
    height: 0;
    border-radius: 0.3rem;
    opacity: 0;
    transition: all 0.13s ease-in;
  }

  .theme::after {
    position: absolute;
    content: '';
    width: calc(100% - 6rem);
    height: 0.1rem;
    background-color: #828282;
    bottom: 0;
    left: 3rem;
  }

  .theme.active {
    background: #f2f2f2;
  }

  .theme.active::before {
    opacity: 1;
    height: 6.6rem;
  }

  /* .theme:active {
    background: #f2f2f266;
  } */

  .theme:hover::before {
    opacity: 1;
  }

  /********** label and input **********/
  /* .name {
    transition: 0.13s ease-in-out all;
  } */

  .name,
  .label {
    height: 100%;
  }

  .label,
  .input {
    padding-left: 3rem;
    font-size: 2rem;
    color: #4f4f4f;
  }

  .input {
    outline: none;
    border: none;
    background-color: #f2f2f2;
  }

  /********** actions **********/
  .actions {
    position: absolute;
    right: 0;
    padding-right: 3rem;
    gap: 1.6rem;
  }

  .actions {
    height: 100%;
  }

  /* .action:first-child {
    margin-right: 1.6rem;
  } */

  /********** delete **********/
  .delete-actions {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 9.6rem;
    right: -9.6rem;
    transition: all 0.23s ease-in-out;
  }

  .delete-actions.delete {
    right: 0;
  }

  .delete-action {
    height: 100%;
    flex: 1 1 50%;
  }

  .delete-action.confirm {
    background: #57eb66;
  }

  .delete-action.discard {
    background: #eb5757;
  }
</style>

<div class="themes-wrapper fx fx-direction-column">
  <Header title="Themes" description="Start by creating a theme" on:onClick={() => onNewTheme()} />

  <!-- <SimpleBar style="height: calc(100vh - 12%);"> -->
  <ul class="themes">
    {#each themes as theme, i (theme)}
      <li
        animate:flip={{ delay: 400, duration: 200 }}
        in:fade={{ duration: 130 }}
        out:fly={{ x: 150, duration: 600 }}>
        <div
          class="theme fx fx-content-space-between fx-center pointer"
          class:active={selectedIndex === i}
          class:delete={isDelete && selectedIndex === i}>
          <div class="name fx w-100">
            {#if !theme.edit}
              <label
                class="label fx fx-align-center w-100 pointer"
                for={`theme-${i}`}
                on:click={() => onToggle(i)}>{theme.name}
              </label>
            {:else}
              <input
                type="text"
                autocomplete="off"
                id={`theme-${i}`}
                class="input w-100"
                disabled={i === 0}
                value={theme.name}
                on:keyup={onEditName}
                on:keypress={preventWhiteSpace}
                bind:this={inputEl} />
            {/if}
          </div>

          {#if !theme.edit}
            <div class="actions fx fx-align-center" transition:fade={{ duration: 130 }}>
              <Icon
                name="edit"
                width="2.4rem"
                height="2.4rem"
                color={iconsColor.base}
                hoverColor={iconsColor.edit}
                on:click={() => onToggleToEdit(i)} />

              <Icon
                name="delete"
                width="2.4rem"
                height="2.4rem"
                color={iconsColor.base}
                hoverColor={iconsColor.delete}
                on:click={() => onToggleDelete(i, true)} />
            </div>
          {:else}
            <div class="actions fx fx-align-center" transition:fade={{ duration: 130 }}>
              <Icon
                name="check"
                width="2.4rem"
                height="2.4rem"
                color={iconsColor.base}
                hoverColor={iconsColor.confirm}
                on:click={() => onConfirm(i)} />

              <Icon
                name="close"
                width="2.4rem"
                height="2.4rem"
                color={iconsColor.base}
                hoverColor={iconsColor.delete}
                on:click={() => onCancel(i)} />
            </div>
          {/if}
        </div>
        <!-- {#if isDelete && selectedIndex === i} -->
        <div
          class="delete-actions delete-transion  fx pointer"
          class:delete={isDelete && selectedIndex === i}>
          <div class="delete-action confirm fx fx-center">
            <Icon
              name="check"
              width="2.4rem"
              height="2.4rem"
              color="white"
              hoverColor="white"
              on:click={() => onConfirmDelete(i)} />
          </div>

          <div class="delete-action discard fx fx-center">
            <Icon
              name="close"
              width="2.4rem"
              height="2.4rem"
              color="white"
              hoverColor="white"
              on:click={() => onToggleDelete(i, false)} />
          </div>
        </div>
        <!-- {/if} -->
      </li>
    {/each}
  </ul>
  <!-- </SimpleBar> -->
</div>
