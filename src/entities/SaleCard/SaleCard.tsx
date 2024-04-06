import { Button } from 'antd';
import { HeartIcon } from '../../shared/icons/HeartIcon';
import { RateMark } from '../../shared/ui/RateMark/RateMark';
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
  onLikeClick,
  id,
}: SaleCardProps) => {
  return (
    <div className='sale-card'>
      <div className='card-avatar'>
        <img src={imgUrl} alt={title} />
      </div>
      <div className='card-body'>
        <h4 className='card-title'>
          <a href={cardUrl} target='_blank'>
            {title.slice(0, 50)}
            {title.length > 50 && '...'}
          </a>
        </h4>
        <h5>
          {address.slice(0, 30)}
          {address.length > 30 && '...'}
        </h5>

        <div className='card-action-panel'>
          <Button type='text' className='sale-btn'>
            от {price}
          </Button>
          <Button type='link' className='heart-btn' onClick={() => onLikeClick?.(id)}>
            <HeartIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};
