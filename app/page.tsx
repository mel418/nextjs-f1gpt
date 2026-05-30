"use client"
import Image from "next/image"
import f1GPTLogo from "./assets/f1GPTLogo.png"
import { useChat } from "ai/react"
import { Message } from "ai"


const Home = () => {

    const noMessages = true

    return (
        <main>
            <Image src={f1GPTLogo} width="250" alt="F1 GPT Logo" />
            <section>
                {noMessages ? (
                    <>
                        <p className="starter-text">
                            The Ultimate place for Formula One super fans! Ask F1GPT anything about the fantastic topic of F1 racing and it will come back with the most up-to-date answers. We hope you enjoy!
                        </p>
                        <br/>
                        {/* <PromptSuggestionRow /> */}
                    </>
                ) : (
                    <></>
                )}
            </section>
        </main>
    )
}

export default Home