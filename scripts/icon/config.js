const path = require('path')
const toCamel = require('./toCamel')

module.exports = {
  icons: [
    {
      src: path.join(__dirname, 'icons/ionicons/src/svg/*.svg'),
      nameFormatter: (name) => toCamel(name, true),
      dest: 'src/icon'
    }
  ],
  template: path.join(__dirname, 'template/index.tsx'),
  helpers: {
    toCamel(s) {
      return toCamel(s, false)
    }
  },
  svgoPlugins: [
    {
      removeXMLNS: true
    },
    {
      cleanupAttrs: true
    },
    {
      removeDoctype: true
    },
    {
      removeXMLProcInst: true
    },
    {
      removeComments: true
    },
    {
      removeMetadata: true
    },
    {
      removeTitle: true
    },
    {
      removeDesc: true
    },
    {
      removeUselessDefs: true
    },
    {
      removeEditorsNSData: true
    },
    {
      removeEmptyAttrs: true
    },
    {
      removeHiddenElems: true
    },
    {
      removeEmptyText: true
    },
    {
      removeEmptyContainers: true
    },
    {
      removeViewBox: false
    },
    {
      cleanupEnableBackground: true
    },
    {
      convertStyleToAttrs: true
    },
    {
      convertColors: true
    },
    {
      convertPathData: true
    },
    {
      convertTransform: true
    },
    {
      removeUnknownsAndDefaults: true
    },
    {
      removeNonInheritableGroupAttrs: true
    },
    {
      removeUselessStrokeAndFill: true
    },
    {
      removeUnusedNS: true
    },
    {
      cleanupIDs: true
    },
    {
      cleanupNumericValues: true
    },
    {
      moveElemsAttrsToGroup: true
    },
    {
      moveGroupAttrsToElems: true
    },
    {
      collapseGroups: true
    },
    {
      removeRasterImages: false
    },
    {
      mergePaths: true
    },
    {
      convertShapeToPath: true
    },
    {
      sortAttrs: true
    },
    {
      removeDimensions: true
    },
    {
      addFillNoneCss: {
        type: 'perItem',
        fn: (item) => {
          if (item.isElem()) {
            item.eachAttr((attr) => {
              if (attr.name === 'fill') {
                if (attr.value !== 'none') {
                  item.removeAttr('fill')
                }
              } else if (attr.name === 'stroke') {
                item.removeAttr('stroke')
              }
            })
          }
        }
      }
    }
  ]
}
