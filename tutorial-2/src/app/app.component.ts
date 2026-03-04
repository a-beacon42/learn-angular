import { Component } from '@angular/core';
import { ExerciseComponent } from './exercise.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [ExerciseComponent],
    template: `<app-exercise />`,
})
export class AppComponent { }
