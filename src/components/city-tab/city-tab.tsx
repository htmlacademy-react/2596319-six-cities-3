type CityTab = {
  cityName: string;
  activeCity: string;
  onCityTabClick: (city: string) => void;
}

export default function CityTab({cityName, activeCity, onCityTabClick} : CityTab) {
  function handleCityTabClick(evt: React.MouseEvent<HTMLAnchorElement>) {
    evt.preventDefault();
    onCityTabClick(cityName);
  }
  const isActive = cityName === activeCity;

  return (
    <li className="locations__item">
      <a
        className={`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`}
        href="#"
        onClick={handleCityTabClick}
      >
        <span>{cityName}</span>
      </a>
    </li>
  );
}
