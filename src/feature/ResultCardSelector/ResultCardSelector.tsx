import { Button, InputProps } from 'antd';
import { useState, useEffect, useRef, Fragment } from 'react';
import { ShareIcon } from '../../shared/icons/ShareIcon';
import { Event } from '../../network/models/Event';
import { Restaurant } from '../../network/models/Restaurant';
import { Excursion } from '../../network/models/Excursion';
import { useConcernFormViewModel } from '../ConcernFormViewModel/ConcernFormViewModel';
import { NextSubmitInput } from '../../shared/ui/NextSubmitInput/NextSubmitInput';
import { PrevStepsInfo } from './PrevStepsInfo';
import { ResultSkeleton } from './ui/ResultSkeleton';
import { CardListSelection } from './ui/CardListSelection';
import './ResultCardSelector.scss';

type ChatHistoryItemType =
  | {
      eventList: Event[];
      restaurantList: Restaurant[];
      excursionList: Excursion[];
    }
  | string;

export const ResultCardSelector = () => {
  const [isFetching, setIsFetch] = useState(false);

  const [chatHistory, setChatHistory] = useState<ChatHistoryItemType[]>([]);
  const [extraPrompt, setExtraPrompt] = useState('');

  const additionalSelectionRef = useRef<Exclude<ChatHistoryItemType, string>>({
    eventList: [],
    restaurantList: [],
    excursionList: [],
  });

  const scrollWindowRef = useRef<HTMLDivElement>(null);

  const {
    handleSelectStep,
    fetchTheSelection,
    handleLikeActivity,
    date,
    datePromt,
    interestPromt,
    checkedConcernTags,
    communityTags,
    communityPromt,
  } = useConcernFormViewModel();

  const handleClickBtnBack = () => {
    handleSelectStep('select-tag');
  };

  const createPromptFromHistory = () => {
    const concernTagsString = checkedConcernTags.join(' ');
    const communityTagsString = communityTags.join(' ');

    const basePrompt = `${concernTagsString.trim()} ${interestPromt.trim()} ${communityTagsString.trim()} ${communityPromt.trim()} Время: ${date} ${datePromt},`;

    return basePrompt.trim();
  };

  const handleFetchResult = async (prompt: string = '') => {
    try {
      setIsFetch(true);

      const fullPrompt = `${prompt} ${createPromptFromHistory()}`.trim();

      const newHistory = [...chatHistory, prompt];

      setChatHistory([...newHistory]);

      const { events, restaurant, excursion } = await fetchTheSelection(fullPrompt);

      const newHistoryItem = {
        eventList: events.slice(0, 3),
        restaurantList: restaurant.slice(0, 3),
        excursionList: excursion.slice(0, 3),
      };

      const newAdditionalItem = {
        eventList: events.slice(3, events.length),
        restaurantList: restaurant.slice(3, restaurant.length),
        excursionList: excursion.slice(3, excursion.length),
      };

      additionalSelectionRef.current = newAdditionalItem;

      setChatHistory([...newHistory, newHistoryItem]);
    } finally {
      setIsFetch(false);
    }
  };

  const handleTypeExtraPrompt: InputProps['onChange'] = (event) => {
    setExtraPrompt(event.target.value);
  };

  const handleClickBtnOnExtraPrompt = () => {
    handleFetchResult(extraPrompt);
    setExtraPrompt('');

    setTimeout(() => {
      const scrollWindow = scrollWindowRef.current;

      if (!scrollWindow) return;

      scrollWindow.scrollTo({
        behavior: 'smooth',
        top: scrollWindowRef.current.scrollHeight,
      });
    });
  };

  useEffect(() => {
    handleFetchResult();
  }, []);

  return (
    <div className='tour-space concern-form-space'>
      <div ref={scrollWindowRef} className='scrollable-window'>
        <PrevStepsInfo />

        <h4 className='selection-result-header'>Подобрали самые интересные варианты!</h4>

        <h5>{interestPromt}</h5>

        {chatHistory.map((historyItem, idx) => {
          if (!historyItem) return <Fragment key={idx} />;
          if (historyItem instanceof Object)
            return <CardListSelection key={idx} {...historyItem} />;
          return (
            <Fragment key={idx}>
              <div className='divider' />
              <h4 className='extra-prompt-text'>{historyItem}</h4>
              <div className='divider' />
            </Fragment>
          );
        })}
        {isFetching && <ResultSkeleton />}
      </div>

      <div className='action-button-panel'>
        <Button type='text'>Похожие варианты</Button>
        <Button type='text'>
          Поделиться <ShareIcon />
        </Button>
      </div>

      <NextSubmitInput
        inputProps={{
          placeholder: 'Или введите свой вариант',
          value: extraPrompt,
          onChange: handleTypeExtraPrompt,
        }}
        buttonProps={{
          disabled: !extraPrompt,
          onClick: handleClickBtnOnExtraPrompt,
        }}
      />
    </div>
  );
};
