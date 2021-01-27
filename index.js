#!/usr/bin/env node
console.log("Hello, Node.JS!");
// const { getCode, getName } = require('country-list');
 
// console.log(getName('IS')); // Iceland
// console.log(getCode('Iceland')); // IS
// console.log(getCode('Nowhere-to-be-found-land')); // undefined



const { getCode, getName } = require('country-list');
const axios = require('axios');

const arguments = process.argv.slice(2);
const country = arguments[0] || "Belgium";
const currentYear = arguments[1] || new Date().getFullYear();
const countryCode = getCode(country);

if (countryCode == undefined) {
  console.log("Not a country");
} else {
  console.log("Here's the dates of holidays in " + country + " for " + currentYear + " :");
  getHolidays();
}

async function getHolidays() {
  try {
    const response = await axios.get(
      "https://date.nager.at/Api/v2/PublicHolidays/" + currentYear + "/" + countryCode
    );

    for (const item of response.data) {
      console.log(item.date + " : " + item.name);
    }
  } catch (error) {
    console.error(error);
  }
}


