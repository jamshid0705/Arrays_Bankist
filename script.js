'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////

const displeyMovement = function (movement) {
  containerMovements.innerHTML=''
  movement.forEach(function (mov, index) {
    const html = `<div class="movements__row">
                    <div class="movements__type movements__type--${
                      mov > 0 ? 'deposit' : 'withdrawal'
                    }">${index + 1} ${mov > 0 ? 'deposit' : 'withdrawal'}</div>
                    <div class="movements__date">3 days ago</div>
                    <div class="movements__value">${mov}€</div>
                  </div>`;
    containerMovements.insertAdjacentHTML('beforeend', html);              
  });
 
};
displeyMovement(account1.movements);
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

///////////////////////////// Simple array methods ///////////////////
// // slice
// let arr=['a','b','c','d','f']
// console.log(arr.slice(2))
// let str='jamshid'
// console.log(str.slice(2))
// console.log(arr.slice(3,4))

// // splice bu method slice o'xshaydi faqat orginal arrayga tasir qiladi
// arr.splice(3)
// console.log(arr)
// arr.splice(1,2)
// console.log(arr)

// // reverse teskarisiga chiqaradi va orginal arrayga tasir qiladi
// arr = ['a', 'b', 'c', 'd', 'f'];
// console.log(arr.reverse())
// console.log(arr)

// // concat 2ta arrayni qo'shadi
// const arr1=['n','m','j','k']
// console.log(arr.concat(arr1))
// console.log(arr)

// // join arrayni stringga aylantiradi
// console.log(typeof arr.join(''))

////////////////////////// for each /////////////////////////
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for(const [index,movement] of movements.entries()){
//   if(movement>0){
//     console.log(`Movement ${index+1}: You deposited ${movement}`)
//   } else{
//     console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// }
// console.log('-------------forEach----------------')
// movements.forEach(function(movement,index,array){
//   console.log(
//     movement > 0
//       ? `Movement ${index + 1}: You deposited ${movement}`
//       : `Movement ${index + 1}: You withdrew ${Math.abs(movement)}`
//   );
//   // console.log(array)
// })

// // maps
// console.log('------------map--------------')
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function(value,key,map){
//   console.log(`${key}:${value}`)
// })

// // sets
// console.log('----------------set---------------')
// const setArr=new Set(['olma','nok','olma','shaftoli'])
// setArr.forEach(function(value,key,set){
//   console.log(`${key}:${value}`);
//   // console.log(set)
// })
