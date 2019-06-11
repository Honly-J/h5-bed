const fs = require('fs')
const path = require('path')

const firedir1 = path.join(__dirname, '../php/pp.php')
const firedir2 = path.join(__dirname, '../dist/index.html')
const firedir3 = path.join(__dirname, '../php/pp.php')

const RPCSTR = '}</script><link' // 分割php和html
fs.readFile(firedir1, (err, buffer) => {
  if(err){
    console.log(err)
  } else {
    const datastr = buffer.toString()
    const startIndex = datastr.indexOf(RPCSTR)
    let replaceStr1 = datastr.substring(0,startIndex)
    fs.readFile(firedir2, (err, buffer2) => {
      if(err){
        console.log(err)
      } else {
        const datastr2 = buffer2.toString()
        const startIndex2 = datastr2.indexOf(RPCSTR)
        const replaceStr2 = datastr2.substring(startIndex2)

        fs.writeFileSync(firedir3, replaceStr1 + replaceStr2)

      }
    })
  }
})