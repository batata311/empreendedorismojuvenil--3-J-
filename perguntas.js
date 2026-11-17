/* PERGUNTAS, ALTERNATIVAS E CONSEQUÊNCIAS

/* Situações financeiras. Cada etapa oferece três caminhos. */
export const FASES = [
{titulo:"Primeiros passos",q:"Você recebeu R$ 300. Qual é seu plano?",o:[
{t:"Guardar uma parte e planejar o restante",d:220,f:"Poupar antes de gastar fortalece seu planejamento.",rota:0},
{t:"Comprar materiais para começar a vender",d:150,f:"Investir com planejamento pode trazer retorno.",rota:1},
{t:"Gastar tudo em algo da moda",d:-250,f:"Faltou reserva para o negócio.",rota:2}]},
{titulo:"Uma oportunidade",q:"Um conhecido promete dobrar seu dinheiro em uma semana. O que faz?",o:[
{t:"Pesquisar a proposta antes de decidir",d:180,f:"Pesquisar protegeu seu caixa.",rota:0},
{t:"Pedir orientação e avaliar os riscos",d:120,f:"Buscar orientação foi uma decisão consciente.",rota:1},
{t:"Entregar todo o dinheiro imediatamente",d:-350,f:"A promessa era enganosa e trouxe prejuízo.",rota:2}]},
{titulo:"Preço e lucro",q:"Sua banca está vendendo bem. Como define o preço?",o:[
{t:"Somar os custos e acrescentar lucro",d:220,f:"Calcular os custos ajuda a garantir lucro.",rota:0},
{t:"Pesquisar preços e comparar com seus custos",d:150,f:"Comparar opções ajudou no planejamento.",rota:1},
{t:"Copiar o concorrente sem fazer contas",d:-220,f:"Você correu o risco de vender no prejuízo.",rota:2}]},
{titulo:"Imprevistos",q:"Um equipamento quebrou e o conserto custa R$ 250. Qual é a saída?",o:[
{t:"Usar a reserva de emergência",d:120,f:"A reserva existe para situações inesperadas.",rota:0},
{t:"Pesquisar orçamentos e negociar",d:170,f:"Comparar opções ajudou a economizar.",rota:1},
{t:"Comprar outro sem comparar preços",d:-300,f:"A compra apressada aumentou os custos.",rota:2}]},
{titulo:"Cuidando dos clientes",q:"As vendas diminuíram. Como atrair clientes?",o:[
{t:"Ouvir os clientes e melhorar o produto",d:180,f:"Entender o público ajuda o negócio.",rota:0},
{t:"Fazer divulgação simples nas redes",d:130,f:"Divulgar com planejamento pode atrair clientes.",rota:1},
{t:"Dar desconto sem calcular os custos",d:-250,f:"Descontos sem planejamento podem gerar prejuízo.",rota:2}]},
{titulo:"A grande decisão",q:"Seu negócio cresceu. O que fazer com o lucro?",o:[
{t:"Reinvestir uma parte e guardar outra",d:250,f:"Equilibrar reinvestimento e reserva ajuda a crescer.",rota:0},
{t:"Separar o lucro e revisar o planejamento",d:180,f:"Revisar os resultados prepara os próximos passos.",rota:1},
{t:"Gastar todo o lucro imediatamente",d:-300,f:"Sem planejamento, o caixa ficou vulnerável.",rota:2}]}
];