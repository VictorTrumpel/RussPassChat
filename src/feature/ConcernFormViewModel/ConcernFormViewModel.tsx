import { createContext, useContext, ReactNode } from 'react';
import { useTDispatch } from '../../shared/hooks/useTDispatch';
import { useTSelector } from '../../shared/hooks/useTSelector';
import { concernSliceActions } from '../../model/concernSlice';
import { ConcernStateType } from '../../model/concernSlice';
import { CalendarProps } from 'antd';
import { Event } from '../../network/models/Event';
import { Restaurant } from '../../network/models/Restaurant';
import { Excursion } from '../../network/models/Excursion';
import { AskLingvoController } from '../../network/controllers/AskLingvoController';
import { LikeActivityController } from '../../network/controllers/LikeActivityController';
import { ACTION_TYPE } from '../../network/service/LikeActivityService';
import { CardsController } from '../../network/controllers/CardsController';

type ConcernViewModelType = {
  currentStep: ConcernStateType['currentStep'];
  checkedConcernTags: string[];
  interestPromt: string;
  date: CalendarProps<any>['value'];
  datePromt: string;
  communityTags: string[];
  communityPromt: string;

  handleSelectTag(tag: string): void;
  handleUnselectTag(tag: string): void;
  handleSelectStep(step: ConcernViewModelType['currentStep']): void;
  handleChangeInterestPromt(text: string): void;
  handleSelectDate(dateStr: string): void;
  handleChangeDatePromt(text: string): void;
  handleSelectCommunityTag(text: string): void;
  handleUnselectCommunityTag(text: string): void;
  fetchTheSelection(prompt: string): ReturnType<AskLingvoController['askModel']>;
  handleChangeCommunityPromt(text: string): void;

  handleLikeActivity(activityId: string, actionType: ACTION_TYPE): Promise<void>;
  handleUnlikeActivity(): Promise<void>;

  fetchAllCards(ids: string[]): Promise<(Event | Restaurant | Excursion)[]>;
};

export const ConcernViewModelContext = createContext<ConcernViewModelType | null>(null);

const {
  addConcernTag,
  deleteConcernTag,
  setCurrentStep,
  setInterestPromt,
  setDate,
  setDatePromt,
  addCommunityTag,
  deleteCommunityTag,
  setCommunityPromt,
} = concernSliceActions;

const askLingvoController = new AskLingvoController();
const cardsController = new CardsController();

export const ConcernFormViewModel = ({ children }: { children: ReactNode }) => {
  const currentStep = useTSelector((state) => state.concern.currentStep);

  const checkedConcernTags = useTSelector((state) => state.concern.checkedConcernTags);
  const interestPromt = useTSelector((state) => state.concern.interestPromt);

  const date = useTSelector((state) => state.concern.date);
  const datePromt = useTSelector((state) => state.concern.datePromt);

  const communityTags = useTSelector((state) => state.concern.checkedCommunityTags);
  const communityPromt = useTSelector((state) => state.concern.communityPromt);

  const dispatch = useTDispatch();

  const handleSelectTag = (tag: string) => {
    dispatch(addConcernTag(tag));
  };

  const handleUnselectTag = (tag: string) => {
    dispatch(deleteConcernTag(tag));
  };

  const handleSelectStep = (step: ConcernViewModelType['currentStep']) => {
    dispatch(setCurrentStep(step));
  };

  const handleChangeInterestPromt = (text: string) => {
    dispatch(setInterestPromt(text));
  };

  const handleSelectDate = (date: any) => {
    dispatch(setDate(date));
  };

  const handleChangeDatePromt = (text: string) => {
    dispatch(setDatePromt(text));
  };

  const handleSelectCommunityTag = (tag: string) => {
    dispatch(addCommunityTag(tag));
  };

  const handleUnselectCommunityTag = (tag: string) => {
    dispatch(deleteCommunityTag(tag));
  };

  const handleChangeCommunityPromt = (text: string) => {
    dispatch(setCommunityPromt(text));
  };

  const fetchTheSelection = async (prompt: string) => {
    return await askLingvoController.askModel(prompt);
  };

  const handleLikeActivity = async () => {
    // likeActivityController.like(activityId, actionType);
  };

  const fetchAllCards = async (ids: string[]) => {
    return cardsController.getCardIds(ids);
  };

  const handleUnlikeActivity = async () => {};

  return (
    <ConcernViewModelContext.Provider
      value={{
        currentStep,
        interestPromt,
        checkedConcernTags,
        date,
        datePromt,
        communityTags,
        communityPromt,

        handleSelectTag,
        handleUnselectTag,
        handleSelectStep,
        handleChangeInterestPromt,
        handleSelectDate,
        handleChangeDatePromt,
        handleSelectCommunityTag,
        handleUnselectCommunityTag,
        fetchTheSelection,
        handleChangeCommunityPromt,

        handleLikeActivity,
        handleUnlikeActivity,

        fetchAllCards,
      }}
    >
      {children}
    </ConcernViewModelContext.Provider>
  );
};

export const useConcernFormViewModel = () => {
  const context = useContext(ConcernViewModelContext);
  if (!context) throw new Error('useConcernViewModel needs in <ConcernViewModelContext />');
  return context;
};
