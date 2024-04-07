import { TagSpace } from '../../shared/ui/TagSpace/TagSpace';
import { useConcernFormViewModel } from '../ConcernFormViewModel/ConcernFormViewModel';

export const PrevStepsInfo = () => {
  const { checkedConcernTags, handleSelectStep, date, datePromt, communityTags } =
    useConcernFormViewModel();

  const handleGoBackToConcernTags = () => {
    handleSelectStep('select-tag');
  };

  const handleGoBackToDate = () => {
    handleSelectStep('select-date');
  };

  const handleGoToCommunity = () => {
    handleSelectStep('select-community');
  };

  return (
    <>
      <div className='prev-info-header'>
        <h5 className='when-ask'>Что?</h5>
        <h5 tabIndex={0} className='go-back-link' onClick={handleGoBackToConcernTags}>
          Изменить
        </h5>
      </div>

      <div className='tag-info-container prev-info-tag-container'>
        <TagSpace tags={checkedConcernTags} checkedTags={checkedConcernTags} />
      </div>

      <div className='divider' />

      <div className='prev-info-header'>
        <h5 className='when-ask'>Когда?</h5>
        <h5 tabIndex={0} className='go-back-link' onClick={handleGoBackToDate}>
          Изменить
        </h5>
      </div>

      <h4 className='date-info'>
        {date}
        {datePromt ? `, ${datePromt}` : ''}
      </h4>

      <div className='divider' />

      <div className='prev-info-header'>
        <h5 className='when-ask'>Какая компания?</h5>
        <h5 tabIndex={0} className='go-back-link' onClick={handleGoToCommunity}>
          Изменить
        </h5>
      </div>

      <div className='tag-info-container prev-info-tag-container'>
        <TagSpace tags={communityTags} checkedTags={communityTags} />
      </div>
    </>
  );
};
