const form = document.getElementById("form-contato");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const dados = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    mensagem: document.getElementById("mensagem").value
  };

  try {
    const resposta = await fetch("/enviar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });

    const resultado = await resposta.json();
    alert(resultado.mensagem);
    form.reset(); // limpar o formulário
  } catch (erro) {
    alert("Erro ao enviar mensagem.");
    console.error(erro);
  }
});
