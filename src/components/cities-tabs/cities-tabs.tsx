import CityTab from '../city-tab/city-tab';
import { CITIES } from '../../const/const';

type CitiesTabsProps = {
  activeCity: string;
  onCityClick: (city: string) => void;
};

export default function CitiesTabs({ activeCity, onCityClick }: CitiesTabsProps) {
  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {CITIES.map((city) => (
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
