const createMixins = () => {
  return {
    clearfix: {
      zoom: 1,
      '&:before, &::after': {
        display: 'table',
        boxSizing: 'border-box',
        content: ' '
      },
      '&:after': {
        clear: 'both'
      }
    }
  }
}

export default createMixins
