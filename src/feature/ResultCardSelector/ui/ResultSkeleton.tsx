import { useConcernFormViewModel } from '../../ConcernFormViewModel/ConcernFormViewModel';
import { PrevStepsInfo } from '../PrevStepsInfo';
import { SaleCardSkeleton } from '../../../entities/SaleCard/SaleCardSkeleton';
import { Button } from 'antd';
import { ShareIcon } from '../../../shared/icons/ShareIcon';
import { NextSubmitInput } from '../../../shared/ui/NextSubmitInput/NextSubmitInput';

export const ResultSkeleton = () => {
  const { handleSelectStep, interestPromt } = useConcernFormViewModel();

  const handleClickBtnBack = () => {
    handleSelectStep('select-tag');
  };

  return (
    <div className='all-card-list'>
      <h4 className='list-title'>События</h4>
      <div className='list'>
        <SaleCardSkeleton />
        <SaleCardSkeleton />
        <SaleCardSkeleton />
      </div>
    </div>
  );
};
