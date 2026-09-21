const mosaicStripe = (axis) =>
  `repeating-linear-gradient(${axis}#0000 0,#0000 calc(2% - var(--fx-mosaic) * 2.5%),#fff calc(2% - var(--fx-mosaic) * 2.5%),#fff calc(2% + var(--fx-mosaic) * 2.5%),#0000 calc(2% + var(--fx-mosaic) * 2.5%),#0000 4%)`

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
