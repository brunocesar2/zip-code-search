export default function zipCodeSearch(input, search, message) {
  const cep = document.getElementById(input);
  const button = document.querySelector(search);
  const adress = document.querySelector(message);

  const clear = () => {
    return cep.value.replace(/\D/gi, "")
  }
  const build = () => {
    return cep.value.replace(/(\d{5})(\d{3})/gi, "$1-$2")
  }
  const removeNonNumbers = () => {
    return cep.value = cep.value.replace(/[^\d-]/gi, "")
  }  
  const validation = () => {
    const matchCEP = cep.value.match(/\d{5}-?\d{3}/gi)
    return matchCEP && matchCEP[0] === cep.value
  }
  const returnCEP = (event) => {
    event.preventDefault();
    return validation()
    ? (cep.value = build(clear(cep.value)), showAdress(), adress.classList.remove("error"), cep.classList.remove("error"))
    : (adress.innerHTML = "Digite um CEP válido"), adress.classList.add("error"), cep.classList.add("error");
  }
  if (cep && button && adress) {
    cep.addEventListener("input", removeNonNumbers);
    button.addEventListener("click", returnCEP);
  }
  const showAdress = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep.value}/json`);
      const data = await response.json();
      const dataFormatted = `CEP: ${data.cep}\n Logradouro: ${data.logradouro}\n Bairro: ${data.bairro}\n Complemento: ${data.complemento}\n Cidade: ${data.localidade}\n UF: ${data.uf}\n DDD: ${data.ddd}`;
      return data.erro
        ? (adress.innerHTML = "Não foi possível encontrar seu CEP", adress.classList.add("error"), cep.classList.add("error"))
        : (adress.innerText = dataFormatted, adress.classList.remove("error"), cep.classList.remove("error"));
    } catch (erro) {
      console.log(erro);
    }
  }
}
