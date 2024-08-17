//Create a new Vue app
const app = Vue.createApp({
    //Define the data for the app
    data() {
        return {
            randomFact: {},
            weather: {
                temperature: '',
                wind: '',
                description: ''
            },
            definition: {},
            word: '',
            city: 'London Ontario'
        };
    },
    // Define methods to handle the data
    methods: {
        // Method to fetch a random fact 
        getRandomFact() {
            fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
                .then(response => response.json())
                .then(data => {
                    this.randomFact = data;
                });
        },
        // Method to fetch a weather data
        getWeather() {
            const url = `https://goweather.herokuapp.com/weather/${this.city}`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.weather = {
                        temperature: data.temperature,
                        wind: data.wind,
                        description: data.description
                    };
                });
        },
        // Method to fetch a word definition
        defineWord() {
            const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${this.word}`;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.definition = {
                        word: data[0].word,
                        phonetic: data[0].phonetic,
                        partOfSpeech: data[0].meanings[0].partOfSpeech,
                        definition: data[0].meanings[0].definitions[0].definition
                    };
                });
        }
    },
    created() {
        this.getRandomFact();
        this.getWeather();
    }
});
//Mount the app to tha #app element
app.mount('#app');
