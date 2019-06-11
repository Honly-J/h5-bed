var xlsx = require('node-xlsx');
var fs = require('fs');
//读取文件内容
var obj = xlsx.parse(__dirname+'/../mock/2.xlsx');
var excelObj=obj[0].data;
// console.log(excelObj);

let res = []

excelObj.forEach((element,index) => {
  if( index > 0 ) {
    let [province,city,shop,adress,tel ] = element
    res.push({
      'province': province,
      'citydata':[
        {
          'name': city,
          'shop': [shop],
          'adress':[adress],
          'tel':[tel]
        }
      ]
    })
  }
})
var provinces = []
res.forEach(element => {
  if(provinces.indexOf(element.province) === -1){
    provinces.push(element.province)
  }
});
 
provinces = [...new Set(provinces)]
 
console.log('provinces-->',provinces)

var json = []
provinces.forEach((o,i)=>{
  json.push({
    'province': o,
    'citydata':[]
  })
})


res.forEach(o=>{
  json.forEach( o2=>{
    if( o.province === o2.province) {
      o2.citydata.push(o.citydata[0])
    }
  })
}) 
json.forEach(element => {
  element['cityarr'] = [];
  element.citydata.forEach(element2 => {
    element.cityarr.push(element2.name)
  })
  element.cityarr = [...new Set(element.cityarr)]
})
 

json.forEach(element => {
  element.city = []
  element.cityarr.forEach((o,i) => {
    element.city.push({
      name: o,
      shop:[]
    })
  });
  element.citydata.forEach(element1 => {
    element.city.forEach(element2 => {
       if(element1.name === element2.name){
         console.log(element1)
        element2.shop.push({'shop':element1.shop[0],'adress': (element1.adress[0]||'') + '', 'tel': (element1.tel[0] || '' ) + '' })
       }
    });
  })
})


json.forEach(element => {
  delete element.citydata
  delete element.cityarr
});

var outerdata = JSON.stringify(json)
fs.writeFileSync('2.json',outerdata);