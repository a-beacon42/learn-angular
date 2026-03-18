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
  protected readonly expandedIds = signal<Set<number>>(new Set());
  protected readonly items = signal<ExerciseItem[]>([
    { id: 1, label: 'Dark mode', tag: 'Preferences', done: false },
    { id: 2, label: 'Email notifications', tag: 'Notifications', done: true },
    { id: 3, label: 'Weekly summary', tag: 'Notifications', done: false },
    { id: 4, label: 'Compact layout', tag: 'Preferences', done: false },
  ]);

  protected readonly filteredItems = computed(() => {
    const q = this.query();

    if (!q) {
      return this.items();
    }

    return this.items().filter((item) => item.label.includes(q));
  });

  protected toggleDone(itemId: number): void {
    const found = this.items().find((item) => item.id === itemId);

    if (found) {
      const updated = this.items().map((item) => {
        if (item.id != found.id) {
          return item
        } else {
          return { ...item, done: !found.done }
        }
      })
      this.items.set(updated);
    }
  }

  protected updateExpanded(itemId: number): void {
    const current = new Set(this.expandedIds());
    current.has(itemId) ? current.delete(itemId) : current.add(itemId);
    this.expandedIds.set(current);
  }

  protected isExpanded(itemId: number): boolean {
    return this.expandedIds().has(itemId);
  }
}
