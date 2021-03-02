// Destructuring assigment
const { getPeoples } = require('./service')

Array.prototype.Filter = function (callback) {
  const list = []
  
  for(let index in this) {
    const item = this[index]

    const result = callback(item, index, this)
    // 0, "", null, undefined == false

      if(!result) continue
      list.push(item)
  }

  return list
}

async function main () {
  try {
    const { results } = await getPeoples('a')

    /* 
      const larsFamily = results.filter((item) => {
      // return a boolean 
      // true -> keep 
      // false -> remove

      const result = item.name.toLowerCase().indexOf('lars') != -1

      return result
    })

    const names = larsFamily.map(person => person.name) 
    */

    const larsFamily = results.Filter((item, index, list) => {
      console.log('Index: ', index);
      console.log('List size: ', list.length)
      
      return item.name.toLowerCase().indexOf('lars') != -1
    })

    const names = larsFamily.map(person => person.name)

    console.log('names: ', names);
    
  } catch (error) {
    console.error("ops, something went wrong error: ", error)
  }
}

main()