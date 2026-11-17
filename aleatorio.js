
/* /Configurações, funções aleatórias e pixel art */
export const DINHEIRO_INICIAL = 1000;
export const LUCRO_MIN = 300;
export const LUCRO_MAX = 800;
export const LUCRO_PADRAO = 400;

export function embaralhar(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}
export const escolherAleatorio = lista => lista[Math.floor(Math.random() * lista.length)];
export const MENSAGENS = [
  "Planejar antes de gastar ajuda seu negócio a crescer.",
  "Anotar entradas e saídas é essencial para cuidar do caixa.",
  "Uma reserva ajuda nos momentos inesperados.",
  "Pesquise antes de aceitar uma oportunidade.",
  "Lucro é o que sobra depois de pagar os custos."
];

const PAL = {K:'#1B1B1B',O:'#FFB800',W:'#fff',P:'#FF5C8A',G:'#7BC043',g:'#A5E066',B:'#8B3A3A',Y:'#FFB800',R:'#E83A6A',N:'#2FBF71'};
export function sprite(rows) {
  let r = '';
  rows.forEach((row,y) => [...row].forEach((c,x) => {
    if (c !== '.') r += `<rect x="${x}" y="${y}" width="1.02" height="1.02" fill="${PAL[c]}"/>`;
  }));
  return `<svg viewBox="0 0 ${rows[0].length} ${rows.length}" shape-rendering="crispEdges" aria-hidden="true">${r}</svg>`;
}
const flip = rows => rows.map(r => [...r].reverse().join(''));
export function hamster(m) {
  const e = ({cool:['KOKKKKKKKKKKOK','KWWWWWKKWWWWWK'],happy:['KOWWKKWWKKWWOK','KWWKWWKKWWKWWK'],sad:['KOWKKWWWWKKWOK','KWWWWWKKWWWWWK']})[m] || ['KOWWKKWWKKWWOK','KWWKWWKKWWKWWK'];
  return sprite(['.KKK......KKK.','KPPKKKKKKKKPPK','KPOOOOOOOOOOPK','KOOOOOOOOOOOOK',e[0],e[1],'KWWWWWWWWWWWWK','.KWWWWWWWWWWK.','.KPWWKWWKWWPK.','..KKKKKKKKKK..']);
}
export const TREE = sprite(['...GGGG...','..GgGGGG..','.GGGGgGGG.','GGgGGGGGgG','.GGGGGGGG.','....BB....','....BB....','....BB....']);
export const COIN = sprite(['..KKKK..','.KYYYYK.','KYYWYYYK','KYYWYYYK','KYYWYYYK','KYYYYYYK','.KYYYYK.','..KKKK..']);
export const POTION = sprite(['..YY..','..KK..','.KRRK.','KRRRRK','KRWRRK','.KKKK.']);
export const ARROW = ['...K','..KP','.KPP','KPPP','.KPP','..KP','...K'];
export const ARROWG = flip(ARROW).map(r => r.replace(/P/g,'N'));