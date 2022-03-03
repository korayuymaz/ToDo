import {useEffect, useState}  from 'react'

function getCookie(name){
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export function TaskListApi() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [tasks, setTask] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/")
            .then(res => res.json())
            .then((data) => {
                    setIsLoaded(true);
                    setTask(data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                  }
            )
    }, [])
    let res = {
        'tasks': tasks,
        'error': error,
        'isLoaded': isLoaded
            }
    return(res)
}

export function TaskCreateApi(data){
    var csrftoken = getCookie('csrftoken')
    var url = 'http://localhost:8000/api/create/'

    fetch(url, {
        method:'POST',
        headers:{
          'Content-type':'application/json',
          'X-CSRFToken':csrftoken,
        },
        body:JSON.stringify(data)
      }).catch(function(error){
        console.log('ERROR:', error)
      })
  
}

export function TaskDeleteApi(pk){
    fetch(`http://localhost:8000/api/${pk}/delete/`,{method: 'DELETE'}
    ).catch(function(error){
        console.log('ERROR:', error)
      })
}


export function TaskCompleteApi(pk, data){
    console.log(data)
    var csrftoken = getCookie('csrftoken')
    var url = `http://localhost:8000/api/${pk}/update/`
    fetch(url, {
    method: 'PUT',
    headers:{
        'Content-type':'application/json',
        'X-CSRFToken':csrftoken,
    },
    body:JSON.stringify(data)}
    ).catch(function(error){
        console.log('ERROR:', error)
      })
}