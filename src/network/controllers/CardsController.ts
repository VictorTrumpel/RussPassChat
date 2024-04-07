import { CardsService } from '../service/CardsService';

export class CardsController {
  private cardService = new CardsService();

  getCardIds(ids: string[]) {
    return this.cardService.getAllCardsByIds(ids);
  }
}
