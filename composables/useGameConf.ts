import type { EmojiCategory } from '~/types'

const timerBase = {
    timer: false,
    timeToPlay: 60,
}

export const useGameConf = () => {
    const category = useState<EmojiCategory>('category', () => 'animals-and-nature')
    const cardsQuantity = useState<number>('cards', () => 10)
    const timerData = useState<{ timer: boolean; timeToPlay: number }>('timer', () => timerBase)

    return {
        category,
        cardsQuantity,
        timerData
    }
}
