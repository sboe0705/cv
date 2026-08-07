<script setup lang="ts">
import AboutSection from '@/components/AboutSection.vue'
import AiBand from '@/components/AiBand.vue'
import ContactBand from '@/components/ContactBand.vue'
import CvDocument from '@/components/CvDocument.vue'
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
  <!-- The printed document. Hidden on screen, and the only thing print.css
       shows on paper — the shell below is a screen layout. -->
  <CvDocument />

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
  /* At any viewport ≥ --shell-width this is exactly 1180px, i.e. the desktop
     layout unchanged. Below it the card goes fluid, which is what carries the
     901–1179px range — the tablet widths the 900px tier does not reach. */
  width: min(var(--shell-width), 100%);
  margin: 32px auto;
  background: var(--page-card);
  border-radius: var(--radius-shell);
  box-shadow: var(--shadow-shell);
  overflow: hidden;
}

@media screen and (max-width: 900px) {
  .page-shell {
    margin: 16px auto;
  }
}

/* On a phone the card's frame costs more than it gives: 16px of margin plus a
   28px radius eat into a 375px screen. Full bleed instead. */
@media screen and (max-width: 560px) {
  .page-shell {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
  }
}
</style>
