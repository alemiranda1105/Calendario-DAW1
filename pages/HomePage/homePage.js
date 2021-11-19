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

//dias del mes actual
let aux = new Date();
var auxCurrentDate = {
    day: aux.getDate(),
    month: aux.getMonth(),
    year: aux.getFullYear()
}

var acd;
var monthYear = `${auxCurrentDate.month+1}-${auxCurrentDate.year}`;
/** CALENDARIO */
function writeMonth(month) {

    //dias del mes pasado visibles en el mes actual
    for(let i = startDay(); i>0;i--){
        if(monthNumber === 0){
            acd = `${getTotalDays(monthNumber-1)-(i-1)}-12-${auxCurrentDate.year-1}`;
        }else{
            acd = `${getTotalDays(monthNumber-1)-(i-1)}-${monthNumber}-${auxCurrentDate.year}`;
        }
        
        dates.innerHTML += 
        ` <div id="divLastDay${acd}" class="calendar__item calendar__last-days">
            <div id="day${acd}" class="d-flex justify-content-center">
               ${getTotalDays(monthNumber-1)-(i-1)}
            </div>
            
        </div>`;

    }
    for(let i=1; i<=getTotalDays(month); i++){
        acd = `${i}-${auxCurrentDate.month+1}-${auxCurrentDate.year}`;
        if(i===currentDay && monthNumber === aux.getMonth() && currentYear === aux.getFullYear()) {
            dates.innerHTML += `
            <div id="div${auxCurrentDate.day}-${auxCurrentDate.month+1}-${auxCurrentDate.year}" class="calendar__today divTxtDayEvent">
                <div id="day${auxCurrentDate.day}-${auxCurrentDate.month+1}-${auxCurrentDate.year}" class="d-flex justify-content-center">
                    ${i}
                </div>

                <div id="eventDay${auxCurrentDate.day}-${auxCurrentDate.month+1}-${auxCurrentDate.year}" class="txtDayEvent bg-grey">
                    numero: ${i} 
                </div>
            </div>`;
        }else{
            acd = `${i}-${auxCurrentDate.month+1}-${auxCurrentDate.year}`;
            dates.innerHTML += `
            <div id="divDay${acd}" class="divTxtDayEvent calendar__item">
                <div id="day${acd}">
                    ${i}
                </div>
            </div>`;
        }
    }

    //dias del mes proximo en el mes actual
    let j = 1;
    for(let i = lastDay(); i < 6;i++){
        acd = `${j}-${auxCurrentDate.month+2}-${auxCurrentDate.year}`;
        dates.innerHTML += `
        <div id="divPostDay${acd}" class="calendar__item calendar__last-days">
            <div id="day${acd}">
                ${i}
            </div>
        </div>`;
        j++;
    }

    //UNA VEZ CARGADO EL CALENDARIO, CARGAMOS LOS EVENTOS
    mostrarEventoListado().then(({fechas,eventos}) => {
        console.log("fecha", fechas);
        console.log("eventos", eventos);
    
        $('#dates').find('div').each(function(){
            var divIds = $(this).attr('id');

            //MES ANTERIOR VISIBLE
            if(divIds.startsWith("divLastDay")){
                var idNumerico= ($(this)[0].id).replace("divLastDay","");
                for(var i = 0; i < eventos.length; i++){
                    if(idNumerico === eventos[i].date){
                        $($(this)).append(
                            `<div id="lastEventDay${idNumerico}" class="txtDayEvent bg-blue">
                                ${eventos[i].name}
                            </div>`);
                    }
                }   
            }
    
            //MES ACTUAL
            if(divIds.startsWith("divDay")){
                var idNumerico= ($(this)[0].id).replace("divDay","");
                for(var i = 0; i < eventos.length; i++){
                    if(idNumerico === eventos[i].date){
                        $($(this)).append(
                            `<div id="eventDay${idNumerico}" class="txtDayEvent bg-blue">
                                ${eventos[i].name}
                            </div>`);
                    }
                }
    
                //CLICK EN EL EVENTO TE LLEVA A EDITAR ESE EVENTO
                var id = `eventDay${idNumerico}`;
                $(`#${id}`).click((e)=>{
                    alert(`${id}`);
    
                    e.stopPropagation();
                })
            }
    
            //MES PROXIMO VISIBLE
            if(divIds.startsWith("divPostDay")){
                var idNumerico= ($(this)[0].id).replace("divPostDay","");
                for(var i = 0; i < eventos.length; i++){
                    if(idNumerico === eventos[i].date){
                        $($(this)).append(
                            `<div id="postEventDay${idNumerico}-${i}" class="txtDayEvent bg-blue">
                                ${eventos[i].name}
                            </div>`);
                    }
                }   
            }
        });
    });
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
    return ((last.getDay()-1) === -1) ? 6 : last.getDay()-1;
}

const lastMonth = () => {
   
    if(monthNumber !== 0){
        monthNumber--;
        auxCurrentDate.month--;
    }else{
        monthNumber = 11;
        currentYear--;
        auxCurrentDate.year--;
    }
    setNewDate();
}

const nextMonth = () => {
    if(monthNumber !== 11){
        monthNumber++;
        auxCurrentDate.month++;
    }else{
        monthNumber = 0;
        currentYear++;
        auxCurrentDate.month = 0;
        auxCurrentDate.year++;
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


let btnLogout = document.getElementById("btnLogout");
btnLogout.addEventListener('click', () => {
    sessionStorage.removeItem('user');
    window.location.href = "http://127.0.0.1:5500/pages/login/login.html";
})

// CONEXION A LA BASE DE DATOS MEDIANTE PETICIONES REST
getCurrentUser().then((user) =>{
    var listado = [];
    for(let i = 0; i < user.events.length; i++) {
        listado[i] = user.events[i];
        $(".ulNearEvent").append(`<li class="nearEvent bg-orange">${user.events[i].date}, ${user.events[i].name}</li>`);
    }
});

var auxFecha = [];
async function mostrarEventoListado(){
    var resp = getCurrentUser().then((user) =>{
        var listado = [];
        var fechas ={}, eventos=[];
        for(let i = 0; i < user.events.length; i++) {
            listado[i] = user.events[i];
            var aux = listado[i].date;           
            var date = aux.split("-");
            
            auxFecha[i] = {
                day: parseInt(date[0]),
                month: parseInt(date[1]),
                year: parseInt(date[2])
            }
            fechas[i] = auxFecha[i];
            eventos[i] = user.events[i];
        }
        return {fechas,eventos};
    });

    return resp;
}

