import { Routes } from '@angular/router';
import { StartPageComponent } from './views/start-page/start-page.component';
import { LessonMainComponent } from './views/lesson-main/lesson-main.component';
import { LoginComponent } from './views/login/login.component';
import { PaymentComponent } from './views/payment/payment.component';
import { ProgressMapComponent } from './views/progress-map/progress-map.component';
import { authGuard } from './services/auth.guard';
import { LessonsMainComponent } from './views/lessons-main/lessons-main.component';
import { PreviousLessonsComponent } from './components/previous-lessons/previous-lessons.component';
import { NewLessonComponent } from './components/new-lesson/new-lesson.component';

export const routes: Routes = [
    { path: '', redirectTo: 'main', pathMatch: 'full' },
    { path: 'main', component: StartPageComponent },
    { 
        path: 'lessons', component: LessonsMainComponent, canActivate: [authGuard],
        children: [
            { path: 'previous', component: PreviousLessonsComponent },
            { path: 'newLesson', component: NewLessonComponent }            
        ]
    },
    { path: 'lessons/:id', component: LessonMainComponent, canActivate: [authGuard] },    
    { path: 'progress', component: ProgressMapComponent, canActivate: [authGuard] },
    { path: 'payment', component: PaymentComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent }
];