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
    <div class="box-header">
      <div>
        <h3 class="title">{{ title }}</h3>
        <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
      </div>
      <div>
        <h3 v-if="start && end" class="date">
          {{ start }} - {{ end }}
        </h3>
        <h3 v-else-if="start" class="date">
          {{ start }}
        </h3>
        <p v-if="location" class="location">
          {{ location }}
        </p>
      </div>
    </div>
    <div v-if="description" class="description" v-html="description"></div>
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

.box-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.box-header div {
  flex-direction: column;
  justify-content: flex-start;

}

.title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 0;
}

.subtitle {
  font-size: .9rem;
  font-weight: 400;
  margin: 0;
}

.date {
  text-align: right;
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 0;
}

.location {
  text-align: right;
  font-size: .9rem;
  font-weight: 400;
  margin: 0;
  padding: 0;
}

.description {
  padding-top: 1rem;
  font-size: .9rem;
  font-weight: 400;
  margin: 0;
}

:deep(.description ul) {
  margin-top: .3rem;
  padding-left: 1.2rem;
}

:deep(.description li) {
  margin-top: 0.2rem;
}

:deep(.description a) {
  font-weight: 400;
}
</style>
