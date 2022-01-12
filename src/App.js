import logo from './logo.svg';
import './App.css';
// import {useState} from 'react';
import { useEffect, useState } from 'react';
import {Link,Route,Switch} from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import Filter1Icon from '@mui/icons-material/Filter1';




// const API="http://localhost:9000";
// const API="https://story03.herokuapp.com";
const API="https://kids-app03.herokuapp.com";
function App() {
  
  return (
    // <ThemeProvider theme={theme}>
    <div className='App'> 
    <AppBar style={{minHeight:"1vh"}}>
    {/* <Paper elevation={4} style={{minHeight:"100vh"}}/> */}
    <Toolbar className='main-menu'>
   <Link to="/home">
     <p className="menu-link">
       <HomeIcon/>Home
       </p>
   </Link>
   <Link to="/stories">
     <p className="menu-link">Stories</p>
   </Link>
   <Link to="/numbers">
     <p className="menu-link"><Filter1Icon/>Numbers</p>
   </Link>
   <Link to="/rhymes">
     <p className="menu-link">Rhymes</p>
   </Link>
   </Toolbar>
     </AppBar>
   <Switch>
     <Route exact path="/home">
     <HomeList/>
     </Route>
     <Route path="/stories">
     <StoryList/>
     </Route>
     <Route path="/numbers">
     <Numbers/>
     </Route>
     <Route path="/rhymes">
     <Rhymeslist/>
     </Route>
   </Switch>
   {/* </Paper> */}
   </div>
      //    

  //  </ThemeProvider>
  );
}
function StoryList()
{
  const [stories,setStories]=useState([]);
  // const story=[
  //   {
  //     id:"01",
  //     name:"Ananse and the Pot of Wisdom",
  //     Image:"https://cdn.farfaria.com/uploads/story/cover_art/528a5b32c099387d30000001/0-Final-Cover-AnansiAndThePotOfWisdom-MMagnaye-EFerrer.jpg",
  //     Description:"Ananse and the Pot of Wisdom. Animated film of a West African folktale from Ghana, featuring Ananse the Spider, who received a special gift - the pot of wisdom - from Nyame, the god of heaven, but decided not to share it with anyone else. It was Ananse's own son who pointed out the error of his ways, which made Ananse dump the pot angrily, thereby losing all the wisdom, which spread all over the world. This story teaches us not to be greedy.",
  //   },
  //   {
  //     id:"02",
  //     name:"The Cheetah and the Lazy Hunter",
  //     Image:"data:image/jpeg;base64,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",
  //     Description:"The Cheetah and the Lazy Hunter. Animated film of a traditional Zulu story about a hunter who, rather than hunt with his strength, decided to steal some Cheetah cubs, which drew the ire of the village elders. Besides teaching us that stealing is not good, this story demonstrates that, even in the hunting and gathering society, there were norms and traditions of society that had to be followed; not doing so was dealt with by punishment.",
  //   },
  //   {
  //    id:"03",
  //    name:"The Fox and the Stork",
  //    Image:"https://images-na.ssl-images-amazon.com/images/I/81n9tBvKNEL.jpg",
  //    Description:"A long time ago, a stork and a fox were good friends.One fine day,the fox invited the stork to his home to have lunch together.Once the stork arrived at the fox's home,he saw that the table was set for lunch,and there were two plates of soup.The fox started eating,but the stork couldn't even taste his soup because his beak was so long and the plate was too shallow.The fox asked the stork,why arent you eating? Dont you like the soup? The Stork replied,Its good;i guess Im not too hungry.The poor stork left the foxs house sad and hungry.After a few days,the stork invited the fox to his house to have dinner.Once the fox arrived,he saw that the table was set and that two tall jugs filled with soup were waiting for them.Whats the problem,dear fox? Why arent you eating ?Dont you like the soup? the stork asked.But the fox did nt give any reply.He was angry that the stork served him soup in a very narrow jug that he could nt put his mouth in.And this time it was his turn to go hungry.",
  //   },
  //   {
  //    id:"04",
  //    name:"The Lion and the Mouse",
  //    Image:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1598572699i/55147675._UY2560_SS2560_.jpg",
  //    Description:"One Fine day in a forest,a lion lay asleep with his head resting on his paws.There came a timid little mouse,unexpectedly.In her dread and hastle to escape,she ran across the mighty lions nose.Woken from his sleep,the lion angrily laid his huge paw on the tiny mouse to kill her.Spare me! begged and cried the poor little mouse.Please release me and,someday,I will repay you for this deed.The lion was surprised to think that a tiny mouse could ever help him.But he was kind and finally let the mouse go.A few days later,the lion was suddenly caught in a net.He roared as he Struggled to free himself.The mouse who was some distance away recognised the voice.she hurried towards the roar and found the lion struggling in the net.She ran up to one of the ropes that bound him and gnawed at it.As the net was torn apart,the lion was free! The little mouse said,you laughed when i said i would repay you,but,even a mouse can help a lion.",
  //   },
  //   {
  //    id:"05",
  //    name:"Three Fishes",
  //    Image:"https://cdn2.momjunction.com/wp-content/uploads/2014/08/The-Story-Of-Three-Fishes-For-Your-Kids-To-Read.jpg",
  //    Description:"Once upon a time there lived three fishes in a lake.one of them was very wise he was very careful in his thought and another was intelligent and resourceful but the third fish always belived in fate.One day the wise fish was leaping about in the water he heard a fishermaN say Ho Ho ! This lake is full of good fish let us fish here tomorrow we can earn a lot of money Hearing this the wise fish went to the other two fish and told them what he heard he advice them to leave the place immediately.The intelligent fish was not ready to leave let the fisherman come i will find a way to escape.I cannot leave this place were i was born whatever happens is my fate.The wise fish left the place immediately.The next day the fisher man came and cast their net the two friends who did not leave the lake were caught in the net with many other fish.The intelligent fish pretended to be dead so the fisherman throw him out along with other dead fish.The third one who belived in fate kept jumping up and down.One of the fisherman saw himand struck him dead.",
  //   },   
  // ];

  // useEffect(()=>{
  // fetch(`${API}/stories`)
  // .then((stories)=>setStories(stories))
  // // .catch((err)=>{
  // //   history.push("/");
  // // });
  // console.log(stories);
  // },[]);


  useEffect(()=>{
       fetch(`${API}/stories`,{
         method:"GET",
       })
      .then((data)=>data.json())
      .then((mvs)=>setStories(mvs));
     }, []);

  return(
    <div>
      {/* {story.map((str)=>(
      <Story str={str}/>
      ))}   */}
      {stories.map((str)=>(
      <Story str={str}/>
      ))}    
    </div>
    );

}
function Story({str})
{
return(
<div className='story-container'>
{/* <h1>{str.id}</h1> */}
<Card>
  <CardContent>
  <h1 className='story-name'>{str.name}</h1>
  <img className="story-image" alt="masala" src={str.Image}/>
  {/* <button>Story</button> */}
  <p className="story-description">{str.Description}</p>
  </CardContent>
  </Card>
</div>
);
}
function Numbers()
{
 return(
<div className='num-container'>
<img className='num-chart' src="https://images-na.ssl-images-amazon.com/images/I/7135c5Wz8qL.jpg"/>
<div className='nums'>  
<h1>1-One</h1>
<h1>2-Two</h1>
<h1>3-Three</h1>
<h1>4-Four</h1>
<h1>5-Five</h1>
<h1>6-Six</h1>
<h1>7-Seven</h1>
<h1>8-Eight</h1>
<h1>9-Nine</h1>
<h1>10-Ten</h1>
</div>
</div>
 );
}
function HomeList()
{
  const[child,setChild]=useState([]);
  // const child=[
  //  {
  //   quote:"Play gives children a chance to practice what they are learning.",
  //   imagechild:"https://static.scientificamerican.com/sciam/cache/file/EA273955-FDD3-40DE-BE8C4E976D280B7F_source.jpg",
  //  },
  //  {
  //   quote:"Children have always learned and created places for themselves through play.",
  //   imagechild:"https://i.pinimg.com/236x/10/61/c9/1061c9f06ae6cfb4f7d7366d5a013610.jpg",
  //  },
  //  {
  //   quote:"Creative play is like a spring that bubbles up from deep within a child.",
  //   imagechild:"https://i.pinimg.com/564x/a8/16/9e/a8169e2c69d267ab0390922daab908cd.jpg",  
  //  },
  //  {
  //   quote:"If we want our kids to have happy, productive, moral lives, we must allow more time for play, not less.",
  //   imagechild:"https://i.pinimg.com/474x/25/8a/da/258adaeb2a1ef5aff064be6cc78adc9e.jpg", 
  //  },
  //  {
  //   quote:"A child who does not play is not a child, but the man who does not play has lost forever the child who lived in him.",
  //   imagechild:"https://i.pinimg.com/564x/a8/16/9e/a8169e2c69d267ab0390922daab908cd.jpg", 
  //  }
  // ];
  useEffect(()=>{
    fetch(`${API}/home`,{
      method:"GET",
    })
   .then((data)=>data.json())
   .then((mvs)=>setChild(mvs));
  }, []);
 return(
  // <div className='home'>
      <div className>
    {child.map((str)=>(
      <Quotes str={str}/>
      ))} 
    {/* <h1>"Play gives children a chance to practice what they are learning."</h1>
    <img className='child-image' src="https://static.scientificamerican.com/sciam/cache/file/EA273955-FDD3-40DE-BE8C4E976D280B7F_source.jpg" alt="children-image"/> */}
  </div>
 
  )}
  function Quotes({str})
  {
   return(
    // <Card sx={{ minWidth: 275 }}>
          <Card>
      <CardContent>
     <div className='home-container'>
     <Typography>
     <p>{str.quote}</p>
     </Typography>
  {/* <img className="child-image" alt="masala" src={str.imagechild}/> */}
  <CardMedia
  componenet ="img" className="child-image" alt="masala" image={str.imagechild}/>
     </div>
     </CardContent>
     </Card>
   )}

