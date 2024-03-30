import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatInputComponent } from "../../components/chat-input/chat-input.component";
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-lesson-main',
    standalone: true,
    templateUrl: './lesson-main.component.html',
    styleUrl: './lesson-main.component.css',
    imports: [ChatInputComponent]
})
export class LessonMainComponent  {  
  
  constructor(private http: HttpClient, private route: ActivatedRoute) {
    
  }

  @ViewChild(ChatInputComponent) input!: ChatInputComponent;

  async sumbitCurrent() {    
    var newText = this.input.getTextToFix();
    if (newText)
    {
      var fixedText = await firstValueFrom(this.http.post<string>("chats/dirtyCheck", { text: newText}));
      this.input.addFixedText(newText, fixedText);          
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      //this.lessonId = params.get('id');
      //this.getLessonDetails();
    });
  }

}
