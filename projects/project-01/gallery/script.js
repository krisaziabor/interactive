// Data structure for photo pairs with shared titles
const photoPairs = [
  {
    id: 1,
    ad: 'assets/01-ad.jpg',
    art: 'assets/01-art.jpeg',
    title: 'Yale Pop-Up',
    adtext: " ",
    arttext: " ",
  },
  {
    id: 2,
    ad: 'assets/02-ad.jpg',
    art: 'assets/02-art.jpg',
    title: 'Performance photography in darkness',
  },
  {
    id: 3,
    ad: 'assets/03-ad.png',
    art: 'assets/03-art.jpeg',
    title: 'Maison at Yale /// Heterotopia',
  },
  {
    id: 4,
    ad: 'assets/04ad-art.jpg',
    art: 'assets/04ad-art.jpg',
    title: 'Maison x More Amour Boutique',
    adtext: "Id venenatis a condimentum vitae sapien pellentesque habitant morbi.",
    arttext: "Felis eget velit aliquet sagittis id consectetur purus.",
  },
  {
    id: 5,
    ad: 'assets/05-ad.jpg',
    art: 'assets/05-art.jpg',
    title: 'Yale Pop-Up, burgers',
  },
  {
      id: 6,
      ad: 'assets/06-ad.jpg',
      art: 'assets/06-art.jpg',
      title: 'Black Yearbook',
  },
  {
      id: 7,
      ad: 'assets/07-ad.jpg',
      art: 'assets/07-art.jpg',
      title: 'Pop-Up, misc food',
  },
  {
      id: 8,
      ad: 'assets/08-ad.jpg',
      art: 'assets/08-art.jpg',
      title: 'Pop-up candids',
  },
  {
      id: 9,
      ad: 'assets/09-ad.jpg',
      art: 'assets/09-art.jpg',
      title: 'Dance',
  },
  {
      id: 10,
      ad: 'assets/10-ad.jpg',
      art: 'assets/10-art.jpg',
      title: 'Rhythmic Blue',
  },
  {
      id: 11,
      ad: 'assets/11-ad.jpg',
      art: 'assets/11-art.jpg',
      title: 'Group Portraiture',
  },
  {

      id: 12,
      ad: 'assets/12-ad.png',
      art: 'assets/12-art.jpeg',
      title: 'Heterotopia solo',
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
  },
  {
      id: 15,
      ad: 'assets/15-ad.jpg',
      art: 'assets/15-art.jpg',
      title: 'panopticon',
  },
];


// Function to shuffle an array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};

// Function to generate photo pairs
const generatePhotoPairs = (pairs) => {
  const adSide = document.getElementById('ad-side');
  const artSide = document.getElementById('art-side');

  // Shuffle the photo pairs
  const shuffledPairs = shuffleArray([...pairs]);

  shuffledPairs.forEach(({ id, ad, art, title }) => {
    // Create ad photo element
    const adImg = document.createElement('img');
    adImg.src = ad;
    adImg.dataset.pairId = id;

    // Create art photo element
    const artImg = document.createElement('img');
    artImg.src = art;
    artImg.dataset.pairId = id;

    // Function to handle hover effect
    const handleHover = () => {
      const allImages = document.querySelectorAll('.gallery-side img');
      allImages.forEach((img) => img.classList.add('grayscale-dark'));

      adImg.classList.remove('grayscale-dark');
      artImg.classList.remove('grayscale-dark');

      adImg.classList.add('active');
      artImg.classList.add('active');

      document.getElementById('hover-text').innerHTML = `<p>${title}</p>`;
    };

    const handleHoverOut = () => {
      adImg.classList.remove('active');
      artImg.classList.remove('active');

      const allImages = document.querySelectorAll('.gallery-side img');
      allImages.forEach((img) => img.classList.remove('grayscale-dark'));

      document.getElementById('hover-text').innerHTML =
        '<p>Hover over a photo to see more details.</p>';
    };

    // Redirect to comparison page with the pair ID in the query parameter
    const redirectToComparison = () => {
      window.location.href = `/comparisons/${id}.html`;
    };

    // Attach click events for redirection
    adImg.addEventListener('click', redirectToComparison);
    artImg.addEventListener('click', redirectToComparison);

    // Attach hover events to both images
    adImg.addEventListener('mouseover', handleHover);
    artImg.addEventListener('mouseover', handleHover);
    adImg.addEventListener('mouseout', handleHoverOut);
    artImg.addEventListener('mouseout', handleHoverOut);

    // Append images to their respective sides
    adSide.appendChild(adImg);
    artSide.appendChild(artImg);
  });
};

// Populate the gallery with randomized photo pairs
generatePhotoPairs(photoPairs);