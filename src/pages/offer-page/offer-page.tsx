import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Bookmark from '../../components/bookmark/bookmark';
import Logo from '../../components/logo/logo';
import ReviewForm from '../../components/review-form/review-form';
import UserInfo from '../../components/user-info/user-info';
import { AuthorizationStatus, ReviewConfig } from '../../const/const';
import { TOffer } from '../../const/types';
import NotFoundPage from '../not-found-page/not-found-page';
import NearHotels from '../../components/near-hotels/near-hotels';
import ReviewsContainer from '../../components/reviews-container/reviews-container';
import HotelsMap from '../../components/hotels-map/hotels-map';
import { Spinner } from '../../components/spinner/spinner';
import { AppDispatch, State, fetchCommentsAction, fetchOffersNearbyAction, fetchSingleOfferAction } from '../../store/api-actions';

type OfferPageProps = {
  authorizationStatus: AuthorizationStatus;
};

export default function OfferPage({ authorizationStatus }: OfferPageProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();

  const currentOffer = useSelector((state: State) => state.offers.currentOffer);
  const reviews = useSelector((state: State) => state.offers.reviews);
  const nearOffers = useSelector((state: State) => state.offers.nearOffers);
  const isLoading = useSelector((state: State) => state.offers.isOfferLoading);

  const userData = useSelector((state: State) => state.user.userData);
  const favoritedOffers = useSelector((state: State) => state.offers.favoritedOffers);
  const favoritedOffersCount = favoritedOffers.length;

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleOfferAction(id));
      dispatch(fetchCommentsAction(id));
      dispatch(fetchOffersNearbyAction(id));
    }
  }, [id, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!currentOffer) {
    return <NotFoundPage />;
  }

  const rating = `${Math.round(currentOffer.rating) * (ReviewConfig.MaxStarsWidthPercentage / ReviewConfig.MaxStarsCount)}%`;
  const nearOffersToRender = nearOffers.slice(0, 3);
  const mapOffers: TOffer[] = [...nearOffersToRender, currentOffer as unknown as TOffer];

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <UserInfo authorizationStatus={authorizationStatus} userData={userData} favoritesCount={favoritedOffersCount} />
          </div>
        </div>
      </header>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer.images?.slice(0, 6).map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img className="offer__image" src={image} alt={currentOffer.title} />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{currentOffer.title}</h1>
                <Bookmark
                  offerId={currentOffer.id}
                  isFavorite={currentOffer.isFavorite}
                  forOfferPage
                />
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: rating }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{currentOffer.type}</li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer.bedrooms} bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {currentOffer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">€{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer.goods?.map((item) => (
                    <li className="offer__inside-item" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div
                    className={`offer__avatar-wrapper ${
                      currentOffer.host?.isPro ? 'offer__avatar-wrapper--pro' : ''
                    } user__avatar-wrapper`}
                  >
                    <img
                      className="offer__avatar user__avatar"
                      src={currentOffer.host?.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{currentOffer.host?.name}</span>
                  {currentOffer.host?.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{currentOffer.description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <ReviewsContainer reviews={reviews} />
                {authorizationStatus === AuthorizationStatus.Auth && (
                  <ReviewForm
                    offerId={currentOffer.id}
                    onCommentSubmit={() => {
                      dispatch(fetchCommentsAction(currentOffer.id));
                    }}
                  />
                )}
              </section>
            </div>
          </div>
          <HotelsMap
            offers={mapOffers}
            selectedOffer={currentOffer as unknown as TOffer}
            className="offer__map"
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <NearHotels offers={nearOffersToRender} onHover={() => {}} />
          </section>
        </div>
      </main>
    </div>
  );
}
