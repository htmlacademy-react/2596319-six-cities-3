import { useParams } from 'react-router-dom';
import Bookmark from '../../components/bookmark/bookmark';
import Logo from '../../components/logo/logo';
import ReviewForm from '../../components/review-form/review-form';
import UserInfo from '../../components/user-info/user-info';
import { AuthorizationStatus } from '../../const/const';
import { TOffer, TOfferExpanded, TReview } from '../../const/types';
import NotFoundPage from '../not-found-page/not-found-page';
import NearHotels from '../../components/near-hotels/near-hotels';
import ReviewsContainer from '../../components/reviews-container/reviews-container';
import HotelsMap from '../../components/hotels-map/hotels-map';
import { useEffect, useState } from 'react';
import {
  fetchCommentsAction,
  fetchFavoritedOffersAction,
  fetchOffersNearbyAction,
  fetchSingleOfferAction,
  State
} from '../../store/api-actions';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/api-actions';
import { Spinner } from '../../components/spinner/spinner';

type OfferPageProps = {
  authorizationStatus: AuthorizationStatus;
};

export default function OfferPage({ authorizationStatus }: OfferPageProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();

  const [activeOffer, setActiveOffer] = useState<TOffer | null>(null);
  const [currentOffer, setCurrentOffer] = useState<TOfferExpanded | null>(null);
  const [reviews, setReviews] = useState<TReview[]>([]);
  const [nearOffers, setNearOffers] = useState<TOffer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoritedOffersAction());
    }
  }, [authorizationStatus, dispatch]);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    setIsLoading(true);

    Promise.all([
      dispatch(fetchSingleOfferAction(id)).unwrap(),
      dispatch(fetchCommentsAction(id)).unwrap(),
      dispatch(fetchOffersNearbyAction(id)).unwrap(),
    ])
      .then(([offerData, commentsData, nearbyData]) => {
        if (isMounted) {
          setCurrentOffer(offerData);
          setReviews(commentsData);
          setNearOffers(nearbyData);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setCurrentOffer(null);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id, dispatch]);

  const userData = useSelector((state: State) => state.user.userData);
  const favoritedOffers = useSelector((state: State) => state.offers.favoritedOffers);
  const favoritedOffersCount = favoritedOffers.length;

  function handleOfferCardHover(offer?: TOffer) {
    setActiveOffer(offer || null);
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (!currentOffer) {
    return <NotFoundPage />;
  }

  const handleCommentSubmit = (newReview: TReview) => {
    setReviews((prevReviews) => [...prevReviews, newReview]);
  };

  const rating = `${currentOffer.rating * 20}%`;

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <UserInfo authorizationStatus={authorizationStatus} userData={userData} favoritesCount={favoritedOffersCount}/>
          </div>
        </div>
      </header>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer.images?.map((image) => (
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
                  onStatusChange={(isFavorite) => {
                    setCurrentOffer((prev) => (prev ? { ...prev, isFavorite } : null));
                  }}
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
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={currentOffer.host?.avatarUrl}
                      width={74}
                      height={74}
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
                  <ReviewForm offerId={currentOffer.id} onCommentSubmit={handleCommentSubmit} />
                )}
              </section>
            </div>
          </div>
          <HotelsMap
            offers={nearOffers}
            selectedOffer={activeOffer}
            className="offer__map"
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <NearHotels offers={nearOffers} handleHover={handleOfferCardHover} />
          </section>
        </div>
      </main>
    </div>
  );
}
