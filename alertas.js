const addNotification = document.getElementById("addNotification");
const confNotification = document.getElementById("confNotification");
const tipoNotification = document.getElementById("tipoNotification");
let valorVariacao = document.querySelector("#valorVariacao");
const cancelBtn = document.getElementById("cancelBtn");
const selectNotification = document.getElementById("selectNotification");
const creatBtn = document.getElementById("creatBtn");
const alertNotification = document.getElementById("alertNotification"); 
let NotificationVisor = document.getElementById("NotificationVisor");
const lis = NotificationVisor.getElementsByTagName("li");
const confirmDelete = document.getElementById("confirmDelete");
const SimDelete = document.getElementById("SimDelete");
const cancelarDelete = document.getElementById("cancelarDelete");
let tipoDeVariacaoVisor = "Quando houver variação";
let creatDate = new Date();
let dife;
let tipDife = ">";
let apiUrl;
let variationBolean = false;
let Notifications = [];

addNotification.addEventListener("click", function () {
    confNotification.style.display = "block";
    notificacao.style.display = "none";
    menu.style.display = "none";
    disabledCreatBtn();
});
selectNotification.addEventListener("change", function () {
    if (selectNotification.value == "EUR") {
        apiUrl = "https://brapi.dev/api/v2/currency?currency=EUR-BRL";
        disabledCreatBtn();
    } else if (selectNotification.value == "USD") {
        apiUrl = "https://brapi.dev/api/v2/currency?currency=USD-BRL";
        disabledCreatBtn();
    } else if (selectNotification.value == "BTC") {
        apiUrl = "https://brapi.dev/api/v2/currency?currency=BTC-BRL";
        disabledCreatBtn();
    } else if (selectNotification.value == "JPY") {
        apiUrl = "https://brapi.dev/api/v2/currency?currency=JPY-BRL";
        disabledCreatBtn();
    } else if (selectNotification.value == "GBP") {
        apiUrl = "https://brapi.dev/api/v2/currency?currency=GBP-BRL";
        disabledCreatBtn();
    } else if (selectNotification.value == "AUD") {
        apiUrl = "https://brapi.dev/api/v2/currency?currency=AUD-BRL";
        disabledCreatBtn();
    } else if (selectNotification.value == "CAD") {
        apiUrl = "https://brapi.dev/api/v2/currency?currency=CAD-BRL";
        disabledCreatBtn();
    } else if (selectNotification.value == "MGLU3") {
        apiUrl = "https://brapi.dev/api/quote/MGLU3";
        disabledCreatBtn();
    } else if (selectNotification.value == "VALE3") {
        apiUrl = "https://brapi.dev/api/quote/VALE3";
        disabledCreatBtn();
    } else if (selectNotification.value == "PETR4") {
        apiUrl = "https://brapi.dev/api/quote/PETR4";
        disabledCreatBtn();
    } else if (selectNotification.value == "ITUB4") {
        apiUrl = "https://brapi.dev/api/quote/ITUB4";
        disabledCreatBtn();
    } else if (selectNotification.value == "BBDC4") {
        apiUrl = "https://brapi.dev/api/quote/BBDC4";
        disabledCreatBtn();
    } else if (selectNotification.value == "ASAI3") {
        apiUrl = "https://brapi.dev/api/quote/ASAI3";
        disabledCreatBtn();
    } else if (selectNotification.value == "ELET6") {
        apiUrl = "https://brapi.dev/api/quote/ELET6";
        disabledCreatBtn();
    };
});
tipoNotification.addEventListener("change", function () {
    if (tipoNotification.value == "mais") {
        tipoDeVariacaoVisor = "Quando valor subir";
        tipDife = ">";
        valorVariacao.disabled = false;
        disabledCreatBtn();
    } else if (tipoNotification.value == "menos") {
        tipoDeVariacaoVisor = "Quando valor diminuir";
        tipDife = "<";
        valorVariacao.disabled = false;
        disabledCreatBtn();
    } else {
        tipoDeVariacaoVisor = "Quando houver variação";
        tipDife = "<>";
        valorVariacao.disabled = true;
        valorVariacao.value = "";
        disabledCreatBtn();
    };
});
valorVariacao.addEventListener("keyup", function () {
    dife = valorVariacao.value;
    disabledCreatBtn();
});
cancelBtn.addEventListener("click", function () {
    confNotification.style.display = "none";
    notificacao.style.display = "block";
    menu.style.display = "block";
});
function disabledCreatBtn() {
    if (valorVariacao.disabled == true) {
        variationBolean = true;
    } else if (valorVariacao.disabled == false && valorVariacao.value !== "") {
        variationBolean = true;
    } else {
        variationBolean = false;
    };
    if (selectNotification.value !== "first" && variationBolean) {
        creatBtn.disabled = false;
    } else {
        creatBtn.disabled = true;
    }
};
creatBtn.addEventListener("click", function () {
    NotificationVariation(apiUrl, dife, tipDife);
    creatBtn.disabled = true;
    valorVariacao.value = "";
    addNotificationBox();
    confNotification.style.display = "none";
    notificacao.style.display = "block";
    menu.style.display = "block";
});
function addNotificationBox() {
    let addBox = document.createElement("div");
    addBox.textContent = `
    <li class="boxNotification">
        <strong>${selectNotification.value}</strong><br>
        <strong>Tipo de variação</strong>: ${tipoDeVariacaoVisor}<br> 
        <strong>Criado em</strong>: ${creatDate.getDate()}/${creatDate.getMonth() + 1}/${creatDate.getFullYear()}<br>
        <svg onclick="confirmDeleteAlert(this)" class="trash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>
    </li>
`;
Notifications.push(addBox.textContent);
renderAlerts(Notifications);
};
function renderAlerts(Alerts) {
    NotificationVisor.innerHTML = "";
    for (let i = 0; i < Alerts.length; i++) {
        NotificationVisor.innerHTML += Notifications[i];
    };
};
function NotificationVariation(api, diferenca, tipoDiferenca) {
    const xhttps = new XMLHttpRequest();
    xhttps.onload = function () {
        new Notification(this.responseText);      
        console.log(this.responseText);
    }
    xhttps.open("GET", "http://localhost/phpserver.php?api="+api+"&diferenca="+diferenca+"&tipoDiferenca="+tipoDiferenca);
    xhttps.send();    
};
let cont = 1;
function confirmDeleteAlert(e) {
    if (cont == 1) {
        let coord = e.getBoundingClientRect();
        confirmDelete.style.left = `${coord.left - 150}px`;
        confirmDelete.style.top = `${coord.top - 93}px`;
        confirmDelete.style.display = "block";
        SimDelete.addEventListener("click", function () {
            confirmDelete.style.display = "none";
            deleteAlert(e);
            e = undefined;
            cont = 1;
        });
        cancelarDelete.addEventListener("click", function () {
            confirmDelete.style.display = "none";
            e = undefined;
            cont = 1;
        });
    } else {
        e = undefined;
    }
    cont = 0;
};
function deleteAlert(e) {
    const deleteLi = [...lis].indexOf(e.parentElement);
    Notifications.splice(deleteLi, 1);
    renderAlerts(Notifications);
};