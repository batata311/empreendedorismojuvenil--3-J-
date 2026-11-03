/* ============ FUNÇÕES DE EMBALHAMENTO E COMPONENTES VISUAIS ============ */
const shuffle = a => a.map(x => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map(x => x[1]);

/* Sistema de cores e renderização de pixel art inline */
const PAL = { K: '#1B1B1B', O: '#FFB800', W: '#fff', P: '#FF5C8A', G: '#7BC043', g: '#A5E066', B: '#8B3A3A', Y: '#FFB800', R: '#E83A6A', N: '#2FBF71' };

function sprite(rows) { 
    let r = ''; 
    rows.forEach((row, y) => [...row].forEach((c, x) => { 
        if (c !== '.') r += `<rect x="${x}" y="${y}" width="1.02" height="1.02" fill="${PAL[c]}"/>`; 
    })); 
    return `<svg viewBox="0 0 ${rows[0].length} ${rows.length}" shape-rendering="crispEdges" aria-hidden="true">${r}</svg>`; 
}

const flip = rows => rows.map(r => [...r].reverse().join(''));

function hamster(m) {
    const e = {
        cool: ['KOKKKKKKKKKKOK', 'KWWWWWKKWWWWWK'], 
        happy: ['KOWWKKWWKKWWOK', 'KWWKWWKKWWKWWK'], 
        sad: ['KOWKKWWWWKKWOK', 'KWWWWWKKWWWWWK']
    }[m];
    return sprite([
        '.KKK......KKK.', 'KPPKKKKKKKKPPK', 'KPOOOOOOOOOOPK', 'KOOOOOOOOOOOOK', 
        e[0], e[1], 'KWWWWWWWWWWWWK', '.KWWWWWWWWWWK.', '.KPWWKWWKWWPK.', '..KKKKKKKKKK..'
    ]); 
}

const TREE = sprite(['...GGGG...', '..GgGGGG..', '.GGGGgGGG.', 'GGgGGGGGgG', '.GGGGGGGG.', '....BB....', '....BB....', '....BB....']);
const COIN = sprite(['..KKKK..', '.KYYYYK.', 'KYYWYYYK', 'KYYWYYYK', 'KYYWYYYK', 'KYYYYYYK', '.KYYYYK.', '..KKKK..']);
const POTION = sprite(['..YY..', '..KK..', '.KRRK.', 'KRRRRK', 'KRWRRK', '.KKKK.']);
const ARROW = ['...K', '..KP', '.KPP', 'KPPP', '.KPP', '..KP', '...K'];
const ARROWG = flip(ARROW).map(r => r.replace(/P/g, 'N'));

// Injeta os elementos decorativos fixos nas tags correspondentes
document.getElementById('decoL').innerHTML = POTION + COIN; 
document.getElementById('decoR').innerHTML = sprite(ARROW) + sprite(ARROWG); 
document.getElementById('tree').innerHTML = TREE;
