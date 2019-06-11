var xlsx = require('node-xlsx');
var fs = require('fs');
//读取文件内容
var obj = xlsx.parse(__dirname+'/../mock/1.xlsx');
var excelObj=obj[0].data;
console.log(excelObj);

// let res = []

// excelObj.forEach((element,index) => {
//   if( index > 0 ) {
//     let [order,province,city,ocode,pcode,ccode ] = element
//     res.push({
//       'province': province,
//       'provicecode': pcode,
//       'citydata':[
//         {
//           'name': city,
//           'citycode': ccode,
//           'order': [order],
//           'ordercode':[ocode]
//         }
//       ]
//     })
//   }
// })
// var provinces = [], provicecodes = []
// res.forEach(element => {
//   if(provinces.indexOf(element.province) === -1){
//     provinces.push(element.province)
//   }
// });
// res.forEach(element => {
//   if(provicecodes.indexOf(element.provicecode) === -1){
//     provicecodes.push(element.provicecode)
//   }
// });
// provinces = [...new Set(provinces)]
// provicecodes = [...new Set(provicecodes)]
// console.log('provinces-->',provinces)
// console.log('provicecodes-->',provicecodes)

// var json = []
// provinces.forEach((o,i)=>{
//   json.push({
//     'province': o,
//     'provicecode':provicecodes[i]+'',
//     'citydata':[],
//     'citycoderdataarr':[]
//   })
// })


// res.forEach(o=>{
//   // console.log('res********>',o)
//   json.forEach( o2=>{
//     if( o.province === o2.province) {
//       o2.citydata.push(o.citydata[0])
//     }
//   })
// }) 
// res.forEach(o=>{
//   console.log('res………………………………>',o)
//   json.forEach( o2=>{
//     if( o.province === o2.province) {
//       o2.citycoderdataarr.push(o.citydata[0].citycode)
//     }
//     o2.citycoderdataarr = [...new Set(o2.citycoderdataarr)]
//   })
  
// })

// json.forEach(element => {
//   element.cityarr = [];
//   element.citydata.forEach(element2 => {
//     element.cityarr.push(element2.name)
//   })
//   element.cityarr = [...new Set(element.cityarr)]
// })

  
// json.forEach(element => {
//   element.city = []
//   element.cityarr.forEach((o,i) => {
//     element.city.push({
//       name: o,
//       citycode:  element.citycoderdataarr[i],
//       order:[],
//       ordercode:[]
//     })
//   });
//   element.citydata.forEach(element1 => {
//     element.city.forEach(element2 => {
//        if(element1.name === element2.name){
//         element2.order.push(element1.order[0])
//         element2.ordercode.push(element1.ordercode[0])
//        }
//     });
//   })
// })


// json.forEach(element => {
//   delete element.citydata
//   delete element.cityarr 
//   delete element.citycoderdataarr
// });

// var outerdata = JSON.stringify(json)
// fs.writeFileSync('3.json',outerdata);