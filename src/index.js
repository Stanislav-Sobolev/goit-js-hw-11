import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
let debounce = require('lodash.debounce');

const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('input#search-box');

input.addEventListener('input', debounce(() => {
    
    if(input.value.trim() === '' ){

        input.value = "";
        countryList.innerHTML = "";
        countryInfo.innerHTML = "";
        
    } else {
        fetchCountries(input.value.trim())
        .then((result) => {
            
            if(result.length > 10){
                Notify.info(
                    "Too many matches found. Please enter a more specific name."
                    );
            } else {
                creatingMarkup(result);
                }
            })
        .catch((error) => {
            Notify.failure("Oops, there is no country with that name");
                countryList.innerHTML = "";
                countryInfo.innerHTML = "";
                
            });
        }
    
}, DEBOUNCE_DELAY));


function creatingMarkup(result) {
    let allCountries = result.map((country) => {
        return `<li><img src="${country.flags.svg}" width="20" height="auto" 
                style="margin-right:5px" alt="${country.name.common}">${country.name.common}</li>`
    }).join("");
    
    countryList.classList.remove("big-size-text");
    countryInfo.innerHTML = "";
    if(result.length === 1){
        countryList.classList.add("big-size-text");
        
        const moreInfo = result.map((country) => {
            return `<li class="more-info">
            <p><b>Capital: </b>${country.capital}</p>
            <p><b>Population: </b>${country.population}</p></li>
            <p><b>Lenguages: </b>${Object.values(country.languages)}</p></li>`
        }).join("");
        
        countryInfo.innerHTML = moreInfo;
    }     
countryList.innerHTML = allCountries;
}




