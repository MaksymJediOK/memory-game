import type { EmojiCategory } from '~/types'

export const useGameConf = () => {
    const category = useState<EmojiCategory>('category', () => 'animals-and-nature')
    const cardsQuantity = useState<number>('cards', () => 20)

    return {
        category,
        cardsQuantity,
    }
}
