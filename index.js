let choices = {};

function nextQuestion(answer, nextId, wm) {
    const currentQuestion = document.querySelector('.question:not([style*="display: none"])');
    if (currentQuestion) {
        currentQuestion.style.display = 'none';
    }

    const nextQuestion = document.getElementById(nextId);
    if (nextQuestion) {
        nextQuestion.style.display = 'block';
    }

    choices[currentQuestion.id] = answer;

    if (nextId === 'result') {
        displayResult(wm);
    }
}

function displayResult(wm) {
    const resultElement = document.getElementById('wm-result');
    const linkElement = document.getElementById('wm-link');
    resultElement.textContent = `You should use ${wm}!`;
    linkElement.href = getWMUrl(wm);
    linkElement.textContent = `Learn more about ${wm}`;

    const alternatives = getAlternatives(wm);
    const alternativesList = document.getElementById('alternatives-list');
    alternativesList.innerHTML = '';
    alternatives.forEach(alt => {
        const li = document.createElement('li');
        li.textContent = alt;
        alternativesList.appendChild(li);
    });
}

function getWMUrl(wm) {
    switch (wm) {
        case 'Sway':
            return 'https://swaywm.org';
        case 'Openbox':
            return 'https://openbox.org';
        case 'Hikari':
            return 'https://hikariwm.org';
        case 'Wayfire':
            return 'https://wayfire.org';
        case 'Labwc':
            return 'https://gitlab.com/labwc/labwc';
        case 'xmonad':
            return 'https://xmonad.org';
        case 'i3':
            return 'https://i3wm.org';
        case 'dwm':
            return 'https://dwm.suckless.org';
        case 'herbstluftwm':
            return 'https://herbstluftwm.org';
        case 'bspwm':
            return 'https://bspwm.org';
        case 'awesome':
            return 'https://awesomewm.org';
        case 'IceWM':
            return 'https://icewm.org';
        case 'QTile':
            return 'https://qtile.org';
        default:
            return '#';
    }
}

function getAlternatives(wm) {
    const alternatives = {
        'Sway': ['bspwm', 'i3'],
        'Openbox': ['Fluxbox', 'IceWM'],
        'Hikari': ['dwm', 'herbstluftwm'],
        'Wayfire': ['Sway', 'River'],
        'Labwc': ['dwl', 'River'],
        'xmonad': ['i3', 'herbstluftwm'],
        'i3': ['xmonad', 'bspwm'],
        'dwm': ['herbstluftwm', 'bspwm'],
        'herbstluftwm': ['dwm', 'bspwm'],
        'bspwm': ['xmonad', 'i3'],
        'awesome': ['i3', 'bspwm'],
        'IceWM': ['Openbox', 'Fluxbox'],
        'QTile': ['i3', 'bspwm'],
        'Fluxbox': ['Openbox', 'IceWM']
    };
    return alternatives[wm] || [];
}
