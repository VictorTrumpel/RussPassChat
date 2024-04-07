import { SaleCard } from '../../entities/SaleCard/SaleCard';
import { SaleCardSkeleton } from '../../entities/SaleCard/SaleCardSkeleton';
import { Button, Skeleton } from 'antd';
import { useState, useEffect } from 'react';
import { ShareIcon } from '../../shared/icons/ShareIcon';
import { Event } from '../../network/models/Event';
import { Restaurant } from '../../network/models/Restaurant';
import { Excursion } from '../../network/models/Excursion';
import { useConcernFormViewModel } from '../ConcernFormViewModel/ConcernFormViewModel';
import { ACTION_TYPE } from '../../network/service/LikeActivityService';
import './ResultCardSelector.scss';

export const ResultCardSelector = () => {
  const [isFetching, setIsFetch] = useState(false);

  const [eventList, setEventList] = useState<Event[]>([]);
  const [restaurantList, setRestaurantList] = useState<Restaurant[]>([]);
  const [excursionList, setExcursionList] = useState<Excursion[]>([]);

  const { handleSelectStep, fetchTheSelection, handleLikeActivity } = useConcernFormViewModel();

  const hasEvents = eventList.length > 0;
  const hasRestaurants = restaurantList.length > 0;
  const hasExcursions = excursionList.length > 0;

  const handleClickBtnBack = () => {
    handleSelectStep('select-tag');
  };

  const handleFetchResult = async () => {
    try {
      setIsFetch(true);
      const { events, restaurant, excursion } = await fetchTheSelection();
      setEventList(events);
      setRestaurantList(restaurant);
      setExcursionList(excursion);
    } finally {
      setIsFetch(false);
    }
  };

  const handleLikeBtnClick = (activityId: string, type: ACTION_TYPE) => {
    handleLikeActivity(activityId, type);
  };

  useEffect(() => {
    handleFetchResult();
  }, []);

  if (isFetching)
    return (
      <div className='tour-space concern-form-space'>
        <h4>Подобрали самые интересные варианты!</h4>

        <div className='all-card-list'>
          <h4 className='list-title'>События</h4>
          <div className='list'>
            <SaleCardSkeleton />
            <SaleCardSkeleton />
            <SaleCardSkeleton />
          </div>
        </div>

        <div className='action-button-panel'>
          <Button type='text'>Другие варианты</Button>
          <Button type='text'>
            Поделиться <ShareIcon />
          </Button>
        </div>

        <Button onClick={handleClickBtnBack} className='back-to-start-btn' type='text'>
          Вернуться к началу
        </Button>
      </div>
    );

  return (
    <div className='tour-space concern-form-space'>
      <h4>Подобрали самые интересные варианты!</h4>

      <div className='all-card-list'>
        {hasEvents && <h4 className='list-title'>События</h4>}
        <div className='list'>
          {eventList
            .slice(0, 3)
            .map(({ objectId, title, imageUrl, address, price, popularity, cardUrl }) => (
              <SaleCard
                key={objectId}
                id={objectId}
                imgUrl={imageUrl}
                title={title}
                address={address}
                price={`${price}`}
                popularity={popularity}
                cardUrl={cardUrl}
                onLikeClick={(id) => handleLikeBtnClick(id, 'EVENT')}
              />
            ))}
        </div>

        {hasRestaurants && <h4 className='list-title'>Рестораны</h4>}
        <div>
          {restaurantList
            .slice(0, 3)
            .map(({ objectId, title, imageUrl, address, price, popularity, cardUrl }) => (
              <SaleCard
                key={objectId}
                id={objectId}
                imgUrl={imageUrl}
                title={title}
                address={address}
                price={`${price}`}
                popularity={popularity}
                cardUrl={cardUrl}
              />
            ))}
        </div>

        {hasExcursions && <h4 className='list-title'>Экскурссии</h4>}
        <div>
          {excursionList
            .slice(0, 3)
            .map(({ objectId, title, imageUrl, price, popularity, destination, cardUrl }) => (
              <SaleCard
                key={objectId}
                id={objectId}
                imgUrl={imageUrl}
                title={title}
                address={destination}
                price={`${price}`}
                popularity={popularity}
                cardUrl={cardUrl}
              />
            ))}
        </div>
      </div>

      <div className='action-button-panel'>
        <Button type='text'>Другие варианты</Button>
        <Button type='text'>
          Поделиться <ShareIcon />
        </Button>
      </div>

      <Button onClick={handleClickBtnBack} className='back-to-start-btn' type='text'>
        Вернуться к началу
      </Button>
    </div>
  );
};
