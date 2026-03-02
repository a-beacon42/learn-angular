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
  protected readonly moduleTitle = 'Module 2: Signals, input(), output(), derived state';
  protected readonly query = signal('');
  protected readonly selectedTag = signal('All');
  protected readonly expanded = signal(false); // BUG: shared state expands all rows.
  protected readonly items = signal<ExerciseItem[]>([
    { id: 1, label: 'Dark mode', tag: 'Preferences', done: false },
    { id: 2, label: 'Email notifications', tag: 'Notifications', done: true },
    { id: 3, label: 'Weekly summary', tag: 'Notifications', done: false },
    { id: 4, label: 'Compact layout', tag: 'Preferences', done: false },
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
