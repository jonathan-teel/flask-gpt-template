document.addEventListener('DOMContentLoaded', () => {
    var results = document.getElementById('results');
    var runBtn = document.getElementById('runBtn');
    var resultsSpinner = document.getElementById('results-spinner');
    resultsSpinner.style.display = 'none';

    runBtn.addEventListener('click', async (event) => {
        results.textContent = '';
        runGptResponse();
    });

    async function runGptResponse() {
        runBtn.disabled = true;
        runBtn.innerText = 'Running...';
        resultsSpinner.style.display = 'block';

        var apiKey = document.getElementById('apiKey').value;
        var query = document.getElementById('query').value;
        var model = document.getElementById('modelSelect').value;
        var useSystemMsg = document.getElementById('systemMsg').value;
        
        var response = await fetch('/gpt-response', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `query=${encodeURIComponent(query)}&api_key=${encodeURIComponent(apiKey)}&model=${encodeURIComponent(model)}&sm=${encodeURIComponent(useSystemMsg)}`
        });

        var result = await response.json();
        results.textContent = result.result;
        resultsSpinner.style.display = 'none';
        runBtn.disabled = false;
        runBtn.innerText = 'Run';
    }
});