const service = require('../for-forin/service')

Array.prototype.Map = function (callback) {
  const newArray = []
  for(let i = 0; i <= this.length - 1; i++) {
    const result = callback(this[i], i)        // this == current list
    newArray.push(result)
  }

  return newArray;
}

async function main() {
  try {
    const response = await service.getPeoples('a')
  
    /* For Each

    console.time('foreach-loop')

    response.results.forEach(person => {
      names.push(person.name)
    });

    console.timeEnd('foreach-loop') 
    
    */

    /* Notation 1
    
    const names = response.results.map((person) => {
      return person.name
    }) 
    
    */

    // const names = response.results.map(person => person.name)

    const names = response.results.Map(person => person.name)

    console.log('names: ', names)

  } catch (error) {
    console.error('Ops, anything is wrong... error:' + error)
  }
}

main()