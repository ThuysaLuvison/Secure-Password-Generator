document.addEventListener('DOMContentLoaded', function() {
  const tamanhoInput = document.getElementById('tamanho');
  const valorTamanho = document.getElementById('valorTamanho');
  const displaySenha = document.getElementById('displaySenha');
  const incluirMaiusculas = document.getElementById('incluirMaiusculas');
  const incluirMinusculas = document.getElementById('incluirMinusculas');
  const incluirNumeros = document.getElementById('incluirNumeros');
  const incluirEspeciais = document.getElementById('incluirEspeciais');
  const btnGerarSenha = document.getElementById('btnGerarSenha');
  const btnCopiarSenha = document.getElementById('btnCopiarSenha');

  tamanhoInput.oninput = function () {
    valorTamanho.textContent = this.value;
    gerarSenha();
  };
  [
    incluirMaiusculas,
    incluirMinusculas,
    incluirNumeros,
    incluirEspeciais,
  ].forEach(function(checkbox) {
    checkbox.onchange = gerarSenha;
  });

  btnGerarSenha.onclick = function() {
    gerarSenha();
  };
  btnCopiarSenha.onclick = function() {
    copiarSenha();
  };
  function gerarSenha() {
    const tamanho = parseInt(tamanhoInput.value);
    const maiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const minusculas = 'abcdefghijklmnopqrstuvwxyz';
    const numeros = '0123456789';
    const especiais = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let caracteres = '';

    if (incluirMaiusculas.checked) caracteres += maiusculas;
    if (incluirMinusculas.checked) caracteres += minusculas;
    if (incluirNumeros.checked) caracteres += numeros;
    if (incluirEspeciais.checked) caracteres += especiais;

    if (caracteres === '') {
      displaySenha.value = '';
      return;
    }
    let senha = '';
    for (let i = 0; i < tamanho; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      senha += caracteres.charAt(indiceAleatorio);
    }
    displaySenha.value = senha;
  }
  gerarSenha();
});

  function copiarSenha() {
    const senha = displaySenha.value;

    if (!senha){
        alert('Nenhuma senha para copiar!');
        return;
    }

    navigator.clipboard.writeText(senha)
    .then(() => {
        alert('🔒 Senha copiada para a área de transferência!');
    })
        .catch(err => {
            alert('❌ Erro ao copiar a senha: ' + err);
        });
   
  }

