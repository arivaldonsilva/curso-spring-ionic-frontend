import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[];
  

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id');
    this.produtoService.findByCategoria(categoria_id)
      .subscribe(response => {
        this.items = response['content'];
        this.loadImageUrls();
      }, 
      error => {});
  }

  // Para cada um dos produtos de uma categoria, atribui o caminho da imagem ao item do array de produtos
  loadImageUrls(){
    for(let i = 0; i < this.items.length; i++){
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
        error => {});
      }
  }

  loadImageUrls2(){
    for(let i = 0; i < this.items.length; i++){
      let item = this.items[i];
        item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
      }
  }

  // Navega para a pagina de detalhes do produto
  showDetail(produto_id: string){
    this.navCtrl.push('ProdutoDetailPage', {produto: produto_id});
  }

}
