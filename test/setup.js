if (typeof window !== 'undefined') {
  window.resizeTo = (width, height) => {
    window.innerWidth = width || window.innerWidth
    window.innerHeight = height || window.innerHeight
    window.dispatchEvent(new Event('resize'))
  }
}

window.requestAnimationFrame = (cb) => setTimeout(cb, 0)
global.requestAnimationFrame = window.requestAnimationFrame
window.cancelAnimationFrame = (cb) => clearTimeout(cb)
global.cancelAnimationFrame = window.cancelAnimationFrame

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
})

const Enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

Enzyme.configure({
  adapter: new Adapter()
})
