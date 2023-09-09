let map = L.map("map").setView([34.04915, -118.09462], 13);

const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

let marker = L.marker([34.04915, -118.09462]).addTo(map);

makeAll("192.212.174.101");

const form = document.querySelector("form");
const inpSearch = document.querySelector(".inp-search");

const ipAddressEl = document.querySelector(".ip-address");
const locationEl = document.querySelector(".location");
const timezoneEl = document.querySelector(".timezone");
const ispEl = document.querySelector(".isp");

async function makeAll(ipAdress) {
  const data = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_nJC1YRZ2rIt5XQejzVdjXEAwhIytW&ipAddress=${ipAdress}`
  );

  const result = await data.json();

  const {
    ip,
    isp,
    location: { country, region, timezone, lat, lng },
  } = result;

  console.log(lat, lng);

  map.setView({ lat, lng }, 13);
  marker.setLatLng({ lat, lng });

  ipAddressEl.textContent = ip;
  locationEl.textContent = `${country}, ${region}`;
  timezoneEl.textContent = `UTC ${timezone}`;
  ispEl.textContent = isp;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  makeAll(inpSearch.value);
});
