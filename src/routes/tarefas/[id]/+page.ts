import { error } from '@sveltejs/kit';
import { obterTarefa } from '#lib/api.ts';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	try {
		const tarefa = await obterTarefa(params.id, fetch);
		if (!tarefa) error(404, 'Tarefa não encontrada');
		return { tarefa };
	} catch (e) {
		if (typeof e === 'object' && e !== null && 'status' in e) throw e;
		throw error(502, 'Não foi possível consultar a API de tarefas. Verifique se o json-server está em execução.');
	}
};
