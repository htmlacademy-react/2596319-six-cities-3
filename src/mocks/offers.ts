import { CITIES } from '../const';

export type TOffer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  images: string[];
  maxAdults: number;
};

const CITY_DESCRIPTIONS = [
  'Beautiful & luxurious studio at great location',
  'Wood and stone place',
  'Whole House D.1 City Center 16.7',
  'Hôtel Les Deux Gares & Spa',
  'Hotel Paradis',
  'B&B HOTEL Hilden',
];

const OFFER_TYPES = ['Apartment', 'Hotel', 'Room'];

function getRandomInteger(a: number, b: number) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function generateCoordinates(city: string) {
  switch (city.toLowerCase()) {
    case 'paris':
      return { lat: Number(`48.${getRandomInteger(686000, 999999)}`), lng: Number(`2.${getRandomInteger(105200, 547000)}`) };
    case 'cologne':
      return { lat: Number(`50.${getRandomInteger(850000, 999999)}`), lng: Number(`6.${getRandomInteger(907000, 999999)}`) };
    case 'brussels':
      return { lat: Number(`50.${getRandomInteger(800000, 899999)}`), lng: Number(`4.${getRandomInteger(308000, 423000)}`) };
    case 'amsterdam':
      return { lat: Number(`52.${getRandomInteger(336000, 417999)}`), lng: Number(`4.${getRandomInteger(875200, 972000)}`) };
    case 'hamburg':
      return { lat: Number(`53.${getRandomInteger(460000, 627999)}`), lng: Number(`9.${getRandomInteger(882000, 999999)}`) };
    case 'dusseldorf':
      return { lat: Number(`51.${getRandomInteger(157000, 251999)}`), lng: Number(`6.${getRandomInteger(720200, 890000)}`) };
    default:
      return { lat: 0, lng: 0 };
  }
}

function generateOffers(count: number): TOffer[] {
  const offers: TOffer[] = [];

  for (let i = 0; i < count; i++) {
    const bool = getRandomInteger(0, 1) === 1;
    const currCity = CITIES[getRandomInteger(0, CITIES.length - 1)];
    const coordinates = generateCoordinates(currCity) ?? { lat: 0, lng: 0 };

    offers.push({
      id: String(i + 1),
      title: CITY_DESCRIPTIONS[getRandomInteger(0, CITY_DESCRIPTIONS.length - 1)],
      type: OFFER_TYPES[getRandomInteger(0, OFFER_TYPES.length - 1)],
      price: getRandomInteger(70, 200),
      city: {
        name: currCity,
        location: {
          latitude: coordinates.lat,
          longitude: coordinates.lng,
          zoom: 8,
        },
      },
      location: {
        latitude: coordinates.lat,
        longitude: coordinates.lng,
        zoom: 8,
      },
      isFavorite: bool,
      isPremium: !bool,
      rating: getRandomInteger(1, 5),
      description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
      bedrooms: getRandomInteger(1, 3),
      goods: ['Heating'],
      host: {
        name: 'Oliver Conner',
        avatarUrl: 'img/room.jpg',
        isPro: false,
      },
      images: [
        'https://www.godwinvaapts.com/wp-content/uploads/2022/06/lewisRender2.jpg',
        'https://www.godwinvaapts.com/wp-content/uploads/2022/06/lewisRender2.jpg',
      ],
      maxAdults: getRandomInteger(2, 5),
    });
  }
  return offers;
}

export const offers: TOffer[] = generateOffers(20);
