// Tüm elementleri seçme

const todoInput = document.querySelector("#todo");
const addButon = document.querySelector("#addButton");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

//Tüm eventlistener'lar
function eventListeners(){
    addButon.addEventListener("click",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}


 function addTodo(e){ 

      //İnput'a girilen değeri newTodo içinde saklıyoruz.
      const newTodo = todoInput.value.trim();

      //alert mesajları için
      if (newTodo===""){
          showAlert("danger","Lütfen bir todo girin...");
      }else{
          addTodoToUI(newTodo);
          addTodoStorage(newTodo);
          showAlert("success","Todo başaryla eklendi...")
      }
      
      e.preventDefault();
      
 }   

 function addTodoToUI(newTodo){
    // Yeni bir li elementi oluşturma.
    const listItem = document.createElement("li");

    // Yeni bir a elementi oluşturma
    const link = document.createElement("a");

    // attribute ekleme
    listItem.className ="list-group-item d-flex justify-content-between";
    link.href = "#";
    link.className = "delete-item";

    // a elementine i elementi ekleme
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    // li elementine inputa girilen text ekleme
    listItem.appendChild(document.createTextNode(newTodo));
    // a elementini li'ye ekleme
    listItem.appendChild(link);
    // li elementini ul'ye ekleme
    todoList.appendChild(listItem);
    
    todoInput.value=""; // Her girilen değerden sonra inputu boş bırakma
}

 function showAlert(type,message){
     const alert = document.createElement("div")
     alert.className = `alert alert-${type}`;
     alert.textContent = message;
     firstCardBody.appendChild(alert);

     // SetTimeout 

     setTimeout(function(){
         alert.remove();
     },2000);
 }
 
 function getTodosFromStorage(){ // Storage'dan Todoları Alma
    let todos;
    if(localStorage.getItem("todos")===null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
 }
 function addTodoStorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
 }
 
 function loadAllTodosToUI(){
     let todos = getTodosFromStorage();

     todos.forEach(function(todo){
         addTodoToUI(todo);
     })
 }
 
 function deleteTodo(e){

   //console.log(e.target); // target nereye basıldıgını bıze verır --> fa fa-remove

   if(e.target.className==="fa fa-remove"){
       e.target.parentElement.parentElement.remove();
       deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
       showAlert("success","Todo Başarıyla Silindi...");
   }
 }

 function deleteTodoFromStorage(deleteTodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if (todo ===deleteTodo){
            todos.splice(index,1); // Arryadan değeri silme.
        }
    });

    localStorage.setItem("todos",JSON.stringify(todos));
 }
 
 function filterTodos(e){

    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue)=== -1){
            // bulamadı
            listItem.setAttribute("style","display : none !important");
        }else{
            listItem.setAttribute("style","display : block");
        }
    });

 }

function clearAllTodos(e){
    if (confirm("Tümünü silmek istediğinizden emin misiniz ? ")){
        //Arayüzden Todoları temizleme
        //todoList.innerHTML = ""; // Yavaş

        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
    

}













    


