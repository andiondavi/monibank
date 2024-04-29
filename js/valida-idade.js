export default function validarIdade(campo) {
    const dataDeNascimento = new Date(campo.value);

    if (!validaIdade(dataDeNascimento)) {
        campo.setCustomValidity('Você deve ser maior que 18 anos para se cadastrar.');
    }
}

function validaIdade(data) {
    const dataAtual = new Date();
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());

    return dataAtual >= dataMais18;
}