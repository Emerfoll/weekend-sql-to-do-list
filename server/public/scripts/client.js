console.log('js');

$(document).ready(function () {
  console.log('JQ');
  // Establish Click Listeners
  setupClickListeners();
  getList();
}); // end doc ready

function setupClickListeners() {
  $('#addButton').on('click', addTask)
  $('#taskList').on('click', '.clickable-row', rowClick)
  $('#taskList').on('click', '.delete', deleteClicked)
  $('#removeComplete').on('click', removeComplete)
}
// -- GET and render to DOM--
function getList() {
  console.log('In getList');
  // grabs the list of tasks to do from the database 
  $.ajax({
    type: 'GET',
    url: '/todo'
  }).then(function (response) {
    console.log(response);
    renderList(response);
  }).catch(function (error) {
    console.log('error in GET', error);
  });
} // end getList

function renderList(list) {
  // builds the list on the DOM from the user input.
  console.log('render list');
  $('#taskList').empty();
  todoList = [];
  for (let i = 0; i < list.length; i++) {
  // empties and pushes each item into a global array 
  // to be used for the removeComplete function
    let task = list[i]
    todoList.push(task)
    let $tr = $(`<tr></tr>`)
    $tr.data('task', task);
    $tr.append(`<td class="clickable-row">${task.task}</td>`);
    $tr.append(`<td class="clickable-row">${task.notes}</td>`);
    $tr.append(`<td class="clickable-row">${task.dueDate}</td>`);
    $tr.append(`<td class="clickable-row">${task.complete}</td>`);
    $tr.append(`<td><button type="button" class="btn btn-danger delete">X</button></td>`);
    $('#taskList').append($tr);
    if (task.complete === 'complete') {
      $($tr).addClass("complete table-secondary")
    }
  }
} // end renderList
// -- END of GET and render to DOM--

// -- POST and add to DOM--
function addTask() {
  console.log('add');
  // checks if the required fields are filled in.
  if ($("#taskIn").val() === '' || $("#notesIn").val() === '') {
    alert('Please fill out the required fields.')
    $('#taskIn').addClass("required")
    $('#notesIn').addClass("required")
  } else {

    $('#taskIn').removeClass("required")
    $('#notesIn').removeClass("required")
    // new task to send to the database.
    let newTask = {
      task: $("#taskIn").val(),
      notes: $("#notesIn").val(),
      dueDate: $("#dateIn").val(),
      complete: 'incomplete'
    };

    $.ajax({
      type: "POST",
      url: "/todo",
      data: newTask
    }).then(function (response) {
      $("#taskIn").val(""),
        $("#notesIn").val(""),
        $("#dateIn").val("")
      getList();
    });
  }
} // end addTask
// -- END of POST and add to DOM--

// -- PUT/UPDATE section--
function rowClick() {
  console.log('row clicked');
  // targets the row that is clicked to mark it as complete or incomplete.
  let task = $(this).closest("tr").data("task");
  console.log(task);
  let status = { complete: task.complete };

  $.ajax({
    type: 'PUT',
    url: `/todo/${task.id}`,
    data: status
  }).then(function (response) {
    console.log('Completion status updated');
    getList();
  }).catch(function (error) {
    alert("error updating status", error);
  });
} // end rowClick
// -- END of PUT/UPDATE section--

// -- DELETE section--
let todoList = [];

function removeComplete() {
  // function to delete all tasks marked as complete.
  console.log('Removed completed tasks');
  console.log(todoList);
  // confirmation window to prevent accidental deletion.
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover these tasks!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      // loops through what is on the DOM and deletes anything marked as complete.
      for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].complete === "complete") {
          deleteTask(todoList[i].id);
        }
      }
      swal("Completed tasks has been removed from your to-do list.", {
        icon: "success",
      });
    } else {
      swal("All completed tasks still on list. ");
    }
  });



} // end removeComplete

function deleteClicked() {
  //function to delete single tasks. triggered from red x on DOM.
  console.log('DELETE TASK');
  let task = $(this).closest("tr").data("task").id;

  // confirmation window to prevent accidental deletion.
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this task!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      deleteTask(task);
      swal("Task has been removed from your to-do list.", {
        icon: "success",
      });
    } else {
      swal("Task still on list. ");
    }
  });
} // end deleteClicked

function deleteTask(task) {
  // Delete ajax triggered by removeComplete and deleteClicked.
  $.ajax({
    type: 'DELETE',
    url: `/todo/${task}`
  }).then(function (resopnse) {
    getList();
  }).catch(function (error) {
    alert('Could not delete task.')
  })
} // end deleteTask 
// -- END of DELETE section--





