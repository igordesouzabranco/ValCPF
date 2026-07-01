const cpfInput = document.getElementById('cpf');
const validateButton = document.getElementById('validate');
const divResultado = document.querySelector('.main-div');
let cpf;

validateButton.addEventListener('click', () => {
        cpf = new ValidaCPF(cpfInput.value);
        getCPF();
        setCPF();
    });


function getCPF() {
    return cpf;
};

class ValidaCPF {
    constructor(cpfEnviado) {
        Object.defineProperty(this, 'cpfLimpo', {
            writable: false,
            enumerable: true,
            configurable: false,
            value: cpfEnviado.replace(/\D+/g, '')
        });
    }

    isSequencia() {
        return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo;
    }

    static geraDigito(cpfSemDigitos) { // Método estático, não precisa instanciar a classe para usar
        let total = 0
        let rev = cpfSemDigitos.length + 1;

        for (let strNum of cpfSemDigitos) {
            total += rev * Number(strNum);
            rev--;
        }

        const digito = 11 - (total % 11);
        return digito <= 9 ? String(digito) : '0'
    }

    geraNovoCpf() {
        const cpfSemDigitos = this.cpfLimpo.slice(0, -2);
        const dig1 = ValidaCPF.geraDigito(cpfSemDigitos); // Chamando o método estático
        const dig2 = ValidaCPF.geraDigito(cpfSemDigitos + dig1); // Chamando o método estático

        this.novoCPF = cpfSemDigitos + dig1 + dig2;
    }

    valida() {
        if(!this.cpfLimpo) return false;
        if(this.cpfLimpo.length !== 11 ) return false;
        if(this.isSequencia()) return false;
        this.geraNovoCpf()

        return this.novoCPF === this.cpfLimpo;
    }


}

function setCPF() {
    const resultado = document.querySelector('.result') || document.createElement('h1');
    resultado.className = 'result';
    resultado.textContent = cpf.valida() ? `O CPF ${cpf.cpfLimpo} é válido` : `O CPF ${cpf.cpfLimpo} é inválido`;
    divResultado.appendChild(resultado);
}
