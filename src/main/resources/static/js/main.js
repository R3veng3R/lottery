const HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

const shutDownApp = async () => {
    await fetch("/actuator/shutdown", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
    });
}

const addTicket = async () => {
    const newNumbersElement = document.getElementById("new-numbers-input");
    const value = newNumbersElement.value;

    if (value.length) {
        const result = await fetch("/api/ticket", {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify({numbers: value})
        });

        const model = await result.json();
        if (model.id) {
            location.reload();
        } else {
            throw Error("Error writing model");
        }
    }
}

const findTickets = async () => {
    const findQuery = document.getElementById("find-numbers-input");
    const value = findQuery.value;

    if (value.length) {
        const result = await fetch("/api/ticket/" + value, {
            method: 'GET',
            headers: HEADERS,
        });

        const list = await result.json();
        const newNumbersElement = document.getElementById("search-result-div");

        list.forEach( result => {
            newNumbersElement.innerHTML += "<p>" + result.numbers + "</p>";
        });
    }
}