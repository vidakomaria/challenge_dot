import create from "zustand"
import { devtools, persist } from "zustand/middleware"
import { produce } from "immer"

const useChallengeStore = create(persist(devtools(
    (set) => ({
        account : {},

        correct : [],

        incorrect : [],

        prevChallenge : {},

        addAccount : (user) => set(produce((state) => {
            state.account = user
        })),

        addCorrect : (item) => set(produce((state) => {
            state.correct.push(item)
        })),
        
        addIncorrect : (item) => set(produce((state) => {
            state.incorrect.push(item)
        })),

        addPrevChallenge : (detail) => set(produce((state) => {
            state.prevChallenge = detail
        })),

        removeChallenge : () => set(produce((state)=>{
            state.correct = [];
            state.incorrect = [];
        })),

        removeAccount : () => set(produce((state) => {
            state.account = {}
        })),
        
        removePrev : () => set(produce((state) => {
            state.prevChallenge = {}
        })),

    })
), {name:"challenge"}))

export default useChallengeStore;