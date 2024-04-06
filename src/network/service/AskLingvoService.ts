import { Network } from '../Network';
import { Event } from '../models/Event';
import { Restaurant } from '../models/Restaurant';
import { Excursion } from '../models/Excursion';

const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL || 'http://localhost:3000/';
export class AskLingvoService {
  private baseURL = new URL(SERVER_URL);

  async ask(prompt: string) {
    const network = this.createPostFinishingNetwork();

    return await network.request({ prompt });
  }

  private createPostFinishingNetwork() {
    const createFinishingUrl = new URL('ask_lingvo_model', this.baseURL);

    const network = new Network<
      { prompt: string },
      { events: Event[]; restaurants: Restaurant[]; excursions: Excursion[] }
    >();

    network.url = createFinishingUrl;
    network.method = 'POST';
    network.headers.append('Content-Type', 'application/json');

    return network;
  }
}
