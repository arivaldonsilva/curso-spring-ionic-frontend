import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { API_CONFIG } from '../../config/api.config';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  items: CategoriaDTO[];
  bucketUrl = API_CONFIG.bucketBaseUrl;
  // `${API_CONFIG.bucketBaseUrl}/cat${item.id}`

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoriaService: CategoriaService) {
  }

  ionViewDidLoad() {
    this.categoriaService.findAll()
      .subscribe(response => {
        console.log(response)
        this.items = response;
      }, 
      error => { });
  }

  // Navega para a página de produtos
  showProdutos(categoria_id: string){
    this.navCtrl.push('ProdutosPage', {categoria_id: categoria_id});
  }
}
