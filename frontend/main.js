const SERVER_URL = 'http://localhost:3000'
// Этап 1. В HTML файле создайте верстку элементов, которые будут статичны(неизменны).

// $(document).ready(function () {
//     $("#sort-table").DataTable();
// });

// Этап 2. Создайте массив объектов студентов.Добавьте в него объекты студентов, например 5 студентов.



async function serverAddStudent(obj) {
  let response = await fetch(SERVER_URL + '/api/students', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj),
  });

  let data = await response.json()

  return data;
}

async function serverGetStudents(obj) {
  let response = await fetch(SERVER_URL + '/api/students', {
    method: "GET",
    headers: { 'Content-Type': 'application/json' }
  });

  let data = await response.json()

  return data;
}
async function serverDeleteStudents(id) {
  let response = await fetch(SERVER_URL + '/api/students/' + id, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' }
  });

  let data = await response.json()

  return data;
}

// console.log(await serverGetStudents());
let serverData = await serverGetStudents();

let studentsList = [
  // Добавьте сюда объекты студентов

]
let renderList = []




if (serverData !== null) {
  studentsList = serverData;

  studentsList.forEach(student => {
    // console.log(student.surname);
    function courseCount(countDate) {
      let date = Math.floor((new Date() - new Date(countDate)) / 31557600000);
      if (countDate == student.studyStart) {
        if (date > 4) {
          return 'Закончил';
        }
        else return date + ' курс';
      }
      else return date;
    }
    let finishYear = Number(student.studyStart) + 4;
    let renderedName = student.surname + ' ' + student.name + ' ' + student.lastname;
    let renderedFaculty = student.faculty;
    let renderedAge = student.birthday + ' (' + courseCount(student.birthday) + ' лет)';
    let renderedStudyStart = student.studyStart + '-' + finishYear + ' (' + courseCount(student.studyStart) + ')';



    // Отрисовка таблицы
    let table = document.querySelector('#sort-table');
    let tbody = table.querySelector('tbody');
    let tr = document.createElement('tr');
    let nameCell = document.createElement('td');
    let facultyCell = document.createElement('td');
    let ageCell = document.createElement('td');
    let studyCell = document.createElement('td');
    let deleteCell = document.createElement('td');
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.classList.add('btn', 'btn-success');

    nameCell.innerHTML = renderedName;
    tr.appendChild(nameCell);
    facultyCell.innerHTML = renderedFaculty;
    tr.appendChild(facultyCell);
    ageCell.innerHTML = renderedAge;
    tr.appendChild(ageCell);
    studyCell.innerHTML = renderedStudyStart;
    tr.appendChild(studyCell);
    deleteCell.appendChild(deleteButton);
    tr.appendChild(deleteCell);
    tbody.appendChild(tr);

    deleteButton.addEventListener('click', async function () {
      await serverDeleteStudents(student.id);
      tr.remove();
    })
  })

}
console.log(studentsList);





// console.log(renderList);

// Валидация полей ввода
function validation() {
  let vaildationNumber = 0;
  let studyStartCheck = 0;
  let birthdayCheck = 0;
  form.querySelectorAll('input').forEach(function (el) {
    let trimmedUnit = el.value.trim();
    let number = document.querySelector('#startstudy').value;
    // console.log(trimmedUnit, number);
    if (trimmedUnit.length != 0 && trimmedUnit.length != undefined) {
      vaildationNumber += 1;
      // console.log(trimmedUnit);
      // console.log(trimmedUnit.length);
    }
    else {
      el.value = '';
      // console.log('Заполните поле', el.placeholder);
      let div = document.createElement('div');
      div.classList.add('alert-danger');
      submitButton.before(div);
      div.textContent = `Заполните поле ${el.placeholder}`;
    }

  })
  let studyStart = form.querySelector('#startstudy');
  let currentDate = new Date();
  let currentDateMs = Date.parse(currentDate);
  let currentYear = currentDate.getFullYear();
  if (studyStart.value >= 2000 && studyStart.value <= currentYear) {
    studyStartCheck += 1;
  }
  else {
    // console.log('startstudy error');

    let div = document.createElement('div');
    div.classList.add('alert-danger');
    submitButton.before(div);
    if (studyStart.value < 2000) {
      div.textContent = `Год начала обучения не должен быть ранее 2000`;
    }
    if (studyStart.value > currentYear) {
      div.textContent = `Год начала обучения не должен быть позднее ${currentYear}`;
    }
    studyStart.value = '';

  }
  let birthday = form.querySelector('#birthdate');
  let birthdayMs = Date.parse(birthday.value);
  let minDate = new Date('1900-01-01T00:00:00');
  let minDateMs = Date.parse(minDate);
  // console.log(birthdayMs);
  // console.log(minDateMs);
  // console.log(currentDateMs);
  // console.log(currentDateMs - birthdayMs);
  // console.log(birthdayMs - minDateMs);
  if (currentDateMs - birthdayMs >= 0 && birthdayMs - minDateMs >= 0) {
    birthdayCheck += 1;
  }
  else {
    // console.log('birthday error');
    let div = document.createElement('div');
    div.classList.add('alert-danger');
    submitButton.before(div);
    if (currentDateMs - birthdayMs < 0) {
      div.textContent = `Дата рождения должна быть не позднее ${currentDate}`;
    }
    if (birthdayMs - minDateMs < 0) {
      div.textContent = `Дата рождения должна быть не ранее ${minDate}`;
    }
    birthday.value = '';

  }
  if (vaildationNumber == form.children.length && studyStartCheck == 1 && birthdayCheck == 1) {
    isvalid = true;
    // console.log(isvalid);
    let divs = document.createElement('div');
    divs.classList.add('alert-success');
    submitButton.before(divs);
    divs.textContent = 'Данные успешно отправлены';
  }
  else {
    console.log('error');
  }
}

