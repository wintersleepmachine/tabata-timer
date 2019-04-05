import React from 'react'
import 'react-circular-progressbar/dist/styles.css';
import './../css/styles.css'

import Title from './Title'
import Cycle from './Cycle'
import Timer from './Timer'
import song from './../song.mp3'
import beep from './../Beep.mp3'
import finishSong from './../finish-song.mp3'
import StyledProgressbar from './StyledProgressbar'


class App extends React.Component {
    state = {
        seconds: 0,
        minutes: 0,
        cycle: 1,
        timerOn: false,
        tabataTime: 5,
        work: true,
        getReady: true,
        songPlaying: false
    }

    startClick = () => {
        // Timer
        if(!this.state.timerOn){
            this.timer = setInterval(()=> {
                if(this.state.seconds < 60){
                    this.setState(prevState => {
                        return {seconds: prevState.seconds + 1, timerOn: true}
                    })
                }
                if(this.state.seconds >= 60){
                    this.setState(prevState => {
                        return {seconds: 0, minutes: prevState.minutes + 1, timerOn: true}
                    })
                }else if(this.state.cycle === 8){
                    this.setState({timerOn: false})
                    clearInterval(this.timer)
                }
            }, 1000)
        }
    
        // Tabata Timer

        this.tabataTimer = setInterval(() => { 
            if(this.state.getReady && this.state.tabataTime > 0){ // 'Get ready timer'
                this.setState(prevState => {
                    return {tabataTime: prevState.tabataTime - 1 }
                })
            }else if(this.state.getReady && this.state.tabataTime === 0){
                this.playBeep(beep)

                setTimeout(()=>{
                    this.setState({getReady: false, tabataTime: 20}) 
                }, 250)
                
            }

            if(this.state.cycle !== 8 && !this.state.getReady) { // Work tabata timer
                if(this.state.tabataTime > 0){ 
                    this.setState(prevState => {
                        return {tabataTime: prevState.tabataTime - 1}
                    })
                }else if(this.state.tabataTime === 0 && !this.state.getReady && this.state.work){//changing from work to rest
                    this.playBeep(beep)
                    setTimeout(()=>{
                        this.setState({tabataTime: 10, work: false})
                    }, 250)
                    
                }else if(this.state.tabataTime === 0 && !this.state.getReady && !this.state.work){//changing from rest to work
                    this.playBeep(beep)
                    setTimeout(()=>{
                        this.setState(prevState => {
                            return {cycle: prevState.cycle + 1, tabataTime: 20, work: true}
                        })
                    }, 250)
                    
                }
            }else if (!this.state.getReady && this.state.cycle === 8) { //Finishing tabata
                this.setState({tabataTime: 0})
                clearInterval(this.tabataTimer)
                this.playFinishSong(finishSong)
            }
            
            
        }, 1000)


    }

    pauseClick = () => {
        clearInterval(this.timer) //Pause timer
        clearInterval(this.tabataTimer) //Pause tabata timer
        this.setState({timerOn: false})
    }

    resetClick = () => {
        this.setState({seconds: 0, minutes: 0, cycle: 1, tabataTime: 5, getReady: true}) // Reset State back to initial start params
    }

    playBeep = (sound) => {
        const alarm = new Audio(sound)
        alarm.play()
    }

    playSong = () => {
        new Audio(song).play()
        this.setState({songPlaying: true})
    }

    playFinishSong = (finishSong) => {
        const music = new Audio(finishSong)
        music.play()
    }



    render(){
        const seconds = this.state.seconds < 10 ? `0${this.state.seconds}` : this.state.seconds
        const minutes = this.state.minutes < 10 ? `0${this.state.minutes}` : this.state.minutes
        const wordRender = (work, cycle) => {
            if(this.state.getReady === true){
                return 'Get ready!'
            }

            if(cycle === 8){
                return 'Finished!'
            }else if(work){
                return 'Work!'
            }else if(!work) {
                return 'Rest!'
            }
        }

        const magicNum = () => {
            if(this.state.getReady){
                return 20
            }else if(this.state.work){
                return 5
            }else {
                return 10
            }
        }
        
        return (
            <div className = 'ui container'>
                <div className = 'ui segment center' style = {{textAlign: 'center'}}>
                    <Title />
                    <div style = {{margin:'auto', width: '50%'}}>
                        <StyledProgressbar 
                            percentage={(this.state.tabataTime)*magicNum()}
                            text={this.state.tabataTime} 
                            magicNum={magicNum()}
                            counterClockwise 

                            tabataTime={this.state.tabataTime}
                            work={this.state.work}
                            getReady={this.state.getReady}   
                        />

                        {/* <CircularProgressbar
                        percentage={(this.state.tabataTime)*magicNum()}
                        text={`${this.state.tabataTime} Sec`}
                        counterClockwise
                        /> */}
                    </div>
                
                    <Cycle cycle = {this.state.cycle} />
                    <Timer seconds ={seconds} minutes={minutes}/>
                    <h1 style={{fontSize: '100px'}}>{wordRender(this.state.work, this.state.cycle)}</h1>
                    <button className = 'circular ui green button'onClick = {this.startClick}><i className="play circle icon"></i>Start</button>
                    <button className=' circular ui button' onClick={this.pauseClick}> <i className="pause icon"></i>Pause</button>
                    <button className='circular ui blue button' onClick={this.resetClick}><i className="redo icon"></i>Reset</button>
                    
                    <button className='ui red button' onClick ={this.playSong}><i className="bolt icon"/>ACTIVATE BEAST MODE <i className="bolt icon"/></button>
                </div>
            </div>
        )
    }
}

export default App



