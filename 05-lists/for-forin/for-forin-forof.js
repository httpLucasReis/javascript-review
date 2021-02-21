const service = require('./service')

async function main() {
  try {
    const response = await service.getPeoples('a')
    const names = []
    
    console.time('loop-for')

    for(let i = 0; i <= response.results.length - 1 ; i++) {
      const person = response.results[i]

      names.push(person.name)
    }

    console.timeEnd('loop-for') 
    
    // The for...in statement iterates over the enumerable 
    // properties of an object, in an arbitrary order.

    console.time('loop-for-in')
    
    for(let i in response.results) {
      const person = response.results[i]
      
      names.push(person.name)
    }

    console.timeEnd('loop-for-in') 
  
    // The for...of statement iterates over values that 
    // the iterable object defines to be iterated over.

    console.time('loop-for-of')

    for(person of response.results) {
      names.push(person.name)
    }

    console.timeEnd('loop-for-of') 

    console.log(names)

  } catch(error) {
    console.error('Error: ', error)
  }
}

main()