function getUser(callback) {
  setTimeout(() => {
    return callback(null, {
      id: 1,
      name: 'Manoel',
      birth: new Date()
    })
  }, 1000)
}

function getUserPhoneNumber(userId, callback) {
  setTimeout(() => {
    return callback(null, {
      phonenumber: '111111111',
      dd: 11
    })
  }, 2000)
}

function getUserAddress(userId, callback) {
  setTimeout(() => {
    return callback(null, { 
      street: 'Rua São Jorge',
      number: 13
    }, 2000)
  })
}

getUser(function resolveUser(error, user) {
  // null || "" || 0 == false
  if(error) {
    console.error('Ops, anything is wrong...')
    return 
  }

  getUserPhoneNumber(user.id, function resolveUserPhoneNumber(error, phoneNumber) {
    if(error) {
      console.error('Ops, anythingis wrong...')
      return
    }

    getUserAddress(user.id, function resolveUserAddress(error, address) {
      if (error) {
        console.error('Ops, anything is wrong...')
        return 
      }

      console.log(`
        Name: ${user.name}
        Phonenumber: ++${phoneNumber.dd } ${phoneNumber.phonenumber}
        Address: ${address.street}
        Number: ${address.number}
      `)
    })
  })
})

// You need sort you functions
// Erros always are the first paramenter of callbacks function
// Callbacks always are the last paramenter 

