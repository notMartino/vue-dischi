function init() {
    new Vue({
        el: '#target',
        data: {
            songsList: null, // Lista di oggetti canzone
            filter: 0 // Filtro per genere
        },
        mounted: function() {
            axios.get('https://flynn.boolean.careers/exercises/api/array/music')
            .then(data => {
                this.songsList = data.data.response;
            })
            .catch(() => {
                console.log('Error');
            });
        },
        methods: {
            // Filtro le canzoni e torno la lista al v-for
            filteredSongs: function () {
                let filteredSongsList = [];
                const songs = this.songsList;
                if (this.filter != 0) {
                    filteredSongsList = songs.filter((song) => song.genre == this.filter);
                }
                else{
                    filteredSongsList = this.songsList;
                }

                if(filteredSongsList != undefined){
                    // Se ho una lista definita chiamo la funzione yearSort
                    filteredSongsList = this.yearSort(filteredSongsList);
                }

                // Torno la lista filtrata ed orfinata
                return filteredSongsList;
            },
            // Riaordino la lista per anno crescente
            yearSort: function(filtered){
                for (let i = 0; i < filtered.length; i++) {
                    for (let j = 0; j < filtered.length; j++) {
                        let song = filtered[j];
                        let nextSong;

                        // Se non mi trovo all'ultimo elemento
                        if(j < filtered.length - 1){
                            nextSong = filtered[j + 1];
                        }else{
                            nextSong = song;
                        }
                        
                        // Se l'anno attivo è maggiore del seguente
                        if(song.year > nextSong.year && nextSong != song){
                            // Effetto lo scambio
                            filtered[j+1] = song;
                            filtered[j] = nextSong;
                        }
                    }
                }
                // Torno l'array ordinato
                return filtered;
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', init);