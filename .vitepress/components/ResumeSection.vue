<script setup lang="ts">
import {defineProps} from "vue"
import ResumeItem from "./ResumeItem.vue";

export interface Resume {
  title: string
  subtitle?: string
  start?: string
  end?: string
  location?: string
  description?: string
}

const props = defineProps<{
  items: Resume[]
}>()
</script>

<template>
  <div class="items">
    <div v-for="item in items" :key="item.title" class="item">
      <ResumeItem :title="item.title"
                  :subtitle="item.subtitle"
                  :start="item.start"
                  :end="item.end"
                  :location="item.location"
                  :description="item.description"/>
    </div>
  </div>
</template>

<style scoped>

</style>
