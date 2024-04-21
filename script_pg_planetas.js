let currentPageUrl = 'https://swapi.dev/api/planets/'

window.onload = () => {
    try {
        loadPlanets(currentPageUrl)
    } catch (error) {
        console.log(error);
        alert('error ao carregar cards');
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)

};

async function loadPlanets(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = '';

    try {
        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((planet) => {
            const card = document.createElement("div")
            card.style.backgroundImage =
                `url('https://starwars-visualguide.com/assets/img/planets/${planet.url.replace(/\D/g, "")}.jpg')`
            card.className = "cards"

            const planetNameBG = document.createElement("div")
            planetNameBG.className = "planet-name-bg"

            const planetName = document.createElement("span")
            planetName.className = "planet-name"
            planetName.innerText = `${planet.name}`

            planetNameBG.appendChild(planetName)
            card.appendChild(planetNameBG)

            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"

                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = ''

                const planetImage = document.createElement("div")
                planetImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/planets/${planet.url.replace(/\D/g, "")}.jpg`
                planetImage.className = "planet-image"

                const name = document.createElement("span")
                name.className = "planet-details"
                name.innerText = `Nome: ${planet.name}`

                const planetRotation_period = document.createElement("span")
                planetRotation_period.className = "planet-details"
                planetRotation_period.innerText = `Altura: ${(planet.rotation_period) }`

                const orbital_period = document.createElement("span")
                orbital_period.className = "planet-details"
                orbital_period.innerText = `peso: ${(planet.orbital_period)}`

                const diameter = document.createElement("span")
                diameter.className = "planet-details"
                diameter.innerText = `cor dos olhos: ${(planet.diameter)}`

                const gravity = document.createElement("span")
                gravity.className = "planet-details"
                gravity.innerText = `Nascimento: ${(planet.gravity)}`

                modalContent.appendChild(planetImage)
                modalContent.appendChild(name)
                modalContent.appendChild(planetRotation_period)
                modalContent.appendChild(orbital_period)
                modalContent.appendChild(diameter)
                modalContent.appendChild(gravity)

            }

            mainContent.appendChild(card)
        });

        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')

        nextButton.disabled = !responseJson.next
        backButton.disabled = !responseJson.previous

        backButton.style.visibility = responseJson.previous ? "visible" : "hidden"

        currentPageUrl = url

    } catch (error) {
        alert('error ao carregar os planetas')
        console.log(error)
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadPlanets(responseJson.next)

    } catch (error) {
        console.log(error)
        alert('error ao carregar a próxima pagina')
    }
}

async function loadPreviousPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadPlanets(responseJson.previous)

    } catch (error) {
        console.log(error)
        alert('error ao carregar a pagina anterior')
    }
}

function hideModal () {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}

function convertEyecolor(eyeColor) {
    const cores = {
        blue: "azul",
        brown: "castanho",
        green: "verde",
        yellow: "amarelo",
        black: "preto",
        pink: "rosa",
        red: "vermelho",
        orange: "laranja",
        hazel: "avela",
        unknow: "desconhecida"
    };

    return cores[eyeColor.toLowerCase()] || eyeColor;
}

function convertHeight(height) {
    if (height === "unknown") {
        return "desconhecida"
    }

    return (height / 100).toFixed(2);
}

function convertMass(mass) {
    if (mass === "unknown") {
        return "desconhecido"
    }

    return `${mass} kg`
}

function convertBirthYear(birthYear) {
    if (birthYear === "unknown") {
        return "desconhecido"
    }

    return birthYear
}