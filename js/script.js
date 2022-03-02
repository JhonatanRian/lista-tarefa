// 1) Referenciar o input
let input = document.querySelector('input[name=tarefa]');
// 2) Referenciar o button
let btn = document.querySelector('#botao');
// 3) Referenciar a lista
let lista = document.querySelector('#lista');

let card = document.querySelector('.card');

let lis = document.querySelectorAll('li');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function renderizar(){
    lista.innerHTML = ''
    for (tarefa of tarefas){
        let item_lista = document.createElement('li');
        item_lista.classList.add('list-group-item', 'list-group-item-action');
        item_lista.onclick = function(){
            removeTarefa(this)
        }
        let texto_tarefa = document.createTextNode(tarefa)
        item_lista.appendChild(texto_tarefa)
        lista.appendChild(item_lista)
    }
}

renderizar()


btn.onclick = function(){
    let nova_tarefa = input.value;

    if(nova_tarefa!=''){
        tarefas.push(nova_tarefa)
        renderizar();
        input.value = ''
        remove_s();
        salvarDados()
    }else{
        remove_s()
        let span = document.createElement('span');
        span.classList.add('alert', 'alert-warning')

        let msg = document.createTextNode('Você precisa informar a tarefa')

        span.appendChild(msg)
        card.appendChild(span)
    }
}

function remove_s(){
    let spans = document.querySelectorAll('span');

    for (let i = 0; i<spans.length; i++){
        card.removeChild(spans[i]);
    }
}

function removeTarefa(tar){
    tarefas.splice(tarefas.indexOf(tar.textContent), 1)
    renderizar()
    salvarDados()
}

function salvarDados(){
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}