let submitButton = document.querySelector('.submit');
let form = document.querySelector('.studentform');

form.querySelector('#birthdate').max = new Date().toISOString().split("T")[0];

let isvalid = false;





submitButton.addEventListener('click', async function (event) {
  let student = { name: "", surname: "", lastname: "", birthday: "", studyStart: 0, faculty: "" };
  let renderStudent = { name: "", faculty: "", age: "", studyStart: "" };
  document.querySelectorAll('.alert-danger').forEach(function (el) {
    el.remove();
  })
  document.querySelectorAll('.alert-success').forEach(function (el) {
    el.remove();
  })
  event.preventDefault();


  let surname = form.querySelector('#surname').value.trim();
  if (surname.length == '' || surname.length == undefined) {
    // console.log('Заполните поле surname');
    let span = document.createElement('span');
    span.classList.add('alert-danger');
  }
  // console.log(surname);
  // console.log(surname.length);
  let mainname = form.querySelector('#mainname').value.trim();
  let lastname = form.querySelector('#middlename').value.trim();
  let birthday = form.querySelector('#birthdate').value.trim();
  let studyStart = form.querySelector('#startstudy').value.trim();
  let faculty = form.querySelector('#faculty').value.trim();

  validation();

  if (isvalid == true) {
    student.name = mainname;
    student.surname = surname;
    student.lastname = lastname;
    student.birthday = birthday;
    student.studyStart = studyStart;
    student.faculty = faculty;
    let serverDataObj = await serverAddStudent(student);
    // console.log(await serverAddStudent(student));
    studentsList.push(serverDataObj);

    console.log(studentsList);
    form.querySelectorAll('input').forEach(function (e) {
      e.value = '';
    })
    isvalid = false;

    function courseCount(countDate) {
      let date = Math.floor((new Date() - new Date(countDate)) / 31557600000);
      if (countDate == studyStart) {
        if (date > 4) {
          return 'Закончил';
        }
        else return date + ' курс';
      }
      else return date;
    }
    let finishYear = Number(studyStart) + 4;
    // let renderedName = surname + ' ' + mainname + ' ' + lastname;
    // let renderedFaculty = faculty;
    // let renderedAge = birthday + ' (' + courseCount(birthday) + ' лет)';
    // let renderedStudyStart = studyStart + '-' + finishYear + ' (' + courseCount(studyStart) + ')';

    renderStudent.name = surname + ' ' + mainname + ' ' + lastname;
    renderStudent.faculty = faculty;
    renderStudent.age = birthday + ' (' + courseCount(birthday) + ' лет)';
    renderStudent.studyStart = studyStart + '-' + finishYear + ' (' + courseCount(studyStart) + ')';
    console.log(renderStudent);
    // renderList.push(renderStudent);
    // let serverDataObj = await serverAddStudent(renderStudent);
    // console.log(await serverAddStudent(renderStudent));
    // renderList.push(serverDataObj);
    console.log(renderList);


    // Отрисовка таблицы
    let table = document.querySelector('#sort-table');
    let tbody = table.querySelector('tbody');
    let tr = document.createElement('tr');
    let nameCell = document.createElement('td');
    let facultyCell = document.createElement('td');
    let ageCell = document.createElement('td');
    let studyCell = document.createElement('td');
    let deleteCell = document.createElement('td');
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.classList.add('btn', 'btn-success');

    nameCell.innerHTML = renderStudent.name;
    tr.appendChild(nameCell);
    facultyCell.innerHTML = renderStudent.faculty;
    tr.appendChild(facultyCell);
    ageCell.innerHTML = renderStudent.age;
    tr.appendChild(ageCell);
    studyCell.innerHTML = renderStudent.studyStart;
    tr.appendChild(studyCell);
    deleteCell.appendChild(deleteButton);
    tr.appendChild(deleteCell);
    tbody.appendChild(tr);





  }

})




