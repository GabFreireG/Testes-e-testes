<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const rotulosStatus = {
		'a-fazer': 'A fazer',
		'em-andamento': 'Em andamento',
		'em-revisao': 'Em revisão',
		concluida: 'Concluída'
	} as const;

	const rotulosPrioridade = { baixa: 'Baixa', media: 'Média', alta: 'Alta' } as const;

	function formatarData(data: string): string {
		if (!data) return 'Sem prazo definido';
		const partes = data.split('-');
		return partes.length === 3 ? `${partes[2]}/${partes[1]}/${partes[0]}` : data;
	}
</script>

<svelte:head>
	<title>{data.tarefa.titulo} | Rapazes do Dia</title>
	<meta name="description" content="Detalhes da tarefa {data.tarefa.id}: {data.tarefa.titulo}" />
</svelte:head>

<main>
	<a class="voltar" href="/">← Voltar para a lista de tarefas</a>
	<article class="detalhe">
		<div class="topo">
			<span class="id">TAREFA #{data.tarefa.id}</span>
			<span class="status status-{data.tarefa.status}">{rotulosStatus[data.tarefa.status]}</span>
		</div>
		<h1>{data.tarefa.titulo}</h1>
		<p class="descricao">{data.tarefa.descricao || 'Esta tarefa não possui descrição.'}</p>

		<h2>Informações da tarefa</h2>
		<dl>
			<div><dt>Identificador</dt><dd>{data.tarefa.id}</dd></div>
			<div><dt>Projeto</dt><dd>{data.tarefa.projetoId}</dd></div>
			<div><dt>Status</dt><dd>{rotulosStatus[data.tarefa.status]}</dd></div>
			<div><dt>Prioridade</dt><dd><span class="prioridade prioridade-{data.tarefa.prioridade}">{rotulosPrioridade[data.tarefa.prioridade]}</span></dd></div>
			<div><dt>Responsável</dt><dd>{data.tarefa.responsavel || 'Não definido'}</dd></div>
			<div><dt>Prazo</dt><dd>{formatarData(data.tarefa.prazo)}</dd></div>
		</dl>
	</article>
</main>

<style>
	:global(body) { margin: 0; background: #f8fafc; color: #0f172a; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
	main { max-width: 52rem; margin: 0 auto; padding: 3rem 1.25rem 4rem; }
	.voltar { display: inline-block; margin-bottom: 1.5rem; color: #2563eb; font-weight: 650; text-decoration: none; }
	.voltar:hover { text-decoration: underline; }
	.detalhe { padding: clamp(1.25rem, 4vw, 2.5rem); border: 1px solid #e2e8f0; border-radius: 1.25rem; background: #fff; box-shadow: 0 4px 16px rgb(15 23 42 / 5%); }
	.topo { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: .75rem; }
	.id { color: #64748b; font-size: .8rem; font-weight: 750; letter-spacing: .08em; }
	.status, .prioridade { display: inline-flex; border-radius: 999px; padding: .3rem .7rem; font-size: .8rem; font-weight: 700; }
	.status-a-fazer { color: #475569; background: #f1f5f9; }
	.status-em-andamento { color: #1d4ed8; background: #dbeafe; }
	.status-em-revisao { color: #92400e; background: #fef3c7; }
	.status-concluida { color: #166534; background: #dcfce7; }
	h1 { margin: 1.25rem 0 .75rem; font-size: clamp(1.8rem, 5vw, 2.7rem); line-height: 1.2; letter-spacing: -.035em; overflow-wrap: anywhere; }
	.descricao { margin: 0; color: #475569; line-height: 1.75; white-space: pre-wrap; }
	h2 { margin: 2rem 0 0; padding-bottom: .75rem; border-bottom: 1px solid #e2e8f0; font-size: 1.1rem; }
	dl { margin: 0; }
	dl div { display: grid; grid-template-columns: minmax(8rem, 1fr) 2fr; gap: 1rem; padding: .9rem 0; border-bottom: 1px solid #f1f5f9; }
	dl div:last-child { border-bottom: 0; }
	dt { color: #64748b; }
	dd { margin: 0; font-weight: 600; overflow-wrap: anywhere; }
	.prioridade-baixa { color: #166534; background: #dcfce7; }
	.prioridade-media { color: #92400e; background: #fef3c7; }
	.prioridade-alta { color: #b91c1c; background: #fee2e2; }
	@media (max-width: 30rem) { main { padding: 2rem 1rem; } dl div { grid-template-columns: 1fr; gap: .3rem; } }
</style>
