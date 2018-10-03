import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder) {

      this.formGroup = formBuilder.group({
        nome: ['Luana', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['luana@gg.com', [Validators.required, Validators.email]],
        tipo: ['1', [Validators.required]],
        cpfOuCnpf: ['98782894604', [Validators.required, Validators.minLength(11),Validators.maxLength(14)]],
        senha: ['123', [Validators.required]],
        logradouro: ['Rua Via',[Validators.required]],
        numero: ['25', [Validators.required]],
        complemento: ['Apto 3', []],
        bairro: ['Copacabana', []],
        cep: ['36520000',[Validators.required]],
        telefone1: ['999426590',[Validators.required]],
        telefone2: ['',[]],
        telefone3: ['',[]],
        estadoId: [null, [Validators.required]],
        cidadeId: [null, [Validators.required]]

      })
  }

  public signupUser(){
    console.log("enviou o form");
  }

  public updateCidades(){

  }

}