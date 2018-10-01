import { Injectable } from "@angular/core";
import { ClienteDTO } from "../../models/cliente.dto";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService {

    constructor(public http: HttpClient, public storage: StorageService){}
    
    findByEmail(email: string):Observable<ClienteDTO>{
        // código comentado será executado no interceptor authinterceptor
       /* let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({
           'Authorization': 'Bearer ' + token
        })*/
        return this.http.get<ClienteDTO>(
            `${API_CONFIG.baseUrl}/clientes/email?value=${email}`/*,
        {'headers': authHeader }*/);
    }

    // acessa o bucket s3 e tenta obter uma imagem do cliente cujo id é passado
    getImageFromBucket(id: string): Observable<any>{
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
        return this.http.get(url, {responseType: 'blob'});
    }
}