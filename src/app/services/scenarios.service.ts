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


  public async createLesson(scenarioOptions: ScenarioOptions): Promise<string> {
    return await firstValueFrom(this.http.post<string>('lessons', scenarioOptions));
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

export class ScenarioOptions {
  public scenarioId!: string;  
  public aIMode: string | null = null;
}




