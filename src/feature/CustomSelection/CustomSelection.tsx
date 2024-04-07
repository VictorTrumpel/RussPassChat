import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useConcernFormViewModel } from '../ConcernFormViewModel/ConcernFormViewModel';
import { Restaurant } from '../../network/models/Restaurant';
import { Excursion } from '../../network/models/Excursion';
import { SaleCard } from '../../entities/SaleCard/SaleCard';
import { Event } from '../../network/models/Event';

const getDefaultMap = () => {
  const cardMap = new Map();

  cardMap.set('EVENT', []);
  cardMap.set('RESTAURANT', []);
  cardMap.set('EXCURSION', []);

  return cardMap;
};

export const CustomSelection = () => {
  const { fetchAllCards } = useConcernFormViewModel();

  const [cardMap, setCardMap] = useState<Map<string, Event[] | Restaurant[] | Excursion[]>>(
    getDefaultMap()
  );

  const location = useLocation();

  const pickCardIds = async () => {
    let cardIds = [];

    try {
      cardIds = location.search.replace('?ids=', '').split(',');
    } finally {
    }

    if (cardIds.length == 0) return;

    const allCards = await fetchAllCards(cardIds);

    const cardMap = getDefaultMap();

    for (const card of allCards) {
      cardMap.get(card.objectType).push(card);
    }

    setCardMap(cardMap);
  };

  useEffect(() => {
    pickCardIds();
  }, []);

  return (
    <div>
      {cardMap.get('EVENT').length > 0 && (
        <>
          <h5>События</h5>
          {(cardMap.get('EVENT') as Event[]).map((event) => (
            <SaleCard
              key={event.objectId}
              imgUrl={event.imageUrl}
              title={event.title}
              price={`${event.price}`}
              popularity={32}
              address={event.address}
              cardUrl={event.cardUrl}
              id={event.objectId}
            />
          ))}
        </>
      )}

      {cardMap.get('EXCURSION').length > 0 && (
        <>
          <h5>Экскурсии</h5>
          {(cardMap.get('EXCURSION') as Excursion[]).map((event) => (
            <SaleCard
              key={event.objectId}
              imgUrl={event.imageUrl}
              title={event.title}
              price={`${event.price}`}
              popularity={32}
              address={event.destination}
              cardUrl={event.cardUrl}
              id={event.objectId}
            />
          ))}
        </>
      )}

      {cardMap.get('RESTAURANT').length > 0 && (
        <>
          <h5>Рестораны</h5>
          {(cardMap.get('RESTAURANT') as Restaurant[]).map((event) => (
            <SaleCard
              key={event.objectId}
              imgUrl={event.imageUrl}
              title={event.title}
              price={`${event.price}`}
              popularity={32}
              address={event.address}
              cardUrl={event.cardUrl}
              id={event.objectId}
            />
          ))}
        </>
      )}
    </div>
  );
};
