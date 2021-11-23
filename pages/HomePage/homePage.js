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

let switchBtn = document.getElementById("switch-button");
switchBtn.addEventListener("click", ()=> isGroup());
//dias del mes actual
let aux = new Date();
var auxCurrentDate = {
    day: aux.getDay(),
    month: aux.getMonth(),
    year: aux.getFullYear()
}
var acd;
var groupMode = false;
/** CALENDARIO */
function writeMonth(month) {

    //dias del mes pasado visibles en el mes actual
    for(let i = startDay(); i>0;i--){
        if(monthNumber === 0){
            acd = `${getTotalDays(monthNumber-1)-(i-1)}-12-${currentYear-1}`;
        }else{
            acd = `${getTotalDays(monthNumber-1)-(i-1)}-${monthNumber}-${currentYear}`;
        }
        
        dates.innerHTML += 
        ` <div id="divLastDay${acd}" class="calendar__item calendar__last-days">
            <div id="day${acd}" class="day d-flex justify-content-center">
               ${getTotalDays(monthNumber-1)-(i-1)}
            </div>
            
        </div>`;

    }
    //dias del mes actual
    for(let i=1; i<=getTotalDays(month); i++){
        let day = (i < 10) ? "0" + i: i;
        let month = (monthNumber + 1 < 10) ? "0" + (monthNumber + 1): monthNumber + 1;
        if(i===currentDay && monthNumber === aux.getMonth() && currentYear === aux.getFullYear()) {
            dates.innerHTML += `
            <div id="div${day}-${month}-${currentYear}" class="calendar__today divTxtDayEvent">
                <div id="day${day}-${month}-${currentYear}" class="day d-flex justify-content-center ">
                    ${i}
                </div>

            </div>`;
        }else{
            acd = ``;
            dates.innerHTML += `
            <div id="divDay${day}-${month}-${currentYear}" class="divTxtDayEvent calendar__item">
                <div id="day${day}-${month}-${currentYear}" class="day">
                    ${i}
                </div>
            </div>
            
            
            `;
        }
    }
    //dias del mes proximo en el mes actual
    let j = 1;
    for(let i = lastDay(); i < 6;i++){
        acd = `${j}-${month}-${currentYear}`;
        dates.innerHTML += `
        <div id="divPostDay${acd}" class="calendar__item calendar__last-days">
            <div id="day${acd}" class="day">
                ${j}
            </div>
        </div>`;
        j++;
    }

    //UNA VEZ CARGADO EL CALENDARIO, CARGAMOS LOS EVENTOS
    showIndividualEvents();

    if(groupMode){
        console.log("su valor sigue siendo", groupMode)
        showGroupEvents();
    }else{
        console.log("su valor sigue siendo", groupMode)
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

let btnLogout = document.getElementById("btnLogout");
btnLogout.addEventListener('click', () => {
    sessionStorage.removeItem('user');
    window.location.href = "http://127.0.0.1:5500/pages/index/index.html";
})

// CONEXION A LA BASE DE DATOS MEDIANTE PETICIONES REST
getCurrentUser().then((user) => {
    getUserEvents(user).then((events) => {
        var today = new Date();
        var n = 0;
        events.forEach((event) => {
            let ed = new Date(event.date.split('-').reverse().join('-'));
            if(ed > today) {
                if(n < 5) {
                    if(event.group !== undefined) {
                        $(".ulNearEvent").append(`<li class="nearEvent bg-orange" id=event${event.uuid}><a href="http://127.0.0.1:5500/pages/eventpages/updateevent.html" class="c-white event-link">${event.date}, ${event.name} (Grupo: ${event.group})</a></li>`);
                    } else {
                        $(".ulNearEvent").append(`<li class="nearEvent bg-orange" id=event${event.uuid}><a href="http://127.0.0.1:5500/pages/eventpages/updateevent.html" class="c-white event-link">${event.date}, ${event.name}</a></li>`);
                    }
                    document.getElementById("event" + event.uuid).addEventListener("click", (e) => {
                        e.preventDefault();
                        saveEvent(event);
                        window.location.replace("http://127.0.0.1:5500/pages/eventpages/updateevent.html");
                    });
                }
                n++;
            } else {
                n = (n > 0) ? n - 1 : 0;
            }
        });
    });
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

function saveEvent(event) {
    localStorage.setItem('event', JSON.stringify(event));
}

var modalWrap = null;
/**
 * 
 * @param {string} title 
 * @param {string} description content of modal body 
 * @param {string} closeBtnLabel label of close button 
 * @param {string} goBtnLabel label of go button 
 * @param {function} callback callback function when click goButton
 */
const showModal = (title, description, closeBtnLabel, goBtnLabel, callback) => {
  if (modalWrap !== null) {
    modalWrap.remove();
  }

  modalWrap = document.createElement('div');
  modalWrap.innerHTML = `
    <div class="modal fade" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-light">
            <h5 class="modal-title">${title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>${description}</p>
          </div>
          <div class="modal-footer bg-light">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">${closeBtnLabel}</button>
            <button type="button" class="btn btn-primary modal-success-btn" data-bs-dismiss="modal">${goBtnLabel}</button>
          </div>
        </div>
      </div>
    </div>
  `;

  modalWrap.querySelector('.modal-success-btn').onclick = callback;
  document.body.append(modalWrap);
  var modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
  modal.show();
}


function isGroup(){
    if(groupMode){
        console.log("el valor era: ", groupMode);
        groupMode = !groupMode;
        console.log("Ahora es: ", groupMode);
        clearGroupEvents().then( ()=>{

        });
        
    }else{
        console.log("el valor era: ", groupMode);
        groupMode = !groupMode;
        console.log("Ahora es: ", groupMode);
        dates.innerHTML = '';
        writeMonth(monthNumber);
    }
}

var geArr = [];
async function showGroupEvents(){
    getCurrentUser().then(({groupid}) =>{
        groupid.forEach(id =>{
            getGroupById(id).then(({name, events}) =>{
                //UNA VEZ CARGADO EL CALENDARIO, CARGAMOS LOS EVENTOS
                mostrarEventoListado().then(({fechas,eventos}) => {
                    $('#dates').find('div').each(function(){
                        var divIds = $(this).attr('id');
                        eventos = events;

                        //mes visible anterior
                        

                        //mes actual
                        if(divIds.startsWith("divDay")){
                            var idNumerico= ($(this)[0].id).replace("divDay","");
                            for(var i = 0; i < eventos.length; i++){
                                if(idNumerico === eventos[i].date){
                                    eventos[i].group = name;
                                    $($(this)).append(
                                        `<div id="groupEventDay${eventos[i].id}"  class="groupEvent txtDayEvent bg-blue">
                                            ${eventos[i].name}
                                        </div>
                                    `);
                                    geArr.push(eventos);
                                                        
                                    var eventId=`groupEventDay${eventos[i].id}`;
                                    $(`#${eventId}`).click((e)=>{
                                        //coger el param y obtener id para buscar su info y cargarla
                                        var idOriginal = e.target.id;
                                        var auxId = idOriginal.replace("groupEventDay", "");
                                        for(var i = 0; i < eventos.length; i++){
                                            if(eventos[i].id == auxId){
                                                
                                                saveEvent(eventos[i]);
                                                showModal(`${eventos[i].name}`, `${eventos[i].description}`, "Cerrar", "Editar", (j) => {
                                                    window.location.href = "http://127.0.0.1:5500/pages/eventpages/updateevent.html";
                                                });
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    });
                });
            });
        });
    })
}

async function showIndividualEvents() {
    mostrarEventoListado().then(({fechas,eventos}) => {
        $('#dates').find('div').each(function(){
            var divIds = $(this).attr('id');

            //MES ANTERIOR VISIBLE
            if(divIds.startsWith("divLastDay")){
                var idNumerico= ($(this)[0].id).replace("divLastDay","");
                for(var i = 0; i < eventos.length; i++){
                    if(idNumerico === eventos[i].date){
                        $($(this)).append(
                            `<div id="lastEventDay${idNumerico}" class="txtDayEvent bg-orange">
                                ${eventos[i].name}
                            </div>`);
                    }
                }   
            }
    
            //MES ACTUAL
            if(divIds.startsWith("divDay")){
                var idNumerico= ($(this)[0].id).replace("divDay","");
                var geArr = [];
                for(var i = 0; i < eventos.length; i++){
                    if(idNumerico === eventos[i].date){

                        $($(this)).append(
                            `<div id="eventDay${eventos[i].id}"  class="txtDayEvent bg-orange">
                                ${eventos[i].name}
                            </div>
                        `);
                        geArr.push(eventos);
                                            
                        var eventId=`eventDay${eventos[i].id}`;
                        $(`#${eventId}`).click((e)=>{
                            //coger el param y obtener id para buscar su info y cargarla
                            var idOriginal = e.target.id;
                            var auxId = idOriginal.replace("eventDay", "");
                            for(var i = 0; i < eventos.length; i++){
                                if(eventos[i].id == auxId){
                                    saveEvent(eventos[i]);
                                    showModal(`${eventos[i].name}`, `${eventos[i].description}`, "Cerrar", "Editar", (j) => {
                                        window.location.href = "http://127.0.0.1:5500/pages/eventpages/updateevent.html";
                                    });
                                }
                            }
                        });
                    }
                }
     
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

async function clearGroupEvents(){
    getCurrentUser().then(({groupid}) =>{
        groupid.forEach(id =>{
            getGroupById(id).then(({events}) =>{
                mostrarEventoListado().then(({fechas,eventos}) => {
                    $('#dates').find('div').each(function(){
                        var divIds = $(this).attr('id');
                        eventos = events;

                        
                           
                        //MES ACTUAL
                        if(divIds.startsWith("divDay")){
                            $(`#${divIds}`).find("div").each(function(e){
                                var divIds = $(this).attr('id');         
                                if(divIds.startsWith("groupEventDay")){
                                    $(`#${divIds}`).remove();
                                }
                            });
                        }

                    });
                });
            });
        });
    })
}