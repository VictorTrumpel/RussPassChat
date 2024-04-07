import { Event } from '../../../network/models/Event';
import { Excursion } from '../../../network/models/Excursion';
import { Restaurant } from '../../../network/models/Restaurant';
import { SaleCard } from '../../../entities/SaleCard/SaleCard';
import { useConcernFormViewModel } from '../../ConcernFormViewModel/ConcernFormViewModel';
import { ACTION_TYPE } from '../../../network/service/LikeActivityService';

type CardListSelectionProps = {
  eventList: Event[];
  restaurantList: Restaurant[];
  excursionList: Excursion[];
};

export const CardListSelection = ({
  eventList,
  restaurantList,
  excursionList,
}: CardListSelectionProps) => {
  const { handleLikeActivity } = useConcernFormViewModel();

  const hasEvents = eventList.length > 0;
  const hasRestaurants = restaurantList.length > 0;
  const hasExcursions = excursionList.length > 0;

  const handleLikeBtnClick = (activityId: string, type: ACTION_TYPE) => {
    handleLikeActivity(activityId, type);
  };

  return (
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
  );
};
