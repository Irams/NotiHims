import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { Article } from '../../interfaces/interfaces';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor( private noticiasService: NoticiasService) {}

  @ViewChild(IonSegment, { static: true }) segment: IonSegment;


  categorias=['technology', 'general', 'science', 'business', 'entertainment', 'health', 'sports'];
  noticias:Article[] = [];

  cargarNoticias( categoria:string, event? ){
    // this.segment.value = this.categorias[0];
    this.noticiasService.getTopHeadlinescategoria( categoria ).subscribe(resp =>{
      // console.log(resp);

      if(resp.articles.length === 0){
        event.target.disabled = true;
        event.target.complete();
        return;
      }

      this.noticias.push( ...resp.articles );
      if(event){
        event.target.complete();
      }
    });
  }

  ngOnInit(){
    this.segment.value = this.categorias[0];
    this.cargarNoticias( this.categorias[0] );
  }

  cambioCategoria( event ){
    this.noticias = [];
    // console.log( event.detail.value);
    this.cargarNoticias( event.detail.value ); 
  }
  loadData(event){
    this.cargarNoticias(this.segment.value, event)
  }
}
