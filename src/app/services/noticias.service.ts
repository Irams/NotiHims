import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});


@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage = 0;
  categoriaActual = '';
  categoriaPage = 0;

  constructor( private http: HttpClient) {}

  private ejecutarQuery<T>( query: string){

    query = apiUrl + query;
    console.log(query);
    
    return this.http.get<T>( query, {headers} );
  }

  getTopHeadlines(){

    this.headlinesPage ++;
    console.log(this.headlinesPage);
    
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=mx&page=${this.headlinesPage}`);
    // return this.http.get<RespuestaTopHeadlines>(`http://newsapi.org/v2/top-headlines?country=mx&apiKey=0f2932567d0c46db8c16f215bf7f4981`);
   }

  getTopHeadlinescategoria( categoria: string ){
    if(this.categoriaActual === categoria){
      this.categoriaPage++;
    }else{
      this.categoriaPage=1;
      this.categoriaActual = categoria;
    }
    // return this.http.get(`http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=0f2932567d0c46db8c16f215bf7f4981`);
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=mx&category=${ categoria }&page=${ this.categoriaPage }`);
  }
}
