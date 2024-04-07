import { AskLingvoService } from '../service/AskLingvoService';

export class AskLingvoController {
  private lingvoService = new AskLingvoService();

  async askModel(promt: string): ReturnType<AskLingvoService['ask']> {
    return this.lingvoService.ask(promt);
  }

  
}