// Сортировка
document.querySelectorAll('.sort-button').forEach(function (el) {
  el.addEventListener('click', function () {
    let table = document.querySelector('#sort-table');
    let tbody = table.querySelector('tbody');


    let name = el.getAttribute('name');
    let sort = renderList.sort(function (a, b) {
      if (name == 'fio') {

        if (a['name'] < b['name']) return -1;
      }
      if (name == 'faculty') {
        if (a['faculty'] < b['faculty']) return -1;
      }
      if (name == 'birthday') {
        if (a['age'] < b['age']) return -1;
      }
      if (name == 'study') {
        if (a['studyStart'] < b['studyStart']) return -1;
      }


    });
    // console.log(sort);
    tbody.querySelectorAll('tr').forEach(function (el) {
      el.remove();
    })


    for (let student of renderList) {
      let tr = document.createElement('tr');
      let nameCell = document.createElement('td');
      let facultyCell = document.createElement('td');
      let ageCell = document.createElement('td');
      let studyCell = document.createElement('td');
      nameCell.innerHTML = student.name;
      tr.appendChild(nameCell);
      facultyCell.innerHTML = student.faculty
      tr.appendChild(facultyCell);
      ageCell.innerHTML = student.age;
      tr.appendChild(ageCell);
      studyCell.innerHTML = student.studyStart;
      tr.appendChild(studyCell);
      tbody.appendChild(tr);
    }


  })
})

// Фильтр
document.querySelectorAll('input').forEach(function (el) {
  let role = el.getAttribute("data-role");
  if (role && role == "filter") {
    let dataName = el.getAttribute('data-name');
    el.addEventListener('keyup', function () {
      let content = el.value;
      let table = document.querySelector('#sort-table');
      let tbody = table.querySelector('tbody');
      tbody.querySelectorAll('tr').forEach(function (e) {
        if (content == '') {
          e.style.display = 'table-row';
        }
        function filter(index) {
          let firstCell = e.children[index].textContent;
          let firstCellIndex = firstCell.indexOf(content);
          if (firstCellIndex == -1) {
            e.style.display = 'none';
          }
          if (dataName == 'studyStart') {
            firstCell = firstCell.slice(0, 4);
          }
          if (dataName == 'endstudy') {
            firstCell = firstCell.slice(5, 9);
          }
        }
        if (dataName == 'fio') {
          filter(0);
        }
        if (dataName == 'faculty') {
          filter(1);
        }
        if (dataName == 'studyStart' || dataName == 'endstudy') {
          filter(3);
        }



      })
    })
  }
})















// console.log(studentsList);
// Этап 3. Создайте функцию вывода одного студента в таблицу, по аналогии с тем, как вы делали вывод одного дела в модуле 8. Функция должна вернуть html элемент с информацией и пользователе.У функции должен быть один аргумент - объект студента.

function getStudentItem(studentObj) {

}

// Этап 4. Создайте функцию отрисовки всех студентов. Аргументом функции будет массив студентов.Функция должна использовать ранее созданную функцию создания одной записи для студента.Цикл поможет вам создать список студентов.Каждый раз при изменении списка студента вы будете вызывать эту функцию для отрисовки таблицы.

function renderStudentsTable(studentsArray) {

}

// Этап 5. К форме добавления студента добавьте слушатель события отправки формы, в котором будет проверка введенных данных.Если проверка пройдет успешно, добавляйте объект с данными студентов в массив студентов и запустите функцию отрисовки таблицы студентов, созданную на этапе 4.


// Этап 5. Создайте функцию сортировки массива студентов и добавьте события кликов на соответствующие колонки.

// Этап 6. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы.

