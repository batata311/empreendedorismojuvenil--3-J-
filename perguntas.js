/* ============ BANCO DE QUESTÕES E CONFIGURAÇÕES DA JORNADA ============ */
const DINHEIRO_INICIAL = 1000;
const LUCRO_MIN = 300;
const LUCRO_MAX = 800;
const LUCRO_PADRAO = 400;

const R1 = { 
  q: 'Você recebeu R$ 300 entre mesada e pequenas vendas. Qual é o seu plano?', 
  o: [
    { t: 'Separar uma parte para guardar e planejar o resto', d: 200, f: 'Você criou o hábito de poupar antes de gastar.' },
    { t: 'Gastar tudo em um tênis de marca que está na moda', d: -250, f: 'O dinheiro acabou rápido e nada sobrou para o negócio.' } 
  ]
};

const FASES = [ 
  { g: R1, b: R1 },
  { 
    g: {
      q: 'Um amigo promete dobrar seu dinheiro em uma semana, sem risco. E agora?', 
      o: [
        { t: 'Pesquisar e recusar: ganho fácil costuma ser golpe', d: 150, f: 'Desconfiar de promessas milagrosas protegeu o seu caixa.' },
        { t: 'Colocar R$ 400 na hora, antes que acabe a vaga', d: -400, f: 'Era golpe! A pressa e a promessa de ganho fácil custaram caro.' } 
      ]
    },
    b: {
      q: 'Sem reserva, você quer vender pulseiras. O material custa R$ 100. Como faz?', 
      o: [
        { t: 'Comprar só o necessário e anotar cada venda', d: 180, f: 'Controlar entradas e saídas ajudou você a se recuperar.' },
        { t: 'Pegar dinheiro emprestado com juros altos para comprar 3x mais', d: -300, f: 'Os juros comeram o seu lucro e você ficou devendo.' } 
      ]
    } 
  ],
  { 
    g: {
      q: 'Sua banca vende bem. Como definir o preço de venda?', 
      o: [
        { t: 'Somar os custos e incluir uma margem de lucro', d: 200, f: 'Preço baseado em conta garante lucro de verdade.' },
        { t: 'Copiar o preço do concorrente sem fazer a conta', d: -200, f: 'Sem calcular, você vendeu quase sem lucro.' } 
      ]
    },
    b: {
      q: 'Os clientes sumiram e o preço está abaixo do custo. O que faz?', 
      o: [
        { t: 'Refazer as contas e ajustar o preço com cuidado', d: 150, f: 'Rever os números tirou você do prejuízo.' },
        { t: 'Fazer promoção de 50% para atrair gente', d: -300, f: 'Vender abaixo do custo só aumentou o prejuízo.' } 
      ]
    } 
  ],
  { 
    g: {
      q: 'Imprevisto! Seu equipamento quebrou e o conserto custa R$ 250.', 
      o: [
        { t: 'Usar a reserva de emergência e repor aos poucos', d: 100, f: 'A reserva serviu para isso: você resolveu sem dívida.' },
        { t: 'Parcelar no cartão de um adulto sem calcular', d: -250, f: 'As parcelas apertaram o seu caixa nos meses seguintes.' } 
      ]
    },
    b: {
      q: 'Chegou um pedido urgente e você está sem reserva. O que faz?', 
      o: [
        { t: 'Negociar um prazo maior, explicando a situação ao cliente', d: 120, f: 'Transparência manteve o cliente e o seu dinheiro.' },
        { t: 'Aceitar e pagar o frete expresso do próprio bolso', d: -250, f: 'O frete caro comeu todo o lucro do pedido.' } 
      ]
    } 
  ],
  { 
    g: {
      q: 'Reta final! O negócio vai bem. Como usar o lucro?', 
      o: [
        { t: 'Reinvestir uma parte e manter o controle do caixa', d: 250, f: 'Crescer com planejamento é o caminho do empreendedor.' },
        { t: 'Gastar tudo em uma festa de comemoração', d: -300, f: 'Comemorar é bom, mas sem planejamento o caixa sofreu.' } 
      ]
    },
    b: {
      q: 'Última chance de virar o jogo! Qual é a sua jogada?', 
      o: [
        { t: 'Cortar gastos desnecessários e focar no que dá lucro', d: 200, f: 'Foco no que funciona recuperou boa parte do dinheiro.' },
        { t: 'Apostar todo o caixa em um sorteio rápido', d: -400, f: 'Apostar o caixa não é investir. A sorte não ajudou.' } 
      ]
    } 
  }
];
