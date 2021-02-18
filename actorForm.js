import pubsub from './pubsub.js';

class ActorForm {
    constructor() {
        this.add = this.add.bind(this);
    }

    render(container) {
        const template = document.querySelector('#actorFormTemplate');
        const form = template.content.cloneNode(true);

        form.querySelector('button').addEventListener('click', this.add);
        container.appendChild(form);
    }

    add(event) {
        event.preventDefault();

        const input = document.querySelector('.actor-form input');
        const name = input.value;
        input.value = '';

        pubsub.publish('actorAdded', name);
    }
}

const actorForm = new ActorForm();

export default actorForm;