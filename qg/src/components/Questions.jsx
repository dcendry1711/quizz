import { decode } from 'html-entities'

export default function Questions(props){

    const questionsEl = props.question.map(obj => {

        const decodeQuestion = decode(obj.question)
        
        return(
            <div key={decodeQuestion} className="single-question">

                <h2 className="question-header">{decodeQuestion}</h2>

                <div className="possible-answers-container">

                    {obj.allAnswers.map((ans,index) => {
                        const decodeAnswers = decode(ans)
                        return(
                            <button key={index} className="ans-button">{decodeAnswers}</button>
                        )
                    })}

                </div>

            </div>
        )
    })

    return(
        <section className="questions-container">
            {questionsEl}
        </section>
    )
}