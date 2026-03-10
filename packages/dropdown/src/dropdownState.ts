import { ref } from "vue";

export const activeDropdown = ref<(() => void) | null>(null);
