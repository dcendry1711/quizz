import { decode } from 'html-entities'
import { clsx } from 'clsx'

export default function Questions(props){

    const questionsEl = props.question.map(obj => {

        const decodeQuestion = decode(obj.question)
        
        return(
            <div key={decodeQuestion} className="single-question">

                <h2 className="question-header">{decodeQuestion}</h2>

                <div className="possible-answers-container">

                    {obj.allAnswers.map((ans,index) => {
                        const decodedAnswer = decode(ans)
                        const ansIsChecked = props.myAnswers.includes(ans)
                        return(
                            <button onClick={() => props.saveAnswer(decodedAnswer)} key={index} className={clsx("ans-button", ansIsChecked && 'checked')}>{decodedAnswer}</button>
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