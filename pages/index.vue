<script setup lang="ts">
import { cardQuantity, emojiCategories } from '~/constants'

const { category, cardsQuantity } = useGameConf()

const startGame = async () => {
    return navigateTo('game')
}
</script>

<template>
    <section class="flex flex-col gap-5 items-center">
        <h1 class="uppercase text-4xl text-amber-200">memory</h1>
        <div>
            <h3 class="text-white">
                Customize game by selecting emoji group and number of memory cards
            </h3>
            <div class="mt-4 p-4 bg-blue-200 rounded-md">
                <p class="font-semibold mb-2">Select category</p>
                <USelect v-model="category" :options="[...emojiCategories]" />
                <p class="font-semibold mt-5 mb-2">Select a number of cards</p>
                <USelect
                    v-model="cardsQuantity"
                    :options="[...cardQuantity]"
                    @update:model-value="(val) => (cardsQuantity = Number(val))"
                />
                <div class="flex justify-center mt-4 mb-2">
                    <UButton @click="startGame" color="black"> Start a game</UButton>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped></style>
