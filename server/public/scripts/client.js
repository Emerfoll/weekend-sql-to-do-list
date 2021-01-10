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

let todoList = [];

function addTask() {
  console.log('add');

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
} // end addTask


function removeComplete() {
  console.log('Removed completed tasks');
  console.log(todoList);
  for (let i=0; i<todoList.length; i++) {
    if (todoList[i].complete === "complete") {
      deleteTask(todoList[i].id);
    }
  }
  
}

function deleteClicked() {
  console.log('DELETE TASK');
  let task = $(this).closest("tr").data("task").id;


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
}

function deleteTask(task) {

    $.ajax({
      type: 'DELETE',
      url: `/todo/${task}`
    }).then(function (resopnse) {
      getList();
    }).catch(function (error) {
      alert('Could not delete task.')
    })
  }

function rowClick() {
  console.log('row clicked');

  let task = $(this).closest("tr").data("task");
  console.log(task);

  let status = { complete: task.complete }


  $.ajax({
    type: 'PUT',
    url: `/todo/${task.id}`,
    data: status
  }).then(function (response) {
    console.log('Marked as complete');
    getList();
  }).catch(function (error) {
    alert("error updating status", error);
  });
}

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

function renderList(list) {
  console.log('render list');
  $('#taskList').empty();
  todoList = [];
  for (let i = 0; i < list.length; i++) {
    let task = list[i]

    todoList.push(task)
    let $tr = $(`<tr ></tr>`)
    $tr.data('task', task);
    $tr.append(`<td class="clickable-row">${task.task}</td>`);
    $tr.append(`<td class="clickable-row">${task.notes}</td>`);
    $tr.append(`<td class="clickable-row">${task.dueDate}</td>`);
    $tr.append(`<td class="clickable-row">${task.complete}</td>`);
    $tr.append(`<td><button type="button" class="btn btn-danger delete" id=${task.id}>X</button></td>`);
    $('#taskList').append($tr);
  }

}




