function fetchCountries(name) {
  
return fetch(`https://restcountries.com/v3.1/name/${name}`)
.then((res) => {
    if(res.ok) {
        return res.json();
    } else {
        throw new Error(res.status);
    }
    
})
}

export { fetchCountries };