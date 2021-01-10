console.log('js');

$(document).ready(function () {
  console.log('JQ');
  // Establish Click Listeners
  setupClickListeners();
  getList();
  // $('.close').onmouseenter(showX)
  // $('.close').mouseleave(hideX)


}); // end doc ready

function setupClickListeners() {
  $('#addButton').on('click', addTask)
  $('#remove').on('click', removeComplete)
  $('#taskList').on('click', '.clickable-row', rowClick)
  $('#taskList').on('click', '.delete', deleteTask)

}

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
  
}

function deleteTask() {
  console.log('DELETE TASK');
  
  let task = $(this).closest("tr").data("task").id;
  console.log(task);
  
  $.ajax({
    type: 'DELETE',
    url: `/todo/${task.id}`
  }).then(function (resopnse) {
    getList();
  }).catch(function (error) {
    alert('Could not delete task.')
  })
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

function renderList(list) {
  console.log('render list');
  $('#taskList').empty();

  for (let i = 0; i < list.length; i++) {
    let task = list[i]

    let $tr = $(`<tr ></tr>`)
    $tr.data('task', task);
    $tr.append(`<td class="clickable-row">${task.task}</td>`);
    $tr.append(`<td class="clickable-row">${task.notes}</td>`);
    $tr.append(`<td class="clickable-row">${task.dateAdded}</td>`);
    $tr.append(`<td class="clickable-row">${task.complete}</td>`);
    $tr.append(`<td><button type="button" class="btn btn-danger delete" id=${task.id}>X</button></td>`);
    $('#taskList').append($tr);
  }

}
