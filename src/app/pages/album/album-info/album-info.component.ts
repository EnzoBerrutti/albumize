import { Component, OnInit,} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fadeInOut } from 'src/app/animations/animations';

@Component({
  selector: 'app-album-info',
  templateUrl: './album-info.component.html',
  styleUrls: ['./album-info.component.css'],
  animations: [fadeInOut]
})
export class AlbumInfoComponent implements OnInit{

  showButtons:boolean = false;

  async ngOnInit() {

    setTimeout(() => {
      this.showButtons = true;
    }, 430);
  }
}
