export default function Start(props){
    return(
        <section className="quiz-intro-view">
            <h1 className="game-title">Quizzical</h1>
            <h2 className="game-description">Get ready for some questions</h2>
            <button onClick={props.startGame} className="start-game-btn">Start quiz</button>
        </section>
    )
}