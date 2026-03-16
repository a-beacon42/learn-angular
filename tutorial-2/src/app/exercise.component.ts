import { Component, computed, signal } from '@angular/core';
import { PreferenceCardComponent } from './preference-card.component';

export type ExerciseItem = {
  id: number;
  label: string;
  tag: string;
  done: boolean;
};

@Component({
  selector: 'app-exercise',
  standalone: true,
  templateUrl: './exercise.component.html',
  imports: [PreferenceCardComponent]
})
export class ExerciseComponent {
  protected readonly moduleTitle = 'Module 2: Signals, input(), output(), derived state';
  protected readonly query = signal('');
  protected readonly selectedTag = signal('All');
  protected readonly items = signal<ExerciseItem[]>([
    { id: 1, label: 'Dark mode', tag: 'Preferences', done: false },
    { id: 2, label: 'Email notifications', tag: 'Notifications', done: true },
    { id: 3, label: 'Weekly summary', tag: 'Notifications', done: false },
    { id: 4, label: 'Compact layout', tag: 'Preferences', done: false },
  ]);

  protected readonly tags = computed(() => {
    const unique = new Set(this.items().map((item) => item.tag));
    return ['All', ...unique]
  });

  protected readonly filteredItems = computed(() => {
    const allItems = this.items();
    const filteredByTag = this.selectedTag() === 'All'
      ? allItems
      : allItems.filter((item) => item.tag === this.selectedTag());
    const q = this.query().trim().toLowerCase();

    if (q) {
      return filteredByTag.filter((item) => item.label.toLowerCase().includes(q))
    }
    return filteredByTag;
  });

  protected readonly summary = computed(() => {
    const total = this.items().length;
    const completed = this.items().filter((item) => item.done).length;
    return `${completed} of ${total} completed`
  })

  protected toggleDone(itemId: number): void {
    const updatedItems = this.items().map((item) => {
      if (item.id != itemId) {
        return item;
      } else {
        return { ...item, done: !item.done }
      }
    })
    this.items.set(updatedItems);
  }

  protected selectTag(tag: string): void {
    this.selectedTag.set(tag)
  }
}
