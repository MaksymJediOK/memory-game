<script setup lang="ts">
import { getGrid } from '~/constants'
import type { Emoji } from '~/types'

const { category, cardsQuantity } = useGameConf()
const {
    data: emojis,
    status,
    error,
} = useAsyncData('emojis', async () => {
    const response: Emoji[] = await $fetch(`http://localhost:4000/api/all/category/${category.value}`)

    return response.slice(0, cardsQuantity.value / 2)
})

const gridLayout = computed(() => getGrid(cardsQuantity.value))

const pairs = ref<Emoji[]>([])

watchEffect(() => {
    if (emojis.value) {
        pairs.value = generateShuffledPairs(emojis.value)
    }
})

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
            />
        </div>
    </section>
</template>

<style scoped>
.grid-layout-9 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: repeat(3, minmax(0, 1fr));
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
