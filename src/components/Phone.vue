<template>
  <div class="mb-3 center-container mx-auto">
    <label>Номер телефона</label><br> 
    <input
      type="text"
      class="input"
      :placeholder="`Введите номер телефона ${selectedCountry ? selectedCountry.dial_code : ''} _______`"
      v-model="phoneNumber"
      @input="handleDialCodeInput"
    />

    <span class="btn-container" id="inputGroup-sizing-default">
      <button
        class="dropdown-toggle"
        type="button"
        @click="toggleDropdown"
      >
      <img :src="selectedCountry ? selectedCountry.image : placeholderImage" class="selectedImage" id="selectedImage" :alt="selectedCountry ? selectedCountry.name : 'Placeholder'" width="30" height="20" />
      
      <ul class="dropdown-menu" :class="{ 'show': isDropdownVisible }" style="max-height: 300px; overflow-y: auto;">
          <li v-for="(country, index) in countries" :key="index" @click="selectCountry(country)">
            <img :src="country.image" :alt="country.name" width="30" height="20" />
            {{ country.name }}  {{ country.dial_code }}
          </li>
        </ul>
      </button>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import jsonData from '../data.json';

type Country = {
  name: string;
  code: string;
  emoji: string;
  unicode: string;
  dial_code: string;
  image: string;
};

const countries = jsonData as Country[]; 
const phoneNumber = ref('');
const isDropdownVisible = ref(false);
const selectedCountry = ref<Country | null>(null);
const placeholderImage = 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Blank.jpg'

const handleDialCodeInput = () => {
  const enteredDialCode = phoneNumber.value;

  const matchingCountries = countries.filter(country => enteredDialCode.startsWith(country.dial_code));
  if (matchingCountries.length != 0) {
    selectedCountry.value = matchingCountries[0];
    selectedCountry.value.image = matchingCountries[0].image;
  } else {
  }
};

const getGeoLocation = async () => {
  try {
    const ipifyResponse = await fetch('https://api.ipify.org?format=jsonp&callback=getIP');
    const ipifyData = await ipifyResponse.text();

    try {
      const match = ipifyData.match(/getIP\((.*?)\)/);
      if (match && match[1]) {
        const ipAddress = JSON.parse(match[1]).ip;

        try {
          const response = await fetch(`https://ipinfo.io/${ipAddress}/json`);
          const data = await response.json();

          const foundCountry = countries.find(country => country.code === data.country);
          if (foundCountry) {
            selectedCountry.value = foundCountry;
          }
        } catch (error) {
          if (error instanceof TypeError && error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
            // Обработка случая, когда запрос блокируется adblocker'ом
            console.error('Ошибка: Запрос блокирован adblocker\'ом. Пожалуйста, отключите adblocker.');
          } else {
            console.error('Ошибка при запросе геолокации:', error);
          }
        }
      } else {
        console.error('Ошибка: Не удалось извлечь IP-адрес из JSONP-ответа');
      }
    } catch (error) {
      console.error('Ошибка при парсинге JSON из JSONP-ответа:', error);
    }
  } catch (error) {
    console.error('Ошибка при запросе IP-адреса:', error);
  }
};

onMounted(() => {
  getGeoLocation();
});

const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value;
};

const selectCountry = (country: Country) => {
  selectedCountry.value = country;
};
</script>

<style>
  .input {
      border: 1px solid rgb(176, 169, 169);
      border-right: none;
      background-color: #fcfbfb;
      width: 270px;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      padding: 8px;
      padding-left: 15px;
      font-weight: 500;
      color: rgb(146,168,166);
  }

  .input::placeholder {
    color: rgb(146,168,166);
  }

  .input:focus {
      outline: none;
  } 

  #app {
    display: block !important;
  }
  
  button {
      background-color: #fff;
  }

  .selectedImage {
      margin-top: -4px;
  }

  .dropdown-toggle {
      border: 1px solid rgb(176, 169, 169);
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      border-left: none;
      padding: 8px; 
      margin-top: 1px;
  }

  .dropdown-menu {
      border-top: none;
  }

  ul.dropdown-menu {
    border-radius: 0px; 
    margin-left: -254px !important;
    margin-top: 9px;
  }

  li:hover {
      background-color: rgb(248, 244, 244);;
  }

  li img {
      margin: -5px 0px 0px 7px;
  }

  img {
      width: 30px;
      height: 20px;
  }

  li {
      font-size: 12px;
      font-weight: 400;
      padding: 5px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }
</style>
