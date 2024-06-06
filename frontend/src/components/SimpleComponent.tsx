import { useState } from "react";
import { helloApiAdd } from "../../api/generated-api"
import { useCookies } from 'react-cookie'

const [result, setResult] = useState([]);


const SimpleComponent = () =>{
    return(
        <div>
            <h3>Add API call</h3>
            <form action="/action_page.php">
                <input type="text" name="x" />
                <input type="text" name="y" />
                <button type="submit">=</button>
            </form>
        </div>
    )
}

async function fetchAdd(x: number, y: number) {
    const [cookies] = useCookies(['csrftoken'])
    const response = await fetch('/api/hello/add', {
        method: "POST",
        headers: { 'X-CSRFToken': cookies.csrftoken},
        body: JSON.stringify({x: x, y:y})
    }).then(res => res.json())

}

export default SimpleComponent