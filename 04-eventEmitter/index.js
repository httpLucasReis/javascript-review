const EventEmmiter = require('events')

class MyEmitter extends EventEmmiter {

}

const myEmitter = new MyEmitter()
const eventName = 'user:click'

myEmitter.on(eventName, (click) => {
  console.log('An user clicked', click)
})

// myEmitter.emit(eventName, 'I clicked in a button')

// let count = 0

// setInterval(() => {
//   myEmitter.emit(eventName, 'Count clicks: ' + count++)
// }, 1000)

const stdin = process.openStdin()
stdin.addListener('data', (value) => {
  console.log(`You typed: ${value.toString().trim()}`)
})