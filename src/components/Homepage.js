import React, {Component} from 'react';
import questions from './questionData';
import './Homepage.css';

var timer;

class Homepage extends Component {
    constructor(props){
        super(props);

        this.state = {
            questionNo : 0,
            correct: 0,
            finished: false,
            answered: false,
            optionCorrect: false,
            time: 0,
            selected: "",
            feedback: []
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSkip = this.handleSkip.bind(this);
        this.handleTime = this.handleTime.bind(this);
        this.increaseTime = this.increaseTime.bind(this);
    }


    componentDidMount(){
    timer =  setInterval(this.increaseTime, 1000);
    }

    increaseTime(){
        this.setState({time: this.state.time +1});
    }

    handleClick(a, name){
        
        if(a===true){
            this.setState({
                optionCorrect : true,
                answered: !this.state.answered,
                selected: name
            });
        } else {
            this.setState({
                optionCorrect: false,
                answered: !this.state.answered,
                selected: name
            });
        }
        
    };

    handleSubmit(){
        if(this.state.answered === true){
            if(this.state.optionCorrect === true) {
                this.setState({
                    correct: this.state.correct + 1,
                    feedback: [...this.state.feedback,"Right"]
                });
            } else {
                this.setState({feedback: [...this.state.feedback, "Wrong"]});
            }

            if(this.state.questionNo ===3){
                this.setState({finished : true });
            }

            this.setState({
                questionNo: this.state.questionNo + 1,
                answered: false,
                optionCorrect: false,
                time: 0
            });
            
        } else {
            this.setState({
                answered: false,
                optionCorrect: false
            })
            alert("Please Select an option before submitting or skip the question.");
        }
    }

    handleSkip(){
        if(this.state.answered === false){
            if(this.state.questionNo === 3){
                this.setState({finished: true});
            }
    
            this.setState({
                answered: false,
                optionCorrect: false,
                questionNo: this.state.questionNo + 1,
                time: 0,
                feedback: [...this.state.feedback,"Not Answered"]
            });
        } else {
            alert("You have chose an option, Please unselect that option before skipping.");
        }
    }

    handleTime(){
        if(this.state.questionNo === 3){
            this.setState({
                time: 0,
                finished: true
            });
            clearInterval(timer);
        }

        this.setState({
            answered: false,
            optionCorrect: false,
            questionNo: this.state.questionNo + 1,
            time: 0
        });
    }


    render(){
        if(this.state.time === 21){
            this.handleTime();
        }
        return(
            <div className="quizBox" >
            {(this.state.finished)? 
                <div className="finishBox" >
                    <h3 className="outputText"> You have successfully completed the quiz.</h3>
                    <h4 className="score" > Your Score is {this.state.correct} out of 4. </h4>
                    <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Question</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> 1 </td>
                            <td>{this.state.feedback[0]} </td>
                        </tr>
                        <tr>
                            <td> 2 </td>
                            <td>{this.state.feedback[1]} </td>
                        </tr>
                        <tr>
                            <td> 3 </td>
                            <td>{this.state.feedback[2]} </td>
                        </tr>
                        <tr>
                            <td> 4 </td>
                            <td>{this.state.feedback[3]} </td>
                        </tr>
                    </tbody>
                </table>
                </div>
            :
                <div className="singleQuestionBox" >
                    <div className="timer">
                        <p> Time: {this.state.time} seconds </p>
                    </div>
                    <div className="questionArea">
                        <h3 className="question" >Ques.{this.state.questionNo + 1}: {questions[this.state.questionNo].question} </h3>
                        <div className="options">
                            <p>A. <button id="option1" 
                                className= {(this.state.selected === "A" && this.state.answered)? "selected" : null} 
                                onClick={() => this.handleClick(questions[this.state.questionNo].answerOptions[0].status, "A")}  >
                                {questions[this.state.questionNo].answerOptions[0].option} 
                            </button> </p>
                            <p>B. <button id="option2"  
                                className= {(this.state.selected === "B" && this.state.answered)? "selected" : null}
                                onClick={() => this.handleClick(questions[this.state.questionNo].answerOptions[1].status, "B")}  > 
                                {questions[this.state.questionNo].answerOptions[1].option} 
                            </button> </p>
                            <p>C. <button id="option3"  
                                className= {(this.state.selected === "C" && this.state.answered)? "selected" : null}
                                onClick={() => this.handleClick(questions[this.state.questionNo].answerOptions[2].status, "C")}  > 
                                {questions[this.state.questionNo].answerOptions[2].option} 
                            </button> </p>
                            <p>D. <button id="option4" 
                                className= {(this.state.selected === "D" && this.state.answered)? "selected" : null}
                                onClick={() => this.handleClick(questions[this.state.questionNo].answerOptions[3].status, "D")}  > 
                                {questions[this.state.questionNo].answerOptions[3].option} 
                            </button> </p>
                        </div>
                        <div className="submitSkip">
                            <button className="submit" onClick={() => this.handleSubmit()} > Submit </button>
                            <button className="submit" onClick={() => this.handleSkip()} > Skip </button>
                        </div>
                    </div>
                </div>
            }
            </div>
        );
    }
}

export default Homepage;