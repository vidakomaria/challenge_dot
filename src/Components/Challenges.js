import { Button } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import arrayShuffle from 'array-shuffle'
import './Challenges.css'
import axios from "axios"
import useChallengeStore from "../store/challengeStore"
import Result from "./Result"
// import './Timer'

export default function Challenges () {
    const [ questionList, setQuestionList ] = useState([])
    const [ nowQuestion, setNowQuestion ] = useState({})
    const [ submit, setSubmit ] = useState(false)
    const [ index, setIndex ] = useState(0)
    const [ chosen, setChosen ] = useState()
    const [ finish, setFinish ] = useState(false)

    const {addCorrect, addIncorrect, removeChallenge} = useChallengeStore()

    const endTime = new Date().getTime() + (1000 * 60 * 3)

    const loadQuestion = async () => {
        const questionData = await axios.get("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
        let data = []
        data = questionData.data.results
        if (questionData.data){
            setQuestionList(data)
            setNowQuestion({
                answer : arrayShuffle([...data[index].incorrect_answers, data[index].correct_answer]),
                question : data[index].question,
                correct : data[index].correct_answer
            })
            setIndex(index=>index+1)
            removeChallenge()
        }
    }

    const countdown = setInterval(function(){
        const now = new Date().getTime()
        const selisih = endTime - now
        if(selisih<0){
            clearInterval(countdown);
            endChallenge();
        }

        const menit = Math.floor(selisih % (1000 * 60 * 60) / (1000 * 60))
        const detik = Math.floor(selisih % (1000 * 60) / 1000)
        
        const timer = document.getElementById("view")

        if(timer){
            timer.innerHTML = `${menit} : ${detik}`
        }
    }, 1000)
    
    useEffect (()=>{
        if(questionList.length===0){
            loadQuestion();
        }
    },[])

    const nextQuestion = () =>{
        let item = {}
        item.question = nowQuestion.question
        item.correct_answer = nowQuestion.correct
        
        if(chosen && chosen == nowQuestion.correct){
            addCorrect(item)
            setChosen()
        } else if (chosen && chosen != nowQuestion.correct){
            item.chosen = chosen
            addIncorrect(item)
            setChosen()
        }

        if(questionList && index < questionList.length){
            setNowQuestion({
                answer : arrayShuffle([...questionList[index].incorrect_answers, questionList[index].correct_answer]),
                question : questionList[index].question,
                correct : questionList[index].correct_answer
            })
            setIndex(index=>index+=1)
        } 
        else{
            submitBtn()
        }
        
        if(index === questionList.length-1){
            setSubmit(true)
        }
    }

    const submitBtn = () =>{
        setFinish(true)
    }
    
    const endChallenge = () => {
        let item = {}
        item.question = nowQuestion.question
        item.correct_answer = nowQuestion.correct
        if(chosen && chosen == nowQuestion.correct){
            addCorrect(item)
            setChosen()
        } else if (chosen && chosen != nowQuestion.correct){
            item.chosen = chosen
            addIncorrect(item)
            setChosen()
        }

        setFinish(true)
    }

    return(
        <>
        {finish?
            <Result
            total = {questionList.length}
            />
        :
            <div className="cont-challenge">
                <div className="header">
                    <div>
                        QUESTION {index} of {questionList.length}
                    </div>
                    <div id="view"></div>
                </div>
                
                <div className="question">
                    {nowQuestion?.question}
                </div>

                <div className="choice">
                    {nowQuestion.answer?
                        nowQuestion.answer.map((item, idx) =>{
                            return(
                                <div key={idx} className="option">
                                    <Button
                                    onClick={()=>setChosen(item)}
                                    colorScheme={chosen==item?'green':'orange'}
                                    >
                                        {item}
                                    </Button>
                                </div>
                            )
                        })
                        :
                        <></>
                    }
                </div>

                <div className="next-btn">
                    <Button colorScheme='blue'
                    onClick={()=>nextQuestion()}
                    >
                        {submit?'Submit':'Next'}
                    </Button>
                </div>

            </div>        
        }
        </>
    )
}