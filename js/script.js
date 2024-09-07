document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('messageModal').style.display = 'none';
});

function cifrarTexto() {
    const mensaje = document.getElementById('message').value;
    const desplazamiento = parseInt(document.getElementById('displacement').value);

    if (mensaje.trim() === "") {
        mostrarModal("Debe primero ingresar un mensaje antes de cifrar");
        return;
    }

    if (!/[a-zA-Z]/.test(mensaje)) {
        mostrarModal("El mensaje ingresado no contiene letras para cifrar");
        return;
    }

    const mensajeCifrado = cifradoCesar(mensaje, desplazamiento);
    document.getElementById('encryptedMessage').value = mensajeCifrado;

    mostrarAlfabetoDesplazado(desplazamiento);
    document.querySelector('.container').classList.add('expanded');
}

function cifradoCesar(texto, desplazamiento) {
    let resultado = '';

    for (let i = 0; i < texto.length; i++) {
        const char = texto[i];

        if (char.match(/[A-Z]/)) {
            resultado += String.fromCharCode((char.charCodeAt(0) - 65 + desplazamiento) % 26 + 65);
        } else if (char.match(/[a-z]/)) {
            resultado += String.fromCharCode((char.charCodeAt(0) - 97 + desplazamiento) % 26 + 97);
        } else {
            resultado += char;
        }
    }

    return resultado;
}

function mostrarAlfabetoDesplazado(desplazamiento) {
    const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const alfabetoDesplazado = alfabeto.split('').map(letra => {
        const codigo = letra.charCodeAt(0);
        return String.fromCharCode(((codigo - 65 + desplazamiento) % 26) + 65);
    }).join('');

    document.getElementById('alfabetoOriginal').innerText = alfabeto.split('').join(' ');
    document.getElementById('alfabetoDesplazado').innerText = alfabetoDesplazado.split('').join(' ');

    document.getElementById('alfabetoContainer').classList.add('show');
}

function mostrarModal(mensaje) {
    const modal = document.getElementById('messageModal');
    const closeButton = document.querySelector('.close');
    const modalText = document.querySelector('.text-modal');

    modalText.innerText = mensaje;
    
    modal.style.display = "block";

    closeButton.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function limpiarCampos() {
    document.getElementById('message').value = '';
    document.getElementById('displacement').selectedIndex = 0;
    document.getElementById('encryptedMessage').value = '';
    document.getElementById('alfabetoContainer').classList.remove('show');
    document.querySelector('.container').classList.remove('expanded');
}