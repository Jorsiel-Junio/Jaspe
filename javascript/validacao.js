const form = document.getElementById('cadastro'); /*pega o dormulario para validação*/
const usuario = document.getElementById('usuario'); /*pega todos os campos com a tag requerid*/
const span = document.querySelectorAll('.span');

function setError(index) {
    campos[index].style.border = '1px solid #e63636';
}

function validarnome(){
    if(usuario.value.length <= 3) {
        setError(0);
    } 
    else {
        
    }
}