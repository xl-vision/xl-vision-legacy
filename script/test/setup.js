// if (typeof window !== 'undefined') {
//   window.resizeTo = (width, height) => {
//     window.innerWidth = width || window.innerWidth
//     window.innerHeight = height || window.innerHeight
//     window.dispatchEvent(new Event('resize'))
//   }
// }

// global.requestAnimationFrame = cb => setTimeout(cb, 0)
// global.cancelAnimationFrame = cb => clearTimeout(cb, 0)
const Enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

Enzyme.configure({
  adapter: new Adapter()
})
