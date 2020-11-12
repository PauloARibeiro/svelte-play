const preventWhiteSpace = (event) => {
  if (event.which == 32) {
    event.preventDefault()

    return false
  }
}

export default preventWhiteSpace
