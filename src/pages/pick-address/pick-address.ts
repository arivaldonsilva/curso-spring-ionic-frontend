import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[];
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService) {
  }
 
  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          console.log(response);
          this.items = response['enderecos'];
          console.log(this.items)
        },
        error => {
          if(error.status == 403){
            this.navCtrl.setRoot('HomePage');
          }
        });
    }
    else{
      this.navCtrl.setRoot('HomePage');
    }

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
