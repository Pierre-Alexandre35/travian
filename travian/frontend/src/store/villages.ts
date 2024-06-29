// store/villages.ts

import { defineStore } from 'pinia';
import { getAllVillages } from '@/api/api';

interface Village {
  village_id: number;
  name: string;
  owner_id: number;
  position_id: number;
  population: number;
}

interface VillagesState {
  villages: Village[];
}

export const useVillagesStore = defineStore('villages', {
  state: (): VillagesState => ({
    villages: []
  }),
  actions: {
    async fetchVillages() {
      try {
        const data = await getAllVillages();
        this.villages = data.villages;
      } catch (error) {
        console.error('Failed to fetch villages:', error);
      }
    }
  }
});
