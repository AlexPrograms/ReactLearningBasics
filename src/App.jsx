import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



const Card = ({title}) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`${title} has been liked: ${hasLiked}`);
  }, [hasLiked]);


 return(
 <div className='singleCard' onClick={() => setCount((prevState) => prevState + 1)}>
   <h2>{title} <br/> {count || null}</h2>
  <button onClick={() => setHasLiked(!hasLiked)} className='likeButton'> 
    {hasLiked ? 'Liked' : 'Like'}
  </button>
 </div>
 )
}

const App = () => {
  return (
    <div className='card-container'> 
      <Card title="Pirates of the Carribean" raiting={5} actors={[{name:'Actor'}]}/>
      <Card title="Avatar"/>
      <Card title="Flying Castle"/>
    </div>
  )
}

export default App
