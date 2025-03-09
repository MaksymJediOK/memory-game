export const emojiCategories = [
    'smileys-and-people',
    'animals-and-nature',
    'food-and-drink',
    'travel-and-places',
    'activities',
    'objects',
    'symbols',
    'flags',
] as const

export const cardQuantity = [10, 20, 40, 50]

export const getGrid = (num: number) => {
    switch (num) {
        case 10:
            return 'grid-layout-9'
        case 20:
            return 'grid-layout-20'
        case 40:
            return 'grid-layout-40'
        case 50:
            return 'grid-layout-50'
        default:
            return 'grid-layout-20'
    }
}

export const timerOptions = [
    {
        value: 60,
        label: '1 minute',
    },
    {
        value: 120,
        label: '2 minutes',
    },
    {
        value: 180,
        label: '3 minutes',
    },
]
