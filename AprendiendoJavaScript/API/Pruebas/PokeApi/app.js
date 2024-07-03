async function fetchData() {
    try {
        const nombre = document.getElementById('nombre').value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
        
        if (!response.ok) {
            throw new Error('No se ha encontrado el pokemon');
        }

        const data = await response.json();
        console.log(data);
        const pokemonSprite = data.sprites.front_default;
        const imgElement = document.getElementById('pokemonSprite');

        imgElement.src = pokemonSprite;
        imgElement.style.display = "block";
    } catch (error) {
        console.log(error);
    }
}
