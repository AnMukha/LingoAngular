import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Scenario, ScenariosService } from '../../services/scenarios.service';

@Component({
  selector: 'app-new-lesson',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-lesson.component.html',
  styleUrl: './new-lesson.component.css'
})
export class NewLessonComponent {

  constructor(public scenariosService: ScenariosService) { 

  }

  public selectedScenario: Scenario | null = null;

  scenarioClicked(scenario: Scenario) {
    this.selectedScenario = scenario;
  }

}
