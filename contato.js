document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-contato");
  const respostaDiv = document.getElementById("resposta");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const dados = {
      nome: document.getElementById("nome").value.trim(),
      email: document.getElementById("email").value.trim(),
      mensagem: document.getElementById("mensagem").value.trim()
    };

    // Validação simples
    if (!dados.nome || !dados.email || !dados.mensagem) {
      respostaDiv.textContent = "❌ Por favor, preencha todos os campos.";
      respostaDiv.style.color = "red";
      return;
    }

    try {
      const resposta = await fetch("https://origowl.onrender.com/enviar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
      });

      if (!resposta.ok) throw new Error("Falha ao enviar");

      const resultado = await resposta.json();
      respostaDiv.textContent = resultado.mensagem;
      respostaDiv.style.color = "green";
      form.reset();

    } catch (erro) {
      respostaDiv.textContent = "❌ Erro ao enviar a mensagem.";
      respostaDiv.style.color = "red";
      console.error("Erro no fetch:", erro);
    }
  });
});
