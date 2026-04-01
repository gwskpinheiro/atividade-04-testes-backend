require('dotenv').config();

const app = require('./app');
// Importamos o Usuario junto com o sequelize
const { sequelize, Usuario } = require('./models'); 

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true })
    .then(async () => { // <--- Colocamos um 'async' aqui

        // Cria um usuário falso só para o teste de usuario pelo id passar
        await Usuario.findOrCreate({
            where: { id: 1 },
            defaults: {
                nome: "Usuário Cobaia",
                email: "cobaia@teste.com",
                senha: "123",
                tipo: "aluno"
            }
        });

        app.listen(PORT, () => {
            console.log(`Rodando na porta ${PORT} e Banco Sincronizado com sucesso!`);
        });
    })
    .catch((erro) => {
        console.error("Erro fatal ao conectar no banco:", erro);
    });