'use strict';
// Selecting elements
const inputSelect = document.querySelector('#bank');
const inputAccount = document.querySelector('#account');
const inputAmount = document.querySelector('#amount');
const inputContent = document.querySelector('#content');
const qrCode = document.querySelector('.qr-img');
const form = document.querySelector('.form');

let bank = '';
let bankAccount = '';
let bankAmount = '';
let bankContent = '';

async function getBankList() {
  const res = await fetch('https://api.vietqr.io/v2/banks');
  const { data } = await res.json();
  return data;
}

const handleClick = function (e) {
  e.preventDefault();
  bank = inputSelect.value;
  bankAccount = inputAccount.value;
  bankAmount = inputAmount.value;
  bankContent = inputContent.value;
  qrCode.src = `https://img.vietqr.io/image/${bank}-${bankAccount}-compact.png?amount=${bankAmount}&addInfo=${bankContent}&accountName=`;
};

function importBankList(list) {
  list.map(bank => {
    const html = `<option value="${bank.bin}">${bank.shortName}</option>`;
    console.log(bank);
    inputSelect.insertAdjacentHTML('beforeend', html);
  });
  form.addEventListener('submit', handleClick);
}

getBankList().then(importBankList);
