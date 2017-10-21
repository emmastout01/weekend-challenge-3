console.log('script sourced');

$('document').ready(onReady);

function onReady() {
    console.log('Document ready');
    refreshTasks();
    $('.addTaskButton').on('click', addTaskClicked);
}

function refreshTasks() {
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).done(function (response) {
        var taskList = response;
        appendTasks(taskList);
    }).fail(function(error) {
        console.log('this isn\'t working', error);
    })
} //end GET route

function appendTasks(taskList) {
    $('.taskListContainer').empty();
    for (var i = 0; i < taskList.length; i++) {
        var task = taskList[i];
        $('.taskListContainer').append('<span>' + task.taskName + '</span>');
        console.log(task.taskName);
    } //end for loop
} //end appendTasks

function addTaskClicked() {
    console.log('add task button clicked');
    var taskName = $('.taskName').val();
    console.log('taskName:', taskName);
    var taskToSend = {
        taskName: taskName,
    }
    console.log(taskToSend);
    $.ajax({
        type: 'POST', 
        url: '/tasks',
        data: taskToSend
    }).done(function (response) {
        console.log(response);
        refreshTasks();
    }).fail(function (error) {
        console.log('error in post route:', error);
    })
} // End addTaskClicked

