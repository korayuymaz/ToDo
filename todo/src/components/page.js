import { TaskList, CompletedTaskList } from './tasks';
import TaskInput from './tasks';
import React from 'react';
import '../styles/page.css'

function Header(props){
    if(props.state === 'main'){
        return (
            <div className="row no-gutters mt-3 justify-content-start">
                <button className='navbar-icon col-2 col-sm-4' onClick={props.tasks}>Logo</button>
                <button className='navbar-button col-1 selected-button' onClick={props.tasks}>Home</button>
                <button className='navbar-button col-1' onClick={props.create}>Create Task</button>
                <button className='navbar-button col-1' onClick={props.completed}>Completed</button>
            </div>
        );
    } else if(props.state === 'completed'){
        return (
            <div className="row no-gutters mt-3 justify-content-start">
                <button className='navbar-icon col-2 col-sm-4' onClick={props.tasks}>Logo</button>
                <button className='navbar-button col-1' onClick={props.tasks}>Home</button>
                <button className='navbar-button col-1' onClick={props.create}>Create Task</button>
                <button className='navbar-button col-1 selected-button' onClick={props.completed}>Completed</button>
            </div>
        );
    } else if(props.state === 'create'){
        return (
            <div className="row no-gutters mt-3 justify-content-start">
                <button className='navbar-icon col-2 col-sm-4' onClick={props.tasks}>Logo</button>
                <button className='navbar-button col-1' onClick={props.tasks}>Home</button>
                <button className='navbar-button col-1 selected-button' onClick={props.create}>Create Task</button>
                <button className='navbar-button col-1' onClick={props.completed}>Completed</button>
            </div>
        );
    } else {
        return (
            <div className="row no-gutters mt-3 justify-content-start">
                <button className='navbar-icon col-2 col-sm-4' onClick={props.tasks}>Logo</button>
                <button className='navbar-button col-1' onClick={props.tasks}>Home</button>
                <button className='navbar-button col-1' onClick={props.create}>Create Task</button>
                <button className='navbar-button col-1' onClick={props.completed}>Completed</button>
            </div>
        );
    }
    
}

class TaskPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            state : 'main',
            login : true
        };
        this.handleCreateClick = this.handleCreateClick.bind(this);
        this.handleCompletedClick = this.handleCompletedClick.bind(this);
        this.handleTasksClick = this.handleTasksClick.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
    }

    handleCreateClick(event) {
        this.setState({state: 'create'});
    }

    handleCompletedClick(event) {
        this.setState({state: 'completed'});
    }

    handleTasksClick(event) {
        this.setState({state: 'main'});
    }

    handleLoginClick(event) {
        this.setState({state: 'login'});
    }

    render(){
        if(this.state.login){
            if(this.state.state === 'main'){
                return (
                    <div>
                        <Header state={this.state.state} create={this.handleCreateClick} completed={this.handleCompletedClick} tasks={this.handleTasksClick}/>
                        <TaskList state={this.state.state}/>
                    </div>
                );
            }
            else if(this.state.state === 'create')
            {
                return(
                    <div>
                        <Header state={this.state.state} create={this.handleCreateClick} completed={this.handleCompletedClick} tasks={this.handleTasksClick}/>
                        <TaskInput />
                    </div>
                )
            }
            else if(this.state.state === 'completed')
            {
                return(
                    <div>
                        <Header state={this.state.state} create={this.handleCreateClick} completed={this.handleCompletedClick} tasks={this.handleTasksClick}/>
                        <CompletedTaskList state={this.state.state}/>
                    </div>
                )
            }
        }
        else{
            return(
                <div>
                    <Header state={this.state.state} create={this.handleCreateClick} completed={this.handleCompletedClick} tasks={this.handleTasksClick}/>
                </div>
            )
        }
    }
}

export default TaskPage;