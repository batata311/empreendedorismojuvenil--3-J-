/* Motor principal do jogo — módulo JavaScript */
import {DINHEIRO_INICIAL,LUCRO_MIN,LUCRO_MAX,LUCRO_PADRAO,embaralhar,escolherAleatorio,MENSAGENS,hamster,TREE,COIN,POTION,ARROW,ARROWG,sprite} from "./aleatorio.js";
import {FASES} from "./perguntas.js";

const $ = id => document.getElementById(id);
const fmt = n => "R$ " + n.toLocaleString("pt-BR");
let money=DINHEIRO_INICIAL, goal=DINHEIRO_INICIAL+LUCRO_PADRAO, fase=0, nome="", historico=[], ultimaEscolha=null;

function mood(tipo,classe=""){ $("ham").className="ham "+classe; $("ham").innerHTML=hamster(tipo); }
function prepararCenario(){ $("decoL").innerHTML=POTION+COIN; $("decoR").innerHTML=sprite(ARROW)+sprite(ARROWG); $("tree").innerHTML=TREE; }

function atualizarHUD(){
 const progresso=Math.min(100,fase/FASES.length*100);
 $("hudbox").innerHTML=`<div class="hud pix"><div class="m player-name">${nome}</div><div class="m">${COIN}<span>${fmt(money)}</span></div><div class="meter"><small>Meta: ${fmt(goal)}</small><div class="track"><i style="width:${Math.min(100,money/goal*100)}%"></i></div><small>Jornada: ${fase}/${FASES.length} etapas</small><div class="track journey"><i style="width:${progresso}%"></i></div></div></div>`;
}

/* Tabuleiro com três rotas possíveis em cada etapa. */
function desenharTabuleiro(){
 let html='<section class="board-wrap"><p class="board-title">SEU CAMINHO</p><div class="board">';
 for(let i=0;i<FASES.length;i++){
  const escolha=historico[i];
  html+=`<div class="board-row ${i===fase?'current':''} ${i<fase?'completed':''}"><span class="board-step">${i+1}</span><span class="board-branches">`;
  for(let rota=0;rota<3;rota++){
   const marcada=escolha && escolha.rota===rota;
   html+=`<span class="board-tile ${marcada?'chosen':''} ${i===fase?'available':''}">${marcada?'★':(i<fase?'·':'◆')}</span>`;
  }
  html+=`</span><span class="board-label">${FASES[i].titulo}</span></div>`;
 }
 return html+'<div class="finish-tile">🏁 CHEGADA</div></div></section>';
}

function intro(){
 $("hudbox").innerHTML=""; mood("cool");
 $("main").innerHTML=`<h1>Hamster<br>Empreendedor</h1><p class="sub">Escolha seu caminho e faça seu negócio crescer!</p>
 <div class="box pix"><p class="goal"><label for="nome">Seu nome:</label><input id="nome" maxlength="16" placeholder="Digite aqui" value="${nome}"></p>
 <p style="margin-top:12px">Você começa com <b>${fmt(DINHEIRO_INICIAL)}</b> e terá <b>${FASES.length} etapas</b>.</p>
 <p class="goal" style="margin-top:12px"><label for="lucro">Meta de lucro: R$</label><input id="lucro" type="number" min="${LUCRO_MIN}" max="${LUCRO_MAX}" value="${LUCRO_PADRAO}"></p>
 <p class="hint">Escolha entre R$ ${LUCRO_MIN} e R$ ${LUCRO_MAX} de lucro.</p><p id="erro" class="error"></p></div>
 <button class="btn blink" id="go">▶ INICIAR JOGO</button><button class="btn secondary" id="comoJogar">COMO JOGAR</button><button class="btn secondary" id="abrirCreditos">CRÉDITOS</button>`;
 $("go").onclick=iniciar; $("comoJogar").onclick=mostrarFluxograma; $("abrirCreditos").onclick=creditos;
}

