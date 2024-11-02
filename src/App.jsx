import { useState } from 'react'
import './App.css'
import axios from 'axios';
import ReactMarkdown from "react-markdown";

const APIKEY = import.meta.env.VITE_API_KEY;

function App() {

const [query,setquery]= useState("")
const [answer,setanswer]=useState('')

const handlesetquery =(e)=>{
  let promt= e.target.value;
  setquery(promt);
}

async function generateresponse(){
  setanswer("loading")
    let response = await axios({
      url:`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${APIKEY}`,
      method:"post",
      data: {"contents":[{"parts":[{"text":`${query}`}]}]}      
    })
    let text= (response['data']['candidates'][0]['content']['parts'][0]['text']);
     setanswer(text);
  }
  return (

    <div className="bg-gradient-to-b from-teal-800 to-black min-h-screen main">
  <nav className="mt-10 border rounded-lg bg-gradient-to-l from-yellow-400 to-orange-300  shadow-lg mb-5">
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-center items-center h-12">
      <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-l from-teal-700 to-black tracking-wide">
        Welcome to Calm-Connect
      </h1>
    </div>
  </div>
</nav>
     <textarea value={query} onChange={handlesetquery}  className="block w-3/4 rounded-md border-0 py-1.5 pl-7 pr-20 resize-none overflow-y text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 mb-6" placeholder='Ask Anything To Me' style={{ minHeight: '40px', maxHeight: '200px' }}></textarea>
    
   <button onClick={generateresponse} className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1  font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 text-lg  hover:bg-green-400 hover:scale-80 transition-transform duration-50">Generate Response</button>
    {answer && (
     <div className= "bg-gray-100 p-5 rounded-lg shadow-lg w-3/4 mx-auto mt-4 text-right text-gray-800"  style={{textAlign: 'left'}}><ReactMarkdown className="overflow-auto hide-scrollbar">{answer}</ReactMarkdown></div>
    )}
     </div>
    
  )
};

export default App
