### 笛卡尔积算法

### 简介

笛卡尔乘积是指在数学中，两个集合X和Y的笛卡尓积（Cartesian product），又称直积，表示为X × Y，第一个对象是X的成员而第二个对象是Y的所有可能有序对的其中一个成员。

```javascript
function cartesianProduct (array) {
  return array.reduce(function(col, row){
    let res = []
    col.forEach(function(c){
      row.forEach(function(r){
        let t = [].concat(Array.isArray(c) ? c : [c])
        t.push(r)
        res.push(t)
      })
    })
    return res
  })
}
cartesianProduct([[1,2,3],['a','b','c']])
```