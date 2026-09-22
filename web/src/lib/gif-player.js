export function createGifPlayer({ canvas, img }) {
  const ctx = canvas.getContext('2d', { alpha: true })

  let generation = 0
  let paused = false
  let href = ''

  const showImg = () => {
    canvas.hidden = true
    img.hidden = !href
  }

  const freeze = async () => {
    if (!ctx || !href) return false
    if (img.naturalWidth === 0) {
      try {
        await img.decode()
      } catch {
        return false
      }
    }
    if (img.naturalWidth === 0) return false

    try {
      const bitmap = await createImageBitmap(img)
      canvas.width = bitmap.width
      canvas.height = bitmap.height
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(bitmap, 0, 0)
      bitmap.close()
    } catch {
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0)
    }

    img.hidden = true
    canvas.hidden = false
    return true
  }

  return {
    get paused() {
      return paused
    },

    async load(nextHref) {
      const gen = ++generation
      paused = false
      href = nextHref || ''
      canvas.hidden = true

      if (!href) {
        img.removeAttribute('src')
        img.hidden = true
        return
      }

      img.hidden = false
      img.src = href
      try {
        await img.decode()
      } catch {
        /* keep the img even if decode fails */
      }
      if (gen !== generation) return
    },

    async pause() {
      if (paused) return
      paused = true
      const gen = generation
      const ok = await freeze()
      if (gen !== generation || !paused) return
      if (!ok && href) {
        img.addEventListener(
          'load',
          () => {
            if (paused && gen === generation) void freeze()
          },
          { once: true }
        )
      }
    },

    resume() {
      if (!paused) return
      paused = false
      if (!href) return
      showImg()
    },

    stop() {
      generation += 1
      paused = false
      href = ''
      canvas.hidden = true
      img.removeAttribute('src')
      img.hidden = true
    }
  }
}
