$(document).ready(getTask);

$('.bottom-box').on('click', eventDelegator);
$('.bottom-box').on('keypress', editEventDelegator);
$('.bottom-box').on('focusout', editEventDelegator);
$('.show').on('click', showCompletedTasks);
$('.save-btn').on('click', saveTask);
$('.search-input').on('keyup', searchTask);
$('.title-input').on('keyup', enableSave)
$('.body-input').on('keyup', enableSave)
$('.none').on('click', filterNone);
$('.low').on('click', filterLow);
$('.normal').on('click', filterNormal);
$('.high').on('click', filterHigh);
$('.critical').on('click', filterCritical);

function createHTML(task) {
  var newTask =  `<div data-id="${task.id}"class="task-container ${task.class}">
                    <h2 contenteditable="true" class="title-of-task edit">${task.title}</h2>
                    <button class="delete-button btn"></button>
                    <p contenteditable="true" class="body-of-task edit">${task.body}</p>
                    <button class="upvote btn"></button>
                    <button class="downvote btn"></button>
                    <p class="quality">quality: 
                    <span class="qualityVariable">${task.quality}</span></p>
                    <button class="completed">Completed Task</button>
                    <hr>
                  </div>`;
  $( ".bottom-box" ).prepend(newTask);
  localStoreTask(task);

  if (task.completed === true) {
    $('.opacity').addClass('hide');
  }
  hideOldTasks();
}

function TaskObject(title, body) {
  this.title = title;
  this.body = body;
  this.quality = 'Normal';
  this.id = Date.now();
  this.class = '';
  this.completed = false;
}

function getTask() {
  for (var i = 0; i < localStorage.length; i++) {
    var retrievedTask = localStorage.getItem(localStorage.key(i));
    var taskData = JSON.parse(retrievedTask);

      createHTML(taskData);
  }
};

function localStoreTask(obj) {
  var taskString = JSON.stringify(obj);
  localStorage.setItem(obj.id, taskString);
}

function saveTask(event) {
  var title = $('.title-input').val();
  var body = $('.body-input').val();
  var newTask = new TaskObject(title, body)
  event.preventDefault();
  createHTML(newTask); 
  localStoreTask(newTask);
  $('form')[0].reset();
  enableSave();
};

function eventDelegator(event) {
  if ($(event.target).hasClass('delete-button')) {
    deleteIdea(event);
  }
  if ($(event.target).hasClass('upvote')) {
    $($(event.target).siblings('.quality').children()).text(upVote(event));
    voteStorage(event);
  }
  if ($(event.target).hasClass('downvote')) {
    $($(event.target).siblings('.quality').children()).text(downVote(event));
    voteStorage(event);
  }
  if ($(event.target).hasClass('completed')) {
    completeTask(event);
  }
};

function editEventDelegator(event) {
  if ($(event.target).hasClass('edit')) {
    if (event.keyCode === 13) {
      editTaskEnter(event);
    }
    editTaskClick(event);
  }
}

function deleteIdea(e) {
  var id = $(event.target).closest('.task-container').data('id');
  $(event.target).parent().remove();
  localStorage.removeItem(id);
}

function upVote(event) {
  var qualityArray = ['None', 'Low', 'Normal', 'High', 'Critical'];
  var currentQuality = $($(event.target).siblings('.quality').children()).text();
  for (var i = 0; i < qualityArray.length; i++) {
    if (currentQuality === qualityArray[i]){
      return currentQuality = qualityArray[i+1];
    }
  }
}

function downVote(event) {
  var qualityArray = ['None', 'Low', 'Normal', 'High', 'Critical'];
  var currentQuality = $($(event.target).siblings('.quality').children()).text();
  for (var i = 0; i < qualityArray.length; i++) {
    if (currentQuality === qualityArray[i]){
     return currentQuality = qualityArray[i-1];
    }
  }
}

function voteStorage(event) {
  var retrieveTask = JSON.parse(localStorage.getItem($(event.target).parents('.task-container').attr('data-id')));
  retrieveTask.quality = $($(event.target).siblings('.quality').children()).text();
  localStoreTask(retrieveTask);
}

function editTaskEnter(event) {
  var parseObj = JSON.parse(localStorage.getItem($(event.target).parents('.task-container').attr('data-id')));
  parseObj.title = $(event.target).parents('.task-container').children('.title-of-task').text();
  parseObj.body =  $(event.target).parents('.task-container').children('.body-of-task').text();
  localStoreTask(parseObj);
  document.activeElement.blur();
} 

function editTaskClick(event) {
  var parseObj = JSON.parse(localStorage.getItem($(event.target).parents('.task-container').attr('data-id')));
  parseObj.title = $(event.target).parents('.task-container').children('.title-of-task').text();
  parseObj.body =  $(event.target).parents('.task-container').children('.body-of-task').text();
  localStoreTask(parseObj);
}

function searchTask() {
  var value = $(this).val().toLowerCase();
  $(".task-container").filter(function() {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
  });
};

function enableSave() {
  if ($('.title-input').val().length === 0 || $('.body-input').val().length === 0) {
    $('.save-btn').prop('disabled', true);
    } else {
      $('.save-btn').prop('disabled', false);
    }  
};

function completeTask(event) {
  $(event.target).parents('.task-container').toggleClass('opacity');
  var parseObj = JSON.parse(localStorage.getItem($(event.target).parents('.task-container').attr('data-id')));
  parseObj.class = $(event.target).parents('.task-container').attr('class');
  parseObj.completed = (parseObj.completed) ? false : true;
  localStoreTask(parseObj);
}
  
function showCompletedTasks(event) {
  $(event.target).siblings().children('.hide').toggleClass('hide');
  $('.show').prop('disabled', true);
}

function showAllTasks() {
  $('.task-container').show();
}


function filterNone() {
  $(".task-container").filter(function() {
    $(this).toggle($(this).children('.quality').text().indexOf('None') > -1);
  });
};

function filterLow() {
  $(".task-container").filter(function() {
    $(this).toggle($(this).children('.quality').text().indexOf('Low') > -1);
  });
};

function filterNormal() {
  $(".task-container").filter(function() {
    $(this).toggle($(this).children('.quality').text().indexOf('Normal') > -1);
  });
};

function filterHigh() {
  $(".task-container").filter(function() {
    $(this).toggle($(this).children('.quality').text().indexOf('High') > -1);
  });
};

function filterCritical() {
  $(".task-container").filter(function() {
    $(this).toggle($(this).children('.quality').text().indexOf('Critical') > -1);
  });
};

function hideOldTasks() {
  if ($('.task-container').length === 11) {
    $('.task-container').slice(10).hide();
    $('.bottom-box').append(`<button class="show-button">Show All</button>`)
  } else if ($('.task-container').length > 10) {
    $('.task-container').slice(10).hide();
  }
  $('.show-button').on('click', showAllTasks);
}




