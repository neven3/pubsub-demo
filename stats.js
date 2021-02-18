import pubsub from './pubsub.js';

class Stats {
    constructor() {
        this.moviesUpdated = this.moviesUpdated.bind(this);
        this.actorsUpdated = this.actorsUpdated.bind(this);
    }

    render(container) {
        const statsContainer = document.createElement('div');
        statsContainer.className = 'stats-container';
        
        const actorCount = document.createElement('p');
        actorCount.className = 'actor-count';
        actorCount.textContent = '0 actors in list';
        statsContainer.appendChild(actorCount);

        const movieCount = document.createElement('p');
        movieCount.className = 'movie-count';
        movieCount.textContent = '0 movies in list';
        statsContainer.appendChild(movieCount);

        container.appendChild(statsContainer);

        // pubsub.subscribe('actorAdded', this.actorsUpdated);
        pubsub.subscribe('actorsUpdated', this.actorsUpdated);
        pubsub.subscribe('actorDeleted', this.actorsUpdated);

        // pubsub.subscribe('movieAdded', this.moviesUpdated);
        pubsub.subscribe('moviesUpdated', this.moviesUpdated);
        pubsub.subscribe('movieDeleted', this.moviesUpdated);
    }

    moviesUpdated(movieList) {
        const movieCount = document.querySelector('.movie-count');
        movieCount.textContent = `${movieList.length} movies in list`;
    }

    actorsUpdated(actorsList) {
        const actorCount = document.querySelector('.actor-count');
        debugger
        actorCount.textContent = `${actorsList.length} actors in list`;
    } 
}

const stats = new Stats();

export default stats;