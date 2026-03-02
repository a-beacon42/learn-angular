import { Component, computed, signal } from '@angular/core';

type ExerciseItem = {
  id: number;
  label: string;
  tag: string;
  done: boolean;
};

@Component({
  selector: 'app-exercise',
  standalone: true,
  templateUrl: './exercise.component.html',
})
export class ExerciseComponent {
  protected readonly moduleTitle = 'Module 1: Components, templates, control flow';
  protected readonly query = signal('');
  protected readonly selectedTag = signal('All');
  protected readonly items = signal<ExerciseItem[]>([
    { id: 1, label: 'Pancakes', tag: 'Breakfast', done: false },
    { id: 2, label: 'Tomato Soup', tag: 'Lunch', done: false },
    { id: 3, label: 'Lemon Pasta', tag: 'Dinner', done: true },
    { id: 4, label: 'Granola Bowl', tag: 'Breakfast', done: false },
  ]);

  protected readonly filteredItems = computed(() => {
    // TODO: combine query + tag filtering for this module.
    return this.items();
  });

  protected toggleDone(itemId: number): void {
    // TODO: implement immutable state update.
    void itemId;
  }
}
