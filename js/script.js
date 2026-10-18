function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

async function askAI() {
    const input = document.getElementById('aiSearch').value.trim();
    const resultDiv = document.getElementById('aiResult');

    if (!input) {
        resultDiv.innerHTML = '<div class="label">🤖 RoboTech AI:</div><p>Please type a question!</p>';
        resultDiv.classList.add('show');
        return;
    }

    resultDiv.innerHTML = '<div class="label">🤖 RoboTech AI:</div><p>⏳ Thinking...</p>';
    resultDiv.classList.add('show');

    try {
        const response = await puter.ai.chat(input, { model: 'gemini-2.0-flash' });
        let answer = '';
        if (response.message?.content) answer = response.message.content;
        else if (typeof response === 'string') answer = response;
        else if (response.text) answer = response.text;
        else answer = JSON.stringify(response);
        resultDiv.innerHTML = `<div class="label">🤖 RoboTech AI:</div><p>${answer}</p>`;
    } catch (e) {
        resultDiv.innerHTML = `<div class="label">🤖 RoboTech AI:</div><p>⚠️ ${e.message || 'Error. Try again.'}</p>`;
    }
}   
