import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
 
  ionViewDidLoad() {
    this.items = [
      {
        id: "1",
        logradouro: "Rua Tototoim",
        numero: "6565",
        complemento: "fefefefe",
        bairro: "centro",
        cep: "36520000",
        cidade: {
          id: "1",
          nome: "Rio Branco",
          estado: {
            id: "1",
            nome: "Minas Gerais"
          }
        }
      },
      {
        id: "2",
        logradouro: "Rua Tototoim",
        numero: "745",
        complemento: "lalalal",
        bairro: "centro",
        cep: "36520000",
        cidade: {
          id: "2",
          nome: "Tatuí",
          estado: {
            id: "2",
            nome: "Sao Paulo"
          }
        }
      }
    ];
  }

}
