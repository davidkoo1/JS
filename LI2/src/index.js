import { getRandomActivity } from './activity.js';

/**
 * Function get data from getRandomActivity() './activity.js'.
 * Update Html id element @activity in index.html
 */
function updateActivity() {
  const element = document.getElementById("activity");

  setTimeout(async () => {
    try {
      element.textContent = await getRandomActivity();
    } catch (error) {
      console.error("Ошибка при вызове getRandomActivity():", error);
    }

    updateActivity();
  }, 1000);
}


updateActivity();
