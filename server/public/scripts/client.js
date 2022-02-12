console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // clickListeners()
  getList();

});

// function clickListeners() {
//   $( '#addButton' ).on( 'click', function(){
//     console.log( 'in addButton on click' );
//     // get user input and put in an object
//     // NOT WORKING YET :(
//     // using a test object
//     let koalaToSend = {
//       name: $('#nameIn').val(),
//       age: $('#ageIn').val(),
//       gender: $('#genderIn').val(),
//       readyForTransfer: $('#readyForTransferIn').val(),
//       notes: $('#notesIn').val(),
//     };
//     // call saveKoala with the new obejct
//     saveKoala( koalaToSend );

    
//   }); 
// }

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

function renderList(list) {
  $('#todoList').empty();
  for(let i = 0; i < list.length; i += 1) {
    let todo = list[i];
    // For each list, append a new row to our table
    $('#listContainer').append(`
      <ul data-complete = ${todo.complete} data-id = ${todo.id}>
        <li>${todo.todo}, ${todo.complete}</li>
        <button class = 'btn-complete'>Complete? T/F</button>
        <button class = 'btn-delete' data-id = ${todo.id}>Delete</button>
        </td>
      </ul>
    `);
  }
}  