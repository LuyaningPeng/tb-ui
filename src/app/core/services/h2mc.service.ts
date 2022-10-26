import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class H2mcService {

  constructor(private router: Router) { }

  denyAccess(): void{
    this.router.navigate(['/home'])
  }
}
