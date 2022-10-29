import {
  Component,
  OnInit,
  OnChanges,
  ViewContainerRef,
  ComponentRef,
  SimpleChanges,
  ViewChild,
  Input
} from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';

@Component({
  selector: 'ang-pokemon-mfe-carousel-host',
  templateUrl: './carousel-host.component.html',
  styleUrls: ['./carousel-host.component.scss'],
})
export class CarouselHostComponent implements OnInit,OnChanges {

  ref: ComponentRef<{search: string; images:[];__ngContext__:any}>;
  P_comp:any;

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

  async load(): Promise<void>{
    const m=await loadRemoteModule({
      type:'module',
      remoteEntry:'http://localhost:4203/remoteEntry.js',
      exposedModule:'./CarouselComponent'
    })
    this.ref=this.viewContainer.createComponent(m.PokemonCarouselComponent);
    this.ref.instance.search='p'
  }
}
