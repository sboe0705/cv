<script setup lang="ts">
import HobbiesCard from '@/components/HobbiesCard.vue'
import LanguagesCard from '@/components/LanguagesCard.vue'
import { useLanguage } from '@/composables/useLanguage'

const { t } = useLanguage()
</script>

<template>
  <section class="skills">
    <div class="skills-left">
      <div class="skills-card">
        <h2 class="skills-title">{{ t.skillsTitle }}</h2>
        <div class="skill-groups">
          <div v-for="group in t.skillGroups" :key="group.name">
            <p class="group-label">{{ group.name }}</p>
            <div class="group-items">
              <span v-for="item in group.items" :key="item" class="pill">{{ item }}</span>
            </div>
          </div>
        </div>
      </div>

      <HobbiesCard :title="t.hobbiesTitle" :hobbies="t.hobbies" :link="t.hobbyLink" />
    </div>

    <LanguagesCard :title="t.languagesTitle" :languages="t.languages" />
  </section>
</template>

<style scoped>
.skills {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 36px;
  align-items: start;
  padding: 44px var(--section-pad-x) 12px;
}

.skills-left {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.skills-card {
  padding: 32px 34px;
  background: var(--support-tint);
  border-radius: var(--radius-card);
}

.skills-title {
  margin-bottom: 22px;
  color: var(--accent-base);
  font-size: 15px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.skill-groups {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px 32px;
}

.group-label {
  margin-bottom: 10px;
  color: var(--accent-base);
  font-size: 10px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.group-items {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.pill {
  padding: 7px 12px;
  border: 1.5px solid var(--hairline-10);
  border-radius: var(--radius-pill);
  background: var(--page-card);
  font-size: 11.5px;
  font-weight: 600;
  line-height: 1;
}
</style>
