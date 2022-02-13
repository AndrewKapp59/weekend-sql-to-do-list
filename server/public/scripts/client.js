$( document ).ready( function(){
  clickListeners()
  getList();
});

// CLICK LISTENERS
function clickListeners() {
  $('#addButton').on('click', handleSubmit);
  $('#listContainer').on('click', '.btn-delete', deleteAnimation)
  $('#listContainer').on( 'transitionend', '.fall', deleteTodo);
  $('#listContainer').on('click', '.btn-complete', todoComplete);
  // $('#filter').change(filterTasks);
  $('#addTask').keydown(function(event){
    if (event.keyCode === 13) {
      $('#addButton').click();
    }
  })
}

function deleteAnimation() {
  $(this).parent().addClass('fall');
}

function filterTasks () {
  console.log($('#filter').val());
  let filter = $('#filter').val()
  if (filter === 'all') {
    getList()
  }
  else if (filter === 'completed') {
    getComplete()
  }
  else {
    getUncomplete()
  }
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

// GET ALL
function getList(){
  $.ajax({
    type: 'GET',
    url: '/list'
  }).then(function(response) {
    console.log('Current todo list', response);
    renderList(response);
  }).catch(function(error){
    console.log('error in GET', error);
  });
}

// GET COMPLETED
function getComplete(){
  $.ajax({
    type: 'GET',
    url: '/list/complete'
  }).then(function(response) {
    console.log('Current todo list', response);
    renderList(response);
  }).catch(function(error){
    console.log('error in GET/complete', error);
  });
}

// GET UNCOMPLETED
function getUncomplete(){
  $.ajax({
    type: 'GET',
    url: '/list/uncomplete'
  }).then(function(response) {
    console.log('Current todo list', response);
    renderList(response);
  }).catch(function(error){
    console.log('error in GET/uncomplete', error);
  });
}


// RENDER
function renderList(list) {
  $('#listContainer').empty();
  for(let i = 0; i < list.length; i += 1) {
    let todo = list[i];
    // For each list, append a new row to our table
    $('#listContainer').append(`
      <ul data-id = ${todo.id} class = "">
        <button class = 'btn-delete' data-id = ${todo.id}><i class="fas fa-trash"></i></button>
        <button class = 'btn-complete ${todo.complete}' data-id = ${todo.id} data-complete = ${todo.complete}><i class="fas fa-check"></i></button>
        <li class = todo '${todo.complete}' >${todo.todo}</li>
      </ul>
    `);
  }
}  

// DELETE
function deleteTodo () {
  let todoId = $(this).data().id;
  $.ajax({
      type: 'DELETE',
      url: `/list/${todoId}`,
  })
  .then(function(response) {
      console.log('Deleted it');

      filterTasks()
  })
  .catch(function(error) {
      console.log('Error Deleting', error);
  })
}

// PUT i.e. UPDATE
function todoComplete () {
  let id = $(this).data().id;
  let complete = $(this).data().complete;

  if (complete === false) {
    console.log('Task completed');
    $.ajax({
        method: 'PUT',
        url: `/list/${id}`,
        data: {complete: !complete}
    })
    .then(function(response) {
        filterTasks();
    })
    .catch(function(err) {
        alert('Error updating');
    })
  }
  else {
    $.ajax({
        method: 'PUT',
        url: `/list/${id}`,
        data: {complete: !complete}
    })
    .then(function(response) {
        getList();
    })
    .catch(function(err) {
        alert('Error updating');
    })
  }
}  

