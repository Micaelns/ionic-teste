import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Carro } from '../../app/modelos/carro';
import { AgendamentosServiceProvider } from '../../providers/agendamentos-service/agendamentos-service';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

    public carro: Carro;
    public precoTotal: number;

    public nome:string ='';
    public endereco:string ='';
    public email:string ='';
    public data:string = new Date().toISOString();

    private _alerta : Alert;
    

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private _alertCtrl: AlertController,
    private _agendamentosService: AgendamentosServiceProvider) {
        this.carro = this.navParams.get('carroSelecionado');
        this.precoTotal = this.navParams.get('precoTotal');
  }

  agenda(){

    let agendamento={
      nomeCliente: this.nome,
      enderecoCliente: this.endereco,
      emailCliente: this.email,
      modeloCarro: this.carro.nome,
      precoTotal: this.precoTotal
    };
    this._alerta = this._alertCtrl.create({
      title: 'Aviso',
      buttons:[
        {
          text:'OK',
          handler: ()=>{
            this.navCtrl.setRoot(HomePage);
          }
        }
      ]
    })

   this._agendamentosService.agenda(agendamento)
    .subscribe(
      ()=>{
        this._alerta.setSubTitle('Agendamento realizado');
        this._alerta.present();
      },
      ()=>{
        this._alerta.setSubTitle('Falha do Agendamento! Tente novamente mais tarde');
        this._alerta.present();
      },
    );
  }
}