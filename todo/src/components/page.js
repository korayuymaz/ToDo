import { TaskList } from './tasks';
import TaskInput from './tasks';
import React from 'react';
import '../styles/page.css'

function Header(props){
    return (
        <div className="row no-gutters mt-3 justify-content-start">
            <button className='navbar-icon col-2 col-sm-4' onClick={props.tasks}>Logo</button>
            <button className='navbar-button col-1' onClick={props.tasks}>Home</button>
            <button className='navbar-button col-1' onClick={props.create}>Create Task</button>
            <button className='navbar-button col-1' onClick={props.tasks}>Statistics</button>
        </div>
    );
}

class TaskPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            state : 'main'
        };
        this.handleCreateClick = this.handleCreateClick.bind(this);
        this.handleStatisticsClick = this.handleStatisticsClick.bind(this);
        this.handleTasksClick = this.handleTasksClick.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
    }

    handleCreateClick(event) {
        this.setState({state: 'create'});
    }

    handleStatisticsClick(event) {
        this.setState({state: 'statistic'});
    }

    handleTasksClick(event) {
        this.setState({state: 'main'});
    }

    handleLoginClick(event) {
        this.setState({state: 'login'});
    }

    render(){
        if(this.state.state === 'main')
        {
            return (
                <div>
                    <Header create={this.handleCreateClick} statistic={this.handleStatisticsClick} tasks={this.handleTasksClick}/>
                    <TaskList />
                </div>
            );
        }
        else if(this.state.state === 'create')
        {
            return(
                <div>
                    <Header create={this.handleCreateClick} statistic={this.handleStatisticsClick} tasks={this.handleTasksClick}/>
                    <TaskInput />
                </div>
            )
        }
    }
}

export default TaskPage;