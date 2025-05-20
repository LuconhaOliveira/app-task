const definirSaudacao = () => {
    const header = document.querySelector('#saudacaoHeader');
    setInterval(() => {
        const now = new Date();
        const horas = now.getHours();
        const minutos = now.getMinutes().toString().padStart(2, '0');
        const segundos = now.getSeconds().toString().padStart(2, '0');
        const dataAtual = now.toLocaleDateString('pt-BR');

        let saudacao;
        if (horas >= 6 && horas < 12) {
            saudacao = 'Bom dia!';
        } else if (horas >= 12 && horas <= 18) {
            saudacao = 'Boa tarde!';
        } else {
            saudacao = 'Boa noite!';
        }

        header.innerHTML = `<span>${saudacao}</span><span>${dataAtual} ${horas}:${minutos}:${segundos}</span>`;
    }, 1000);
}




// Função para adicionar uma nova tarefa
// Carregar tarefas do localStorage ao iniciar
const carregarTarefas = () => {

    const taskList = document.querySelector('#taskList');
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    tarefas.forEach(tarefa => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        if (tarefa.concluida) {
            taskItem.classList.add('concluida');
        }
        taskItem.innerHTML = tarefa.html;
        taskList.appendChild(taskItem);

        // Adicionar event listeners aos botões da tarefa
        taskItem.querySelector('.complete-btn').addEventListener('click', function () {
            marcarComoConcluida(this);
        });
        taskItem.querySelector('.edit-btn').addEventListener('click', function () {
            editarTarefa(this);
        });
        taskItem.querySelector('.delete-btn').addEventListener('click', function () {
            excluirTarefa(this);
        });
    });
}

const adicionarTarefa = () => {
    const taskName = document.querySelector('#taskName').value;
    const taskDescription = document.querySelector('#taskDescription').value;
    const taskDate = document.querySelector('#taskDate').value;
    const taskTime = document.querySelector('#taskTime').value;

    if (taskName && taskDate && taskTime) {
        const taskList = document.querySelector('#taskList');
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        const dataFormatada = new Date(taskDate).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        });
        const taskHTML = `
            <h3>${taskName}</h3>
            <p>${taskDescription}</p>
            <p><strong>Vencimento:</strong> ${dataFormatada} às ${taskTime}</p>
            <div class="task-actions">
                <button class="complete-btn">Concluir</button>
                <button class="edit-btn">Editar</button>
                <button class="delete-btn">Excluir</button>
            </div>
        `;

        taskItem.innerHTML = taskHTML;
        taskList.appendChild(taskItem);

        taskItem.querySelector('.complete-btn').addEventListener('click', function () {
            marcarComoConcluida(this);
        });
        taskItem.querySelector('.edit-btn').addEventListener('click', function () {
            editarTarefa(this);
        });
        taskItem.querySelector('.delete-btn').addEventListener('click', function () {
            excluirTarefa(this);
        });

        const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
        tarefas.push({
            nome: taskName,
            descricao: taskDescription,
            data: taskDate,
            hora: taskTime,
            html: taskHTML
        });

        localStorage.setItem('tarefas', JSON.stringify(tarefas));

        alert('Tarefa adicionada com sucesso!');
        document.querySelector('#taskForm').reset();
    } else {
        alert('Por favor, preencha os campos obrigatórios');
    }


};

window.onload = function () {
    definirSaudacao();
    carregarTarefas();

    document.querySelector('#adicionarTarefaBtn').addEventListener('click', function (e) {
        e.preventDefault();
        adicionarTarefa();
    })
};

const marcarComoConcluida = (button) => {

    const taskItem = button.closest('.task-item');

    if (taskItem.classList.contains('concluida')) {
        alert('Esta tarefa já foi concluída!');
        return;
    };

    taskItem.classList.add('concluida');

    const editBtn = taskItem.querySelector('.edit-btn');
    const deleteBtn = taskItem.querySelector('.delete-btn');
    editBtn.disable = true;
    deleteBtn.disable = true;

    const taskName = taskItem.querySelector('h3').textContent;
    let tarefas = JSON.parse(localStorage['tarefas']) || [];
    const tarefaIndex = tarefas.findIndex(t => t.nome === taskName);

    if (tarefaIndex !== -1) {
        tarefas[tarefaIndex].concluida = true;
        tarefas[tarefaIndex].html = taskItem.innerHTML;

        localStorage['tarefas'] = JSON.stringify(tarefas);
    }
    setTimeout(() => {
        alert('Tarefa marcada como concluída!');
    }, 200);
}

