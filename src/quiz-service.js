const API_URL = 'https://opentdb.com/api.php?amount=10';

export async function fetchQuizQuestions() {
  const res = await fetch(API_URL);
  const data = await res.json();

  if (data.response_code !== 0) {
    throw new Error('Failed to fetch quiz questions');
  }

  return data;
}
