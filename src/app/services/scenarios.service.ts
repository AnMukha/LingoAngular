import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScenariosService {

  public scenarios: Scenario[] = [];

  constructor(private http: HttpClient) {        
      firstValueFrom(this.http.get<Scenario[]>('scenarios')).then(data => {
          this.scenarios = data;        
      });
  }
}

export class Scenario {
  public id!: string;
  public title!: string;
  public description!: string;
  public scenarioType!: string;
  public content!: string;
  public aIMode!: string;
}




