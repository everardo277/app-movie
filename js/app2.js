//funcion asincrona para cargar un dato de una api
let pagina = 1;

const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
	if(pagina < 1000){
		pagina += 1;
		cargarPeliculas();
	}
});

btnAnterior.addEventListener('click', () => {
	if(pagina > 1){
		pagina -= 1;
		cargarPeliculas();
	}
});

const cargarPeliculas = async()=>{

    try {const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=020b9b45f5dda3c6f8cf96168cb4d5c7&language=es-MX&pague=${pagina}`);
    //console.log(respuesta)
    

    

    if (respuesta.status === 200) {
        const datos = await respuesta.json();
        let peliculas = '';
        datos.results.forEach(pelicula=>{
            peliculas += `
            <div class="pelicula"> 
            <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
            
            </div>
            <h3 class="titulo">${pelicula.title}</h3>`;

        });
        document.getElementById('contenedor').innerHTML=peliculas;
    }else if(respuesta.status === 401){
        console.log('error en key');
    }else if(respuesta.status === 404){
        console.log('la pelicula no existe')

    }else{
        console.log('error en la peticion');
    }
   
    

}catch(error){
    console.log(error)
}
  
}

cargarPeliculas()


