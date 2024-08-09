"use strict";
// Selecting elements
const form = document.querySelector(".form");
const inputSelect = form.querySelector("#bank");
const inputAccount = form.querySelector("#account");
const inputAmount = form.querySelector("#amount");
const inputContent = form.querySelector("#content");
const qrCode = document.querySelector(".qr-img");
const inputRequiredList = form.querySelectorAll("[required]");
console.log(inputRequiredList);

let bank = "";
let bankAccount = "";
let bankAmount = "";
let bankContent = "";

async function getBankList() {
  const res = await fetch("https://api.vietqr.io/v2/banks");
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

const importBankList = function (list) {
  list.map(bank => {
    const html = `<option value="${bank.bin}">${bank.shortName}</option>`;
    // console.log(bank);
    inputSelect.insertAdjacentHTML("beforeend", html);
  });
  form.addEventListener("submit", handleClick);
};

qrCode.addEventListener("load", function () {
  qrCode.style.opacity = 1;
});
qrCode.style.opacity = 0;
inputRequiredList.forEach(inp => {
  const label = form.querySelector(`[for="${inp.id}"]`);
  label.classList.add("required");
});
getBankList().then(importBankList);
