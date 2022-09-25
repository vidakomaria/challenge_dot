import "./Login.css"
import { Button, FormLabel, Input } from '@chakra-ui/react'
import { useState } from "react"
import useChallengeStore from "../store/challengeStore"
import Challenges from "./Challenges"

export default function Login (){
    const [ formLogin, setFormLogin ] = useState({})
    const [ login, setLogin ] = useState(false)

    const {addAccount, prevChallenge, removeAccount} = useChallengeStore()

    const handleOnChange = (e) =>{
        const { name,value } = e.target
        setFormLogin((prev) => ({
            ...prev,
            [name]:value,
        }))
    }
    const onSubmitBtn = ()=>{
        removeAccount()
        addAccount(formLogin)
        setLogin(true)
    }

    return(
        <>
        {login?
        <Challenges/>
        :
        <div className="cont">
            <div className="cont-login">
                <h1>Challenge</h1>
                <div className="prev">
                    <div className="title">Previous Results</div>
                    <div className="detail">
                        <div className="sub-detail">
                            <div>Username</div>
                            <div>:</div>
                            <div>{prevChallenge.username}</div>
                        </div>
                        <div className="sub-detail">
                            <div>Score</div>
                            <div>:</div>
                            <div>{prevChallenge.score}</div>
                        </div>
                    </div>
                </div> 
                <div className="form">
                    <form onSubmit={onSubmitBtn}>
                        <div className="input">
                            <FormLabel>Username</FormLabel>
                            <Input
                            name="username"
                            value={formLogin.username ? formLogin.username : ''}
                            type='text'
                            onChange={handleOnChange}
                            required
                            />
                        </div>
                        {/* <div className="input">
                            <FormLabel>Password</FormLabel>
                            <Input
                            name="password"
                            type='password'
                            onChange={handleOnChange}
                            />
                        </div> */}

                        <Button colorScheme='blue'
                        type='submit'
                        >Start</Button>
                    </form>
                </div>
            </div>
        </div>
        }
        </>
    )
}