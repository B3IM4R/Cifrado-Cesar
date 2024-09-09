document.addEventListener("DOMContentLoaded", () => {
    const displacementSelect = document.getElementById('displacement');
    for (let i = 1; i <= 25; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        displacementSelect.appendChild(option);
    }
    
    document.querySelector('.close-btn').addEventListener('click', cerrarModal);
    document.querySelector('.close').addEventListener('click', cerrarModal);
});

function cifrarTexto() {
    const mensaje = document.getElementById('message').value.trim();
    const desplazamiento = parseInt(document.getElementById('displacement').value);

    if (!mensaje) return mostrarModal("Debe ingresar un mensaje antes de cifrar");
    if (!/[a-zA-Z]/.test(mensaje)) return mostrarModal("El mensaje no contiene letras para cifrar");

    document.getElementById('encryptedMessage').value = cifradoCesar(mensaje, desplazamiento);
    mostrarAlfabetoDesplazado(desplazamiento);
    document.querySelector('.container').classList.add('expanded');
}

function cifradoCesar(texto, desplazamiento) {
    return [...texto].map(char => {
        if (/[A-Z]/.test(char)) {
            return String.fromCharCode((char.charCodeAt(0) - 65 + desplazamiento) % 26 + 65);
        } else if (/[a-z]/.test(char)) {
            return String.fromCharCode((char.charCodeAt(0) - 97 + desplazamiento) % 26 + 97);
        }
        return char;
    }).join('');
}

function mostrarAlfabetoDesplazado(desplazamiento) {
    const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const alfabetoDesplazado = alfabeto.split('')
        .map(letra => String.fromCharCode(((letra.charCodeAt(0) - 65 + desplazamiento) % 26) + 65))
        .join(' ');

    document.getElementById('alfabetoOriginal').textContent = alfabeto.split('').join(' ');
    document.getElementById('alfabetoDesplazado').textContent = alfabetoDesplazado;
    document.getElementById('alfabetoContainer').classList.add('show');
}

function mostrarModal(mensaje) {
    const modal = document.getElementById('messageModal');
    document.querySelector('.text-modal').textContent = mensaje;
    modal.style.display = "block";

    window.onclick = event => {
        if (event.target == modal) cerrarModal();
    };
}

function cerrarModal() {
    document.getElementById('messageModal').style.display = "none";
}

function limpiarCampos() {
    document.getElementById('message').value = '';
    document.getElementById('displacement').selectedIndex = 0;
    document.getElementById('encryptedMessage').value = '';
    document.getElementById('alfabetoContainer').classList.remove('show');
    document.querySelector('.container').classList.remove('expanded');
}