import pubsub from './pubsub.js';

class Movies {
    constructor(list = []) {
        this.list = list;
        this.movieDeleted = this.movieDeleted.bind(this);
        this.movieAdded = this.movieAdded.bind(this);
    }

    render(container) {
        const template = document.querySelector('#movieListTemplate');
        const div = template.content.cloneNode(true);

        container.appendChild(div);

        const ul = document.querySelector('.movie-container ul');
        ul.addEventListener('click', this.movieDeleted);

        pubsub.subscribe('movieAdded', this.movieAdded);
    }

    movieAdded(name) {
        const list = new Set(this.list);
        list.add(name);
        this.list = Array.from(list).sort();

        pubsub.publish('moviesUpdated', this.list);

        const ul = document.querySelector('.movie-container ul');
        ul.innerHTML = '';
        
        const df = document.createDocumentFragment();

        this.list.forEach(movie => {
            const li = document.createElement('li');
            li.textContent = movie;
            df.appendChild(li);
        });

        ul.appendChild(df);
    }

    movieDeleted(event) {
        const item = event.target.closest('li');
        const movieName = item.textContent;

        this.list = this.list.filter(movie => movie !== movieName);

        item.parentElement.removeChild(item);

        pubsub.publish('movieDeleted', this.list);
    }
}

const movies = new Movies();

export default movies;