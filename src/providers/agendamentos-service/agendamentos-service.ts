import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Agendamento } from '../../app/modelos/agendamento';

@Injectable()
export class AgendamentosServiceProvider {

  private _url='http://localhost:8080/api';

  constructor(private _http: HttpClient) {
  }

  agenda(agendamento: Agendamento ){
    return this._http
                .post(this._url+'/agendamento/agenda',agendamento)
                .do(()=>agendamento.enviado=true)
                .catch( (err)=> Observable.of(new Error('Falha do Agendamento! Tente novamente mais tarde')));
                //.do() execulta sempre que execultado com sucesso
                //método .do do RxJS não é ativado automaticamemte, deve ser feito manualmente no app.module.ts
                 
  }

}
