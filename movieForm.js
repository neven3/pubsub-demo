import pubsub from './pubsub.js';

class MovieForm {
    constructor() {
        this.add = this.add.bind(this);
    }

    render(container) {
        const template = document.querySelector('#movieFormTemplate');
        const form = template.content.cloneNode(true);

        form.querySelector('button').addEventListener('click', this.add);
        container.appendChild(form);
    }

    add(event) {
        event.preventDefault();
        const input = document.querySelector('.movie-form input');
        const movieName = input.value;
        input.value = '';

        pubsub.publish('movieAdded', movieName);
    }
}

const movieForm = new MovieForm();

export default movieForm;