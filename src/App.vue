<script setup lang="ts">
import AboutSection from '@/components/AboutSection.vue'
import AiBand from '@/components/AiBand.vue'
import ContactBand from '@/components/ContactBand.vue'
import HeroSection from '@/components/HeroSection.vue'
import LegalDialog from '@/components/LegalDialog.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import TimelineSection from '@/components/TimelineSection.vue'
import { useLanguage } from '@/composables/useLanguage'

const { lang, t } = useLanguage()
</script>

<template>
  <div class="page-shell">
    <SiteHeader />
    <main>
      <HeroSection id="profil" />
      <AboutSection />
      <AiBand />
      <TimelineSection id="werdegang" :lang="lang" />
      <SkillsSection id="skills" />
      <ContactBand id="kontakt" />
    </main>
    <SiteFooter :legal="t.legal" />
    <LegalDialog />
  </div>
</template>

<style scoped>
.page-shell {
  width: var(--shell-width);
  margin: 32px auto;
  background: var(--page-card);
  border-radius: var(--radius-shell);
  box-shadow: var(--shadow-shell);
  overflow: hidden;
}
</style>
