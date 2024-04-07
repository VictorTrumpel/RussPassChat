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
    <div className='tour-space concern-form-space'>
      <div className='scrollable-window'>
        <PrevStepsInfo />

        <h4 className='selection-result-header'>Подобрали самые интересные варианты!</h4>
        <h5>{interestPromt}</h5>

        <div className='all-card-list'>
          <h4 className='list-title'>События</h4>
          <div className='list'>
            <SaleCardSkeleton />
            <SaleCardSkeleton />
            <SaleCardSkeleton />
          </div>
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

      <NextSubmitInput
        inputProps={{ placeholder: 'Или введите свой вариант', disabled: true }}
        buttonProps={{ disabled: true }}
      />
    </div>
  );
};
