import { Network } from '../Network';
import { Event } from '../models/Event';
import { Restaurant } from '../models/Restaurant';
import { Excursion } from '../models/Excursion';

const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL || 'http://localhost:3000/';

export class CardsService {
  private baseURL = new URL(SERVER_URL);

  async getAllCardsByIds(ids: string[]) {
    const network = this.createGetNetwork(ids);

    return await network.request(null);
  }

  private createGetNetwork(ids: string[]) {
    console.log('ids :>> ', ids);
    const createFinishingUrl = new URL(`get_by_id?ids=${ids.join(',')}`, this.baseURL);

    const network = new Network<null, (Event | Restaurant | Excursion)[]>();

    network.url = createFinishingUrl;
    network.method = 'GET';
    network.headers.append('Content-Type', 'application/json');

    return network;
  }
}
