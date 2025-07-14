const jogo = window.document.getElementById('gameSelect');
const pergunta = window.document.getElementById('questionInput');
const botao = window.document.getElementById('button');
const form = window.document.getElementById('form');
const resposta = window.document.getElementById('resposta');

const markdownToHTML = (text) =>{
    const converter = new showdown.Converter();
    return converter.makeHtml(text);
} 

const perguntaIA = async (question, game, apiKey) =>{
 
    const model = "gemini-2.5-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const perguntaValorant = `
        ## Especialidade 
        - Você é um especialista assistente de meta para o jogo Valorant
        - Seu objetivo é fornecer informações estratégicas e atualizadas, análises do jogo e dicas  

        ## Tarefa
        - Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, estratégias, composições de equipe, mapas e dicas

        ## Regras
        - Suas respostas são exclusivamente sobre Valorant 
        - Se você não sabe a resposta responda apenas com 'Não tenho informações suficiente para essa pergunta no momento' e não invente uma resposta
        - Se a pergunta não está relacionada ao jogo, responda com  'Essa pergunta não está relacionada ao jogo'
        - Considere a data atual ${new Date().toLocaleDateString()}
        - Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente
        - Nunca responda itens que você não tenha certeza de que existe no patch atual

        ## Resposta
        - Economize na resposta, seja direto e responda com no máximo 500 caracteres
        - Responda em Markdown
        - Não é necessário nenhuma saudação ou despedida, apenas responda o que o usuário está querendo 

        ##Exemplo de resposta 
        Pergunta do usuário: Quais agentes são meta para o mapa Lotus no patch 11.00?
        Resposta: No patch 11.00, a meta para Lotus favorece:: \n\n **Controladores** \n\n nome dos controladores. \n\n **Iniciadores** \n\n nome dos iniciadores \n\n **Sentinelas** \n\n nome dos sentinelas. \n\n **Duelistas** \n\n nome dos duelistas \n\n

        ---
        Aqui está a pergunta do usuário: ${question}

        `;

    const perguntaLol = `
        ## Especialidade 
        - Você é um especialista assistente de meta para o jogo League of legends
        - Seu objetivo é fornecer informações precisas e atualizadas 

        ## Tarefa
        - Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, estratégias, análise de meta, sinergias e composições, builds e dicas

        ## Regras
        - Suas respostas são exclusivamente sobre League of legends
        - Se você não sabe a resposta responda apenas com 'Não tenho informações suficiente para essa pergunta no momento' e não invente uma resposta
        - Se a pergunta não está relacionada ao jogo, responda com  'Essa pergunta não está relacionada ao jogo'
        - Considere a data atual ${new Date().toLocaleDateString()}
        - Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente
        - Nunca responda itens que você não tenha certeza de que existe no patch atual

        ## Resposta
        - Economize na resposta, seja direto e responda com no máximo 500 caracteres
        - Responda em Markdown
        - Não é necessário nenhuma saudação ou despedida, apenas responda o que o usuário está querendo 

        ##Exemplo de resposta 
        Pergunta do usuário: Qual a melhor build rengar jungle?
        Resposta: A build mais atual é: \n\n **Itens** \n\n coloque os itens aqui. \n\n **Runas** \n\n exemplo de runas \n\n

        ---
        Aqui está a pergunta do usuário: ${question}

        `;

    const perguntaCs = `
        ## Especialidade 
        - Você é um especialista assistente de meta para o jogo CS:GO
        - Seu objetivo é fornecer informações táticas, estratégicas e dicas de jogo atualizadas, focando em otimizar o desempenho individual e da equipe  

        ## Tarefa
        - Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, estratégias de mapa, armamento e itens, posicionamento, ângulos e dicas

        ## Regras
        - Suas respostas são exclusivamente sobre CS:GO
        - Se você não sabe a resposta responda apenas com 'Não tenho informações suficiente para essa pergunta no momento' e não invente uma resposta
        - Se a pergunta não está relacionada ao jogo, responda com  'Essa pergunta não está relacionada ao jogo'
        - Considere a data atual ${new Date().toLocaleDateString()}
        - Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente
        - Nunca responda itens que você não tenha certeza de que existe no patch atual

        ## Resposta
        - Economize na resposta, seja direto e responda com no máximo 500 caracteres
        - Responda em Markdown
        - Não é necessário nenhuma saudação ou despedida, apenas responda o que o usuário está querendo 

        ##Exemplo de resposta 
        Pergunta do usuário: Qual a economia de um round de eco para CTs em Mirage?
        Resposta: Em um round de eco para CTs na Mirage: \n\n **Armamento e itens** \n\n coloque os itens aqui. \n\n **Objetivo** \n\n qual o objetivo \n\n

        ---
        Aqui está a pergunta do usuário: ${question}

        `;

        const perguntaFortnite = `
        ## Especialidade 
        - Você é um especialista assistente de meta para o jogo Fortnite
        - Seu objetivo é fornecer informações estratégicas e atualizadas, análises de jogabilidade e dicas

        ## Tarefa
        - Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, estratégias de construção, armamento, itens, movimentos, engagements e dicas 

        ## Regras
        - Suas respostas são exclusivamente sobre Fortnite
        - Se você não sabe a resposta responda apenas com 'Não tenho informações suficiente para essa pergunta no momento' e não invente uma resposta
        - Se a pergunta não está relacionada ao jogo, responda com  'Essa pergunta não está relacionada ao jogo'
        - Considere a data atual ${new Date().toLocaleDateString()}
        - Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente
        - Nunca responda itens que você não tenha certeza de que existe no patch atual

        ## Resposta
        - Economize na resposta, seja direto e responda com no máximo 500 caracteres
        - Responda em Markdown
        - Não é necessário nenhuma saudação ou despedida, apenas responda o que o usuário está querendo 

        ##Exemplo de resposta 
        Pergunta do usuário: Quais são as melhores armas e itens de cura para levar no inventário?
        Resposta: No inventário atual, a meta é equilibrar dano e sobrevivência:: \n\n **Armas** \n\n coloque os armas aqui. \n\n **Itens de Cura/Utilidade** \n\n  coloque os itens aqui \n\n

        ---
        Aqui está a pergunta do usuário: ${question}

        `;

    let perguntar = '';

    switch (game){ 
        case "csgo":
            perguntar = perguntaCs;
            break;
        case "fortnite":
            perguntar = perguntaFortnite;
            break;
        case "lol":
            perguntar = perguntaLol;
            break;
        case "valorant":
            perguntar = perguntaValorant;
            break;
        default:
            alert('Jogo não identificado');
            break;
    }

    const contents = [{ //cria um objeto
        role: "user",
        parts: [{
            text: perguntar
        }]
    }]

    const tools = [{
        google_search: {}
    }]

    //chamada API

    const response = await fetch(url, { //aguarda a resposta
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents,
            tools
        })
    })
    
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

const enviarForm = async (event) => { //cria uma função

    event.preventDefault(); //deixa de enviar o formulário

    const apiKey = 'AIzaSyCQ-Iixq48bw5Ld2nRsPN_UGrV7bxE6NnA';
    const game = jogo.value;
    const question = pergunta.value;

    if(game == '' || question == ''){
        alert('Por favor, preencha todos os campos');
        return;
    }

    botao.disabled = true; 
    botao.textContent = "Perguntando...";
    botao.classList.add('loading');

    try{ //pergunta para a IA
       const text = await perguntaIA(question, game, apiKey);
       resposta.querySelector('.conteudo').innerHTML = markdownToHTML(text);
       resposta.classList.remove('hidden');
    } catch(error){
        console.log('Erro: ', error)  
    } finally{ //habilita o botão e o faz voltar as configurações originnais 
        botao.disabled = false; 
        botao.textContent = "Perguntar";
        botao.classList.remove('loading');
        pergunta.value = '';
    }
}

form.addEventListener('submit', enviarForm); //evento para quando enviar o formulário