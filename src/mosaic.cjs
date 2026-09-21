/** 8×8 lattice. Tiles bloom from each cell with a feathered edge. */
const PERIOD = '12.5%'
const CENTER = '6.25%'
const GROW = '8%'
const CORE = '6.6%'

const mosaicStripe = (axis) =>
  `repeating-linear-gradient(${axis}#0000 0,#0000 calc(${CENTER} - var(--fx-mosaic) * ${GROW}),#fff calc(${CENTER} - var(--fx-mosaic) * ${CORE}),#fff calc(${CENTER} + var(--fx-mosaic) * ${CORE}),#0000 calc(${CENTER} + var(--fx-mosaic) * ${GROW}),#0000 ${PERIOD})`

const mosaicMaskImage = `${mosaicStripe('')},${mosaicStripe('90deg,')}`

const mosaicNewRoot = {
  mask: 'none',
  maskImage: mosaicMaskImage,
  WebkitMaskImage: mosaicMaskImage,
  maskSize: '100% 100%',
  WebkitMaskSize: '100% 100%',
  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',
  maskComposite: 'intersect',
  WebkitMaskComposite: 'source-in'
}

module.exports = { mosaicMaskImage, mosaicNewRoot }
