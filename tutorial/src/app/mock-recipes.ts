import { RecipeModel } from './models';

export const MOCK_RECIPES: RecipeModel[] = [
    {
        id: 'arg08ajg',
        name: 'Spaghetti Carbonara',
        description: 'A classic Italian pasta dish.',
        imgUrl: 'https://via.placeholder.com/300x200.png?text=Spaghettic+Carbonara',
        ingredients: [
            { name: 'Spaghetti', quantity: 200, unit: 'g' },
            { name: 'Guanciale', quantity: 100, unit: 'g' },
            { name: 'Egg Yolks', quantity: 4, unit: 'each' },
            { name: 'Pecorino Romano Cheese', quantity: 50, unit: 'g' },
            { name: 'Black Pepper', quantity: 1, unit: 'tsp' },
        ],
    },
    {
        id: 'asr089agn',
        name: 'Caprese Salad',
        description: 'A simple and refreshing Italian salad.',
        imgUrl: 'https://via.placeholder.com/300x200.png?text=Caprese+Salad',
        ingredients: [
            { name: 'Tomatoes', quantity: 4, unit: 'each' },
            { name: 'Fresh Mozzarella', quantity: 200, unit: 'g' },
            { name: 'Fresh Basil', quantity: 1, unit: 'bunch' },
            { name: 'Extra Virgin Olive Oil', quantity: 2, unit: 'tbsp' },
        ],
    },
];