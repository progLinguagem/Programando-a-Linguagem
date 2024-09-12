PennController.ResetPrefix(null); 
// Este comando remove a necessidade de usar "PennController." antes de cada comando

Sequence("Start", "Instructions", randomize("Itens"), SendResults(), "Final");
// Define a sequência dos trials no experimento

// Tela de boas-vindas e coleta de dados do participante
newTrial("Start",
    newText("<p>Bem-vindo(a)! Antes de iniciarmos, preencha os dados a seguir:</p>")
    .print()
    .css("font-size", "1.2em")
    ,
    newText("<p>Nome:</p>")
    .print()
    .css("font-size", "1.2em")
    ,
    newTextInput("Nome") // Campo de entrada para o nome do participante
    .print()
    ,
    newText("<p>Idade:</p>")
    .print()
    .css("font-size", "1.2em")
    ,
    newTextInput("Idade") // Campo de entrada para a idade do participante
    .print()
    ,
    newButton("Iniciar") // Botão que o participante deve pressionar para continuar
    .css("font-size", "1.2em")
    .print()
    .wait() // Espera o clique no botão para prosseguir
    ,
    newVar("ID") // Variável global para armazenar o nome do participante
    .global()
    .set(getTextInput("Nome"))
    ,
    newVar("IDADE") // Variável global para armazenar a idade do participante
    .global()
    .set(getTextInput("Idade"))
)
.log("ID", getVar("ID")) // Grava o nome nos resultados
.log("AGE", getVar("IDADE")); // Grava a idade nos resultados

//Tela de instruções
newTrial("Instructions",
    newText("<p>Este experimento consiste em ler sentenças segmentadas.</p>")
    .print()
    .center()
    .css("font-size","1.2em")
    ,
    newText("<p>Use a tecla <strong>ESPAÇO</strong> para ler cada trecho.</p>")
    .print()
    .center()
    .css("font-size", "1.2em")
    ,
    newButton("Iniciar")
    .print()
    .center()
    .css("font-size", "1.2em")
    .wait()
);

Template("V2_frases_pcibex.csv",
    variable => newTrial("Itens",
        newController("DashedSentence", {s: variable.Sentence}) // Coluna "Sentence" do CSV
            .css("font-size", "1.0em")
            .print()
            .log()
            .wait()
            .remove()
    )
    .log("Group", variable.Group)   // Coluna "Group" do CSV
    .log("Item_condition", variable.Item_condition) // Coluna "Item_condition" do CSV
);

PennController.SendResults;
    
    newTrial( "Final" ,
    newText("Fim do experimento! Obrigada por participar!")
    .css("font-size","1.2em")
    .center()
    .print()
    .wait()

    )    
    
//Esse comando indica que a barra de progresso está totalmente completa durante a exibição da mensagem final do experimento. A mensagem final não é contada como um item experimental.
 .setOption("countsForProgressBar", false);