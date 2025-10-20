document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-contato");
  const respostaDiv = document.getElementById("resposta");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    // resto do seu código...
    
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

    // Mostra a mensagem de sucesso ou erro na página
    respostaDiv.textContent = resultado.mensagem;
    respostaDiv.style.color = resposta.ok ? "green" : "red";

    // Limpa o formulário
    form.reset();
  } catch (erro) {
    respostaDiv.textContent = "❌ Erro ao enviar a mensagem.";
    respostaDiv.style.color = "red";
    console.error(erro);
  }

  });
});
