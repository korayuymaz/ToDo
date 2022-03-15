import {TaskListApi, TaskCreateApi, TaskDeleteApi, TaskCompleteApi, CompletedTaskListApi} from '../lookup/lookup';
import React from 'react';
import moment from 'moment';
import '../styles/page.css';
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from "react-datepicker";
import { registerLocale } from  "react-datepicker";
import tr from 'date-fns/locale/tr';

function TaskComplete(props){
    const pk = props.id
    const data = props.data
    const style = 'btn Action-btn'
    function handleComplete(e) {
        if(pk){
            console.log('You clicked complete.');
            if(data.completed){
                data.completed = false
                data.complition_datetime = null
            }else{
                data.completed = true
                data.complition_datetime = moment().format('YYYY-MM-DD[T]hh:mm:ss[Z]')
            }
            TaskCompleteApi(pk, data)
        }else{
            console.log('You could not get pk');
        }
    }
    if(props.state === 'main'){
        return (
            <form onSubmit={handleComplete} className="mb-2">
                <button type="submit" className={style}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill='white' className="bi bi-check2-circle" viewBox="0 0 16 16">
                        <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                        <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
                    </svg>
                </button>
            </form>
        );
    }
    else{
        return (
            <form onSubmit={handleComplete} className="mb-2">
                <button type="submit" className={style}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-calendar-x-fill" viewBox="0 0 16 16">
                        <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zM6.854 8.146 8 9.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 10 6.146 8.854a.5.5 0 1 1 .708-.708z"/>
                    </svg>
                </button>
            </form>
        );
    }
}

function TaskDelete(props){
    const pk = props.id
    function handleDelete(e) {
        if(pk){
            console.log('You clicked delete.');
            TaskDeleteApi(pk)
        }else{
            console.log('You could not get pk');
        }
      }
    
      return (
        <form onSubmit={handleDelete}>
            <button type="delete" className='btn Action-btn'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill='white' className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
            </button>
        </form>
      );
}

export function TaskList(props) {
    const result = TaskListApi()
    
    if (result.error) {
        return (<div>Error: {result.error}</div>);
    } 
    else if (!result.isLoaded) {
        return <div>Loading...</div>;
    } 
    else {
        return (
        <div className='text-white mt-5 container'>
           <ul className="list-group">
                {result.tasks.map(item => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center Task mb-1">
                    <ul>
                        <li className="list-group font-weight-bold ">
                            <h5>{item.description}</h5>
                        </li>
                        <li className="list-group font-weight-light">
                            {item.date} 
                        </li>
                        <li className="list-group font-weight-light">
                            {item.complition_datetime ? `Completion Time:  ${item.complition_datetime}` : false}
                        </li>
                    </ul>
                    <div>
                        <TaskComplete id={item.id}  data = {item} state={props.state}/>
                        <TaskDelete id = {item.id}/>
                    </div>
                </li>
                ))}
            </ul>
        </div>
        );
    }  
}

export function CompletedTaskList(props) {
    const result = CompletedTaskListApi()
    
    if (result.error) {
        return (<div>Error: {result.error}</div>);
    } 
    else if (!result.isLoaded) {
        return <div>Loading...</div>;
    } 
    else {
        return (
        <div className='text-white mt-5 container'>
           <ul className="list-group">
                {result.tasks.map(item => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center Task mb-1">
                    <ul>
                        <li className="list-group font-weight-bold ">
                            <h5>{item.description}</h5>
                        </li>
                        <li className="list-group font-weight-light">
                            {item.date} 
                        </li>
                        <li className="list-group font-weight-light">
                            {item.complition_datetime ? `Completion Time:  ${item.complition_datetime}` : false}
                        </li>
                    </ul>
                    <div>
                        <TaskComplete id={item.id}  data = {item} state={props.state}/>
                        <TaskDelete id = {item.id}/>
                    </div>
                </li>
                ))}
            </ul>
        </div>
        );
    }  
}

class TaskInput extends React.Component{
    constructor(props) {
        super(props);
        registerLocale('tr', tr)
        this.state = {
            user: "1",
            description: "",
            date: null,
            completed: "False",
            complition_datetime : null,
            duration: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({description: event.target.value});
    }

    handleSubmit() {
        TaskCreateApi(this.state)   
    }


    render(){
        return (
            <div className='container'>
                <div>
                    <div className='col-12 m-3 w-75 mx-auto'>
                        <form onSubmit={this.handleSubmit}>
                            <textarea type="text" value={this.state.description} onChange={this.handleChange} className='form-control mb-2'>

                            </textarea>
                            <div>
                                <DatePicker isClearable
                                            placeholderText="I have been cleared!" 
                                            locale="tr" 
                                            selected={this.state.date ? this.state.date : false} 
                                            onChange={(date) => this.setState({date: date}) } 
                                            format='yyyy-MM-dd'
                                            />
                            </div>
                            <div>
                                <button type='submit' className='btn Action-btn my-3'>Create Task</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskInput;