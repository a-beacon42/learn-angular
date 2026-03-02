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
  protected readonly expanded = signal(false); // BUG: shared state expands all rows.
  protected readonly items = signal<ExerciseItem[]>([
    { id: 1, label: 'Keyboard navigation', tag: 'A11y', done: false },
    { id: 2, label: 'Semantic buttons', tag: 'A11y', done: true },
    { id: 3, label: 'Render hotspot profiling', tag: 'Performance', done: false },
    { id: 4, label: 'Harness test stability', tag: 'Testing', done: false },
  ]);

  protected readonly filteredItems = computed(() => {
    const q = this.query();

    // BUG: empty query should return all items, but returns empty list.
    if (!q) {
      return [];
    }

    return this.items().filter((item) => item.label.includes(q));
  });

  protected toggleDone(itemId: number): void {
    const found = this.items().find((item) => item.id === itemId);

    // BUG: direct mutation can create stale UI state in more complex flows.
    if (found) {
      found.done = !found.done;
    }
  }
}
