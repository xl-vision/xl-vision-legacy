if (typeof window !== 'undefined') {
  window.resizeTo = (width, height) => {
    window.innerWidth = width || window.innerWidth
    window.innerHeight = height || window.innerHeight
    // eslint-disable-next-line no-undef
    window.dispatchEvent(new Event('resize'))
  }
}

global.requestAnimationFrame = window.requestAnimationFrame = cb => setTimeout(cb, 0)
global.cancelAnimationFrame = window.cancelAnimationFrame = cb => clearTimeout(cb)
const Enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

Enzyme.configure({
  adapter: new Adapter()
})
