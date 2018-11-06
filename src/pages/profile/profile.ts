import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;
  picture: string;
  profileImage: any; // imagem do avatar obtida do bucket
  cameraOn: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage: StorageService,
    public clienteService: ClienteService,
    private camera: Camera,
    private sanitizer: DomSanitizer) {
      this.profileImage = 'assets/imgs/avatar-blank.png';
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
        this.blobToDataURL(response).then(dataUrl => {
          let str = dataUrl as string;
          this.profileImage = this.sanitizer.bypassSecurityTrustUrl(str);
        })
      },
    error => {
      this.profileImage = 'assets/imgs/avatar-blank.png';
    });
  }

  // converte blob para base64
  blobToDataURL(blob){
    return new Promise((fulfill, reject) => {
      let reader = new FileReader();
      reader.onerror = reject;
      reader.onload = (e) => fulfill(reader.result);
      reader.readAsDataURL(blob)
    })
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
     console.log(this.picture);
     this.cameraOn = false;
    }, (err) => {
     this.cameraOn = false;
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
     console.log(this.picture);
     this.cameraOn = false;
    }, (err) => {
      this.cameraOn = false;
    });
  }

  sendPicture(){
    this.clienteService.uploadPicture(this.picture)
      .subscribe(response => {
        this.picture = null;
        //this.loadData();
        this.getImageIfExists();
      },
    error =>  { })
  }

  cancel(){
    this.picture = null;
  }
}