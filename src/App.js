import './App.css';

import { motion } from "framer-motion"

import { useState, useEffect } from 'react';

import rock from "./content/icons8-hand-rock-100.png"
import paper from "./content/icons8-hand-side-view-100.png"
import scissors from "./content/icons8-hand-scissors-100.png"

import frock from "./content/flipped rock.png"
import fpaper from "./content/flipped paper.png"
import fscissors from "./content/flipped scissors.png"

function App() {

  const [wins,setWins] = useState(0);
  const [losses,setLosses] = useState(0);
  const [ties,setTies] = useState(0);
  const [running,setRunning] = useState(false);
  const [player,setPlayer] = useState(rock);
  const [cplayer,setCplayer] = useState(rock);
  const [com,setCom] = useState(frock);
  const [ccom,setCcom] = useState(frock);
  const [current,setCurrent] = useState('')
 
  const [annOpen,setAnnOpen] = useState(false);


  const variants1 = {
    jumping1:{y:[0,0,0,-60,0,-90,0,-120,0,0],
              x:[0,200,200,200,0,0,0,0,0],
              scale:[1,2,2,2,1,1,1,1,1],
              rotate:[0,20,20,20,0,0,0,0,0]},
    jumping2:{y:[0,0,0,-60,0,-90,0,-120,0,0],
              x:[0,-200,-200,-200,0,0,0,0,0],
              scale:[1,2,2,2,1,1,1,1,1],
              rotate:[0,20,20,20,0,0,0,0,0]},
    stopped:{y:0}
  }





  function play(){
    if(running){}else{
      setRunning(true);

      complay();

      setTimeout(() =>{
        setRunning(false);
        setCcom(frock);
        setCplayer(rock);
        setAnnOpen(false);
      },6000);
    }
  }


  function complay(){

    const num1 = Math.random() * 100;
    console.log(num1);

    if(num1<=33){
      setCom(frock);
    }else if(num1>33 && num1<=66){
      setCom(fpaper)
    }else{
      setCom(fscissors)
    }
    
  }

  function results(){
      if((player===rock && com===frock) ||(player === paper && com===fpaper) || (player===scissors && com===fscissors)){
        setTies(ties +1);
        setCurrent('tie')
        setAnnOpen(true);
      }else if((player===rock && com===fscissors) || (player===paper && com===frock) || (player===scissors && com===fpaper)){
        setWins(wins+1);
        setCurrent('win')
        setAnnOpen(true);
      }else{
        setLosses(losses+1);
        setCurrent('loss')
        setAnnOpen(true);
      }
  }
  
  useEffect(() =>{
    if(running){
      setTimeout(() =>{
        setCplayer(player);
        setCcom(com);
        results();
      },2400)
    }

  },[running])

  useEffect(() =>{
    console.log('hello there');
  },[])

  return (
<div className='lg:h-screen w-screen bg-slate-100 pb-8 lg:pb-0 overflow-hidden'>

<div> 

<div className='flex flex-col lg:flex-row justify-between'>

<div className=' p-4'>
  <div>wins: {wins}</div>
  <div>losses: {losses}</div>
  <div>ties: {ties}</div><br></br>
  <div>reload page to reset</div>
</div>


<div className='flex justify-center py-4'>

    <motion.a   
    whileHover={{ scale: 1.2 }}
    onClick={() =>setPlayer(rock)}
    className='border-2 rounded-md mx-6 place-content-center bg-slate-300'><img alt='hand rock icon by icons8.com' src={rock}></img></motion.a>

    <motion.a   
    whileHover={{ scale: 1.2 }}
    onClick={() =>setPlayer(paper)}
    className='border-2 rounded-md mx-6 place-content-center bg-slate-300'><img alt='hand side icon by icons8.com' src={paper}></img></motion.a>

    <motion.a   
    whileHover={{ scale: 1.2 }}
    onClick={() =>setPlayer(scissors)}
    className='border-2 rounded-md mx-6 place-content-center bg-slate-300'><img alt='hand scissors icon by icons8.com' src={scissors}></img></motion.a>

</div>

<div className='text-center m-4 border-2 rounded-md bg-slate-200 flex flex-col justify-center w-1/3 lg:w-auto'>
  selected
  <img src={player} alt='Icons by Icons8.com' className='m-auto w-[80%]' ></img>
</div>

</div> 

<div className='text-center text-2xl'> choose rock, paper or Scissors!</div>



<div className='flex justify-center'> <button className='m-4 p-2 rounded-md border-2 text-xl bg-yellow-300' onClick={() =>play()}>SHOOT!</button> </div>

<div className='md:ml-10 md:mr-10 flex justify-around'>

<motion.div
    variants = {variants1}
    animate={running ? 'jumping1' : 'stopped'}
    transition={{duration:2.5}}
    className='w-[40%] md:w-auto p-4 m-4 max-w-1/2 bg-slate-400  border-2 rounded-md text-center text-xl'><img src={cplayer} alt='icon by Icons8.com'></img>player</motion.div>

<motion.div 
    variants = {variants1}
    animate={running ? 'jumping2' : 'stopped'}
    transition={{duration:2.5}}
    className='w-[40%] md:w-auto p-4 m-4 max-w-1/2 bg-slate-400  border-2 rounded-md text-center text-xl'><img src={ccom} alt='icon by Icons8.com'></img>computer</motion.div>

</div>

</div>

{annOpen && <Announce current={current} />}


<div className='absolute lg:fixed bottom-0 right-0 border-2 border-black'>
    Icons from <a href='https://www.icons8.com' className='font-bold' target="_blank" rel='noreferrer'>Icons8.com</a>
</div>

</div>
  );
}


function Announce(props){



  if(props.current==='tie'){
    const variants2 = {
      inital:{x:-470,opacity:0},
      tie:{x:[-270,0,0,0,0,0,130],opacity:[0,1,1,1,0],rotate:[0,45,-45,45,0]},
      exit:{x:330,opacity:0}
    }
    return(
      <motion.div className='absolute p-4 top-1/2 left-1/2 text-8xl text-slate-500'
      variants={variants2}
      initial={'inital'}
      animate={'tie'}
      exit={'exit'}
      transition={{duration:3.6}}
      >
        tie
      </motion.div>
    );
  }else if(props.current==='win'){
    const variants2 = {
      inital:{x:-150,y:-550,opacity:0},
      tie:{x:-150,y:[-550,0,0,0,200,400],scale:[0,2,1,0],opacity:[0,1,1,1,0],rotate:[0,25,-25,25,0]},
      exit:{x:-150,y:400,opacity:0}
    }
    return(
      <motion.div className='absolute p-4 top-1/2 left-1/2 text-8xl text-green-600'
      variants={variants2}
      initial={'inital'}
      animate={'tie'}
      exit={'exit'}
      transition={{duration:3.6}}
      >
        you win!
      </motion.div>
    );

  }else{
    const variants2 = {
      inital:{x:-150,opacity:0,y:400},
      tie:{x:-150,opacity:[0,1,1,1,1,1,0],y:[400,0,0,0,50,50,50,100,100,100,150,150,150,400],rotate:[0,0,0,0,10,10,10,-10,-10,-10,10,10,10,-60]},
      exit:{x:-150,opacity:0,y:400}
    }
    return(
      <motion.div className='absolute p-4 top-1/2 left-1/2 text-8xl text-red-600'
      variants={variants2}
      initial={'inital'}
      animate={'tie'}
      exit={'exit'}
      transition={{duration:3.6}}
      >
        you lose!
      </motion.div>
    );

  }
}



export default App;