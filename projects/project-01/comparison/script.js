export const photoPairs = [
  {
    id: 1,
    ad: 'assets/01-ad.jpg',
    art: 'assets/01-art.jpeg',
    title: 'Yale Pop-Up',
    adtext: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.",
    arttext: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    ad: 'assets/02-ad.jpg',
    art: 'assets/02-art.jpg',
    title: 'Performance photography in darkness',
    adtext: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    arttext: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    id: 3,
    ad: 'assets/03-ad.png',
    art: 'assets/03-art.jpeg',
    title: 'Maison at Yale /// Heterotopia',
    adtext: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    arttext: "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio, et feugiat tellus.",
  },
  {
    id: 4,
    ad: 'assets/04ad-art.jpg',
    art: 'assets/04ad-art.jpg',
    title: 'Maison x More Amour Boutique',
    adtext: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    arttext: "In hac habitasse platea dictumst. Aenean faucibus nibh et justo cursus id rutrum.",
  },
  {
    id: 5,
    ad: 'assets/05-ad.jpg',
    art: 'assets/05-art.jpg',
    title: 'Yale Pop-Up, burgers',
    adtext: "Suspendisse potenti. In hac habitasse platea dictumst.",
    arttext: "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat.",
  },
  {
      id: 6,
      ad: 'assets/06-ad.jpg',
      art: 'assets/06-art.jpg',
      title: 'Black Yearbook',
      adtext: "Quisque volutpat mattis eros. Aliquam dapibus tincidunt metus.",
      arttext: "Praesent justo dolor, lobortis quis, lobortis dignissim, pulvinar ac, libero.",
  },
  {
      id: 7,
      ad: 'assets/07-ad.jpg',
      art: 'assets/07-art.jpg',
      title: 'Pop-Up, misc food',
      adtext: "Sed non mauris vitae erat consequat auctor eu in elit.",
      arttext: "Venenatis a condimentum vitae sapien pellentesque habitant morbi tristique.",
  },
  {
      id: 8,
      ad: 'assets/08-ad.jpg',
      art: 'assets/08-art.jpg',
      title: 'Pop-up candids',
      adtext: "Fusce id velit ut tortor pretium viverra suspendisse.",
      arttext: "Eros in cursus turpis massa tincidunt dui ut ornare.",
  },
  {
      id: 9,
      ad: 'assets/09-ad.jpg',
      art: 'assets/09-art.jpg',
      title: 'Dance',
      adtext: "Aliquam sem fringilla ut morbi tincidunt augue interdum velit.",
      arttext: "Nunc non blandit massa enim nec dui nunc mattis.",
  },
  {
      id: 10,
      ad: 'assets/10-ad.jpg',
      art: 'assets/10-art.jpg',
      title: 'Rhythmic Blue',
      adtext: "Quis vel eros donec ac odio tempor orci dapibus.",
      arttext: "Facilisis leo vel fringilla est ullamcorper eget nulla.",
  },
  {

      id: 11,
      ad: 'assets/11-ad.jpg',
      art: 'assets/11-art.jpg',
      title: 'Group Portraiture',
      adtext: "Amet est placerat in egestas erat imperdiet.",
      arttext: "Ornare aenean euismod elementum nisi quis eleifend.",
  },
  {

      id: 12,
      ad: 'assets/12-ad.png',
      art: 'assets/12-art.jpeg',
      title: 'Heterotopia solo',
      adtext: "Dui sapien eget mi proin sed libero enim.",
      arttext: "Fringilla ut morbi tincidunt augue interdum velit.",
  },
  {
      id: 13,
      ad: 'assets/13-art-ad.jpg',
      art: 'assets/13-art-ad.jpg',
      title: 'More Amour Boutique',
  },
  {
      id: 14,
      ad: 'assets/14-art-ad.jpg',
      art: 'assets/14-art-ad.jpg',
      title: 'Berlin x London',
      adtext: "Egestas purus viverra accumsan in nisl nisi scelerisque.",
      arttext: "Consectetur adipiscing elit ut aliquam purus sit amet luctus venenatis.",
  },
  {
      id: 15,
      ad: 'assets/15-ad.jpg',
      art: 'assets/15-art.jpg',
      title: 'panopticon',
      adtext: "Vitae congue mauris rutrum tellus pellentesque eu tincidunt.",
      arttext: "Nunc aliquet bibendum enim facilisis gravida neque convallis a cras.",
  },
];


// Get the pair index from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const pairId = parseInt(urlParams.get('pairId'), 10);

// Find the selected pair based on the ID
const selectedPair = photoPairs.find((pair) => pair.id === pairId);

if (!selectedPair) {
  console.error('Invalid pair ID');
  alert('Invalid photo pair selected. Returning to gallery.');
  window.location.href = '/gallery.html';
}

// Elements for displaying the texts
const adText = document.getElementById('ad-text');
const artText = document.getElementById('art-text');

// Set the text content
adText.innerText = selectedPair.adtext || 'Ad Text: Not provided';
artText.innerText = selectedPair.arttext || 'Art Text: Not provided';