const fs = require('fs')
const path = require('path')
// 亚索
const zlib = require("zlib")
// 流写入
const reader = fs.createReadStream(path.resolve(__dirname, './pipe.js'))
reader.on('end', data => {
    console.log('读取数据完毕')
    reader.close()
})
const writer = fs.createWriteStream(path.resolve(__dirname, './index.js'))
writer.on('finish', () => {
    console.log('写入完毕')
})
// 读取流倒进写入流
// reader.pipe(writer)

// 链式操作  解压为js不行
// const secondWriter = fs.createWriteStream(path.resolve(__dirname, './index.txt.gz'))
// secondWriter.on('finish', () => {
//     console.log('压缩文件index.txt.gz创建成功')
// })
// reader.pipe(zlib.createGzip()).pipe(secondWriter)

const secondReader = fs.createReadStream(path.resolve(__dirname, './index.txt.gz'))

const thirdWriter = fs.createWriteStream(path.resolve(__dirname, './index.txt'))
thirdWriter.on('finish', () => {
    console.log('压缩文件index.txt.gz解压成功')
})
secondReader.pipe(zlib.createGunzip()).pipe(thirdWriter)
