console.log("js is loaded----------")

//to add a new task
async function addTask(event){
    event.preventDefault();
    let taskDesc=document.getElementById('task-desc').value
    let taskCat=document.getElementById('task-cat').value
    let date=document.getElementById('task-date').value
    console.log('details are :',taskDesc,taskCat,date)
    if(taskCat!='' && taskDesc!='' && date!=null)
    {
        let data=await fetch(`/todo/post?desc=${taskDesc}&cat=${taskCat}&date=${date}`)
        let jsondata=await data.json()
        console.log(jsondata)
        //this will reload the page 
        window.location.reload(true);
        

    }
    


}

//to delete selected task
async function deleteTask(event){
    //preventing the default action
    event.preventDefault()
    //get all the checkbox of tasks
    var checkboxes=document.getElementsByName('checkbox-row')
    let str=''
    for(let checkbox of checkboxes){
        if(checkbox.checked){
            str+=checkbox.value+','
        }
    }
    // console.log(str)
    
    //  api request
    if(str!=''){
        let json_data=await fetch(`/todo/delete?ids= ${str}`)
        let data=await json_data.json()
        // console.log(data)
        window.location.reload(true)
    }


    
}