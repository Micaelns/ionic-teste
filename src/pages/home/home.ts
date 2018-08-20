import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Carro } from '../../app/modelos/carro';
import { HttpErrorResponse } from '@angular/common/http';
import { CarrosServiceProvider } from '../../providers/carros-service/carros-service';
import { NavLifecycles } from '../../utils/ionic/nav/nav-lifecycles';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements NavLifecycles {

  public carros: Carro[];

  constructor(public navCtrl: NavController, 
    private _loadingCtrl: LoadingController,
    private _alertCtrl:AlertController,
    private _carrosService: CarrosServiceProvider) {}

  ionViewDidLoad(){
    let loading= this._loadingCtrl.create({
      content:'Carregamento carros...'
    });

    loading.present();
    this._carrosService.lista()
    .subscribe(
      (carros) =>{
        this.carros=carros;
        loading.dismiss();
      },
      (err: HttpErrorResponse)=>{
        console.log(err);
        loading.dismiss();

        this._alertCtrl.create({
          title:'Falha na Conexão',
          subTitle:'Não foi possível carregar a lista de carros. Tente novamente mais tarde!',
          buttons:[
            { text:'OK'}
          ]
        }).present();
      }
    );
  }

  selecionaCarro(carro:Carro){
    console.log(carro);
  }
}
