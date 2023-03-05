(function () {
    let confirmNotication = Notification.requestPermission().then(perm => {
        if (perm = "denied") {
                new Notification("Seja bem-vindo ao app");   
        };
    });    
})(); 

const quadroDeValores = document.getElementById("quadroDeValores");
const coin = document.getElementById("coin");
const visor = document.getElementById("visor");
const horaDaCotacao = document.getElementById("horaDaCotacao");
const diferencaDeValor = document.getElementById("diferencaDeValor");

coin.addEventListener("change", function () {
    if (coin.value == "EUR") {
        CalculaMoedas("EUR-BRL", "EUR");
    } else if (coin.value == "USD") {
        CalculaMoedas("USD-BRL", "USD");
    } else if (coin.value == "BTC") {
        CalculaMoedas("BTC-BRL", "BTC");
    } else if (coin.value == "JPY") {
        CalculaMoedas("JPY-BRL", "JPY");
    } else if (coin.value == "GBP") {
        CalculaMoedas("GBP-BRL", "GBP");
    } else if (coin.value == "AUD") {
        CalculaMoedas("AUD-BRL", "AUD");
    } else if (coin.value == "CAD") {
        CalculaMoedas("CAD-BRL", "CAD");
    };
});
function CalculaMoedas(nomeMoeda, nomeNoVisor) {
    fetch(`https://brapi.dev/api/v2/currency?currency=${nomeMoeda}`).then(res => {
            return res.json();
        }).then(body => {
            visor.style.display = "block";
            let preco = body.currency [0].bidPrice;
            let precoPonto = preco.indexOf(".");
            let precoTest = preco.slice(precoPonto);
            if (precoTest.length >= 3) {
                preco = preco.slice(0, 3 + precoPonto);
            };
            let valueVariation = body.currency [0].bidVariation;
            valueVariation >= 0 ? valueVariation = "+" + valueVariation : valueVariation;
            valueVariation >= 0 ? diferencaDeValor.style.color = "lightgreen" : diferencaDeValor.style.color = "red";
            quadroDeValores.innerHTML = `${nomeNoVisor}: ${preco} R$<br>`;
            diferencaDeValor.innerHTML = `${valueVariation}<br>`;
            horaDaCotacao.innerHTML = `${body.currency [0].updatedAtDate}`;
            visor.style.border = "2px solid black";
            visor.style.fontFamily = "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif";
            visor.style.color = "#ffff";
            visor.style.textAlign = "center";
            visor.style.backgroundColor = "rgb(70, 70, 70)";
            visor.style.paddingBottom = "10px";
            quadroDeValores.style.fontSize = "30px";
            visor.style.borderRadius = "10px";
            console.log(body);
        });
};

const acoes = document.getElementById("acoes");
acoes.addEventListener("change", function () {
    if (acoes.value == "MGLU3") {
       CalculaAcoes("MGLU3");
    } else if (acoes.value == "VALE3") {
        CalculaAcoes("VALE3");
    } else if (acoes.value == "PETR4") {
        CalculaAcoes("PETR4");
    } else if (acoes.value == "ITUB4") {
        CalculaAcoes("ITUB4");
    } else if (acoes.value == "BBDC4") {
        CalculaAcoes("BBDC4");
    } else if (acoes.value == "ASAI3") {
        CalculaAcoes("ASAI3");
    } else if (acoes.value == "ELET6") {
        CalculaAcoes("ELET6");
    };
});
function CalculaAcoes(nomeAcao) {
    fetch(`https://brapi.dev/api/quote/${nomeAcao}`).then(res => {
            return res.json();
        }).then(body => {
            visor.style.display = "block";
            let data = body.results [0].regularMarketTime;
            let dataFinal = data.toString();
            let dataT = dataFinal.indexOf("T");
            let str1 = dataFinal.slice(0, dataT);
            let str2 = dataFinal.slice(dataT + 1, 19);
            dataFinal = str1 + " " + str2 + "UTC";
            let variacao = body.results [0].regularMarketDayHigh - body.results [0].regularMarketPrice;
            variacao >= 0 ? variacao = "+" + variacao : variacao;
            variacao >= 0 ? diferencaDeValor.style.color = "lightgreen" : diferencaDeValor.style.color = "red";
            quadroDeValores.innerHTML = `${nomeAcao}: ${body.results [0].regularMarketPrice} R$<br>`;
            diferencaDeValor.innerHTML = `${variacao}<br>`;
            horaDaCotacao.innerHTML = `${dataFinal}`;
            visor.style.border = "2px solid black";
            visor.style.fontFamily = "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif";
            visor.style.color = "#ffff";
            visor.style.textAlign = "center";
            visor.style.backgroundColor = "rgb(70, 70, 70)";
            visor.style.paddingBottom = "10px";
            quadroDeValores.style.fontSize = "30px";
            visor.style.borderRadius = "10px";
            console.log(body);
        })
}
const menu = document.getElementById("menu");
let linha1 = document.querySelector(".linha1");
let linha2 = document.querySelector(".linha2");
let linha3 = document.querySelector(".linha3");
const menuItem = document.getElementById("menuItem");
const moedaMenu = document.getElementById("moedaMenu");
const acoesMenu = document.getElementById("acoesMenu");
const notificacaoMenu = document.getElementById("notificacaoMenu");
const loginMenu = document.getElementById("loginMenu");
const criarContaMenu = document.getElementById("criarContaMenu");
const notificacao = document.getElementById("notificacao");
const telaDeLogin = document.getElementById("telaDeLogin");
const cancelLogin = document.getElementById("cancelLogin");
let varItemMenu = coin;

menu.addEventListener("click", menuAnim);

moedaMenu.addEventListener("click", function () {
    varItemMenu.style.display = "none";
    coin.style.display = "block";
    varItemMenu = coin;
    visor.style.display = "none";
    menuAnim();
});

acoesMenu.addEventListener("click", function () {
    varItemMenu.style.display = "none";
    acoes.style.display = "block";
    varItemMenu = acoes;
    visor.style.display = "none";
    menuAnim();
});

notificacaoMenu.addEventListener("click", function () {
    varItemMenu.style.display = "none";
    notificacao.style.display = "block";
    varItemMenu = notificacao;
    visor.style.display = "none";
    menuAnim();
});

loginMenu.addEventListener("click", function () {
    varItemMenu.style.display = "none";
    telaDeLogin.style.display = "block";
    varItemMenu = telaDeLogin;
    visor.style.display = "none";
    menu.style.display = "none"
    menuAnim();
});

function menuAnim() {
    linha1.classList.toggle("linha1st");
    linha2.classList.toggle("linha2st");
    linha3.classList.toggle("linha3st");
    menuItem.classList.toggle("menuItemst");
};

cancelLogin.addEventListener("click", function () {
    menu.style.display = "block";
    telaDeLogin.style.display = "none";
    menuAnim();
});