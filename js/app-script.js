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
    taskItem.querySelector('.complete-btn').addEventListener('click', function() {
      marcarComoConcluida(this);
    });
    taskItem.querySelector('.edit-btn').addEventListener('click', function() {
      editarTarefa(this);
    });
    taskItem.querySelector('.delete-btn').addEventListener('click', function() {
      excluirTarefa(this);
    });
  });
}