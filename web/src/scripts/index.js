import 'focus-visible'
import app from '@/app'
import router from '@/router'
import { remove, on, size } from '@/util/dom'
import gsap from 'gsap'
import loadFonts from '@/lib/font-loader'

loadFonts().then(() => {
  remove(document.body, 'o0')
})

// Broadcast window resize events
on(window, 'resize', resize)

// Setup global raf loop
gsap.ticker.add(tick)

// Mount picoapp
app.mount()

// Propagate an initial resize event
resize()

// Listen for page transitions and mount new components
router.on('NAVIGATE_IN', () => {
  app.unmount()
  app.mount()
  resize()
})

function resize() {
  app.emit('resize', size())
}

function tick() {
  app.emit('tick')
}
