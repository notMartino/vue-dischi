function init() {
    new Vue({
        el: '#target',
        data: {
            songsList: null,
            filter: 0
        },
        mounted: function() {
            axios.get('https://flynn.boolean.careers/exercises/api/array/music')
            .then(data => {
                this.songsList = data.data.response;
                console.log(this.songsList);
            })
            .catch(() => {
                console.log('Error');
            });
        },
        methods: {
            filteredSongs: function () {
                let filteredSongsList = [];
                const songs = this.songsList;
                if (this.filter != 0) {
                    filteredSongsList = songs.filter((song) => song.genre == this.filter);
                }
                else{
                    filteredSongsList = this.songsList;
                }
                return filteredSongsList;
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', init);