/* MOTOR DO JOGO */

const fmt = n => 'R$ ' + n.toLocaleString('pt-BR');

let money, goal, fase, variant, shown, nome = '';
let last = null;

const $ = id => document.getElementById(id);

const shuffle = a => a.map(x => [Math.random(), x])
  .sort((p, q) => p[0] - q[0])
  .map(x => x[1]);

function mood(m, cls) {
  const ham = $('ham');
  ham.className = 'ham ' + (cls || '');
  ham.innerHTML = hamster(m);
}

function iniciarElementosVisuais() {
  $('decoL').innerHTML = POTION + COIN;
  $('decoR').innerHTML = sprite(ARROW) + sprite(ARROWG);
  $('tree').innerHTML = TREE;
}

function hud() {
  $('hudbox').innerHTML = `
    <div class="hud pix">
      <div class="m" style="font-size:11px">${nome}</div>

      <div class="m">
        ${COIN}
        <span id="mv">${fmt(shown)}</span>
      </div>

      <div class="meter">
        <small>Meta: ${fmt(goal)}</small>
        <div class="track">
          <i id="bar"></i>
        </div>
      </div>

      <div class="m" style="font-size:11px">
        Fase ${fase + 1}/${FASES.length}
      </div>
    </div>`;

  setTimeout(() => {
    const b = $('bar');

    if (b) {
      b.style.width = Math.max(
        0,
        Math.min(100, (money / goal) * 100)
      ) + '%';
    }
  }, 30);
}

function tween(from, to) {
  const el = $('mv');
  const t0 = performance.now();

  (function animar(t) {
    const k = Math.min(1, (t - t0) / 700);

    shown = Math.round(from + (to - from) * k);

    if (el) {
      el.textContent = fmt(shown);
    }

    if (k < 1) {
      requestAnimationFrame(animar);
    }
  })(t0);
}

