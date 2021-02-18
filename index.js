import movies from './movies.js';
import actors from './actors.js';

import movieForm from './movieForm.js';
import actorForm from './actorForm.js';

import stats from './stats.js';

document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main');
    const aside = document.querySelector('aside');
console.log('here')
    movies.render(main);
    stats.render(aside);
    movieForm.render(aside);
    actors.render(main);
    actorForm.render(aside);
});