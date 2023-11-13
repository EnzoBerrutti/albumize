import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonVariablesService {

  selectedSortOption = new EventEmitter<string>()
  
  constructor() { }


}
