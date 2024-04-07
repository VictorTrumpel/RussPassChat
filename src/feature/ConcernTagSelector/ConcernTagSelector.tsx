import { InputProps, Skeleton } from 'antd';
import { useConcernFormViewModel } from '../ConcernFormViewModel/ConcernFormViewModel';
import { interests } from '../../shared/constants/interests';
import { NextSubmitInput } from '../../shared/ui/NextSubmitInput/NextSubmitInput';
import { TagSpace } from '../../shared/ui/TagSpace/TagSpace';
import './ConcernTagSelector.scss';

const tags = interests.map((t) => t.label);

export const ConcernTagSelector = () => {
  const {
    checkedConcernTags,
    handleSelectTag,
    handleUnselectTag,
    handleSelectStep,
    interestPromt,
    handleChangeInterestPromt,
  } = useConcernFormViewModel();

  const isNextButtonDisabled = checkedConcernTags.length == 0 && !interestPromt;

  const handleClickTag = (tag: string) => {
    const hasAlreadyChecked = checkedConcernTags.includes(tag);

    if (hasAlreadyChecked) {
      handleUnselectTag(tag);
      return;
    }

    handleSelectTag(tag);
  };

  const handleSubmitTags = () => {
    handleSelectStep('select-date');
  };

  const handleTypeText: InputProps['onChange'] = (event) => {
    handleChangeInterestPromt(event.target.value);
  };

  return (
    <div className='concern-space concern-form-space'>
      <h4>Интересует что-то конкретное?</h4>
      <h5>Можно выбать несколько вариантов или написать самостоятельно</h5>

      <TagSpace checkedTags={checkedConcernTags} tags={tags} handleClickTag={handleClickTag} />

      <NextSubmitInput
        inputProps={{
          placeholder: 'Или введите свой вариант',
          value: interestPromt,
          onChange: handleTypeText,
        }}
        buttonProps={{ disabled: isNextButtonDisabled, onClick: handleSubmitTags }}
      />
    </div>
  );
};