function iniciar(){
 const n=$("nome").value.trim().replace(/[<>&"']/g,"");
 const l=Number.parseInt($("lucro").value,10);
 if(!n){$("erro").textContent="Digite seu nome para começar.";$("nome").focus();return;}
 if(!Number.isInteger(l)||l<LUCRO_MIN||l>LUCRO_MAX){$("erro").textContent=`A meta deve ficar entre R$ ${LUCRO_MIN} e R$ ${LUCRO_MAX}.`;$("lucro").focus();return;}
 nome=n; money=DINHEIRO_INICIAL; goal=DINHEIRO_INICIAL+l; fase=0; historico=[]; ultimaEscolha=null; mostrarPergunta();
}

function mostrarFluxograma(){
 $("main").innerHTML=`<h2>COMO JOGAR</h2><div class="box pix flow">
 <div class="flow-node">INÍCIO: definir nome e meta</div><div class="flow-arrow">↓</div>
 <div class="flow-node">Ler a situação financeira</div><div class="flow-arrow">↓</div>
 <div class="flow-node">Escolher 1 entre 3 caminhos</div><div class="flow-arrow">↓</div>
 <div class="flow-node">Atualizar dinheiro e avançar no tabuleiro</div><div class="flow-arrow">↓</div>
 <div class="flow-node decision">O dinheiro acabou?</div><div class="flow-arrow">↙ NÃO &nbsp;&nbsp; SIM ↘</div>
 <div class="flow-split"><span>Próxima etapa</span><span>GAME OVER</span></div><div class="flow-arrow">↓</div>
 <div class="flow-node">Chegada: conferir a meta e finalizar</div></div><button class="btn" id="voltar">◀ VOLTAR</button>`;
 $("voltar").onclick=intro; mood("happy");
}

function mostrarPergunta(){
 if(money<=0)return finalizar("over");
 if(fase>=FASES.length)return finalizar(money>=goal?"win":"short");
 atualizarHUD();
 const atual=FASES[fase], mensagem=escolherAleatorio(MENSAGENS);
 const feedback=ultimaEscolha?`<div class="fb pix ${ultimaEscolha.d>=0?'good':'bad'}">${ultimaEscolha.f}<span class="chip">${ultimaEscolha.d>=0?'+':'−'}${fmt(Math.abs(ultimaEscolha.d))}</span></div>`:"";
 $("main").innerHTML=`${desenharTabuleiro()}${feedback}<p class="stage-label">ETAPA ${fase+1} DE ${FASES.length} — ${atual.titulo}</p><p class="q">${atual.q}</p><p class="tip">${mensagem}</p><div class="opts" id="opts"></div>`;
 /* O for...of percorre as três alternativas e cria os botões. */
 for(const opcao of embaralhar(atual.o)){
  const botao=document.createElement("button"); botao.className="opt"; botao.textContent=opcao.t;
  botao.onclick=()=>escolher(opcao); $("opts").appendChild(botao);
 }
 mood("happy");
}

function escolher(opcao){
 document.querySelectorAll(".opt").forEach(botao=>botao.disabled=true);
 money=Math.max(0,money+opcao.d); ultimaEscolha=opcao; historico.push(opcao); fase++;
 atualizarHUD();
 const pop=document.createElement("span"); pop.className="pop"; pop.textContent=`${opcao.d>=0?'+':'−'}${fmt(Math.abs(opcao.d))}`;
 pop.style.cssText=`left:30px;top:70px;color:${opcao.d>=0?'#168A45':'#C2185B'}`; $("screen").appendChild(pop); setTimeout(()=>pop.remove(),1400);
 mood(opcao.d>=0?"happy":"sad",opcao.d>=0?"happy":"sad");
 setTimeout(()=>{if(money<=0)return finalizar("over");if(fase>=FASES.length)return finalizar(money>=goal?"win":"short");mostrarPergunta();},1100);
}

function finalizar(tipo){
 atualizarHUD();
 const finais={
 win:["VOCÊ VENCEU!","happy",`${nome}, você chegou ao final com ${fmt(money)} e alcançou sua meta de ${fmt(goal)}!`],
 short:["FIM DE JOGO","sad",`${nome}, você terminou com ${fmt(money)}, mas sua meta era ${fmt(goal)}. Tente outro caminho!`],
 over:["GAME OVER","sad",`${nome}, seu dinheiro acabou antes da chegada. Reflita sobre as escolhas e tente novamente!`]
 };
 const [titulo,expressao,texto]=finais[tipo]; mood(expressao,expressao);
 $("main").innerHTML=`${desenharTabuleiro()}<h2>${titulo}</h2><div class="box pix"><p>${texto}</p></div><p class="sub">Você percorreu ${fase} de ${FASES.length} etapas.</p><button class="btn" id="again">↻ JOGAR NOVAMENTE</button><button class="btn secondary" id="creditsFinal">CRÉDITOS</button>`;
 $("again").onclick=intro; $("creditsFinal").onclick=creditos;
 if(tipo==="win")confetes();
}

function confetes(){
 for(let i=0;i<35;i++){const p=document.createElement("i");p.className="cf";p.style.left=Math.random()*100+"%";p.style.background=["#FF5C8A","#FFB800","#fff","#7BE0A4"][i%4];p.style.animationDelay=Math.random()*1.5+"s";$("screen").appendChild(p);setTimeout(()=>p.remove(),5000);}
}
function creditos(){
 $("hudbox").innerHTML="";mood("happy");
 $("main").innerHTML=`<h2>CRÉDITOS</h2><div class="box pix"><p class="credit-heading">DESENVOLVIMENTO DO JOGO</p><p>Emily Kuginharski Gomes</p><p class="credit-name">Manuella Schueda Ferst</p></div><p class="sub">Obrigada por jogar!</p><button class="btn" id="voltarCreditos">◀ VOLTAR</button>`;
 $("voltarCreditos").onclick=intro;
}
prepararCenario(); intro();