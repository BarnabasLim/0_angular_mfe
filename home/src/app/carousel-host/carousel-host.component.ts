import {
  Component,
  OnInit,
  OnChanges,
  ViewContainerRef,
  ComponentRef,
  SimpleChanges,
  ViewChild,
  Input,
  EventEmitter
} from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';


@Component({
  selector: 'ang-pokemon-mfe-carousel-host',
  templateUrl: './carousel-host.component.html',
  styleUrls: ['./carousel-host.component.scss'],
})
export class CarouselHostComponent implements OnInit,OnChanges {

  ref: ComponentRef<{search: string; images:[];__ngContext__:any; results:EventEmitter<any>}>;
  P_comp:any;
  pokemon_names:string[];

  @ViewChild('placeHolder',{read:ViewContainerRef})
  viewContainer!: ViewContainerRef;

  @Input() search_val='';

  constructor() {}

  async ngOnInit() {
    this.load()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.ref){
      this.ref.instance.search=changes.search_val.currentValue
    }
    console.log(changes.search_val.currentValue)
  }
  //https://stackoverflow.com/questions/31131490/how-to-subscribe-to-an-event-on-a-service-in-angular2
  async load(): Promise<void>{
    const m=await loadRemoteModule({
      type:'module',
      remoteEntry:'http://localhost:4203/remoteEntry.js',
      exposedModule:'./CarouselComponent'
    })
    this.ref=this.viewContainer.createComponent(m.PokemonCarouselComponent);
    this.ref.instance.search='p'
    this.ref?.instance.results.subscribe((pokemon_names:string[])=>{this.pokemon_names=pokemon_names})
  }
}
