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

                        const rightAnswer = ansIsChecked  && obj.correct_answer === ans
                        const wrongAnswer = ansIsChecked  && obj.correct_answer !== ans


                        function renderStyle(){
                            if(!props.showResult){
                                return null
                            } else if(props.showResult && rightAnswer){
                                return(
                                    {background: 'green'}
                                )
                            } else if(props.showResult && wrongAnswer){
                                return(
                                    {background: 'red'}
                                )
                            }
                        }
                        
                        return(
                            <button style={renderStyle()} onClick={() => props.saveAnswer(decodedAnswer)} key={index} className={clsx("ans-button", ansIsChecked && 'checked')}>{decodedAnswer}</button>
                        )

                    })}

                </div>

                {props.showResult && <p className="correct-answer-paragraph">Correct answer: {obj.correct_answer}</p>}

            </div>
        )
    })

    return(
        <section className="questions-container">
            {questionsEl}
        </section>
    )
}