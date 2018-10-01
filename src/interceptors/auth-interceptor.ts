import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from '../services/storage.service';
import { API_CONFIG } from '../config/api.config';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Entrou no interceptor de autenticacao... ");
        let localUser = this.storage.getLocalUser();

        let N = API_CONFIG.baseUrl.length;
        let requestToAPI = req.url.substring(0, N) == API_CONFIG.baseUrl;
        
        // se o localuser existir e a requisicao é para o backend spring, clona a requisicao e adiciona um cabecalho de autorizacao
        if(localUser && requestToAPI){
            console.log("... e resgatou o token");
            // Requisicao deve ser clonada e segundo o professor a explicação está no material do angular
            const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer '+localUser.token)});
            return next.handle(authReq);
        }
        // se o local user nao existir propaga a requisicao original sem adicionar cabecalho
        else{
            console.log("...passou sem token");
            return next.handle(req);
        }
        
    }
}

// declara o provider do interceptor
export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};