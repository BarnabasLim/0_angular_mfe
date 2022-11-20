import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';


interface Pokemon {
  name: {
    english: string;
  };
}
interface Image {
  image: string;
  name: string;
}

@Component({
  selector: 'ang-pokemon-mfe-pokemon-carousel',
  templateUrl: './pokemon-carousel.component.html',
  styleUrls: ['./pokemon-carousel.component.scss'],
})
export class PokemonCarouselComponent implements OnInit {
  images: Image[] = [];
  poke_name:string[];

  //https://stackoverflow.com/questions/31131490/how-to-subscribe-to-an-event-on-a-service-in-angular2
  //Emmit from child and get child emmit from parent using component reference
  @Output() results:EventEmitter<any>=new EventEmitter<any>();
  @Input() 
  get search(){
    return this._search;
  }
  set search(value:string){
    this._search=value;
    console.log("remote set search called")
    this.fetchNfilter(value);

  }
  private _search = '';

  fetchNfilter(search_val:string):void{
    console.log("remote running")
    fetch(
      'https://raw.githubusercontent.com/jherr/fower-pokemon-vue/master/public/pokemon.json'
    )
      .then((resp) => resp.json())
      .then((data) => {
        this.images = data
          .map((p: Pokemon) => ({
            image: `https://raw.githubusercontent.com/jherr/fower-pokemon-vue/master/public/pokemon/${p.name.english.toLowerCase()}.jpg`,
            name: p.name.english,
          }))
          .filter((p: Image) => p.name.toLowerCase().indexOf(search_val) > -1)
          .slice(0, 10);
          this.poke_name=this.images.map((im:Image)=>{return im.name})
          this.results.emit(this.poke_name)
      });
  }

  ngOnInit(): void {
    console.log("remote running onInitalise", this._search)
    this.fetchNfilter(this._search)
  }
  
}
