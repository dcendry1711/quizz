import { useEffect, useState } from "react"
import Questions from './components/Questions.jsx'
import Start from './components/Start.jsx'

function App() {

  //state monitorujący czy gra została rozpoczęta

  const [isGameStarted, setIsGameStarted] = useState(false)

  //state trzymający dane dot. pulla z API

  const [questionDb, setQuestionDb] = useState([])

  console.log(questionDb)

  //state przetrzymujący odpowiedzi z poszczególnych pytań

  const [myAnswers, setMyAnswers] = useState([])

  //state monitorujący wyświetlanie wyniku gry

  const [showResult, setShowResult] = useState(false)

  //zmienna licząca poprawne odpowiedzi

  const rightAnswers = questionDb.filter(obj => {
    return myAnswers.includes(obj.correct_answer)
  }).length

  //useEffect, który wykonuje pull z Api z danymi dot. quizz'a, dodano po drodze funkcję rollAnswers w celu mieszania tablicy z dostępnymi odpowiedziami

  useEffect(()=>{
    fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
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

  //funckja rozpoczynająca grę

  function startGame(){
    setIsGameStarted(true)
  }

  //funkcja zapisująca odpowiedź do tablicy

  function saveAnswer(answer){
    if(!myAnswers.includes(answer)){
    setMyAnswers(prevAnswers => [...prevAnswers, answer])
    }
  }

  //funkcja wyświetlająca wynik 

  function handleResult(){
    setShowResult(prevShowResult => !prevShowResult)
  }

  //funkcja rozpoczynająca nową grę

  function handleNewGame(){
    setIsGameStarted(false)
    setQuestionDb([])
    setMyAnswers([])
    setShowResult(false)
  }

  return (
    <main>
      {!isGameStarted && <Start startGame={startGame}/>}
      {isGameStarted &&<Questions question={questionDb} saveAnswer={saveAnswer} myAnswers={myAnswers}/>}
      {myAnswers.length === 5 && <button onClick={handleResult} disabled={showResult} className="result-btn">Check your result</button>}
      {showResult && <p className="result-paragraph">You're result is {rightAnswers}/5</p>}
      {showResult && <button onClick={handleNewGame} className="new-game-btn">New game</button> }
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
  8. wykonać podstawowe stylowanie (ZROBIONE)
  9. Utworzyć ekran powitalny (ZROBIONE)
  10. Wyświetlać ekran pytań (warunkowo) po naciśnięciu przycisku start na ekranie powitalnym (ZROBIONE)
  11. Zapisać wybraną odpowiedź w osobnej strukturze (ZROBIONE)
  12. Wybrana odpowiedź jest odpowiednio stylowana (ZROBIONE)
  13. Stworzenie zmiennej liczącej prawidłowe odpowiedzi (ZROBIONE)
  14. Gdy udzielono odpowiedzi na wszystkie pytania w quzie wyświetlamy przycisk sprawdzający odpowiedzi (ZROBIONE)
  15. Naciśnięcie przycisku uruchamia funkcję sprawdzającą odpowiedzi, funkcja zwraca mój wynik (ZROBIONE)
  16. Zwracam informację dot. wyniku w formie komunikatu na froncie (ZROBIONE)
  17. Gdy wynik jest zwrócony to umożliwiam rozpoczęcie nowej gry (odpowiedzi na nowe pytania) (ZROBIONE)
  18. Można wybrać tylko jedną odpowiedź (DO OGARNIĘCIA) !!!!!!!
  19. Gdy mamy podany wynik to zaznaczane są poprawne odpowiedzi (stylowanie kolorami dobre na zielono, a złe na czerwono)
  20. Zabezpieczenie na oczekiwanie na przetworzenie requesta z API (do zrobienia)
  21. Refaktor API tak aby dorobić potrzebne komponenty
*/