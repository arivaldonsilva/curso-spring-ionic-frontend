import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from '../services/storage.service';
import { AlertController } from 'ionic-angular';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        public storage: StorageService
        , public alertCtrl: AlertController
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Passou no interceptor");
        return next.handle(req)
        .catch((error, caught) => {

            let errorObj = error;
            if (errorObj.error) {
                errorObj = errorObj.error;
            }
            if (!errorObj.status) {
                errorObj = JSON.parse(errorObj);
            }

            console.log("Erro detectado pelo interceptor:");
            console.log(errorObj);

            switch(errorObj.status){
                case 403:
                    this.handle403();
                    break;
                case 401:
                    this.handle401();
                    break;
                default:
                    this.handleDefaultError(errorObj);
                    break;
            }
            return Observable.throw(errorObj);
        }) as any;
    }

    handleDefaultError(errorObj: any): any {
        let alert = this.alertCtrl.create({
            title: 'Erro '+errorObj.status+': '+errorObj.error,
            subTitle: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'OK'
                }
            ]
        });
        alert.present();;
    }

    handle401(): any {
        let alert = this.alertCtrl.create({
            title: 'Erro 401: falha de autenticação',
            subTitle: 'Email ou senha incorretos!',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'OK'
                }
            ]
        });
        alert.present();;
    }

    handle403(){
        this.storage.setLocalUser(null);
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};