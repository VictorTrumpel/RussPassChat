import { TagSpace } from '../../shared/ui/TagSpace/TagSpace';
import { useConcernFormViewModel } from '../ConcernFormViewModel/ConcernFormViewModel';
import { NextSubmitInput } from '../../shared/ui/NextSubmitInput/NextSubmitInput';
import { communities } from '../../shared/constants/communities';
import { InputProps } from 'antd';
import './CommunitySelector.scss';

export const CommunitySelector = () => {
  const {
    checkedConcernTags,
    handleSelectStep,
    date,
    datePromt,
    communityPromt,
    communityTags,
    handleSelectCommunityTag,
    handleUnselectCommunityTag,
    handleChangeCommunityPromt,
  } = useConcernFormViewModel();

  const handleGaBackToTags = () => {
    handleSelectStep('select-tag');
  };

  const handleGoBackToDate = () => {
    handleSelectStep('select-date');
  };

  const handleGoResultPage = () => {
    handleSelectStep('result-page');
  };

  const handleClickCommunityTag = (tag: string) => {
    const hasAlreadyChecked = communityTags.includes(tag);

    if (hasAlreadyChecked) {
      handleUnselectCommunityTag(tag);
      return;
    }

    handleSelectCommunityTag(tag);
  };

  const handleTypeCommunityPromt: InputProps['onChange'] = (event) => {
    handleChangeCommunityPromt(event.target.value);
  };

  return (
    <div className='community-space concern-form-space'>
      <h5 onClick={handleGaBackToTags}>Что?</h5>

      <div className='tag-info-container'>
        <TagSpace tags={checkedConcernTags} checkedTags={checkedConcernTags} />
      </div>

      <h5 tabIndex={0} className='go-back-link' onClick={handleGaBackToTags}>
        Изменить
      </h5>

      <div className='divider' />

      <h5 className='when-ask'>Когда?</h5>

      <h4 className='date-info'>
        {date}
        {datePromt ? `, ${datePromt}` : ''}
      </h4>

      <h5 tabIndex={0} className='go-back-link' onClick={handleGoBackToDate}>
        Изменить
      </h5>

      <div className='divider' />

      <h4 className='whom-ask'>А с кем пойдете?</h4>

      <div className='community-tags-container'>
        <TagSpace
          tags={communities}
          checkedTags={communityTags}
          handleClickTag={handleClickCommunityTag}
        />
      </div>

      <div className='divider' />

      <NextSubmitInput
        inputProps={{
          placeholder: 'Или введите свой вариант',
          value: communityPromt,
          onChange: handleTypeCommunityPromt,
        }}
        buttonProps={{
          onClick: handleGoResultPage,
        }}
      />
    </div>
  );
};
