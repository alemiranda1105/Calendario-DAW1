

let monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'];

let currentDate = new Date();
let currentDay = currentDate.getDate();
let monthNumber = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

let dates = document.getElementById('dates');
let month = document.getElementById('month');
let year = document.getElementById('year');

let prevMonthDOM = document.getElementById('prev-month');
let nextMonthDOM = document.getElementById('next-month');

month.textContent = monthNames[monthNumber];
year.textContent = currentYear.toString();

prevMonthDOM.addEventListener('click', ()=>lastMonth());
nextMonthDOM.addEventListener('click', ()=>nextMonth());


/** CALENDARIO */
const writeMonth = (month) => {

    //dias del mes pasado visibles en el mes actual
    for(let i = startDay(); i>0;i--){
        dates.innerHTML += 
        ` <div id="meses" class="calendar__dates calendar__item calendar__last-days">
            <div class="d-flex">
               ${getTotalDays(monthNumber-1)-(i-1)}
            </div>
            
        </div>`;
    }

    //dias del mes actual
    let auxCurrentDate = new Date();
    for(let i=1; i<=getTotalDays(month); i++){
        if(i===currentDay && monthNumber === auxCurrentDate.getMonth() && currentYear === auxCurrentDate.getFullYear()) {
            dates.innerHTML += `
            <div class="calendar__today">
                <div class="divTxtDayEvent">
                    
                    <div class="d-flex justify-content-center">
                        ${i}
                    </div>

                    <div class="txtDayEvent bg-grey">
                        numero1: ${i}
                    </div>
                    <div class="txtDayEvent bg-blue">
                        numero1: ${i}
                    </div>
                    <div class="txtDayEvent bg-orange">
                        numero1: ${i}
                    </div>
                </div>
            </div>`;
        }else{
            dates.innerHTML += `
            <div class=" calendar__item">
                <div id="${i}"" class="divTxtDayEvent">
                    <div class="">
                        ${i}
                    </div>

                    <div class="txtDayEvent bg-blue">
                        numero1: ${i}
                    </div>

                    <div class="txtDayEvent bg-orange">
                        numero1: ${i}
                    </div>

                    <div class="txtDayEvent bg-danger">
                        numero1: ${i}
                    </div>
                </div>
            </div>`;
        }
    }

    //dias del mes proximo en el mes actual
    let j = 1;
    for(let i = lastDay(); i < 6;i++){
        dates.innerHTML += 
        ` <div id="meses" class="calendar__dates calendar__item calendar__last-days">
            ${j}
        </div>`;
        j++;
    }

}

const getTotalDays = month => {
    if(month === -1) month = 11;

    if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
        return  31;

    } else if (month == 3 || month == 5 || month == 8 || month == 10) {
        return 30;

    } else {
        return isLeap() ? 29:28;
    }
}

const isLeap = () => {
    return ((currentYear % 100 !==0) && (currentYear % 4 === 0) || (currentYear % 400 === 0));
}

const startDay = () => {
    let start = new Date(currentYear, monthNumber, 1);
    return ((start.getDay()-1) === -1) ? 6 : start.getDay()-1;
}

const lastDay = () => {
    let last = new Date(currentYear, monthNumber, getTotalDays(monthNumber));
    console.log(last);
    return ((last.getDay()-1) === -1) ? 6 : last.getDay()-1;
}

const lastMonth = () => {
    if(monthNumber !== 0){
        monthNumber--;
    }else{
        monthNumber = 11;
        currentYear--;
    }

    setNewDate();
}

const nextMonth = () => {
    if(monthNumber !== 11){
        monthNumber++;
    }else{
        monthNumber = 0;
        currentYear++;
    }
    setNewDate();
}

const setNewDate = () => {
    currentDate.setFullYear(currentYear,monthNumber,currentDay);
    month.textContent = monthNames[monthNumber];
    year.textContent = currentYear.toString();
    dates.textContent = '';
    writeMonth(monthNumber);
}

writeMonth(monthNumber);

/** MENU DESPLEGABLE */

const btnToggle = document.querySelector('.toggle-btn');
const btnToggleMenu = document.querySelector('#toggleMenu');

btnToggle.addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('divMainContent').classList.toggle('active');
});

btnToggleMenu.addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('divMainContent').classList.remove('active');
});


// CONEXION A LA BASE DE DATOS MEDIANTE PETICIONES REST
var datos;
getCurrentUser().then((user) =>{
    var listado = [];
    for(let i = 0; i < user.events.length; i++) {
        listado[i] = user.events[i];
        $(".ulNearEvent").append(`<li class="nearEvent bg-orange">${user.events[i].date}, ${user.events[i].name}</li>`);
    }
});

let btnLogout = document.getElementById("btnLogout");

btnLogout.addEventListener('click', () => {
    sessionStorage.removeItem('user');
    window.location.href = "http://127.0.0.1:5500/pages/login/login.html";
})
