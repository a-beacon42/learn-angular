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
  protected readonly expandedIds = signal<Set<number>>(new Set());
  protected readonly items = signal<ExerciseItem[]>([
    { id: 1, label: 'Pancakes', tag: 'Breakfast', done: false },
    { id: 2, label: 'Tomato Soup', tag: 'Lunch', done: false },
    { id: 3, label: 'Lemon Pasta', tag: 'Dinner', done: true },
    { id: 4, label: 'Granola Bowl', tag: 'Breakfast', done: false },
  ]);

  protected readonly filteredItems = computed(() => {
    const q = this.query();

    // BUG: empty query should return all items, but returns empty list.
    if (!q) {
      return this.items();
    }

    return this.items().filter((item) => item.label.includes(q));
  });

  protected toggleDone(itemId: number): void {
    const found = this.items().find((item) => item.id === itemId);

    // BUG: direct mutation can create stale UI state in more complex flows.
    if (found) {
      const updatedItem = { ...found, done: !found.done };
      const updatedItems = this.items().map((item) =>
        item.id === itemId ? updatedItem : item
      );
      this.items.set(updatedItems);
    }
  }

  protected toggleExpanded(itemId: number): void {
    const current = new Set(this.expandedIds());
    if (current.has(itemId)) {
      current.delete(itemId);
    } else {
      current.add(itemId);
    }
    this.expandedIds.set(current);
  }
  protected isExpanded(itemId: number): boolean {
    return this.expandedIds().has(itemId);
  }
}
