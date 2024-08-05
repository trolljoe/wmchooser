let choices = {};

const windowManagers = {
    Sway: {
        pros: ["Highly configurable", "Supports Wayland", "Good performance"],
        cons: ["Steeper learning curve", "Limited out-of-the-box features"]
    },
    Openbox: {
        pros: ["Lightweight", "Highly customizable", "Stable"],
        cons: ["No built-in compositor", "Requires manual configuration"]
    },
    Hikari: {
        pros: ["Supports Wayland", "Simple and clean", "Lightweight"],
        cons: ["Limited documentation", "Fewer features"]
    },
    Wayfire: {
        pros: ["Supports Wayland", "Eye-catching effects", "Flexible"],
        cons: ["Higher resource usage", "Complex configuration"]
    },
    Labwc: {
        pros: ["Lightweight", "Supports Wayland", "Easy to use"],
        cons: ["Limited features", "Fewer community resources"]
    },
    xmonad: {
        pros: ["Highly configurable", "Efficient", "Haskell-based scripting"],
        cons: ["Steeper learning curve", "Requires Haskell knowledge"]
    },
    i3: {
        pros: ["Easy to configure", "Tiling WM", "Good documentation"],
        cons: ["Basic features", "No native compositing"]
    },
    dwm: {
        pros: ["Lightweight", "Highly customizable", "Minimalist"],
        cons: ["Requires C knowledge", "Manual configuration"]
    },
    herbstluftwm: {
        pros: ["Highly configurable", "Scriptable", "Dynamic tiling"],
        cons: ["Complex configuration", "Fewer features"]
    },
    bspwm: {
        pros: ["Scriptable", "Highly customizable", "Efficient"],
        cons: ["No EWMH support", "Requires external tools"]
    },
    awesome: {
        pros: ["Highly customizable", "Good for developers", "Scriptable"],
        cons: ["Complex configuration", "Higher resource usage"]
    },
    IceWM: {
        pros: ["Lightweight", "Simple", "Stable"],
        cons: ["Basic features", "Minimal customization"]
    },
    QTile: {
        pros: ["Easy to configure", "Scriptable", "Good documentation", "Supports both Wayland and X11"],
        cons: ["Higher resource usage", "Python-based"]
    },
    River: {
        pros: ["Supports Wayland", "Simple and minimalist", "Dynamic"],
        cons: ["Limited features", "Less mature"]
    },
    dwl: {
        pros: ["Supports Wayland", "Minimalist", "Efficient"],
        cons: ["Limited features", "Requires manual configuration"]
    }
};

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
        const allQuestions = document.querySelectorAll('.question');
        allQuestions.forEach(question => question.style.display = 'none');
        document.getElementById('result').style.display = 'block';
    }
}

function displayResult(wm) {
    const resultElement = document.getElementById('wm-result');
    const linkElement = document.getElementById('wm-link');
    const imageElement = document.getElementById('wm-image');
    const prosElement = document.getElementById('wm-pros');
    const consElement = document.getElementById('wm-cons');

    resultElement.textContent = `You should use ${wm}!`;
    linkElement.href = getWMUrl(wm);
    linkElement.textContent = `Learn more about ${wm}`;

    imageElement.src = `/assets/${wm.toLowerCase()}.png`;
    imageElement.style.display = 'block';

    imageElement.addEventListener('click', () => {
        if (imageElement.requestFullscreen) {
            imageElement.requestFullscreen();
        }
    });

    prosElement.innerHTML = '';
    consElement.innerHTML = '';

    windowManagers[wm].pros.forEach(pro => {
        const li = document.createElement('li');
        li.textContent = pro;
        prosElement.appendChild(li);
    });

    windowManagers[wm].cons.forEach(con => {
        const li = document.createElement('li');
        li.textContent = con;
        consElement.appendChild(li);
    });

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
            return 'https://hikari.acmelabs.space/';
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
            return 'https://ice-wm.org/';
        case 'QTile':
            return 'https://qtile.org';
        case 'River':
            return 'https://codeberg.org/river/river';
        case 'dwl':
            return 'https://codeberg.org/dwl/dwl';
        default:
            return '#';
    }
}

function getAlternatives(wm) {
    const alternatives = {
        'Sway': ['bspwm', 'i3', 'Wayfire'],
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
        'Fluxbox': ['Openbox', 'IceWM'],
        'River': ['Sway', 'Wayfire'],
        'dwl': ['Sway', 'River']
    };
    return alternatives[wm] || [];
}
