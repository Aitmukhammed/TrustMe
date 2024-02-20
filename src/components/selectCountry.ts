import { selectedCountry, toggleDropdown } from './Phone.vue';

export const selectCountry = (country) => {
selectedCountry.value = country;
toggleDropdown(); // Close the dropdown after selecting a country
};
