//NÃO É MEU CÓDIGO!!!!!!!!!

document.addEventListener('DOMContentLoaded', function() {
  // Seleciona os input de arquivo e seus ícones correspondentes
  var fileInputs = document.querySelectorAll('input[type="file"]');
  var uploadIcons = document.querySelectorAll('.form__input__label__file img'); // Seleciona todas as imagens dentro de elementos com a classe 'form__input__label__file'

  // Seleciona todas as mensagens de validação de arquivo
  var fileValidationMsgs = document.querySelectorAll('.file-validation-msg');

  // Adiciona um evento change para cada input file
  fileInputs.forEach(function(fileInput, index) {
    fileInput.addEventListener('change', function() {
      var uploadIcon = uploadIcons[index]; // Seleciona o ícone correspondente ao input atual
      
      // Verifica se um arquivo foi selecionado
      if (fileInput.files.length > 0) {
        // Altera o src da imagem para o ícone de confirmação de envio
        uploadIcon.src = './assets/uploadDone.svg';
      } else {
        // Se nenhum arquivo for selecionado, restaura o ícone padrão
        uploadIcon.src = './assets/uploadFile.svg'; // Retorna para o ícone padrão
      }

      // Verifica se o campo de arquivo está vazio e exibe a mensagem de validação, se necessário
      var fileValidationMsg = fileValidationMsgs[index]; // Seleciona a mensagem de validação
      if (fileInput.files.length === 0) {
        fileValidationMsg.style.display = 'inline-block'; // Mostra a mensagem se nenhum arquivo for selecionado
      } else {
        fileValidationMsg.style.display = 'none'; // Oculta a mensagem se um arquivo for selecionado
      }

      // Verifica se todos os campos obrigatórios estão preenchidos sempre que houver uma alteração nos campos de arquivo
      checkRequiredFields();
    });
  });

  // Adiciona evento de reset ao formulário para restaurar os ícones padrão após o reset
  var formulario = document.getElementById('formulario');
  formulario.addEventListener('reset', function() {
    uploadIcons.forEach(function(uploadIcon) {
      uploadIcon.src = './assets/uploadFile.svg'; // Retorna todos os ícones para o padrão após o reset
    });

    // Oculta todas as mensagens de validação ao resetar o formulário
    fileValidationMsgs.forEach(function(fileValidationMsg) {
      fileValidationMsg.style.display = 'none';
    });

    // Verifica se todos os campos obrigatórios estão preenchidos após o reset do formulário
    checkRequiredFields();
  });

  // Adiciona evento de submit ao formulário para verificar se há campos de arquivo vazios antes de enviar
  formulario.addEventListener('submit', function(event) {
    var filesSelected = true;

    fileInputs.forEach(function(fileInput, index) {
      var fileValidationMsg = fileValidationMsgs[index];
      if (fileInput.files.length === 0) {
        fileValidationMsg.style.display = 'inline-block'; // Mostra a mensagem se nenhum arquivo for selecionado
        filesSelected = false;
      } else {
        fileValidationMsg.style.display = 'none'; // Oculta a mensagem se um arquivo for selecionado
      }
    });

    // Impede o envio do formulário se houver campos de arquivo vazios
    if (!filesSelected) {
      event.preventDefault();
    }
  });

  // Função para verificar se todos os campos obrigatórios estão preenchidos
  function checkRequiredFields() {
    var requiredFields = document.querySelectorAll('[required]');
    var allFieldsFilled = true;
    requiredFields.forEach(function(field) {
      if (!field.value.trim()) {
        allFieldsFilled = false;
        field.nextElementSibling.style.display = 'inline-block'; // Mostra a mensagem de erro para campos obrigatórios não preenchidos
      } else {
        field.nextElementSibling.style.display = 'none'; // Oculta a mensagem de erro se o campo for preenchido
      }
    });

    // Desativa o botão de enviar se houver campos obrigatórios não preenchidos
    var submitButton = document.querySelector('[type="submit"]');
    if (allFieldsFilled) {
      submitButton.removeAttribute('disabled');
    } else {
      submitButton.setAttribute('disabled', 'disabled');
    }
  }
});