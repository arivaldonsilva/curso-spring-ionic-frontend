import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(public navCtrl: NavController, public menu: MenuController) {

  }

  // Desabilita a arraste do menu quando entra na página de login
  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  // Quando sai da página de login reabilita o arraste do menu lateral
  ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }

  login(){
    // navega para a página de categorias 
    this.navCtrl.setRoot('CategoriasPage');
    console.log(this.creds);
  }
}
