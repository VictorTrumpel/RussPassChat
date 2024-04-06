import { Network } from './../Network';
const SERVER_URL = 'https://api.russpass.ru/content/v3/';

export type ACTION_TYPE = 'EVENT';

export class LikeActivityService {
  private baseURL = new URL(SERVER_URL);

  async likeActivity(activityId: string, type: ACTION_TYPE) {
    const cookie = JSON.parse(document.cookie.replace('auth-token=', ''));

    const network = this.createPostLikeActivityNetwork(cookie.accessToken);

    const response = await network.request({ id: activityId, type });

    return { id: response.id, errorCode: response.errorCode };
  }

  private createPostLikeActivityNetwork(accessToken: string) {
    const likeActivityUrl = new URL('favorite/activity', this.baseURL);

    const network = new Network<
      { id: string; type: ACTION_TYPE },
      { id: string; errorCode: number }
    >();
    network.url = likeActivityUrl;
    network.method = 'POST';
    network.headers.append('Content-Type', 'application/json');
    network.headers.append('Authorization', `Bearer ${accessToken}`);

    return network;
  }
}
