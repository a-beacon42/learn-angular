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
  protected readonly moduleTitle = 'Module 6: Accessibility, performance, and testing';
  protected readonly query = signal('');
  protected readonly selectedTag = signal('All');
  protected readonly items = signal<ExerciseItem[]>([
    { id: 1, label: 'Keyboard navigation', tag: 'A11y', done: false },
    { id: 2, label: 'Semantic buttons', tag: 'A11y', done: true },
    { id: 3, label: 'Render hotspot profiling', tag: 'Performance', done: false },
    { id: 4, label: 'Harness test stability', tag: 'Testing', done: false },
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
