document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-contato");
  const respostaDiv = document.getElementById("resposta");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Pega os valores do formulário
    const dados = {
      nome: document.getElementById("nome").value.trim(),
      email: document.getElementById("email").value.trim(),
      mensagem: document.getElementById("mensagem").value.trim()
    };

    // Validação básica
    if (!dados.nome || !dados.email || !dados.mensagem) {
      respostaDiv.textContent = "❌ Por favor, preencha todos os campos.";
      respostaDiv.style.color = "red";
      return;
    }

    try {
      // URL do seu backend no Render, endpoint correto
      const resposta = await fetch("https://origowl.onrender.com/enviar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
      });

      const resultado = await resposta.json();

      // Mostra mensagem de sucesso ou erro
      respostaDiv.textContent = resultado.mensagem;
      respostaDiv.style.color = resposta.ok ? "green" : "red";

      // Limpa o formulário se envio bem-sucedido
      if (resposta.ok) form.reset();

    } catch (erro) {
      respostaDiv.textContent = "❌ Erro ao enviar a mensagem.";
      respostaDiv.style.color = "red";
      console.error("Erro no fetch:", erro);
    }
  });
});
