import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

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

  constructor(
    public navCtrl: NavController
    , public menu: MenuController
    , public auth: AuthService) {

  }

  // Desabilita a arraste do menu quando entra na página de login
  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  // Quando sai da página de login reabilita o arraste do menu lateral
  ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter(){
    this.auth.refreshToken()
      .subscribe(response => {
        console.log('header pelo refresh token: '+response.headers.get('Authorization'));
        // salva as credenciais no cliente de forma a atualiza-las
        this.auth.successfullLogin(response.headers.get('Authorization'));
        console.log(response.headers.get('Authorization'));
        // navega para a página de categorias 
        this.navCtrl.setRoot('CategoriasPage');
      },
    error => {
      console.log('erro: '+error.status)
    });
  }

  login(){
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.successfullLogin(response.headers.get('Authorization'));
        console.log('refresh pela autenticacao: '+response.headers.get('Authorization'));
        // navega para a página de categorias 
        this.navCtrl.setRoot('CategoriasPage');
      },
    error => {
    });
   // console.log(this.creds);
  }

  signup(){
    this.navCtrl.push('SignupPage');
  }
}