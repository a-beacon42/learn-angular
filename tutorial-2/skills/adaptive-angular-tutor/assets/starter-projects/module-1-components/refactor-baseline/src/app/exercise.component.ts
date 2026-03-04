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

  protected readonly tags = computed(() => {
    const unique = new Set(this.items().map((item) => item.tag));
    return ['All', ...unique]
  });

  // Works, but intentionally repetitive for refactoring practice.
  protected readonly filteredItems = computed(() => {
    const allItems = this.items();
    const filteredByTag = this.selectedTag() === 'All'
      ? allItems
      : allItems.filter((item) => item.tag === this.selectedTag());

    const q = this.query().trim().toLowerCase();

    if (q) {
      return filteredByTag.filter((item) => item.label.toLowerCase().includes(q));
    } else {
      return filteredByTag;
    }
  });


  protected toggleDone(itemId: number): void {
    const updatedItems = this.items().map((item) => {
      if (item.id !== itemId) {
        return item;
      }
      return { ...item, done: !item.done };
    });

    this.items.set(updatedItems);
  }

  protected selectTag(tag: string): void {
    this.selectedTag.set(tag);
  }
}
