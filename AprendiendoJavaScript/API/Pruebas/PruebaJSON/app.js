// const jsonNames = `["Byron","Saioa","Beñat","Lorena","Tigris"]`;

// const jsonPerson = `{"name": "Byron","age": 20,"gender": "Hombre","language": "Castellano","isEmployed": true,"hobbies": ["Gimnasio", "Videojuegos", "comer"]}`;

// const jsonPeople = `[{"name": "Byron","age": 20,"gender": "Hombre","language": "Castellano","isEmployed": true},
//                      {"name": "Saioa","age": 20,"gender": "Mujer","language": "Castellano","isEmployed": false},
//                      {"name": "Beñat","age": 19,"gender": "Hombre","language": "Castellano","isEmployed": true},
//                      {"name": "Lorena","age": 19,"gender": "Mujer","language": "Castellano","isEmployed": false},
//                      {"name": "Tigris","age": 5,"gender": "Mujer","language": "Gatuno","isEmployed": false}]`;

// const parsedData = JSON.parse(jsonPeople);

// console.log(parsedData);

fetch("people.json")
    .then(response => response.json())
    .then(values => values.forEach(value => console.log(value.isEmployed)))
    .catch(error => console.error(error));