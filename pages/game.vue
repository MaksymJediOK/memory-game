<script setup lang="ts">
import { getGrid } from '~/constants'
import type { Emoji } from '~/types'

const { category, cardsQuantity } = useGameConf()
const { data: emojis, status } = useAsyncData('emojis', async () => {
    const response: Emoji[] = await $fetch(`http://localhost:4000/api/all/category/${category.value}`)

    return response.slice(0, cardsQuantity.value / 2)
})

const isOpen = ref(false)
const gridLayout = computed(() => getGrid(cardsQuantity.value))
const pairs = ref<Emoji[]>([])
const openedCards = ref<{ emojiName: string; flipRef: any }[]>([])
const solvedCards = ref<string[]>([])
const handleFlip = (emojiName: string, flipRef: any) => {
    if (solvedCards.value.includes(emojiName)) return

    if (openedCards.value.length === 2) {
        const temp = openedCards.value[0].emojiName === openedCards.value[1].emojiName
        if (temp) {
            solvedCards.value.push(emojiName)
        } else {
            openedCards.value.forEach((card) => {
                card.flipRef.flipBack()
            })
        }
        openedCards.value = []
    }
    openedCards.value.push({ emojiName: emojiName, flipRef: flipRef })
}

watchEffect(() => {
    if (emojis.value) pairs.value = generateShuffledPairs(emojis.value)
})
watch(
    () => solvedCards.value.length,
    (newLength) => {
        if (newLength === cardsQuantity.value / 2) {
            isOpen.value = true
        }
    },
)
</script>

<template>
    <section class="flex flex-col items-center">
        <h1 class="uppercase text-4xl text-amber-200 mt-4">memory</h1>
        <div class="grid mt-8 gap-3" :class="gridLayout">
            <div v-if="status === 'pending'" class="text-white">Loading...</div>
            <EmojiCard
                v-else
                v-for="emoji in pairs"
                :key="emoji.name"
                :emoji-code="emoji.unicode[0]"
                @flip="handleFlip"
            />
        </div>
    </section>
    <UModal v-model="isOpen">
        <div class="p-4">
            <p>content</p>
        </div>
    </UModal>
</template>

<style scoped>
.grid-layout-9 {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    grid-template-rows: repeat(2, minmax(0, 1fr));
}
.grid-layout-20 {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    grid-template-rows: repeat(4, minmax(0, 1fr));
}
.grid-layout-40 {
    grid-template-columns: repeat(10, minmax(0, 1fr));
    grid-template-rows: repeat(4, minmax(0, 1fr));
}
.grid-layout-50 {
    grid-template-columns: repeat(10, minmax(0, 1fr));
    grid-template-rows: repeat(5, minmax(0, 1fr));
}
</style>
