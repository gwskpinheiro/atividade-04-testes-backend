const axios = require('axios');
require('dotenv').config();
const api = `http://localhost:${process.env.PORT || 3000}`;

let EMPRESTIMO_ID;
let EMPRESTIMO_ID_2;
let LIVRO_ID;
let LIVRO_ID_2;
let USUARIO_ID;

beforeAll(async () => {
    // Cria usuário
    const usuario = await axios.post(`${api}/usuarios`, {
        nome: "Usuario Teste Multa",
        email: `teste_multa_${Date.now()}@email.com`,
        senha: "123456",
        tipo: "aluno",
    });
    USUARIO_ID = usuario.data.id;

    // Cria dois livros
    const livro1 = await axios.post(`${api}/livros`, { titulo: "Livro Multa 1", autor: "Autor" });
    LIVRO_ID = livro1.data.id;

    const livro2 = await axios.post(`${api}/livros`, { titulo: "Livro Multa 2", autor: "Autor" });
    LIVRO_ID_2 = livro2.data.id;

    // Cria dois empréstimos
    const emp1 = await axios.post(`${api}/emprestimos`, {
        usuario_id: USUARIO_ID,
        livro_id: LIVRO_ID,
        data_devolucao_prevista: "2025-01-01",
    });
    EMPRESTIMO_ID = emp1.data.id;

    const emp2 = await axios.post(`${api}/emprestimos`, {
        usuario_id: USUARIO_ID,
        livro_id: LIVRO_ID_2,
        data_devolucao_prevista: "2025-01-01",
    });
    EMPRESTIMO_ID_2 = emp2.data.id;
});

afterAll(async () => {
    await axios.delete(`${api}/emprestimos/${EMPRESTIMO_ID}`).catch(() => {});
    await axios.delete(`${api}/emprestimos/${EMPRESTIMO_ID_2}`).catch(() => {});
    await axios.delete(`${api}/livros/${LIVRO_ID}`).catch(() => {});
    await axios.delete(`${api}/livros/${LIVRO_ID_2}`).catch(() => {});
    await axios.delete(`${api}/usuarios/${USUARIO_ID}`).catch(() => {});
});

describe("Multas", () => {

    test("deve criar uma multa para um empréstimo", async () => {
        const res = await axios.post(`${api}/multas`, {
            emprestimo_id: EMPRESTIMO_ID,
            valor: 10.50,
        });
        expect(res.status).toBe(201);
        expect(res.data).toHaveProperty("id");
        expect(res.data.pago).toBe(false);

        await axios.delete(`${api}/multas/${res.data.id}`);
    });

    test("deve retornar uma lista de multas", async () => {
        const res = await axios.get(`${api}/multas`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.data)).toBe(true);
    });

    test("deve buscar uma multa pelo id", async () => {
        const multa = await axios.post(`${api}/multas`, { emprestimo_id: EMPRESTIMO_ID, valor: 5.00 });
        const res = await axios.get(`${api}/multas/${multa.data.id}`);
        expect(res.status).toBe(200);
        expect(res.data).toHaveProperty("id");
        await axios.delete(`${api}/multas/${res.data.id}`);
    });

    test("deve retornar 404 para multa inexistente", async () => {
        try {
            await axios.get(`${api}/multas/9999`);
        } catch (error) {
            expect(error.response.status).toBe(404);
            expect(error.response.data.message).toBe("Multa não encontrada");
        }
    });

    test("deve listar multas por empréstimo", async () => {
        const multa = await axios.post(`${api}/multas`, { emprestimo_id: EMPRESTIMO_ID, valor: 7.00 });
        const res = await axios.get(`${api}/multas/emprestimo/${EMPRESTIMO_ID}`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.data)).toBe(true);
        await axios.delete(`${api}/multas/${multa.data.id}`);
    });

    test("deve registrar o pagamento de uma multa", async () => {
        const multa = await axios.post(`${api}/multas`, { emprestimo_id: EMPRESTIMO_ID, valor: 15.00 });
        const res = await axios.patch(`${api}/multas/${multa.data.id}/pagar`);
        expect(res.status).toBe(200);
        expect(res.data.pago).toBe(true);
        await axios.delete(`${api}/multas/${res.data.id}`);
    });

    test("deve retornar 400 ao pagar multa já paga", async () => {
        const multa = await axios.post(`${api}/multas`, { emprestimo_id: EMPRESTIMO_ID, valor: 20.00 });
        await axios.patch(`${api}/multas/${multa.data.id}/pagar`);
        try {
            await axios.patch(`${api}/multas/${multa.data.id}/pagar`);
        } catch (error) {
            expect(error.response.status).toBe(400);
            expect(error.response.data.message).toBe("Multa já foi paga");
        } finally {
            await axios.delete(`${api}/multas/${multa.data.id}`);
        }
    });

    test("deve deletar uma multa", async () => {
        const multa = await axios.post(`${api}/multas`, { emprestimo_id: EMPRESTIMO_ID_2, valor: 8.00 });
        const res = await axios.delete(`${api}/multas/${multa.data.id}`);
        expect(res.status).toBe(204);
    });

    test("deve retornar 404 ao deletar multa inexistente", async () => {
        try {
            await axios.delete(`${api}/multas/9999`);
        } catch (error) {
            expect(error.response.status).toBe(404);
            expect(error.response.data.message).toBe("Multa não encontrada");
        }
    });

    test("deve retornar 400 ao criar multa sem emprestimo_id", async () => {
        try {
            await axios.post(`${api}/multas`, { valor: 10.00 });
        } catch (error) {
            expect(error.response.status).toBe(400);
            expect(error.response.data.message).toBe("emprestimo_id e valor são obrigatórios");
        }
    });

    test("deve retornar 400 ao criar multa sem valor", async () => {
        try {
            await axios.post(`${api}/multas`, { emprestimo_id: EMPRESTIMO_ID });
        } catch (error) {
            expect(error.response.status).toBe(400);
            expect(error.response.data.message).toBe("emprestimo_id e valor são obrigatórios");
        }
    });

    test("deve retornar 400 ao criar multa com valor zero ou negativo", async () => {
        try {
            await axios.post(`${api}/multas`, { emprestimo_id: EMPRESTIMO_ID, valor: 0 });
        } catch (error) {
            expect(error.response.status).toBe(400);
            expect(error.response.data.message).toBe("O valor da multa deve ser maior que zero");
        }
    });

    test("deve retornar 400 ao criar segunda multa para o mesmo empréstimo", async () => {
        const multa = await axios.post(`${api}/multas`, { emprestimo_id: EMPRESTIMO_ID, valor: 5.00 });
        try {
            await axios.post(`${api}/multas`, { emprestimo_id: EMPRESTIMO_ID, valor: 5.00 });
        } catch (error) {
            expect(error.response.status).toBe(400);
            expect(error.response.data.message).toBe("Já existe uma multa para este empréstimo");
        } finally {
            await axios.delete(`${api}/multas/${multa.data.id}`);
        }
    });

    test("deve retornar 400 ao criar multa para empréstimo inexistente", async () => {
        try {
            await axios.post(`${api}/multas`, { emprestimo_id: 9999, valor: 10.00 });
        } catch (error) {
            expect(error.response.status).toBe(400);
            expect(error.response.data.message).toBe("Empréstimo não encontrado");
        }
    });
});
