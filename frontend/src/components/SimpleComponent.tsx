import React, { useState } from "react";
import { helloApiAdd } from "../../api/generated-api"
import { useCookies } from 'react-cookie'
import { send } from "process";



const SimpleComponent = () =>{
    const [result, setResult] = useState([])

    function sendForm(formData){
        fetchAdd(formData.x, formData.y)
        console.log("ttt")
    }

    async function fetchAdd(x: number, y: number) {
        const [cookies] = useCookies(['csrftoken'])
        const response = await fetch('/api/hello/add', {
            method: "POST",
            headers: { 'X-CSRFToken': cookies.csrftoken},
            body: JSON.stringify({x: x, y:y})
        }).then(res => {
            const data = res.json()
            setResult(data.result)
        })
    }

    return(
        <div>
            <h3>Add API call</h3>
            <form action={sendForm}>
                <input type="text" name="x" />
                <input type="text" name="y" />
                <button type="submit">=</button>
            </form>
        </div>
    )
}


export default SimpleComponent