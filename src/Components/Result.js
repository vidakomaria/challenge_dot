import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useChallengeStore from "../store/challengeStore";
import Challenges from "./Challenges";
import Login from "./Login";
import './Result.css'


export default function Result ({total}){

    const {account, correct, incorrect, addPrevChallenge, prevChallenge, removePrev} = useChallengeStore()
    const [ again, setAgain ] = useState(false)
    const [ restart, setRestart ] = useState(false)

    const detail = {
        correct : correct.length,
        incorrect : incorrect.length,
        notAnswer : total-(correct.length)-(incorrect.length),
        total : total,
        score : (correct.length)/total*100,
        username : account.username
    }

    // console.log(detail);
    useEffect(()=>{
        if(prevChallenge){
            removePrev()
            addPrevChallenge(detail)
        } else{
            addPrevChallenge(detail)
        }
    },[])

    return(
        <>
        {
            again?
            <Challenges/>
            :
            restart?
            <Login/>
            :
            <div className="cont-result">
                <div className="result">
                    <div className="player">
                        Hi {account.username}
                    </div>

                    <div className="detail">
                        <div className="sub-detail">Total Questions</div>
                        <div>:</div>
                        <div>{total}</div>
                    </div>
                    <div className="detail">
                        <div className="sub-detail">Correct Answer</div>
                        <div>:</div>
                        <div>{prevChallenge.correct}</div>
                    </div>
                    <div className="detail">
                        <div className="sub-detail">Incorrect Answer</div>
                        <div>:</div>
                        <div>{prevChallenge.incorrect}</div>
                    </div>
                    <div className="detail">
                        <div className="sub-detail">Not Answer</div>
                        <div>:</div>
                        <div>{prevChallenge.notAnswer}</div>
                    </div>
                    
                    <div className="score">
                        SCORE : {prevChallenge.score}
                    </div>

                    <div className="btn">
                        <Button colorScheme='teal'
                        onClick={()=>{setAgain(true)}}
                        >
                            Play Again
                        </Button>

                        <Button colorScheme='pink'
                        onClick={()=>{setRestart(true)}}
                        >
                            Restart
                        </Button>
                    </div>
                </div>
            </div>
        }
        </>
    )
}