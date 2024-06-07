import React, { useState } from "react";
import { helloApiAdd } from "../../api/generated-api"
import { useCookies } from 'react-cookie'



const SimpleComponent = () =>{
    const [result, setResult] = useState([])
    const [cookies] = useCookies(['csrftoken'])

    async function fetchAdd(x: number, y: number) {
        const response = await  fetch('/api/hello/add', {
            method: "POST",
            headers: { 'X-CSRFToken': cookies.csrftoken},
            body: JSON.stringify({x: x, y:y})
        })
        const data = await response.json()
        setResult(x +  " + " + y + " = " + data.result)
    }

    function sendForm(formData){
        fetchAdd(formData.get("x"), formData.get("y"))
    }



    return(
        <div>
            <h3>Add API call</h3>
            <form action={sendForm}>
                <input type="text" name="x" />
                <input type="text" name="y" />
                <button type="submit">=</button>
            </form>
            <div>
                Result: {result}
            </div>
        </div>
  )
}

export default SimpleComponent