export const ripple = (node) => {
  const handleRipple = (e) => {
    const ripples = document.createElement('span')
    const diameter = Math.max(node.clientWidth, node.clientHeight)
    const radius = diameter / 2
    const oldOverflow = node.style.overflow
    const color = node.getAttribute('data-ripple')

    ripples.style.width = ripples.style.height = `${diameter}px`
    ripples.style.left = `${e.clientX - (node.offsetLeft + radius)}px`
    ripples.style.top = `${e.clientY - (node.offsetTop + radius)}px`
    ripples.style.backgroundColor = color

    ripples.classList.add('ripple')

    node.style.overflow = 'hidden'

    node.appendChild(ripples)

    setTimeout(() => {
      node.style.overflow = oldOverflow

      // ripples.remove()
    }, 600)
  }

  node.addEventListener('click', handleRipple)
}
