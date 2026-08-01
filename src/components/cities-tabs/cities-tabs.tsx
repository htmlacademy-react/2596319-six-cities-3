import CityTab from '../city-tab/city-tab';

type CitiesTabsProps = {
  activeCity: string;
  onCityClick: (city: string) => void;
};

export default function CitiesTabs({ activeCity, onCityClick }: CitiesTabsProps) {
  const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {cities.map((city) => (
              <CityTab
                key={city}
                cityName={city}
                activeCity={activeCity}
                onCityTabClick={() => onCityClick(city)}
              />
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
