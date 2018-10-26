import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;
  picture: string;
  cameraOn: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage: StorageService,
    public clienteService: ClienteService,
    private camera: Camera) {
  }

  // recupera o email do usuario logado ao abrir esta tela
  ionViewDidLoad() {
    this.loadData();
  }

  loadData(){
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          console.log(response);
          this.cliente = response as ClienteDTO;
          console.log(this.cliente)
          this.getImageIfExists();
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
  }

  getImageIfExists(){
    this.clienteService.getImageFromBucket(this.cliente.id)
      .subscribe(response => {
        this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
        console.log('Imagem cliente:'+this.cliente.imageUrl)
      },
    error => {});
  }

  getCameraPicture(){
    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     this.picture = 'data:image/png;base64,' + imageData;
     console.log(imageData);
     this.cameraOn = false;
    }, (err) => {
     // Handle error
    });
  }

  getGaleryPicture(){
    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     this.picture = 'data:image/png;base64,' + imageData;
     console.log(imageData);
     this.cameraOn = false;
    }, (err) => {
     // Handle error
    });
  }

  sendPicture(){
    this.clienteService.uploadPicture(this.picture)
      .subscribe(response => {
        this.picture = null;
        this.loadData();
      },
    error =>  { })
  }

  cancel(){
    this.picture = null;
  }
}