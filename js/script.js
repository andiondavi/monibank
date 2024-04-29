import validarCPF from "./valida-cpf.js";
import validarIdade from "./valida-idade.js";

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "CPF não existente.",
        tooShort: "O campo de CPF não tem caractéres suficientes.",
        tooLong: 'O campo de CPF tem caractéres a mais.'
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'tooLong',
    'customError',
]

const camposDoFormulario = document.querySelectorAll('[required]');
const fomulario = document.querySelector('[data-formulario]');

camposDoFormulario.forEach((campo) => {
    campo.addEventListener('blur', () => verificaCampo(campo));
    campo.addEventListener('invalid', event => event.preventDefault());
})

fomulario.addEventListener('submit', (event) => {
    event.preventDefault();

    const listaRespostas = {
        'nome': event.target.elements['nome'].value,
        'email': event.target.elements['email'].value,
        'rg': event.target.elements['rg'].value,
        'cpf': event.target.elements['cpf'].value,
        'aniversario': event.target.elements['aniversario'].value,
    }

    localStorage.setItem('cadastro', JSON.stringify(listaRespostas));

    window.location.href = './abrir-conta-form-2.html';
})

function verificaCampo(campo) {
    let mensagem = '';
    
    campo.setCustomValidity('');

    if (campo.name == 'cpf' && campo.value.length >= 11) {
        try {
            validarCPF(campo);
        } catch(erro) {
            alert(`Erro: ${erro}`);
        }
    }

    if (campo.name == 'aniversario' && campo.value != '') {
        validarIdade(campo);
    }

    tiposDeErro.forEach((erro) => {
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];
        }
    })

    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
    const validadorDeInput = campo.checkValidity();

    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem;
    } else {
        mensagemErro.textContent = '';
    }
}