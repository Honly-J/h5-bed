const fs = require('fs')
const path = require('path')

async function copyDir (from, to) {
  try {
    await isExit(to)
  } catch (e) {
    fs.mkdirSync(to)
  }
  fs.readdirSync(from).forEach(path => {
    const src = `${from}/${path}`
    const dist = `${to}/${path}`
    if (fs.statSync(src).isDirectory()) {
      copyDir(src, dist)
    } else {
      fs.createReadStream(src).pipe(fs.createWriteStream(dist))
    }
  })
}

copyDir(path.join(__dirname, '../dist/'), path.join(__dirname, '../php/dist/'))

function isExit (dir) {
  console.log(dir)
  return new Promise((resolve, reject) => {
    fs.access(dir, err => {
      if (err) {
        reject(new Error('no so dir:' + dir))
      } else {
        resolve(true)
      }
    })
  })
}
