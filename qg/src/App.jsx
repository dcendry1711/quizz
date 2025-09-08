import { useEffect, useState } from "react"
import Questions from './components/Questions.jsx'

function App() {

  //state trzymający dane dot. pulla z API

  const [questionDb, setQuestionDb] = useState([])

  //useEffect, który wykonuje pull z Api z danymi dot. quizz'a, dodano po drodze funkcję rollAnswers w celu mieszania tablicy z dostępnymi odpowiedziami

  useEffect(()=>{
    fetch('https://opentdb.com/api.php?amount=5&difficulty=easy')
      .then(res => res.json())
      .then(data => setQuestionDb(data.results.map(qObj => {
        const allPosAns = rollAnswers([...qObj.incorrect_answers, qObj.correct_answer])
        return{
          ...qObj,
          allAnswers: allPosAns
        }
      })))
  },[questionDb])

  // funkcja mieszająca możliwe odpowiedzi do pytań

  function rollAnswers(arr){
    const copy = [...arr]
    for (let i = copy.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i+1));
      [copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy
  }

  return (
    <main>
        <Questions question={questionDb}/>
    </main>
  )
}

export default App


/*
Przegląd projektu
  1. Pull danych do quizzu z API (ZROBIONE)
  2. Zapis danych z API do state (ZROBIONE)
  3. Przerobienie obiektów spullowanych z API tak aby każdy miał tablicę ze wszystkimi możliwymi odpowiedziami (poprawna i niepoprawne) (ZROBIONE)
  4. Stworzenie funkcji mieszającej odpowiedzi w tablicy z pkt. 3 (ZROBIONE)
  5. Stworzyć component "Question" zawierający odpowiedzi na pytanie (ZROBIONE)
  6. Wyświetlić komponent "Questions" na froncie (ZROBIONE)
  7. obsłużyć dekodowanie pytań i odpowiedzi do quizu (ZROBIONE)
  8. wykonać podstawowe stylowanie
  9. Utworzyć ekran powitalny
  10. Wyświetlać ekran pytań (warunkowo) po naciśnięciu przycisku start na ekranie powitalnym
  11. Zapisać wybraną odpowiedź w osobnej strukturze
  12. Można wybrać tylko jedną odpowiedź
  13. Wybrana odpowiedź jest odpowiednio stylowana
  14. Po wybraniu odpowiedzi reszta przycisków jest blokowana
*/