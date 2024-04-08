import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Scenario, ScenarioOptions, ScenariosService } from '../../services/scenarios.service';
import { Router } from '@angular/router';
import { LessonProgressService } from '../../services/lesson-progress.service';

@Component({
  selector: 'app-new-lesson',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-lesson.component.html',
  styleUrl: './new-lesson.component.css'
})
export class NewLessonComponent {

  constructor(public scenariosService: ScenariosService, private router: Router, private progressService: LessonProgressService) { 

  }

  public selectedScenario: Scenario | null = null;

  scenarioClicked(scenario: Scenario) {
    this.selectedScenario = scenario;
  }

  public async startLesson() {
    if (this.selectedScenario) {
      const scenarioOptions: ScenarioOptions = {scenarioId: this.selectedScenario.id, aIMode: null};
      const  newLessonid = await this.scenariosService.createLesson(scenarioOptions);      
      this.router.navigate([`/lessons/${newLessonid}`]);
    }
  }

}
