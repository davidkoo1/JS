/**
 * Function to get a random activity from random word API.
 * @returns {Promise<string>} A promise that returns a string with random word - activity.
 */
export async function getRandomActivity() {
  try {

    const response = await fetch('https://random-word-api.herokuapp.com/word');
    
    if (!response.ok) {
      return `Ошибка HTTP: ${response.status}`;
    }

    return await response.json();

  } catch (error) {
    return 'К сожалению, произошла ошибка';
  }
}
