import React, {useState, useEffect} from 'react'
import axios from 'axios'


const App = () => {
   
    const [userData, setUserData] = useState([])
    
    const [index, setIndex] = useState(1)

    const getData = async () => {
        const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=10`)
       
        setUserData(response.data)

    }
   
    useEffect(()=>{
        getData()
    },[index])
    
    let printUserData = 
    <div className="flex items-center gap-4 justify-center">
        <span className="size-5 rounded-full border-blue-400 border-b-3 animate-spin "></span>
        <h1 className="text-gray-400 text-xl ">Loading...</h1>
    </div>

    if(userData.length>0){
        printUserData = userData.map(function(elem,idx){
            return (
                <div key={idx}>
                    <a href={elem.url}>
                        <div className="h-40 w-44 bg-white rounded-xl overflow-hidden">
                            <img className = "h-full object-cover w-full"src={elem.download_url} alt="" />
                        </div>
                        <h2 className="font-bold text-lg">{elem.author}</h2>
                    </a> 
                </div>
            )
        })
    }

    return(
        <div className="bg-gray-500 h-screen w-full text-white p-4 overflow-auto">
            <h1 className='fixed text-xl'>{index}</h1> 
            <div className="flex flex-wrap gap-4 justify-center items-center">
                {printUserData} 
            </div>

            <div className="flex justify-center items-center p-4 gap-4">
                <button
                    style={{ opacity: index == 1 ? 0.5 : 1 }}
                    className="bg-amber-400 text-black rounded px-4 py-2 font-semibold cursor-pointer active:scale-95"
                    onClick={()=>{
                        setUserData([])
                        if(index>1){
                            setIndex(index - 1)
                        }
                    }} 
                >Prev</button>
                <h4>Page {index}</h4>
                <button className="bg-amber-400 text-black rounded px-4 py-2 font-semibold cursor-pointer active:scale-95"

                    onClick={()=>{
                        setUserData([])
                        setIndex(index + 1)
                    }} 
                >Next</button>
            </div>
        </div>
    )
}

export default App
