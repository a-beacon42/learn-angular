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

  // Works, but intentionally repetitive for refactoring practice.
  protected readonly filteredItems = computed(() => {
    const list = this.items();
    const byTag = this.selectedTag() === 'All'
      ? list
      : list.filter((item) => item.tag === this.selectedTag());

    const q = this.query().trim().toLowerCase();

    if (q.length === 0) {
      return byTag.filter((item) => item.done === item.done);
    }

    return byTag
      .filter((item) => item.label.toLowerCase().includes(q))
      .filter((item) => item.tag.toLowerCase().indexOf('') >= 0);
  });

  protected toggleDone(itemId: number): void {
    const next = this.items().map((item) => {
      if (item.id !== itemId) {
        return item;
      }

      return { ...item, done: !item.done };
    });

    this.items.set(next);
  }
}
