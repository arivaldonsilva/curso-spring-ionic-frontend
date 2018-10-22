import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
    , public produtoService: ProdutoService
    , public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    let loader = this.presentLoading();
    let categoria_id = this.navParams.get('categoria_id');
    this.produtoService.findByCategoria(categoria_id)
      .subscribe(response => {
        loader.dismiss();
        this.items = response['content'];
        this.loadImageUrls();
      }, 
      error => {
        loader.dismiss();
      });
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

  // exibe o carregamento dos dados ao ser chamado este metodo
  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Aguarde ..."
    });
    loader.present();
    return loader;
  }

}
