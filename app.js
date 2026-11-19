const phone = '5515991898249';
const wa = text => `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
const services = [
  ['troca-de-tela', 'Troca de tela', 'Tela trincada, sem imagem ou com falhas no toque? Conte para a gente.'],
  ['troca-de-bateria', 'Troca de bateria', 'Seu celular descarrega rápido? Consulte a avaliação da bateria.'],
  ['conector-de-carga', 'Conector de carga', 'Mau contato ou dificuldade para carregar? Vamos entender o problema.'],
  ['troca-de-tampa-traseira', 'Tampa traseira', 'Consulte as opções para a traseira quebrada do seu aparelho.'],
  ['reparo-em-placa', 'Celular não liga', 'Fale com a equipe sobre falhas de funcionamento do aparelho.'],
  ['outros-defeitos', 'Outros reparos', 'Áudio, câmera, botões ou outro defeito? Explique o que aconteceu.']
];
document.querySelector('#service-grid').innerHTML = services.map(([image, title, description]) => `
  <a class="service" href="${wa(`Olá! Vim pelo site da Lancell e gostaria de consultar ${title.toLowerCase()} para o meu celular.`)}" target="_blank" rel="noopener">
    <div class="service-image"><img src="assets/servicos/${image}.png" alt="${title} de celular" loading="lazy"></div>
    <div class="service-copy"><h3>${title}</h3><p>${description}</p><span>Consultar no WhatsApp</span></div>
  </a>`).join('');
document.querySelector('#brand-grid').innerHTML = [
  ['iphone', 'iPhone'], ['samsung', 'Samsung'], ['motorola', 'Motorola'], ['xiaomi', 'Xiaomi'], ['outras', 'Outras marcas']
].map(([image, title]) => `
  <a class="brand" href="${wa(`Olá! Gostaria de consultar atendimento para um celular ${title}.`)}" target="_blank" rel="noopener">
    <img src="assets/marcas/${image}.png" alt="Aparelhos ${title}" loading="lazy"><h3>${title}</h3><span>Consultar modelo</span>
  </a>`).join('');
document.querySelectorAll('[data-wa]').forEach(a => {
  a.href = wa(a.dataset.wa);
  a.target = '_blank';
  a.rel = 'noopener';
});
document.querySelector('#guided-form').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const message = `Olá, Lancell! Vim pelo site e gostaria de atendimento.\nMarca: ${data.get('brand')}\nModelo: ${data.get('model').trim() || 'Não sei informar'}\nPreciso de ajuda: ${data.get('problem')}`;
  window.open(wa(message), '_blank', 'noopener');
});
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
const closeMenu = () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Abrir menu');
};
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  nav.classList.toggle('open', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.querySelector('#year').textContent = new Date().getFullYear();

// Repeat each column once for a continuous loop.
const reviewWall = document.querySelector('.review-wall');
const reviewCards = [...reviewWall.children];
const reviewColumns = matchMedia('(max-width: 600px)').matches ? 1 : 2;
for (let columnIndex = 0; columnIndex < reviewColumns; columnIndex++) {
  const column = document.createElement('div');
  column.className = 'review-column';
  const track = document.createElement('div');
  track.className = 'review-track';
  const cards = reviewCards.filter((_, index) => index % reviewColumns === columnIndex);
  for (const card of cards) track.append(card);
  for (const card of cards) {
    const duplicate = card.cloneNode(true);
    duplicate.setAttribute('aria-hidden', 'true');
    track.append(duplicate);
  }
  column.append(track);
  reviewWall.append(column);
}
