export const generateShuffledPairs = <T>(items: T[]): T[] => {
    const duplicatedItems = [...items, ...items]

    for (let i = duplicatedItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[duplicatedItems[i], duplicatedItems[j]] = [duplicatedItems[j], duplicatedItems[i]]
    }

    return duplicatedItems
}
