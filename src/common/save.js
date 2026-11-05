import storage from '@system.storage'

const KEY = 'dl_save_v1'
const MAX_LEVEL = 8

function normalize(raw) {
  const s = { unlocked: 1, stars: {}, best: {} }
  if (!raw || typeof raw !== 'object') return s
  const u = Math.floor(Number(raw.unlocked))
  if (u >= 1 && u <= MAX_LEVEL) s.unlocked = u
  if (raw.stars && typeof raw.stars === 'object') {
    for (let i = 1; i <= MAX_LEVEL; i++) {
      const v = Math.floor(Number(raw.stars[i]))
      if (v >= 0 && v <= 3) s.stars[i] = v
    }
  }
  if (raw.best && typeof raw.best === 'object') {
    for (let i = 1; i <= MAX_LEVEL; i++) {
      const v = Math.floor(Number(raw.best[i]))
      if (v >= 0 && v <= 100) s.best[i] = v
    }
  }
  return s
}

export function readSave(cb) {
  const done = (v) => {
    try { cb(normalize(v)) } catch (e) { console.error('save cb', e) }
  }
  try {
    storage.get({
      key: KEY,
      success(data) {
        let obj = null
        try {
          obj = typeof data === 'string' ? JSON.parse(data) : data
        } catch (e) {
          obj = null
        }
        done(obj)
      },
      fail() { done(null) }
    })
  } catch (e) {
    console.error('save read', e)
    done(null)
  }
}

export function writeSave(save, cb) {
  let payload = '{}'
  try {
    payload = JSON.stringify(normalize(save))
  } catch (e) {
    payload = '{}'
  }
  try {
    storage.set({
      key: KEY,
      value: payload,
      success() { if (cb) cb(true) },
      fail() { if (cb) cb(false) }
    })
  } catch (e) {
    console.error('save write', e)
    if (cb) cb(false)
  }
}

export function clearSave(cb) {
  try {
    storage.clear({
      key: KEY,
      success() { if (cb) cb(true) },
      fail() { if (cb) cb(false) }
    })
  } catch (e) {
    console.error('save clear', e)
    if (cb) cb(false)
  }
}

export function emptySave() {
  return normalize(null)
}

export { MAX_LEVEL }
