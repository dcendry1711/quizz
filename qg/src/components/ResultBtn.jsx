export default function ResultBtn(props){
    return(
        <button onClick={props.handleResult} disabled={props.showResult} className="result-btn">Check your result</button>
    )
}