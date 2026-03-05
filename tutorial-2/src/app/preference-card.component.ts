import { Component, input } from '@angular/core';
import { ExerciseItem } from './exercise.component';

@Component({
    selector: 'app-preference-card',
    standalone: true,
    templateUrl: './preference-card.component.html',
})
export class PreferenceCardComponent {
    item = input<ExerciseItem>();
}