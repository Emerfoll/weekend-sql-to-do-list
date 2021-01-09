console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners();
  getList();

}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', addTask)
  $('#taskList').on('click', '.clickable-row', rowClick)
}

function addTask(){
  console.log( 'add' );
  
} // end add

function getList() {
  console.log('In getList');
  
  $.ajax({
    type: 'GET',
    url: '/todo'
  }).then(function (response) {
    console.log(response);
    renderList(response);
  }).catch(function (error) {
    console.log('error in GET', error);
  });
}

function rowClick() {
  console.log('row clicked');

  let task = $(this).closest("tr").data("task");
  console.log(task);
  

  $.ajax({
    type: 'PUT',
    url: '/todo',
    data: task
  }).then(function (response) {
    console.log('Marked as complete');
    getList();
  }).catch(function (error) {
    alert("error updating status", error);
  });
}

function renderList(list) {
  console.log('list');
  $('#taskList').empty();

  for(let i=0; i<list.length; i++) {
    let task = list[i]

    let $tr = $(`<tr class="clickable-row"></tr>`)
    $tr.data('task', task);
    $tr.append(`<td>${task.task}</td>`);
    $tr.append(`<td>${task.notes}</td>`);
    $tr.append(`<td>${task.dateAdded}</td>`);
    $tr.append(`<td>${task.complete}</td>`);
    $('#taskList').append($tr);
  }
  
}
