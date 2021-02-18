const util = require('util');

// Converting callback in a promise
const getUserAddressAsync = util.promisify(getUserAddress)

function getUser() {
  // When anything is wrong, we call the reject
  // No errors? call the resolve
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({
        id: 1,
        name: 'Manoel',
        birth: new Date()
      })
    }, 1000)
  })
}

function getUserPhoneNumber(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({
        phonenumber: '111111111',
        dd: 11
      })
    }, 2000)
  })
}

// Javascript pattern
function getUserAddress(userId, callback) {
  setTimeout(() => {
    return callback(null, { 
      street: 'Rua São Jorge',
      number: 13
    }, 2000)
  })
}


// add async ahead in function
// It return a promise
async function main() {
  try {
    console.time('promise-time')
    const user = await getUser()
    // const phonenumber = await getUserPhoneNumber(user.id)
    // const address = await getUserAddressAsync(user.id)

    const response = await Promise.all([
      getUserPhoneNumber(user.id),
      getUserAddressAsync(user.id)
    ])

    const phonenumber = response[0];
    const address = response[1];

    const data = {...user, ...phonenumber, ...address}

    console.table(data)
    console.timeEnd('promise-time')
    
  } catch(error) {
    console.log('Anything is wrong', error)
  }
}

main()