function Rhymeslist()
{
  const[rhymes,setRhymes]=useState([]);
//  const rhymes=[
//   {
//   rhymesname:"Baby Shark",
//   rhymesimage:"https://www.kedglobal.com/data/ked/image/2021/04/06/ked202104060017.jpg",
//   youtube:"https://www.youtube.com/embed/020g-0hhCAU",
//  },
//  {
//   rhymesname:"Baa Baa Black Sheep",
//   rhymesimage:"https://content.tinytap.it/C07A932B-7E01-4A27-B565-ADFBF358279A/coverImage813x610.png",
//   youtube:"https://www.youtube.com/embed/MR5XSOdjKMA", 
//  },
//  {
//   rhymesname:"Twinkle Twinkle Little Star",
//   rhymesimage:"https://images-na.ssl-images-amazon.com/images/I/71xsdqh1W1L._RI_.jpg",
//   youtube:"https://www.youtube.com/embed/n38kGst16sI",  
//  },
//  {
//   rhymesname:"Zoo Song",
//   rhymesimage:"https://i.ytimg.com/vi/6wOnCOSvCOM/maxresdefault.jpg",
//   youtube:"https://www.youtube.com/embed/Xm3AoLH7P4s", 
//  }
// ];

useEffect(()=>{
  fetch(`${API}/rhymes`,{
    method:"GET",
  })
 .then((data)=>data.json())
 .then((mvs)=>setRhymes(mvs));
}, []);

return(
  <div>
   {rhymes.map((str)=>(
     <Rhymes str={str}/>
   ))}
  </div>
 );
}
function Rhymes({str})
{
return(
  <div className='rhymes-container'>
   <Card>
      <CardContent> 
   <h3 className='rhymes-name'>{str.rhymesname}</h3>
   <img src={str.rhymesimage}  className='rhymes-image'  alt="rhymes-image"/>
   {/* <h4>{str.youtube}</h4> */}
   <iframe width="759"
     height="506" 
    src={str.youtube}
    class='rhymes-video'
    title="YouTube video player" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen></iframe>
   </CardContent>
   </Card>
  </div>
);}
export default App;
// https://premiumjoy.com/blog/quotes-on-play-importance-for-kids/