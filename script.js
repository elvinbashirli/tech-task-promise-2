const form = document.querySelector("form");
const inpSearch = document.querySelector(".inp-search");

const ipAddressEl = document.querySelector(".ip-address");
const locationEl = document.querySelector(".location");
const timezoneEl = document.querySelector(".timezone");
const ispEl = document.querySelector(".isp");

let map = L.map("map");

let marker = L.marker([0, 0]).addTo(map);

const successCallback = (position) => {
  const { latitude, longitude } = position.coords;

  map.setView([latitude, longitude], 13);
  marker.setLatLng({ lat: latitude, lng: longitude });
};

const errorCallback = (error) => {
  console.log(error);
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

makeAll();

async function makeAll(ipAddress) {
  if (!ipAddress) {
    const data = await fetch("https://api.ipify.org/?format=json");
    const result = await data.json();
    ipAddress = result.ip;
  }

  inpSearch.value = ipAddress;

  const data = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_nJC1YRZ2rIt5XQejzVdjXEAwhIytW&ipAddress=${ipAddress}`
  );

  const result = await data.json();

  const {
    ip,
    isp,
    location: { country, region, timezone, lat, lng },
  } = result;

  map.setView({ lat, lng }, 13);
  marker.setLatLng({ lat, lng });

  ipAddressEl.textContent = ipAddress;
  locationEl.textContent = `${country}, ${region}`;
  timezoneEl.textContent = `UTC ${timezone}`;
  ispEl.textContent = isp;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  makeAll(inpSearch.value);
});
