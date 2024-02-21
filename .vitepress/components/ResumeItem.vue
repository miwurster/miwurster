<script setup lang="ts">
import {defineProps} from "vue"

const props = defineProps<{
  title: string
  subtitle?: string
  start?: string
  end?: string
  location?: string
  description?: string
}>()
</script>

<template>
  <div class="box">
    <h3 class="title">{{ title }}</h3>
    <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
    <p v-if="start && end" class="date">
      {{ start }} - {{ end }}
    </p>
    <p v-if="location" class="location">
      {{ location }}
    </p>
    <p v-if="description" class="description">
      {{ description }}
    </p>
  </div>
</template>

<style scoped>
p, div {
  margin: 0;
  line-height: 1.3rem;
}

.box {
  border: 1px solid #e1e9ee;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-top: 0;
}

.subtitle {
  font-size: .9rem;
  font-weight: 400;
  color: #333;
  margin: 0;
}

.date, .location {
  font-size: .9rem;
  font-weight: 400;
  color: #999;
  margin: 0;
  padding: 0;
}

.date p {
  margin: 0;
  padding: 0;
}

.description {
  font-size: .9rem;
  font-weight: 400;
  color: #666;
  margin: 0;
}
</style>
