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
    return ['All', ...unique];
  })

  protected readonly filteredItems = computed(() => {
    const q: string = this.query().toLowerCase();
    const tag: string = this.selectedTag();

    return this.items().filter((item) => {
      const matchesQuery: boolean = item.label.toLowerCase().includes(q);
      const matchesTag: boolean = tag === 'All' || tag === item.tag;
      return matchesQuery && matchesTag;
    });
  });

  protected toggleDone(itemId: number): void {
    const updatedItems = this.items().map((item) => {
      return item.id === itemId ? { ...item, done: !item.done } : item
    });
    this.items.set(updatedItems);
  }

  protected selectTag(tag: string): void {
    this.selectedTag.set(tag);
  }
}
