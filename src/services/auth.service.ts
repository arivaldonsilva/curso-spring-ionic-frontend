import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthService {

    constructor(public http: HttpClient, public storage: StorageService){
    }

    authenticate(creds: CredenciaisDTO) {
       return this.http.post(
           `${API_CONFIG.baseUrl}/login`,
            creds,
            {
                observe:'response', 
                responseType: 'text'
            });

    }


    // Após passar por authenticate com sucesso, pega a credencial retornada do login e seta 
    // o local storage com o valor da chave de autenticacao
    successfullLogin(authorizationValue: string){
        let tok = authorizationValue.substring(7);
        let user: LocalUser = {
            token: tok
        }
        this.storage.setLocalUser(user);
    }

    // limpa a chave de autentica do local storage
    logout(){
        this.storage.setLocalUser(null);
    }
    
}