export default function Result(props){
    return(
        <>
        <p className="result-paragraph">You're result is {props.rightAnswers}/5</p>
        <button onClick={props.handleNewGame} className="new-game-btn">New game</button> 
        </>
    )
}