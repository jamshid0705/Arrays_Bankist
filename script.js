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

////////////////////////////////// display Movements ///////////////////

const displeyMovement = function (movement, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movement.slice().sort((a, b) => a - b) : movement;
  movs.forEach(function (mov, index) {
    const html = `<div class="movements__row">
                    <div class="movements__type movements__type--${
                      mov > 0 ? 'deposit' : 'withdrawal'
                    }">${index + 1} ${mov > 0 ? 'deposit' : 'withdrawal'}</div>
                    <div class="movements__date">3 days ago</div>
                    <div class="movements__value">${mov}€</div>
                  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// umumiy summa
const callsDispleyMovement = function (acc) {
  acc.balance = acc.movements.reduce((acc, val, index, arr) => acc + val, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

// o'tkazmalarni hisoblash
const calcDispleySummary = function (account) {
  const incomes = account.movements
    .filter(val => val > 0)
    .reduce((acc, val) => acc + val, 0);
  labelSumIn.textContent = `${incomes}€`;

  const outcomes = account.movements
    .filter(val => val < 0)
    .reduce((acc, val) => acc + val, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  const interest = account.movements
    .filter(val => val > 0)
    .map(val => (val * account.interestRate) / 100)
    .filter(val => val >= 1)
    .reduce((acc, val) => acc + val, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// username user yasash
const createUserName = function (user) {
  user.forEach(val => {
    val.username = val.owner
      .split(' ')
      .map(val => val.slice(0, 1))
      .join('')
      .toLowerCase();
  });
};
createUserName(accounts);
// update UI
const updateUI = function (account) {
  // movement larni chiqarish
  displeyMovement(account.movements);
  // umumiy movementni chiqarish
  callsDispleyMovement(account);
  // deposit withdrawal larni chiqarish
  calcDispleySummary(account);
};
// Event handler login
let account;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  account = accounts.find(val => inputLoginUsername.value == val.username);
  if (account) {
    if (account.pin === Number(inputLoginPin.value)) {
      // ekranga xabarni chiqarish
      labelWelcome.textContent = `Welcome back, ${account.owner.split(' ')[0]}`;
      containerApp.style.opacity = 1;
      inputLoginUsername.value = '';
      inputLoginPin.value = '';
      updateUI(account);
    }
  }
});

// transfor money
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const transferTo = inputTransferTo.value;
  const amount = Number(inputTransferAmount.value);
  const findAccount = accounts.find(acc => acc.username === transferTo);
  inputTransferAmount.value = inputTransferTo.value = '';
  if (findAccount) {
    if (
      amount > 0 &&
      account.balance >= amount &&
      account.username !== transferTo
    ) {
      account.movements.push(-amount);
      findAccount.movements.push(amount);
      updateUI(account);
    }
  }
});

// close account
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    account.username === inputCloseUsername.value &&
    account.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      acc => acc.username === inputCloseUsername.value
    );
    // console.log(index);
    accounts.splice(index, 1);
    // console.log(accounts)
    containerApp.style.opacity = 0;
  }
  inputClosePin.value = inputCloseUsername.value = '';
});

////////////////// loan ///////////////
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loan = Number(inputLoanAmount.value);
  if (loan > 0 && loan >= account.movements.some(acc => acc >= acc * 0.1)) {
    account.movements.push(loan);
    updateUI(account);
  }
  inputLoanAmount.value = '';
});
//////////////////// sort ///////////////
let sorts = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displeyMovement(account.movements, sorts ? (sorts = false) : (sorts = true));
});
///////////////////////////////////////////////////
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// ///////////////////////////////////////////////// coding chellenge ///////
// const juliaData = [3, 5, 2, 12, 7];
// const kateData = [4, 1, 15, 8, 3];
// juliaData.splice(0, 1);
// juliaData.splice(juliaData.length - 2, juliaData.length);
// console.log(juliaData);
// const newData = juliaData.concat(kateData);
// console.log(newData);

// const checkDogs = function (data) {
//   data.forEach(function (val, index) {
//     console.log(
//       val >= 5
//         ? `Dog number ${index + 1} is an adult, and is ${val} years old`
//         : `Dog number ${index + 1} is still a puppy 🐶`
//     );
//   });
// };
// checkDogs(newData);
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

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

/////////////////////// map method ////////////////////
// const eurToUsd = 1.1;

// const movementsUSD = movements.map(val => val * eurToUsd);
// console.log(movementsUSD);

// const movementDescription = movements.map((val, index) =>
//   val > 0
//     ? `Movement ${index + 1}: You deposited ${val}`
//     : `Movement ${index + 1}: You withdrew ${Math.abs(val)}`
// );

// console.log(movementDescription)

// //////////////////// filter method /////////////////
// const deposit = movements.filter((val, key) => val > 0);
// console.log(movements);
// console.log(deposit);

// const depositFor = [];
// for (const val of movements) {
//   if (val > 0) depositFor.push(val);
// }
// console.log(depositFor);

// const withdrawals = movements.filter(val => val < 0);
// console.log(withdrawals);

// ////////////////// reduce method //////////////////
// // const movementAll=movements.reduce(function(acc,val,index,arr){
// //   return acc+val
// // },0)
// // console.log(movementAll)

// const movementAll = movements.reduce((acc, val, index, arr) => acc + val, 100);
// console.log(movementAll);

// let movementAll1 = 0;
// for (const val of movements) {
//   movementAll1 += val;
// }
// console.log(movementAll1);

// // maximum value
// const max = movements.reduce(
//   (acc, val) => (acc >= val ? acc : val),
//   movements[0]
// );
// console.log(max);

// /////////////////////// coding chellenge //////////////////////////
// let ages = [5, 2, 4, 1, 15, 8, 3];

// const calcAverageHumanAge = function (dogs) {
//   const age = dogs
//     .map((val, key, arr) => (val <= 2 ? 2 * val : 16 + val * 4))
//     .filter((val, key, arr) => val >= 18)
//     .reduce((acc, val, key, arr) => acc + val / arr.length, 0);
//   return age;
// };
// console.log(calcAverageHumanAge(ages));

/////////////// some and every methods ////////////////
console.log(movements.some(acc => acc > 0));
console.log(movements.some(acc => acc == 9));

console.log(movements.every(acc => acc > 0));
console.log(movements.every(acc => acc >= -4000));

// ////////////// flat and flatmap methods /////////////
// const arr = [2, 3, 4, 5, 5, 4, 2, 21, 34];
// console.log(arr.splice(2, 3));
// console.log(arr);
// // flat
// const arr1 = [[2, 3, 4], [3, 4, [5, 5]], 90];
// console.log(arr1.flat());
// console.log(arr1.flat(2));

// const overalBalance = accounts
//   .map(acc => acc.movements)
//   .flat(2)
//   .reduce((acc, val) => acc + val, 0);
// console.log(overalBalance);
// // flatmap
// const overalBalance2 = accounts
//   .flatMap((acc) => acc.movements)
//   .reduce((acc, val) => acc + val, 0);
// console.log(overalBalance2);

////////////////////////// sorting arrays ///////////////////////
// const arr1 = ['jamshid', 'jon', 'ali', "xo'ja", 'boybek', 2, 0];
// console.log(arr1.sort());
// console.log(movements.sort());

// // o'sish tartibida
// // agar return musbat qaytarsa a,b holida
// // agar return manfiy qaytarsa b,a holida chiqadi
// // return > 0  A,B
// // return < 0  B,A
// movements.sort((a, b) => a - b);
// console.log(movements);
// // kamayish tartibida
// movements.sort((a, b) => b - a);
// console.log(movements);
// console.log(movements.slice());

///////////// array and fill methods ////////////////
// console.log(new Array(3, 4, 5, 4, 3, 2));
// let x = new Array(10); // bo'sh joy ajratadi
// x.fill(9, 2, 4); // uni to'ldirish uchun
// console.log(x);
// // from ikkalasi bittada
// const a = Array.from({ length: 3 }, (val, key) => 3);
// console.log(a);

////////////// Array methods ////////////////
//1
// const bankDepositSum = accounts
//   .flatMap(val => val.movements)
//   .filter(val => val > 0)
//   .reduce((acc, val) => acc + val, 0);
// console.log(bankDepositSum);
// //2
// const summaDeposit = accounts
//   .flatMap(val => val.movements)
//   .reduce(
//     (acc, val) => {
//       val > 0 ? (acc.deposits += val) : (acc.withdrawals += val);
//       return acc;
//     },
//     { deposits: 0, withdrawals: 0 }
//   );
// console.log(summaDeposit);

/////////////////////// coding chellenge 4 /////////////////////////////
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1
dogs.forEach(val => {
  val.recommendedFood = Math.trunc(val.weight ** 0.75 * 28);
});
console.log(dogs);
// 2
dogs.forEach(val => {
  let arr = [];
  val.owners.forEach(val1 => (val1 === 'Sarah' ? arr.push(val) : ''));
  if (arr.length) {
    arr.forEach(val =>
      val.recommendedFood <= val.curFood * 0.9
        ? console.log('Sarahning iti juda oz ovqatlanyabdi !')
        : console.log("Sarahning iti juda ko'p ovqatlanyabdi !")
    );
  }
});
// 3
let owEatTooMuch = [];
let owEatTooLittle = [];
const eatDogs = dogs.map(val =>
  val.recommendedFood <= val.curFood * 0.9
    ? owEatTooLittle.push(...val.owners)
    : owEatTooMuch.push(...val.owners)
);
console.log(owEatTooLittle);
console.log(owEatTooMuch);
// 4
console.log(
  `${owEatTooLittle.join(',')} larning itlari juda kam ovqatlanadi !`
);
console.log(`${owEatTooMuch.join(',')} larning itlari juda ko'p ovqatlanadi !`);
// 5
const some=dogs.some(val=>val.recommendedFood===val.curFood)
console.log(some)
// 7
const filter=dogs.filter(val=>val.curFood*0.9<=val.recommendedFood && val.recommendedFood<=val.curFood*1.1)
console.log(filter)
// 8
console.log(dogs.sort(val=>val.recommendedFood))