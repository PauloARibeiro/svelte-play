<script>
  import ColorPicker from '../components/ColorPicker.svelte'

  import ThemeCreator from './themeCreator/ThemeCreator.svelte'

  $: themes = [
    {
      id: 1,
      name: 'default',
      edit: false,
      colors: [
        {
          value: '#ffffff',
          name: 'white',
        },
      ],
    },
    {
      id: 2,
      name: 'dark',
      edit: false,
      colors: [
        {
          value: '#000000',
          name: 'black',
        },
      ],
    },
  ]

  $: selectedIndex = 0

  const onAddColor = () => {
    const themesCopy = Array.from(themes)

    themesCopy.forEach((theme) => {
      theme.colors = theme.colors.concat({
        value: '#ffffff',
        name: `new-color`,
      })
    })

    themes = themesCopy
  }

  const onChangeColorName = (event, index) => {
    themes[selectedIndex].colors[index].name = event.target.value
  }

  const onDelete = (index) => {
    const themesCopy = Array.from(themes)

    themesCopy.forEach((theme) => {
      theme.colors = theme.colors.filter((color, i) => i !== index)
    })

    themes = themesCopy
  }

  const toggleTheme = (index) => {
    selectedIndex = index
  }

  const onChangeThemeName = (event) => {
    themes[selectedIndex].name = event.target.value
  }

  const onNewTheme = () => {
    themes = themes.concat({
      id: themes.length - 1,
      name: 'theme',
      selected: true,
      colors: [
        {
          value: '#ffffff',
          name: 'white',
        },
      ],
    })
  }

  const onEditThemeName = (i) => {
    themes[i].edit = true
  }

  const preventWhiteSpace = (event) => {
    if (event.which == 32) {
      event.preventDefault()

      return false
    }
  }
</script>

<style>
</style>

<svelte:head>
  <title>Sapper project template</title>
  <link rel="stylesheet" href="css/index.css" />
</svelte:head>

<div>
  <div style="display: flex;">
    {#each themes as theme, i}
      <div style="display: flex; flex-direction: column;">
        <button on:click={() => toggleTheme(i)}>{theme.name}</button>

        {#if i !== 0}<button on:click={() => onEditThemeName(i)}>edit</button>{/if}

        {#if theme.edit}
          <input
            type="text"
            id="color"
            disabled={i === 0}
            value={theme.name}
            on:keyup={(event) => onChangeThemeName(event, i)}
            on:keypress={preventWhiteSpace} />
        {/if}
      </div>
    {/each}

    <button on:click={() => onNewTheme()}>new theme</button>
  </div>

  <div style="display: flex;">
    <div>
      {#each themes[selectedIndex].colors as color, i}
        <div style="display: flex;">
          <input
            type="text"
            id="color"
            disabled={selectedIndex !== 0}
            value={color.name}
            on:keyup={(event) => onChangeColorName(event, i)}
            on:keypress={preventWhiteSpace} />

          <ColorPicker bind:color={color.value} />

          {color.value}

          <button on:click={() => onDelete(i)}>delete</button>
        </div>
      {/each}

      <button on:click={onAddColor}>Add</button>
    </div>

    <div>
      {#each themes as theme}
        <span style="display: block">html{theme.name === 'default' ? '' : '.' + theme.name}
          {'{'}</span>

        {#each theme.colors as color}
          <span style="display: block">--{color.name}: {color.value};</span>
        {/each}

        <span>{'}'}</span>
      {/each}
    </div>
  </div>
</div>

<ThemeCreator />
