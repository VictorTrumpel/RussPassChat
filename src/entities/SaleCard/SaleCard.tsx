import { Button } from 'antd';
import { HeartIcon } from '../../shared/icons/HeartIcon';
import { useState } from 'react';
import { RedHeartIcon } from '../../shared/icons/RedHeartIcon';
import './SaleCard.scss';

type SaleCardProps = {
  imgUrl: string;
  title: string;
  address: string;
  price: string;
  popularity: number;
  cardUrl: string;
  id: string;

  onLikeClick?: (id: string) => void;
};

export const SaleCard = ({
  imgUrl,
  title,
  address,
  price,
  cardUrl,
  // onLikeClick,
  id,
}: SaleCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleHeartClick = () => {
    console.log('like card :>> ', {
      objectId: id,
      title,
      address,
      price,
      cardUrl,
    });
    setIsLiked(!isLiked);
  };

  const handleBuyClick = () => {
    console.log('buy cardк :>> ', {
      objectId: id,
      title,
      address,
      price,
      cardUrl,
    });
  };

  return (
    <div className='sale-card'>
      <div className='card-avatar'>
        <img src={imgUrl} alt={title} />
      </div>
      <div className='card-body'>
        <h4 className='card-title'>
          <a href={cardUrl} target='_blank'>
            {title?.slice(0, 50)}
            {title?.length > 50 && '...'}
          </a>
        </h4>
        <h5>
          {address?.slice(0, 30)}
          {address?.length > 30 && '...'}
        </h5>

        <div className='card-action-panel'>
          <Button onClick={handleBuyClick} type='text' className='sale-btn'>
            от {price}
          </Button>
          <Button type='text' className='heart-btn' onClick={handleHeartClick}>
            <span>В избранное</span> {isLiked ? <RedHeartIcon /> : <HeartIcon />}
          </Button>
        </div>
      </div>
    </div>
  );
};
