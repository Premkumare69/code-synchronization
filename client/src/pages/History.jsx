import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const History = () => {
    const navigate = useNavigate();

    const [codes, setCode] = useState([])

    useEffect(() => {
        getCode()
    }, [])

    async function getCode() {
        const userId = sessionStorage.getItem("user");
        await axios.get(`http://localhost:3000/code/user/${userId}`)
            .then((res) => {
                console.log(res.data);
                setCode(res.data)
            })
    }

    return (

        <div className="historyformWrapper">
            <img
                className="homePageLogo"
                src="./code-sync.png"
                alt="code-sync-logo"
            />
            <h2 className="historymainLabel">Collect Your Data Here</h2>
            <div className='history-results'>
                {codes.map((val) => (
                    <div className='history-box' key={val._id}>
                        <h1 className='date-store' >{val.date}</h1>
                        <div className='storage'>
                            <h1 className='code-store'>{val.code}</h1>
                        </div>
                    </div>
                ))}

            </div>


            <button className="btn backBtn" onClick={() => navigate("/home")}>
                Back
            </button>
        </div>



    );
};

export default History;
