import { Injectable } from '@angular/core';
import { Agendamento } from '../../app/modelos/agendamento';

import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AgendamentoDaoProvider {

  constructor(private _storage: Storage) {
  }

  private geraChave(agendamento : Agendamento){
    return agendamento.emailCliente + agendamento.data.substr(0,10);
  }
  salva(agendamento : Agendamento){
    let chave= this.geraChave(agendamento); 
    let promise = this._storage.set(chave,agendamento);

    return Observable.fromPromise(promise);
  }

  ehDuplicado(agendamento: Agendamento ){
    let chave=this.geraChave(agendamento);
    let promisse=this._storage
          .get(chave)
          .then(dado => dado?true: false);
    
    return Observable.fromPromise(promisse);
  }

}
