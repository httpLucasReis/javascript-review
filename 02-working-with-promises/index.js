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

const userPromise = getUser()

// Pipe: User -> UserPhoneNumber -> UserAddress

userPromise
  .then((user) => {
    return getUserPhoneNumber(user.id)
    .then((phoneNumber) => {
      // Returning both values
      return {
        user: {
          name: user.name,
          id: user.id
        },
        phonenumber: phoneNumber
      }
    })
  })
  .then((response) => {
    const userAddress = getUserAddressAsync(response.user.id)

    return userAddress
      .then((address) => {
        return {
          user: response.user,
          phonenumber: response.phonenumber,
          address: address
        }
      })
  })
  .then((response) => {
    console.log(`
      id: ${response.user.id},
      name: ${response.user.name},
      phonenumber: (${response.phonenumber.dd}) ${response.phonenumber.phonenumber}
      street: ${response.address.street}
      number: ${response.address.number}
    `)
  })
  .catch((error) => {
    console.error('Ops, anything is wrong...', error)
  })

