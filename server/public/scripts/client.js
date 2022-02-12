console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  clickListeners()
  getList();
});

// CLICK LISTENERS
function clickListeners() {
  $('#addButton').on('click', handleSubmit);
  $('#listContainer').on('click', '.btn-delete', deleteTodo);
}

// INPUT -> OBJECT -> POST
function handleSubmit() {
  console.log('Add button clicked');
  let newTodo = {};
  newTodo.todo = $('#addTask').val().trim();
  $('#addTask').val(''); 
  if (newTodo.todo === '' ) {
    alert('Input blank. Please add a task')
  }
  else {
    addTodo(newTodo);
  }
}

// POST
function addTodo(newTodo) {
  $.ajax({
    type: 'POST',
    url: '/list',
    data: newTodo,
    }).then(function(response) {
      console.log('Response from server.', response);
      getList();
    }).catch(function(error) {
      console.log('Error in POST', error)
      alert('Unable to add new todo');
    });
}

// GET
function getList(){
  console.log( 'in getList' );
  $.ajax({
    type: 'GET',
    url: '/list'
  }).then(function(response) {
    console.log(response);
    renderList(response);
  }).catch(function(error){
    console.log('error in GET', error);
  });
  // $('#viewKoalas').on('click', '.mark-ready-btn', transferKoala)
}


// RENDER
function renderList(list) {
  $('#listContainer').empty();
  for(let i = 0; i < list.length; i += 1) {
    let todo = list[i];
    // For each list, append a new row to our table
    $('#listContainer').append(`
      <ul data-complete = ${todo.complete} data-id = ${todo.id}>
        <li>${todo.todo}, ${todo.complete}</li>
        <button class = 'btn-complete'data-id = ${todo.complete}>Complete? T/F</button>
        <button class = 'btn-delete' data-id = ${todo.id}>Delete</button>
        </td>
      </ul>
    `);
  }
}  

function deleteTodo () {
  let todoId = $(this).data().id;
  $.ajax({
      type: 'DELETE',
      url: `/list/${todoId}`,
  })
  .then(function(response) {
      console.log('Deleted it');
      getList()
  })
  .catch(function(error) {
      console.log('Error Deleting', error);
  })
}

