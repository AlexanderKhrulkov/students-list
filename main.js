// Этап 1. В HTML файле создайте верстку элементов, которые будут статичны(неизменны).

// $(document).ready(function () {
//     $("#sort-table").DataTable();
// });

// Этап 2. Создайте массив объектов студентов.Добавьте в него объекты студентов, например 5 студентов.

const studentsList = [
    // Добавьте сюда объекты студентов

]
const renderList = []

// Валидация полей ввода
function validation() {
    let vaildationNumber = 0;
    let startstudyCheck = 0;
    let birthdateCheck = 0;
    form.querySelectorAll('input').forEach(function (el) {
        let trimmedUnit = el.value.trim();
        let number = document.querySelector('#startstudy').value;
        console.log(trimmedUnit, number);
        if (trimmedUnit.length != 0 && trimmedUnit.length != undefined) {
            vaildationNumber += 1;
            console.log(trimmedUnit);
            console.log(trimmedUnit.length);
        }
        else {
            el.value = '';
            console.log('Заполните поле', el.placeholder);
            let div = document.createElement('div');
            div.classList.add('alert-danger');
            submitButton.before(div);
            div.textContent = `Заполните поле ${el.placeholder}`;
        }

    })
    let startstudy = form.querySelector('#startstudy');
    let currentDate = new Date();
    let currentDateMs = Date.parse(currentDate);
    let currentYear = currentDate.getFullYear();
    if (startstudy.value >= 2000 && startstudy.value <= currentYear) {
        startstudyCheck += 1;
    }
    else {
        console.log('startstudy error');

        let div = document.createElement('div');
        div.classList.add('alert-danger');
        submitButton.before(div);
        if (startstudy.value < 2000) {
            div.textContent = `Год начала обучения не должен быть ранее 2000`;
        }
        if (startstudy.value > currentYear) {
            div.textContent = `Год начала обучения не должен быть позднее ${currentYear}`;
        }
        startstudy.value = '';

    }
    let birthdate = form.querySelector('#birthdate');
    let birthdateMs = Date.parse(birthdate.value);
    let minDate = new Date('1900-01-01T00:00:00');
    let minDateMs = Date.parse(minDate);
    console.log(birthdateMs);
    console.log(minDateMs);
    console.log(currentDateMs);
    console.log(currentDateMs - birthdateMs);
    console.log(birthdateMs - minDateMs);
    if (currentDateMs - birthdateMs >= 0 && birthdateMs - minDateMs >= 0) {
        birthdateCheck += 1;
    }
    else {
        console.log('birthdate error');
        let div = document.createElement('div');
        div.classList.add('alert-danger');
        submitButton.before(div);
        if (currentDateMs - birthdateMs < 0) {
            div.textContent = `Дата рождения должна быть не позднее ${currentDate}`;
        }
        if (birthdateMs - minDateMs < 0) {
            div.textContent = `Дата рождения должна быть не ранее ${minDate}`;
        }
        birthdate.value = '';

    }
    if (vaildationNumber == form.children.length && startstudyCheck == 1 && birthdateCheck == 1) {
        isvalid = true;
        console.log(isvalid);
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





submitButton.addEventListener('click', function (event) {
    let student = { name: "", surname: "", middlename: "", birthdate: "", startstudy: 0, faculty: "" };
    let renderStudent = { name: "", faculty: "", age: "", startstudy: "" };
    document.querySelectorAll('.alert-danger').forEach(function (el) {
        el.remove();
    })
    document.querySelectorAll('.alert-success').forEach(function (el) {
        el.remove();
    })
    event.preventDefault();


    let surname = form.querySelector('#surname').value.trim();
    if (surname.length == '' || surname.length == undefined) {
        console.log('Заполните поле surname');
        let span = document.createElement('span');
        span.classList.add('alert-danger');
    }
    console.log(surname);
    console.log(surname.length);
    let mainname = form.querySelector('#mainname').value.trim();
    let middlename = form.querySelector('#middlename').value.trim();
    let birthdate = form.querySelector('#birthdate').value.trim();
    let startstudy = form.querySelector('#startstudy').value.trim();
    let faculty = form.querySelector('#faculty').value.trim();

    validation();

    if (isvalid == true) {
        student.name = mainname;
        student.surname = surname;
        student.middlename = middlename;
        student.birthdate = birthdate;
        student.startstudy = startstudy;
        student.faculty = faculty;
        console.log(student);
        studentsList.push(student);
        console.log(studentsList);
        form.querySelectorAll('input').forEach(function (e) {
            e.value = '';
        })
        isvalid = false;

        function courseCount(countDate) {
            let date = Math.floor((new Date() - new Date(countDate)) / 31557600000);
            if (countDate == startstudy) {
                if (date > 4) {
                    return 'Закончил';
                }
                else return date + ' курс';
            }
            else return date;
        }
        let finishYear = Number(startstudy) + 4;
        renderStudent.name = surname + ' ' + mainname + ' ' + middlename;
        renderStudent.faculty = faculty;
        renderStudent.age = birthdate + ' (' + courseCount(birthdate) + ' лет)';
        renderStudent.startstudy = startstudy + '-' + finishYear + ' (' + courseCount(startstudy) + ')';
        renderList.push(renderStudent);
        console.log(renderList);


        // Отрисовка таблицы
        let table = document.querySelector('#sort-table');
        let tbody = table.querySelector('tbody');
        let tr = document.createElement('tr');
        let nameCell = document.createElement('td');
        let facultyCell = document.createElement('td');
        let ageCell = document.createElement('td');
        let studyCell = document.createElement('td');

        nameCell.innerHTML = renderStudent.name;
        tr.appendChild(nameCell);
        facultyCell.innerHTML = renderStudent.faculty
        tr.appendChild(facultyCell);
        ageCell.innerHTML = renderStudent.age;
        tr.appendChild(ageCell);
        studyCell.innerHTML = renderStudent.startstudy;
        tr.appendChild(studyCell);
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
            if (name == 'birthdate') {
                if (a['age'] < b['age']) return -1;
            }
            if (name == 'study') {
                if (a['startstudy'] < b['startstudy']) return -1;
            }


        });
        console.log(sort);
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
            studyCell.innerHTML = student.startstudy;
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
            tbody.querySelectorAll('tr').forEach(function(e) {
                if (content == '') {
                    e.style.display = 'table-row';
                }
                function filter(index) {
                    let firstCell = e.children[index].textContent;
                    let firstCellIndex = firstCell.indexOf(content);
                    if (firstCellIndex == -1) {
                        e.style.display = 'none';
                    }
                    if (dataName == 'startstudy') {
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
                if (dataName == 'startstudy' || dataName == 'endstudy') {
                    filter(3);
                }
                
                

            })
        })
    }
})
