import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { EstadoService } from '../../services/domain/estado.service';
import { ClienteService } from '../../services/domain/cliente.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  ionViewDidLoad(){
    this.estadoService.findAll()
    .subscribe(response => {
      this.estados = response;
      this.formGroup.controls.estadoId.setValue(this.estados[0].id);
      this.updateCidades();
    });
  }

  updateCidades(){
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
    .subscribe(response => {
      this.cidades = response;
      this.formGroup.controls.cidadeId.setValue(null);
    });
  }

  // Desabilita a arraste do menu quando entra na página de login
  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  // Quando sai da página de login reabilita o arraste do menu lateral
  ionViewWillLeave(){
    this.menu.swipeEnable(true);
  }
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public menu: MenuController,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public clienteService: ClienteService,
    public ctrl: AlertController) {

      this.formGroup = formBuilder.group({
        nome: ['Lua', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['luana@gg.com', [Validators.required, Validators.email]],
        tipo: ['1', [Validators.required]],
        cpfOuCnpj: ['98782894604', [Validators.required, Validators.minLength(11),Validators.maxLength(14)]],
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
    console.log(this.formGroup.value);
    this.clienteService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      },
      error => {});
  }
  
  showInsertOk(): any {
    let alert = this.ctrl.create({
      title: 'Sucesso',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

}