const mainWrapper = document.querySelector(".wrapper");
const result = document.querySelector(".result-wrapper");
const input = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");

function showSearch(countryName) {
  const url = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
  fetch(url)
    .then(unorganized => unorganized.json())
    .then(data => {
      console.log(data);
      mainWrapper.classList.add("show");
      result.classList.add("show");
      
      const currencyName = Object.keys(data[0].currencies)[0];

      result.innerHTML = `
  <i class="bi-x-lg close-info" onclick="closeInfo()"></i>
  <div class="img-wrapper">
    <img class="flag" src="${data[0].flags.svg}" />
  </div>
  <h2 class="country">${data[0].name.common}</h2>

  <div class="info-wrapper">
    
    <span class="info-main"><b>Capital:</b> ${data[0].capital}</span>
    <span class="info-main"><b>Continent:</b> ${data[0].continents[0]}</span>
    <span class="info-main"><b>Population:</b> ${Intl.NumberFormat().format(data[0].population)}</span>
    <span class="info-main"><b>Area:</b> ${Intl.NumberFormat().format(data[0].area)} km<sup>2</sup></span>
    <span class="info-main"><b>Main Currency:</b> ${currencyName} - ${data[0].currencies[currencyName].name}</span>
    <span class="info-main"><b>Common Languages:</b> ${Object.values(data[0].languages).toString().split(",").join(", ")}</span>

  </div>
    `
    })
    .catch(() => {
      const previousErrs = document.querySelectorAll(".error");
      previousErrs.forEach((err) => err.remove());

      result.classList.remove("show");
      const errEl = document.createElement("h3");
      errEl.classList.add("error");
      errEl.textContent = "Please enter a valid country name";

      mainWrapper.append(errEl);
    });
}

searchBtn.addEventListener("click", () => showSearch(input.value));
input.addEventListener("keydown", (e) => {
  if (e.key === 'Enter') showSearch(e.target.value);
});

function closeInfo() {
  result.classList.remove("show");
  mainWrapper.classList.add("show");
}