function intro() {
  $('hudbox').innerHTML = '';
  mood('cool');

  $('main').innerHTML = `
    <h1>Hamster<br>Empreendedor</h1>

    <p class="sub">
      Cada escolha vale dinheiro. Dobre o seu caixa antes que ele acabe!
    </p>

    <div class="box pix">

      <p class="goal">
        <label for="nome">Seu nome:</label>

        <input
          id="nome"
          type="text"
          maxlength="16"
          placeholder="Digite aqui"
          autocomplete="off"
          value="${nome}"
          style="width:190px"
        >
      </p>

      <p style="margin-top:10px">
        Você começa com <b>${fmt(DINHEIRO_INICIAL)}</b>
        e tem <b>${FASES.length} decisões</b> pela frente.
      </p>

      <p class="goal" style="margin-top:10px">
        <label for="lucro">Quanto você pretende lucrar? R$</label>

        <input
          id="lucro"
          type="number"
          inputmode="numeric"
          min="${LUCRO_MIN}"
          max="${LUCRO_MAX}"
          value="${LUCRO_PADRAO}"
        >
      </p>

      <p style="font-size:14px;margin-top:6px">
        Meta mínima de lucro: R$ ${LUCRO_MIN}
        (máximo R$ ${LUCRO_MAX}).
      </p>

      <p
        id="erro"
        style="font-weight:600;color:#C2185B;min-height:1.4em;margin-top:4px"
      ></p>

    </div>

    <button class="btn blink" id="go">
      ▶ INICIAR JOGO
    </button>
  `;

  $('go').onclick = () => {

    const n = $('nome').value.trim().replace(/[<>&"]/g, '');
    const l = parseInt($('lucro').value, 10);
    const er = $('erro');

    if (!n) {
      er.textContent = 'Digite o seu nome para começar.';
      $('nome').focus();
      return;
    }

    if (isNaN(l) || l < LUCRO_MIN || l > LUCRO_MAX) {
      er.textContent =
        'A meta de lucro deve ficar entre R$ ' +
        LUCRO_MIN + ' e R$ ' + LUCRO_MAX + '.';

      $('lucro').focus();
      return;
    }

    nome = n;
    money = shown = DINHEIRO_INICIAL;
    goal = DINHEIRO_INICIAL + l;
    fase = 0;
    variant = 'g';
    last = null;

    question();
  };
}

function question() {

  const f = FASES[fase][variant];

  hud();

  let fb = '';

  if (last) {

    const ok = last.d > 0;

    fb = `
      <div class="fb pix ${ok ? 'good' : 'bad'}">

        ${ok
          ? '🎉 Parabéns, ' + nome + '! '
          : '💥 Ops, ' + nome + '! Efeito negativo: '
        }

        ${last.f}

        <span class="chip">
          ${ok ? '+' : '−'}${fmt(Math.abs(last.d))}
        </span>

      </div>`;
  }

  $('main').innerHTML = `
    ${fb}

    <p class="q">${f.q}</p>

    <div class="opts" id="opts"></div>
  `;

  shuffle(f.o).forEach((o, i) => {

    const b = document.createElement('button');

    b.className = 'opt';

    b.style.animationDelay = (.15 + i * .15) + 's';

    b.textContent = o.t;

    b.onclick = () => escolher(o);

    $('opts').appendChild(b);

  });

  if (last) {
    mood(
      last.d > 0 ? 'happy' : 'sad',
      last.d > 0 ? 'happy' : 'sad'
    );
  } else {
    mood('happy');
  }
}

function escolher(o) {

  const from = money;

  money = Math.max(0, money + o.d);

  document.querySelectorAll('.opt').forEach(b => {
    b.disabled = true;
  });

  const p = document.createElement('span');

  p.className = 'pop';

  p.style.cssText =
    'left:30px;top:70px;color:' +
    (o.d > 0 ? '#7BE0A4' : '#FF5C8A');

  p.textContent =
    (o.d > 0 ? '+' : '−') + fmt(Math.abs(o.d));

  $('screen').appendChild(p);

  setTimeout(() => p.remove(), 1500);

  if (o.d < 0) {

    $('screen').classList.add('bad-shake');

    setTimeout(() => {
      $('screen').classList.remove('bad-shake');
    }, 400);

  }

  tween(from, money);

  $('bar').style.width =
    Math.min(100, (money / goal) * 100) + '%';

  last = o;

  setTimeout(() => {

    fase++;

    if (money <= 0) {
      return fim('over');
    }

    if (fase >= FASES.length) {
      return fim(money >= goal ? 'win' : 'short');
    }

    variant = o.d > 0 ? 'g' : 'b';

    question();

  }, 1300);
}

function fim(t) {

  hud();

  const T = {

    win: [
      'VOCÊ VENCEU!',
      'happy',
      nome + ', você fechou com ' + fmt(money) +
      ' e bateu a meta de ' + fmt(goal) +
      '. Decisões responsáveis fazem o dinheiro crescer!'
    ],

    short: [
      'QUASE LÁ!',
      'sad',
      nome + ', você terminou com ' + fmt(money) +
      ', mas a meta era ' + fmt(goal) +
      '. Revise as escolhas e tente de novo.'
    ],

    over: [
      'GAME OVER',
      'sad',
      nome + ', seu dinheiro acabou. ' +
      'Cada escolha irresponsável pesa no caixa. ' +
      'Que tal tentar outro caminho?'
    ]

  }[t];

  mood(T[1], T[1]);

  $('main').innerHTML = `
    ${last ? `
      <div class="fb pix ${last.d > 0 ? 'good' : 'bad'}">
        ${last.d > 0 ? '🎉 ' : '💥 '}
        ${last.f}
      </div>
    ` : ''}

    <h2>${T[0]}</h2>

    <div class="box pix">
      <p>${T[2]}</p>
    </div>

    <button class="btn" id="again">
      ↻ JOGAR DE NOVO
    </button>
  `;

  $('again').onclick = intro;

  if (t === 'win') {

    for (let i = 0; i < 40; i++) {

      const c = document.createElement('i');

      c.className = 'cf';

      c.style.left = Math.random() * 100 + '%';

      c.style.background = [
        '#FF5C8A',
        '#FFB800',
        '#fff',
        '#7BE0A4'
      ][i % 4];

      c.style.animationDelay = Math.random() * 1.5 + 's';

      $('screen').appendChild(c);

      setTimeout(() => c.remove(), 5000);

    }
  }
}

/* PREPARA A ARTE E MOSTRA A TELA INICIAL */

iniciarElementosVisuais();

intro();
