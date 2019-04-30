import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interface';
import { environment } from 'src/environments/environment';
const apiKey=environment.apiKey;
const apiUrl=environment.apiUrl;
const headers= new HttpHeaders({
  'X-Api-key':apiKey
});
@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  headLinesPage=0;
  categoriaActual='';
  categoriaPage=0;
  constructor(private http:HttpClient ) { }
  private ejecutarQuery<T>(query:string){
    query=apiUrl+query;
    return this.http.get<T>(query,{headers});

  }
  getTopHeadLine(){
    this.headLinesPage++;
   return  this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=mx&page=${this.headLinesPage}`);
  //   return this.http.get<RespuestaTopHeadlines>(`https://newsapi.org/v2/everything?q=bitcoin&from=2019-03-28&sortBy=publishedAt&apiKey=dd8f32ea64ec4e56bcf1c81cbf1eedcc`);
  }
  getTopHeadLineCategorias(categoria:string){
    if(this.categoriaActual===categoria){
      this.categoriaPage++;
    }else{
      this.categoriaPage=1;
      this.categoriaActual=categoria;
    }
    return  this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=mx&category=${categoria}&page=${this.categoriaPage}`);
  //  return this.http.get(`https://newsapi.org/v2/top-headlines?country=mx&category=business&apiKey=dd8f32ea64ec4e56bcf1c81cbf1eedcc`);
  }

}
