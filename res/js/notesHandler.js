function showNotesStatus(column, message, isError) {
    let status = column.querySelector('.notes-status');
    if (!status) {
        status = document.createElement('div');
        status.className = 'notes-status';
        column.appendChild(status);
    }
    status.textContent = message;
    status.classList.toggle('error', isError);
    status.classList.toggle('success', !isError);

    clearTimeout(status._hideTimeout);
    status._hideTimeout = setTimeout(() => {
        status.textContent = '';
        status.classList.remove('error', 'success');
    }, 4000);
}

async function submitNotesColumn(column) {
    const noteType = column.dataset.noteType;
    const endpoint = noteType === 'health' ? '/api/notes/health' : '/api/notes/repose';

    const fields = Array.from(column.querySelectorAll('.text-field'));
    const names = fields
        .map((field) => field.value.trim())
        .filter((value) => value.length > 0);

    if (names.length === 0) {
        showNotesStatus(column, 'Впишите хотя бы одно имя', true);
        return;
    }

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ names }),
        });

        if (!response.ok) {
            throw new Error('Request failed');
        }

        fields.forEach((field) => { field.value = ''; });
        showNotesStatus(column, 'Записка отправлена', false);
    } catch (error) {
        showNotesStatus(column, 'Не удалось отправить записку, попробуйте позже', true);
    }
}

function activateNotesForm() {
    document.querySelectorAll('.notes-column .submit-btn').forEach((button) => {
        button.addEventListener('click', () => {
            const column = button.closest('.notes-column');
            if (column) {
                submitNotesColumn(column);
            }
        });
    });
}

window.addEventListener('DOMContentLoaded', activateNotesForm);
