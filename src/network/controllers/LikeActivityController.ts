import { LikeActivityService, ACTION_TYPE } from './../service/LikeActivityService';

export class LikeActivityController {
  private likeActivityService = new LikeActivityService();

  async like(activityId: string, type: ACTION_TYPE) {
    this.likeActivityService.likeActivity(activityId, type);
  }

  unlikeCard() {}
}
