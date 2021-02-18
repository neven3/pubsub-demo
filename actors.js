import pubsub from './pubsub.js';

class Actors {
    constructor(list = []) {
        this.list = list;
        this.actorDeleted = this.actorDeleted.bind(this);
        this.actorAdded = this.actorAdded.bind(this);
    }

    render(container) {
        const template = document.querySelector('#actorListTemplate');
        const div = template.content.cloneNode(true);
        
        container.appendChild(div);
        
        const ul = document.querySelector('.actor-container ul');
        ul.addEventListener('click', this.actorDeleted);

        pubsub.subscribe('actorAdded', this.actorAdded);
    }

    actorAdded(name) {
        const list = new Set(this.list);
        list.add(name);
        this.list = Array.from(list).sort();

        pubsub.publish('actorsUpdated', this.list);

        const ul = document.querySelector('.actor-container ul');
        ul.innerHTML = '';
        
        const df = document.createDocumentFragment();

        this.list.forEach((name) => {
            const li = document.createElement('li');
            li.textContent = name;
            df.appendChild(li);
        });

        ul.appendChild(df);
    }

    actorDeleted(event) {
        const item = event.target.closest('li');
        const actorName = item.textContent;

        this.list = this.list.filter(actor => actor !== actorName);

        item.parentElement.removeChild(item);

        pubsub.publish('actorDeleted', this.list);
    }
}

const actors = new Actors();
debugger

export default actors;