const editarTarefa = (button) => {

    const taskItem = button.closest('.task-item');

    if (taskItem.classList.contains('concluida')) {
        alert('Esta tarefa já foi concluída!');
        return;
    } else {
        const taskName = taskItem.querySelector('h3').textContent;
        const newTaskName = prompt('Titulo da tarefa:');
        const newTaskDescription = prompt('Descrição da tarefa:');
        if (newTaskName && newTaskDescription) {
            taskItem.querySelector('h3').textContent = newTaskName;
            taskItem.querySelector('p').textContent = newTaskDescription;
            let tarefas = JSON.parse(localStorage['tarefas']) || [];
            const tarefaIndex = tarefas.findIndex(t => t.nome === taskName);
            if (tarefaIndex !== -1) {
                tarefas[tarefaIndex].nome = newTaskName;
                tarefas[tarefaIndex].descricao = newTaskDescription;
                tarefas[tarefaIndex].html = `
                    <h3>${newTaskName}</h3>
                    <p>${newTaskDescription}</p>
                    <p><strong>Vencimento:</strong> ${tarefas[tarefaIndex].data} às ${tarefas[tarefaIndex].hora}</p>
                    <div class="task-actions">
                        <button class="complete-btn">Concluir</button>
                        <button class="edit-btn">Editar</button>
                        <button class="delete-btn">Excluir</button>
                    </div>
                `;
                localStorage['tarefas'] = JSON.stringify(tarefas);
            }

        }
    }
}

const excluirTarefa = (button) => {

    if (confirm('Deseja realmente excluir esta tarefa?')) {
        const taskItem = button.closest('.task-item');

        const taskName = taskItem.querySelector('h3').textContent;
        let tarefas = JSON.parse(localStorage['tarefas']) || [];
        const tarefaIndex = tarefas.findIndex(t => t.nome === taskName);

        if (tarefaIndex !== -1) {
            //meu codigo
            let lixeira = localStorage['lixeira'] ? JSON.parse(localStorage['lixeira']) : [];
            console.log(lixeira);
            console.log(tarefas[tarefaIndex]);
            lixeira.push(tarefas[tarefaIndex]);
            console.log(lixeira);


            tarefas.splice(tarefaIndex, 1);
            taskItem.remove();

            localStorage['tarefas'] = JSON.stringify(tarefas);
            localStorage['lixeira'] = JSON.stringify(lixeira);

            alert('Tarefa excluída!');
        }
    }
}

const filtrarTarefas = (filtro) => {
    const tarefas = document.querySelectorAll('.task-item');
    tarefas.forEach(tarefa => {
        switch (filtro) {
            case 'todas':
                tarefa.style.display = 'block';
                break;
            case 'pendentes':
                tarefa.style.display = tarefa.classList.contains('concluida') ? 'none' : 'block';
                break;
            case 'concluidas':
                tarefa.style.display = tarefa.classList.contains('concluida') ? 'block' : 'none';
                break;
        }
    });
}


document.querySelector("ordenarRecentesBtn").addEventListener('click', () => {

    //KURT COBAIN CHALLENGE TODAY AT 9 PM COME SEE IN MY TWITTER 

});

document.querySelector('#lixeiraBtn').addEventListener('click', () => {


    let lixeira = localStorage['lixeira'] ? JSON.parse(localStorage['lixeira']) : [];

    let tarefaRecuperada = parseInt(prompt(`Qual tarefa deseja recuperar?`));

    if (!tarefaRecuperada) {
        alert('Tarefa não encontrada!');
        return;
    }

    let tarefas = JSON.parse(localStorage['tarefas']) || [];

    tarefas.push(lixeira[tarefaRecuperada]);
    lixeira.splice(tarefaRecuperada, 1);

    localStorage['tarefas'] = JSON.stringify(tarefas);
    localStorage['lixeira'] = JSON.stringify(lixeira);

    document.querySelector('#taskList').innerHTML = '<h2>Suas Tarefas</h2>';
    carregarTarefas();
});